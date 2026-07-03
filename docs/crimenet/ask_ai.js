// ── Ask CRIMENET AI tab ──────────────────────────────────────────────────
(function(){
  var initialized = false;
  var MAX_ITERATIONS = 5;

  function esc(s){return String(s==null?'':s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;').replace(/'/g,'&#39;');}

  function simpleMarkdown(t){
    return esc(t)
      .replace(/\*\*(.+?)\*\*/g,'<strong>$1</strong>')
      .replace(/\*(.+?)\*/g,'<em>$1</em>')
      .replace(/\n/g,'<br>');
  }

  // ── Data loading ──────────────────────────────────────────────────────
  var compactData=null, adjData=null, communitiesData=null;
  var adjNeighbors={}, evidenceCache={}, bucketPromises={};
  var EVIDENCE_DIR='data/evidence', EVIDENCE_BUCKETS=128;
  var dataReady;

  function evidenceBucketId(name){
    var b=new TextEncoder().encode(name), h=0x811c9dc5;
    for(var i=0;i<b.length;i++){h^=b[i];h=Math.imul(h,0x01000193)>>>0;}
    var w=Math.max(3,String(EVIDENCE_BUCKETS-1).length);
    return String((h>>>0)%EVIDENCE_BUCKETS).padStart(w,'0');
  }

  function loadCompact(){
    if(compactData)return Promise.resolve(compactData);
    return fetch('data/compact.json').then(function(r){
      if(!r.ok)throw new Error('compact');
      return r.json();
    }).then(function(d){compactData=d;return d;});
  }

  function loadAdj(){
    if(adjData)return Promise.resolve(adjData);
    return fetch('data/crimenet_adj.json').then(function(r){
      if(!r.ok)throw new Error('adj');
      return r.json();
    }).then(function(d){
      adjData=d;
      for(var k in d){if(d.hasOwnProperty(k))adjNeighbors[k]=d[k].map(function(e){return e.t;});}
      return d;
    });
  }

  function loadCommunitiesData(){
    if(communitiesData)return Promise.resolve(communitiesData);
    return fetch('data/communities.json').then(function(r){
      if(!r.ok)throw new Error('communities');
      return r.json();
    }).then(function(d){communitiesData=d.communities||[];return communitiesData;});
  }

  function loadEvidence(orgName){
    if(orgName in evidenceCache)return Promise.resolve(evidenceCache[orgName]);
    var id=evidenceBucketId(orgName);
    if(!bucketPromises[id]){
      bucketPromises[id]=fetch(EVIDENCE_DIR+'/'+id+'.json')
        .then(function(r){if(!r.ok)throw new Error('bucket');return r.json();})
        .catch(function(){return {};});
    }
    return bucketPromises[id].then(function(bk){
      var e=bk[orgName]||null;evidenceCache[orgName]=e;return e;
    });
  }

  function fold(s){return (s||'').normalize('NFKD').replace(/[̀-ͯ]/g,'').toLowerCase().trim();}

  function bestMatch(query){
    if(!compactData)return null;
    var q=fold(query);
    var orgs=compactData.orgs||{};
    for(var name in orgs){
      if(!orgs.hasOwnProperty(name))continue;
      if(fold(name)===q)return name;
    }
    for(var name in orgs){
      if(!orgs.hasOwnProperty(name))continue;
      if(fold(name).indexOf(q)===0)return name;
    }
    var best='';
    for(var name in orgs){
      if(!orgs.hasOwnProperty(name))continue;
      if(fold(name).indexOf(q)>=0){if(!best||name.length<best.length)best=name;}
    }
    if(!best){
      for(var name in orgs){
        var o=orgs[name];if(!o||!o.aliases)continue;
        for(var i=0;i<o.aliases.length;i++){
          if(fold(o.aliases[i])===q||fold(o.aliases[i]).indexOf(q)>=0){
            if(!best||name.length<best.length){best=name;break;}
          }
        }
        if(best)break;
      }
    }
    return best||null;
  }

  // ── Tool schemas ──────────────────────────────────────────────────────
  var TOOLS=[
    {type:'function',function:{name:'get_organization',
      description:'Search for organizations by name (exact or partial match). Returns matching orgs with metadata: description, country, time period, aliases, degree (number of connections). Use this to look up details about a specific organization.',
      parameters:{type:'object',properties:{query:{type:'string',description:'Organization name to search for'}},required:['query']}}},
    {type:'function',function:{name:'get_connections',
      description:'Get all connections for an organization, optionally filtered by relationship type (cooperation/conflict/other), or get connections between two specific organizations. Each connection includes a verbatim evidence quote from Wikipedia.',
      parameters:{type:'object',properties:{
        organization:{type:'string',description:'Organization name'},
        relationship_type:{type:'string',enum:['cooperation','conflict','other'],description:'Optional filter by relationship type'},
        target_organization:{type:'string',description:'Optional second organization to find connections between these two specifically'}
      },required:['organization']}}},
    {type:'function',function:{name:'find_by_country',
      description:'Find organizations associated with a country. Returns orgs based there (headquartered) and orgs with operational footprints there (active but not headquartered).',
      parameters:{type:'object',properties:{country:{type:'string',description:'Country name'}},required:['country']}}},
    {type:'function',function:{name:'find_paths',
      description:'Find shortest paths between two organizations through the network. Shows how two orgs are connected through intermediate organizations.',
      parameters:{type:'object',properties:{
        from_organization:{type:'string',description:'Starting organization'},
        to_organization:{type:'string',description:'Target organization'},
        max_hops:{type:'integer',description:'Maximum path length (2-4)',default:3}
      },required:['from_organization','to_organization']}}},
    {type:'function',function:{name:'get_community',
      description:'Get the community (densely connected cooperation group) that an organization belongs to, or list all communities if no organization specified.',
      parameters:{type:'object',properties:{organization:{type:'string',description:'Organization name. Omit to list all communities.'}},required:[]}}}
  ];

  // ── Tool implementations ──────────────────────────────────────────────

  function tool_get_organization(args){
    var query=args.query||'';
    if(!compactData)return JSON.stringify({error:'Data not loaded'});
    var q=fold(query);
    var orgs=compactData.orgs||{}, matches=[];
    for(var name in orgs){
      if(!orgs.hasOwnProperty(name))continue;
      var o=orgs[name], match=false;
      if(fold(name).indexOf(q)>=0){match=true;}
      else if(o.aliases){for(var i=0;i<o.aliases.length;i++){if(fold(o.aliases[i]).indexOf(q)>=0){match=true;break;}}}
      if(!match)continue;
      var entry={standard_name:name,aliases:o.aliases||[],description:o.description||null,country:o.country||null,time_period:o.time_period||null,is_defunct:o.is_defunct||'unknown',founded_year:o.founded_year||null,dissolved_year:o.dissolved_year||null,degree:o.degree||0};
      if(o.country_links&&o.country_links.length)entry.country_links=o.country_links.slice(0,15).map(function(cl){return {country:cl.country,context:cl.context,quote:cl.evidence_quote};});
      matches.push(entry);
      if(matches.length>=15)break;
    }
    matches.sort(function(a,b){return(b.description?1:0)-(a.description?1:0)||b.degree-a.degree;});
    if(matches.length===0)return JSON.stringify({matches:[],hint:'No organizations found matching "'+query+'". Try a different spelling or a shorter query.'});
    return JSON.stringify({matches:matches,total_found:matches.length});
  }

  function tool_get_connections(args){
    var org=args.organization||'', relType=args.relationship_type||null, targetOrg=args.target_organization||null;
    return Promise.all([loadAdj(),loadCompact()]).then(function(){
      var match=bestMatch(org);
      if(!match)return JSON.stringify({error:'Organization not found: '+org});
      var edges=adjData[match]||[];
      if(relType)edges=edges.filter(function(e){return e.r.indexOf(relType)>=0;});
      if(targetOrg){
        var tMatch=bestMatch(targetOrg);
        if(!tMatch)return JSON.stringify({error:'Target organization not found: '+targetOrg});
        edges=edges.filter(function(e){return e.t===tMatch;});
      }
      var total=edges.length;
      if(edges.length>25)edges=edges.slice(0,25);
      return loadEvidence(match).then(function(entry){
        var evidenceEdges=(entry&&entry.edges)?entry.edges:[];
        var results=edges.map(function(n){
          var found=null;
          for(var i=0;i<evidenceEdges.length;i++){
            var ee=evidenceEdges[i];
            if((ee.source===match&&ee.target===n.t)||(ee.source===n.t&&ee.target===match)){found=ee;break;}
          }
          if(found)return {source:found.source,target:found.target,relationship:found.relationship,description:found.descriptions?found.descriptions[0]:'',time_period:found.time_periods?found.time_periods.join(', '):'',evidence_quote:found.evidence_quote||'',source_urls:found.source_urls||[]};
          return {source:match,target:n.t,relationship:n.r.join(', '),description:'',time_period:'',evidence_quote:'',source_urls:[]};
        });
        return JSON.stringify({organization:match,connections_shown:results.length,connections_total:total,connections:results});
      });
    });
  }

  function tool_find_by_country(args){
    var country=args.country||'';
    if(!compactData)return JSON.stringify({error:'Data not loaded'});
    var countries=compactData.countries||{};
    var q=fold(country), match=null;
    for(var name in countries){if(!countries.hasOwnProperty(name))continue;if(fold(name)===q){match=name;break;}}
    if(!match){for(var name in countries){if(!countries.hasOwnProperty(name))continue;if(fold(name).indexOf(q)>=0){match=name;break;}}}
    if(!match)return JSON.stringify({error:'Country not found: '+country+'. Try another spelling.'});
    var c=countries[match];
    return JSON.stringify({
      country:match,total_connections:c.total||0,
      based_here:(c.based_here||[]).slice(0,30),
      footprints_here:(c.footprints_here||[]).slice(0,30).map(function(f){return {org:f.org,origin:f.origin,context:f.context,quote:f.quote};})
    });
  }

  function tool_find_paths(args){
    var from=args.from_organization||'', to=args.to_organization||'', maxHops=args.max_hops||3;
    if(maxHops<2)maxHops=2;if(maxHops>4)maxHops=4;
    return Promise.all([loadAdj(),loadCompact()]).then(function(){
      var fromMatch=bestMatch(from), toMatch=bestMatch(to);
      if(!fromMatch)return JSON.stringify({error:'Organization not found: '+from});
      if(!toMatch)return JSON.stringify({error:'Organization not found: '+to});
      if(fromMatch===toMatch)return JSON.stringify({paths:[],message:'Same organization.'});
      var visited={}, queue=[{node:fromMatch,path:[]}], foundPaths=[];
      visited[fromMatch]=true;
      while(queue.length>0&&foundPaths.length<3){
        var cur=queue.shift();
        if(cur.path.length>=maxHops)continue;
        var nbrs=adjNeighbors[cur.node]||[];
        for(var i=0;i<nbrs.length;i++){
          var n=nbrs[i];
          if(n===toMatch){foundPaths.push(cur.path.concat([{from:cur.node,to:n}]));if(foundPaths.length>=3)break;}
          if(!visited[n]){visited[n]=true;queue.push({node:n,path:cur.path.concat([{from:cur.node,to:n}])});}
        }
      }
      if(foundPaths.length===0)return JSON.stringify({paths:[],message:'No path found within '+maxHops+' hops between '+fromMatch+' and '+toMatch+'.'});
      var enriched=foundPaths.map(function(path){
        return path.map(function(step){
          var aedges=adjData[step.from]||[], aedge=aedges.find(function(e){return e.t===step.to;});
          return {from:step.from,to:step.to,relationships:aedge?aedge.r:['unknown']};
        });
      });
      return JSON.stringify({from:fromMatch,to:toMatch,paths:enriched});
    });
  }

  function tool_get_community(args){
    var org=args.organization||null;
    return Promise.all([loadCommunitiesData(),loadCompact()]).then(function(results){
      var comms=results[0];
      if(org){
        var match=bestMatch(org);
        if(!match)return JSON.stringify({error:'Organization not found: '+org});
        for(var i=0;i<comms.length;i++){
          var c=comms[i];
          if(c.o&&c.o.indexOf(match)>=0)return JSON.stringify({community_id:c.i,title:c.t,summary:c.m,size:c.s,top_hubs:c.k||[],members:c.o});
        }
        return JSON.stringify({message:'Organization "'+match+'" not found in any community.'});
      }
      var list=comms.map(function(c){return {id:c.i,title:c.t,size:c.s,top_hubs:(c.k||[]).slice(0,5)};});
      return JSON.stringify({total_communities:list.length,communities:list});
    });
  }

  function executeTool(name, args){
    switch(name){
      case 'get_organization':return tool_get_organization(args);
      case 'get_connections':return tool_get_connections(args);
      case 'find_by_country':return tool_find_by_country(args);
      case 'find_paths':return tool_find_paths(args);
      case 'get_community':return tool_get_community(args);
      default:return JSON.stringify({error:'Unknown tool: '+name});
    }
  }

  // ── System prompt ─────────────────────────────────────────────────────
  var SYSTEM_PROMPT='You are CRIMENET AI, an assistant that answers questions about organized crime using the CRIMENET knowledge graph.\n\nCRIMENET contains 4,505 criminal organizations and 10,935 relationships extracted from multi-language Wikipedia. Organizations include cartels, mafias, gangs, motorcycle clubs, triads, clans, factions, militias, and terrorist groups. Relationships are classified as cooperation (alliances, joint operations, supply chains), conflict (fights, wars, rivalries), or other (structural ties like sub-units, splinters, successors). Every relationship is backed by a verbatim Wikipedia quote.\n\nYou have 5 tools to query the graph:\n- get_organization: search for organizations by name, get metadata (description, country, time period, aliases)\n- get_connections: get connections for an org (optionally filtered by type or between two specific orgs)\n- find_by_country: find organizations associated with a country (based there or with footprints)\n- find_paths: find shortest paths between two organizations through the network\n- get_community: find which community an org belongs to, or list all communities\n\nGuidelines:\n- Always use tools to look up specific information. Do not guess organization names.\n- Cite evidence quotes in quotation marks when available.\n- Be precise about relationship types (cooperation vs conflict vs other).\n- If a lookup returns no results, tell the user and suggest alternatives.\n- Use bullet points for lists. Answer concisely.\n- If asked about something outside CRIMENET\'s scope, say so.';

  // ── Agent loop ────────────────────────────────────────────────────────
  async function runAgent(userQuestion, onStatus){
    await dataReady;
    var messages=[{role:'system',content:SYSTEM_PROMPT},{role:'user',content:userQuestion}];

    for(var iter=0;iter<MAX_ITERATIONS;iter++){
      if(onStatus)onStatus(iter===0?'Reasoning…':'Looking up data…');
      var payload={model:'deepseek-chat',messages:messages,tools:TOOLS};

      var resp=await fetch('https://afmartins.netlify.app/.netlify/functions/crimenet-ask',{
        method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(payload)
      });
      if(!resp.ok)throw new Error('API error: HTTP '+resp.status);
      var data=await resp.json();
      if(data.error){
        var em=data.error.message||data.error;
        if(em&&em.indexOf('rate')>=0)throw new Error('Rate limited. Wait a moment and try again.');
        throw new Error('API error');
      }
      var choice=data.choices&&data.choices[0];
      if(!choice)throw new Error('No response from API');
      var msg=choice.message;

      // Tool calls?
      if(msg.tool_calls&&msg.tool_calls.length>0){
        messages.push({role:'assistant',content:msg.content||null,tool_calls:msg.tool_calls});
        for(var i=0;i<msg.tool_calls.length;i++){
          var tc=msg.tool_calls[i], toolName=tc.function.name, toolArgs={};
          try{toolArgs=JSON.parse(tc.function.arguments||'{}');}catch(e){}
          if(onStatus)onStatus('Looking up: '+toolName.replace(/_/g,' ')+'…');
          var result=await executeTool(toolName,toolArgs);
          messages.push({role:'tool',tool_call_id:tc.id,content:result});
        }
        continue;
      }

      return msg.content||'No response generated.';
    }
    return 'I ran into a loop trying to answer your question. Please try rephrasing it.';
  }

  // ── UI ────────────────────────────────────────────────────────────────
  function initAsk(){
    if(initialized)return;
    initialized=true;

    var chat=document.getElementById('ask-chat');
    var input=document.getElementById('ask-input');
    var send=document.getElementById('ask-send');

    function addMessage(role, text){
      var div=document.createElement('div');
      div.className='ask-msg ask-'+role;
      var label=role==='user'?'You':'CRIMENET AI';
      div.innerHTML='<div class="ask-msg-label">'+esc(label)+'</div><div class="ask-msg-body">'+text+'</div>';
      chat.appendChild(div);
      chat.scrollTop=chat.scrollHeight;
    }

    function sendMessage(){
      var q=input.value.trim();
      if(!q)return;
      addMessage('user',esc(q));
      input.value='';send.disabled=true;input.disabled=true;

      var loading=document.createElement('div');
      loading.className='ask-msg ask-assistant';
      loading.innerHTML='<div class="ask-msg-label">CRIMENET AI</div><div class="ask-msg-body"><span class="ask-spinner"></span> Thinking…</div>';
      chat.appendChild(loading);
      chat.scrollTop=chat.scrollHeight;

      function updateStatus(text){
        var body=loading.querySelector('.ask-msg-body');
        if(body)body.innerHTML='<span class="ask-spinner"></span> '+esc(text);
      }

      runAgent(q,updateStatus).then(function(answer){
        loading.remove();
        addMessage('assistant',simpleMarkdown(answer));
      }).catch(function(err){
        loading.remove();
        addMessage('assistant','Error: '+esc(err.message||'Failed to reach the API.'));
      }).then(function(){
        send.disabled=false;input.disabled=false;input.focus();
      });
    }

    send.addEventListener('click',sendMessage);
    input.addEventListener('keydown',function(e){if(e.key==='Enter'){e.preventDefault();sendMessage();}});

    dataReady=Promise.all([loadCompact(),loadAdj()]);
  }

  var askBtn=document.querySelector('.browse-toggle-btn[data-view="ask"]');
  if(askBtn)askBtn.addEventListener('click',function(){initAsk();});
  if(document.getElementById('ask-view').style.display==='')initAsk();
})();
