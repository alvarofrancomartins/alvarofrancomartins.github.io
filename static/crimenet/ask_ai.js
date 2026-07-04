// ── Ask CRIMENET AI tab ──────────────────────────────────────────────────
(function(){
  var initialized = false;
  var MAX_ITERATIONS = 5;

  function esc(s){return String(s==null?'':s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;').replace(/'/g,'&#39;');}

  function simpleMarkdown(t){
    return esc(t)
      .replace(/\*\*(.+?)\*\*/g,'<strong>$1</strong>')
      .replace(/\*(.+?)\*\*/g,'<em>$1</em>')
      .replace(/\n/g,'<br>');
  }

  // ── Data loading ──────────────────────────────────────────────────────
  var compactData=null, adjData=null, communitiesData=null;
  var adjNeighbors={}, evidenceCache={}, bucketPromises={};
  var EVIDENCE_DIR='data/evidence', EVIDENCE_BUCKETS=128;
  var triadicData=null, bridgesData=null;
  var summaryCache={}, summaryBucketPromises={};
  var SUMMARY_DIR='data/relationship_summaries', SUMMARY_BUCKETS=128;
  var dataReady;

  function hashName(name){
    var b=new TextEncoder().encode(name), h=0x811c9dc5;
    for(var i=0;i<b.length;i++){h^=b[i];h=Math.imul(h,0x01000193)>>>0;}
    return h>>>0;
  }

  function evidenceBucketId(name){
    var h=hashName(name);
    var w=Math.max(3,String(EVIDENCE_BUCKETS-1).length);
    return String((h>>>0)%EVIDENCE_BUCKETS).padStart(w,'0');
  }

  function summaryBucketId(a,b){
    var key=[a,b].sort().join('||');
    var b_arr=new TextEncoder().encode(key), h=0x811c9dc5;
    for(var i=0;i<b_arr.length;i++){h^=b_arr[i];h=Math.imul(h,0x01000193)>>>0;}
    var w=Math.max(3,String(SUMMARY_BUCKETS-1).length);
    return String((h>>>0)%SUMMARY_BUCKETS).padStart(w,'0');
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

  function loadTriadicSignals(){
    if(triadicData)return Promise.resolve(triadicData);
    return fetch('data/triadic_signals.json').then(function(r){
      if(!r.ok)throw new Error('triadic');
      return r.json();
    }).then(function(d){triadicData=d;return d;});
  }

  function loadBridgesData(){
    if(bridgesData)return Promise.resolve(bridgesData);
    return fetch('data/bridges.json').then(function(r){
      if(!r.ok)throw new Error('bridges');
      return r.json();
    }).then(function(d){bridgesData=d.bridge_nodes||[];return bridgesData;});
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

  function loadRelationshipSummary(a,b){
    var key=[a,b].sort().join('||');
    if(key in summaryCache)return Promise.resolve(summaryCache[key]);
    var id=summaryBucketId(a,b);
    if(!summaryBucketPromises[id]){
      summaryBucketPromises[id]=fetch(SUMMARY_DIR+'/'+id+'.json')
        .then(function(r){if(!r.ok)throw new Error('summary '+id);return r.json();})
        .catch(function(){return {};});
    }
    return summaryBucketPromises[id].then(function(bk){
      var s=bk[key]||null;summaryCache[key]=s;return s;
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
      description:'Search for organizations by name (exact or partial match). Returns matching orgs with metadata: description, country, time period, aliases, degree (number of connections), country footprints, and Wikipedia source URLs. Use this to look up details about a specific organization.',
      parameters:{type:'object',properties:{query:{type:'string',description:'Organization name to search for'}},required:['query']}}},
    {type:'function',function:{name:'get_connections',
      description:'Get all connections for an organization, optionally filtered by relationship type (cooperation/conflict/other), or get connections between two specific organizations. Each connection includes a verbatim evidence quote from Wikipedia.',
      parameters:{type:'object',properties:{
        organization:{type:'string',description:'Organization name'},
        relationship_type:{type:'string',enum:['cooperation','conflict','other'],description:'Optional filter by relationship type'},
        target_organization:{type:'string',description:'Optional second organization to find connections between these two specifically'}
      },required:['organization']}}},
    {type:'function',function:{name:'get_relationship_summary',
      description:'Get the pre-written LLM relationship summary between two specific organizations. Provides a rich narrative paragraph synthesizing all documented interactions between them. Use this when the user asks how two specific orgs relate to each other.',
      parameters:{type:'object',properties:{
        organization_a:{type:'string',description:'First organization name'},
        organization_b:{type:'string',description:'Second organization name'}
      },required:['organization_a','organization_b']}}},
    {type:'function',function:{name:'find_by_country',
      description:'Find organizations associated with a country. Returns orgs based there (headquartered) and orgs with operational footprints there (active but not headquartered).',
      parameters:{type:'object',properties:{country:{type:'string',description:'Country name'}},required:['country']}}},
    {type:'function',function:{name:'find_paths',
      description:'Find shortest paths between two organizations through the network. Shows how two orgs are connected through intermediate organizations.',
      parameters:{type:'object',properties:{
        from_organization:{type:'string',description:'Starting organization'},
        to_organization:{type:'string',description:'Target organization'},
        max_hops:{type:'integer',description:'Maximum path length (2-5)',default:3}
      },required:['from_organization','to_organization']}}},
    {type:'function',function:{name:'get_network_neighborhood',
      description:'Get the local network around an organization: all direct connections grouped by relationship type, plus second-degree connections (orgs connected to the direct connections). Optionally filter by relationship type. Use this to understand an org\'s position in the network or answer questions about allies-of-allies.',
      parameters:{type:'object',properties:{
        organization:{type:'string',description:'Organization name'},
        relationship_type:{type:'string',enum:['cooperation','conflict','other'],description:'Optional filter to only follow edges of this type at the first hop'}
      },required:['organization']}}},
    {type:'function',function:{name:'get_community',
      description:'Get the community (densely connected cooperation group) that an organization belongs to, or list all communities if no organization specified.',
      parameters:{type:'object',properties:{organization:{type:'string',description:'Organization name. Omit to list all communities.'}},required:[]}}},
    {type:'function',function:{name:'get_triadic_signals',
      description:'Get triadic signals for an organization: pairs where this org and another org share multiple common cooperation partners or common adversaries but have no direct edge between them. These are candidate undocumented relationships. High-scoring pairs are more likely to have a real-world connection not yet documented in Wikipedia.',
      parameters:{type:'object',properties:{
        organization:{type:'string',description:'Organization name'},
        signal_type:{type:'string',enum:['cooperation','adversaries','both'],description:'Filter by signal type: cooperation (shared partners), adversaries (shared enemies), or both'},
        min_score:{type:'integer',description:'Minimum total score filter (default 5)'}
      },required:['organization']}}},
    {type:'function',function:{name:'get_bridges',
      description:'Get bridge organizations that span multiple communities. These are highly-connected orgs with ties across different criminal ecosystems. Use this when asked about which organizations connect different criminal networks or worlds.',
      parameters:{type:'object',properties:{
        min_communities:{type:'integer',description:'Minimum number of communities spanned (default 3)'}
      },required:[]}}}
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
      if(o.own_sources&&o.own_sources.length)entry.sources=o.own_sources.slice(0,5).map(function(s){return {title:s.title,url:s.url};});
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
        // Group counts by relationship type
        var counts={cooperation:0,conflict:0,other:0};
        for(var j=0;j<edges.length;j++){var rs=edges[j].r;for(var k=0;k<rs.length;k++){var r=rs[k];if(counts.hasOwnProperty(r))counts[r]++;else counts[r]=1;}}
        return JSON.stringify({organization:match,connections_shown:results.length,connections_total:total,type_counts:counts,connections:results});
      });
    });
  }

  function tool_get_relationship_summary(args){
    var orgA=args.organization_a||'', orgB=args.organization_b||'';
    return Promise.all([loadCompact(),loadAdj()]).then(function(){
      var a=bestMatch(orgA), b=bestMatch(orgB);
      if(!a)return JSON.stringify({error:'Organization not found: '+orgA});
      if(!b)return JSON.stringify({error:'Organization not found: '+orgB});
      if(a===b)return JSON.stringify({error:'Same organization: '+a+'. Use get_organization for details.'});
      return loadRelationshipSummary(a,b).then(function(summary){
        // Also find direct edges between them
        var aEdges=adjData[a]||[], directEdges=[];
        for(var i=0;i<aEdges.length;i++){if(aEdges[i].t===b)directEdges.push(aEdges[i].r.join(', '));}
        var result={organization_a:a,organization_b:b};
        if(summary)result.summary=summary.summary;
        result.has_direct_edge=directEdges.length>0;
        if(directEdges.length>0)result.direct_relationship_types=directEdges;
        if(!summary&&directEdges.length===0)result.message='No documented relationship found between '+a+' and '+b+'.';
        return JSON.stringify(result);
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
    if(maxHops<2)maxHops=2;if(maxHops>5)maxHops=5;
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

  function tool_get_network_neighborhood(args){
    var org=args.organization||'', relType=args.relationship_type||null;
    return Promise.all([loadAdj(),loadCompact()]).then(function(){
      var match=bestMatch(org);
      if(!match)return JSON.stringify({error:'Organization not found: '+org});
      var edges=adjData[match]||[];
      if(relType)edges=edges.filter(function(e){return e.r.indexOf(relType)>=0;});

      // Direct connections
      var directNames=edges.map(function(e){return e.t;});
      var directSet={};for(var i=0;i<directNames.length;i++)directSet[directNames[i]]=true;

      // Count by type
      var typeCounts={cooperation:0,conflict:0,other:0};
      for(var i=0;i<edges.length;i++){var rs=edges[i].r;for(var j=0;j<rs.length;j++){var r=rs[j];if(typeCounts.hasOwnProperty(r))typeCounts[r]++;else typeCounts[r]=1;}}

      // Second-degree: count how many paths lead to each 2nd-degree org
      var secondDegree={};
      for(var i=0;i<edges.length;i++){
        var nbrEdges=adjData[edges[i].t]||[];
        for(var j=0;j<nbrEdges.length;j++){
          var target=nbrEdges[j].t;
          if(target===match||directSet[target])continue;
          if(!secondDegree[target])secondDegree[target]={paths:0,via:[]};
          secondDegree[target].paths++;
          if(secondDegree[target].via.length<3)secondDegree[target].via.push(edges[i].t);
        }
      }

      // Sort by path count descending
      var secondList=Object.keys(secondDegree).map(function(k){return {name:k,paths:secondDegree[k].paths,via:secondDegree[k].via};});
      secondList.sort(function(a,b){return b.paths-a.paths;});

      return JSON.stringify({
        organization:match,
        direct:{total:edges.length,type_counts:typeCounts},
        second_degree:{total:secondList.length},
        direct_connections:directNames.slice(0,50),
        top_second_degree:secondList.slice(0,25)
      });
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

  function tool_get_triadic_signals(args){
    var org=args.organization||'', sigType=args.signal_type||null, minScore=args.min_score||5;
    return Promise.all([loadTriadicSignals(),loadCompact()]).then(function(results){
      var signals=results[0];
      var match=bestMatch(org);
      if(!match)return JSON.stringify({error:'Organization not found: '+org});
      var results=[];
      for(var i=0;i<signals.length;i++){
        var s=signals[i];
        if(s.a!==match&&s.b!==match)continue;
        if(s.total_weighted<minScore)continue;
        if(sigType==='cooperation'&&!s.is_cp)continue;
        if(sigType==='adversaries'&&!s.is_sa)continue;
        var other=s.a===match?s.b:s.a;
        results.push({
          other_organization:other,
          country_a:s.country_a,country_b:s.country_b,
          same_country:s.same_country,
          signal_type:s.signal,
          common_partners:s.cp_items||[],common_partner_count:s.cp_count,cooperation_score:s.cp_score,
          common_adversaries:s.adv_items||[],common_adversary_count:s.adv_count,adversary_score:s.adv_score,
          total_score:s.total_weighted,rank:s.rank
        });
      }
      results.sort(function(a,b){return b.total_score-a.total_score;});
      if(results.length>20)results=results.slice(0,20);
      return JSON.stringify({organization:match,signals_found:results.length,signals:results});
    });
  }

  function tool_get_bridges(args){
    var minComm=args.min_communities||3;
    return loadBridgesData().then(function(bridges){
      var results=bridges.filter(function(b){return b.d&&b.d.length>=minComm;});
      results.sort(function(a,b){return b.d.length-a.d.length;});
      if(results.length>20)results=results.slice(0,20);
      var list=results.map(function(b){
        return {
          organization:b.n,country:b.c,
          communities_spanned:b.d.length,
          total_degree:b.x,
          betweenness_rank:b.r,
          betweenness_score:b.b,
          strength_score:b.s,
          communities:b.d.map(function(c){return c;})
        };
      });
      return JSON.stringify({bridge_orgs_found:list.length,bridges:list});
    });
  }

  function executeTool(name, args){
    switch(name){
      case 'get_organization':return tool_get_organization(args);
      case 'get_connections':return tool_get_connections(args);
      case 'get_relationship_summary':return tool_get_relationship_summary(args);
      case 'find_by_country':return tool_find_by_country(args);
      case 'find_paths':return tool_find_paths(args);
      case 'get_network_neighborhood':return tool_get_network_neighborhood(args);
      case 'get_community':return tool_get_community(args);
      case 'get_triadic_signals':return tool_get_triadic_signals(args);
      case 'get_bridges':return tool_get_bridges(args);
      default:return JSON.stringify({error:'Unknown tool: '+name});
    }
  }

  // ── System prompt ─────────────────────────────────────────────────────
  var SYSTEM_PROMPT='You are CRIMENET AI, an assistant that answers questions about organized crime using the CRIMENET knowledge graph. Answer in English.\n\nCRIMENET contains 4,505 criminal organizations and 10,935 relationships extracted from multi-language Wikipedia. Organizations include cartels, mafias, gangs, motorcycle clubs, triads, clans, factions, militias, and terrorist groups. Relationships are classified as cooperation (alliances, joint operations, supply chains), conflict (fights, wars, rivalries), or other (structural ties like sub-units, splinters, successors). Every relationship is backed by a verbatim Wikipedia quote.\n\nYou have 9 tools to query the graph:\n- get_organization: search orgs by name (returns description, country, time period, aliases, degree, footprints, sources)\n- get_connections: get connections for an org (filterable by type or between two specific orgs)\n- get_relationship_summary: get a pre-written LLM narrative summary of the relationship between two specific orgs\n- find_by_country: find orgs associated with a country (headquartered or with operational footprints)\n- find_paths: find shortest paths between two orgs through the network (up to 5 hops)\n- get_network_neighborhood: get the local network around an org (direct + second-degree connections grouped by type)\n- get_community: get community membership for an org, or list all 224 communities\n- get_triadic_signals: get candidate undocumented relationships for an org (shared partners/adversaries with no direct edge)\n- get_bridges: get bridge orgs that span multiple communities\n\nGuidelines:\n- Always use tools to look up specific information. Do not guess organization names.\n- For questions about how two specific orgs relate, use get_relationship_summary first, then get_connections for details.\n- For questions about allies-of-allies or the broader network around an org, use get_network_neighborhood.\n- When discussing networks, cite evidence quotes and relationship types.\n- For questions about potential undocumented relationships, use get_triadic_signals (note: these are statistical signals, not confirmed).\n- Cite sources when available.\n- If a lookup returns no results, tell the user and suggest alternatives.\n- Use bullet points for lists. Answer concisely.\n- If asked about something outside CRIMENET\'s scope, say so.';

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
    var welcome=document.getElementById('ask-welcome');
    var answers=document.getElementById('ask-answers');

    function showAnswer(question, answer){
      answers.innerHTML='';
      var qDiv=document.createElement('div');
      qDiv.className='ask-msg ask-user';
      qDiv.innerHTML='<div class="ask-msg-label">You</div><div class="ask-msg-body">'+esc(question)+'</div>';
      answers.appendChild(qDiv);
      var aDiv=document.createElement('div');
      aDiv.className='ask-msg ask-assistant';
      aDiv.innerHTML='<div class="ask-msg-label">CRIMENET AI</div><div class="ask-msg-body">'+answer+'</div>';
      answers.appendChild(aDiv);
      // Focus on the answer
      setTimeout(function(){answers.scrollIntoView({behavior:'smooth',block:'start'});},50);
    }

    function showLoading(){
      answers.innerHTML='';
      var loading=document.createElement('div');
      loading.className='ask-msg ask-assistant';
      loading.innerHTML='<div class="ask-msg-label">CRIMENET AI</div><div class="ask-msg-body"><span class="ask-spinner"></span> Thinking…</div>';
      answers.appendChild(loading);
      setTimeout(function(){answers.scrollIntoView({behavior:'smooth',block:'start'});},50);
    }

    function updateStatus(text){
      var body=answers.querySelector('.ask-msg-body');
      if(body)body.innerHTML='<span class="ask-spinner"></span> '+esc(text);
    }

    function submitQuestion(q){
      q=(q||'').trim();if(!q)return;
      showLoading();
      input.value='';send.disabled=true;input.disabled=true;

      runAgent(q,updateStatus).then(function(answer){
        showAnswer(q,simpleMarkdown(answer));
      }).catch(function(err){
        showAnswer(q,'Error: '+esc(err.message||'Failed to reach the API.'));
      }).then(function(){
        send.disabled=false;input.disabled=false;
        // Focus on answer
        setTimeout(function(){answers.scrollIntoView({behavior:'smooth',block:'start'});},100);
      });
    }

    send.addEventListener('click',function(){submitQuestion(input.value);});
    input.addEventListener('keydown',function(e){if(e.key==='Enter'){e.preventDefault();submitQuestion(input.value);}});

    // Example click: copy to input
    if(welcome){
      var examples=welcome.querySelectorAll('.ask-example');
      for(var i=0;i<examples.length;i++){
        examples[i].addEventListener('click',function(){
          input.value=this.dataset.prompt||'';
          input.focus();
        });
      }
    }

    dataReady=Promise.all([loadCompact(),loadAdj()]);
  }

  var askBtn=document.querySelector('.browse-toggle-btn[data-view="ask"]');
  if(askBtn)askBtn.addEventListener('click',function(){initAsk();});
  if(document.getElementById('ask-view').style.display==='')initAsk();
})();
