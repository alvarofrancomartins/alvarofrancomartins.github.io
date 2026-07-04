// ── Ask CRIMENET AI tab ──────────────────────────────────────────────────
(function(){
  var initialized = false;
  var MAX_ITERATIONS = 5;

  function esc(s){return String(s==null?'':s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;').replace(/'/g,'&#39;');}

  function titleFromUrl(u){
    var m=u.match(/title=([^&]+)/);
    if(m)return decodeURIComponent(m[1]).replace(/_/g,' ');
    return u;
  }

  function renderMarkdown(t){
    // Block-level: split into paragraphs/lines, process heading / hr / table / list
    // then join, then process inline formatting.
    var lines=(t||'').split('\n');
    var out=[], inTable=false, inList=false, tableHtml='', listHtml='';

    function flushTable(){
      if(!inTable)return;
      var rows=tableHtml.trim().split('\n');
      if(rows.length<2){tableHtml='';inTable=false;return;}
      // First row = header, second = separator, rest = body
      var hdr=rows[0], sep=rows[1], bodyRows=rows.slice(2);
      // If second row isn't a separator, treat whole thing as non-table
      if(!/^\|?[\s\-:|]+\|?$/.test(sep)){out.push('<p>'+esc(rows.join('<br>'))+'</p>');tableHtml='';inTable=false;return;}
      // Build table
      var html='<table class="ask-table"><thead><tr>';
      var hdrCells=hdr.split('|').filter(function(c){return c.trim();});
      for(var i=0;i<hdrCells.length;i++){html+='<th>'+renderInline(hdrCells[i].trim())+'</th>';}
      html+='</tr></thead><tbody>';
      for(var j=0;j<bodyRows.length;j++){
        var cells=bodyRows[j].split('|').filter(function(c){return c.trim();});
        if(cells.length===0)continue;
        html+='<tr>';
        for(var k=0;k<cells.length;k++){html+='<td>'+renderInline(cells[k].trim())+'</td>';}
        html+='</tr>';
      }
      html+='</tbody></table>';
      out.push(html);
      tableHtml='';inTable=false;
    }

    function flushList(){
      if(!inList)return;
      out.push('<ul>'+listHtml+'</ul>');
      listHtml='';inList=false;
    }

    for(var i=0;i<lines.length;i++){
      var raw=lines[i], trimmed=raw.trim();

      // Empty line → flush blocks
      if(!trimmed){flushTable();flushList();out.push('');continue;}

      // Heading
      var hdrMatch=trimmed.match(/^(#{1,4})\s+(.+)$/);
      if(hdrMatch&&!inTable&&!inList){
        flushTable();flushList();
        var lvl=hdrMatch[1].length;
        out.push('<h'+lvl+' class="ask-h">'+renderInline(hdrMatch[2])+'</h'+lvl+'>');
        continue;
      }

      // Horizontal rule
      if(/^\-{3,}$/.test(trimmed)||/^\*{3,}$/.test(trimmed)){
        flushTable();flushList();
        out.push('<hr class="ask-hr">');
        continue;
      }

      // Table row detection
      if(trimmed.indexOf('|')>=0){
        if(!inTable){flushList();inTable=true;}
        tableHtml+=raw+'\n';
        continue;
      }else{flushTable();}

      // List item
      if(/^[\-\*]\s+/.test(trimmed)){
        if(!inList){flushTable();inList=true;}
        var itemText=trimmed.replace(/^[\-\*]\s+/,'');
        listHtml+='<li>'+renderInline(itemText)+'</li>';
        continue;
      }else{flushList();}

      // Regular paragraph line
      out.push('<p>'+renderInline(trimmed)+'</p>');
    }
    flushTable();flushList();

    return out.join('\n');
  }

  function renderInline(s){
    s=esc(s);
    // Links [text](url)
    s=s.replace(/\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)/g,'<a href="$2" target="_blank" rel="noopener nofollow">$1</a>');
    // Bold **text**
    s=s.replace(/\*\*(.+?)\*\*/g,'<strong>$1</strong>');
    // Italic *text* (but not inside words with **)
    s=s.replace(/(^|[^*])\*([^*]+)\*($|[^*])/g,'$1<em>$2</em>$3');
    // Backtick code
    s=s.replace(/`([^`]+)`/g,'<code>$1</code>');
    return s;
  }

  function simpleMarkdown(t){
    return renderMarkdown(t);
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
    {type:'function',function:{name:'find_cooperation_routes',
      description:'Find cooperation routes between two organizations. First checks if there is a direct cooperation edge. If none exists, finds up to 3 shortest cooperation-only paths (where every hop is a cooperation relationship). Use this when the user asks whether two orgs cooperate, are allied, or work together. Only follows cooperation edges, never conflict or other.',
      parameters:{type:'object',properties:{
        organization_a:{type:'string',description:'First organization name'},
        organization_b:{type:'string',description:'Second organization name'}
      },required:['organization_a','organization_b']}}},
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
        // When targeting a specific pair, return ALL evidence edges from both orgs' shards
        return Promise.all([loadEvidence(match),loadEvidence(tMatch)]).then(function(results){
          var e1=results[0], e2=results[1];
          var allEdges=[];
          var seen=new Set();
          function addEdges(entry){
            if(!entry||!entry.edges)return;
            for(var i=0;i<entry.edges.length;i++){
              var ee=entry.edges[i];
              if((ee.source===match&&ee.target===tMatch)||(ee.source===tMatch&&ee.target===match)){
                var key=JSON.stringify([ee.source,ee.target,ee.relationship,ee.evidence_quote]);
                if(seen.has(key))continue;seen.add(key);
                if(relType&&ee.relationship.indexOf(relType)<0)continue;
                allEdges.push({
                  source:ee.source,target:ee.target,relationship:ee.relationship,
                  description:ee.descriptions?ee.descriptions[0]:'',
                  time_period:ee.time_periods?ee.time_periods.join(', '):'',
                  evidence_quote:ee.evidence_quote||'',
                  source_urls:ee.source_urls||[]
                });
              }
            }
          }
          addEdges(e1);addEdges(e2);
          // Count by relationship type
          var counts={cooperation:0,conflict:0,other:0};
          for(var j=0;j<allEdges.length;j++){
            var r=allEdges[j].relationship;
            if(counts.hasOwnProperty(r))counts[r]++;else counts[r]=1;
          }
          // Collect unique source URLs across ALL edges
          var sourceUrls={};
          for(var k=0;k<allEdges.length;k++){
            var urls=allEdges[k].source_urls||[];
            for(var u=0;u<urls.length;u++)sourceUrls[urls[u]]=true;
          }
          return JSON.stringify({
            organization_a:match,organization_b:tMatch,
            total_edges:allEdges.length,type_counts:counts,
            source_urls:Object.keys(sourceUrls),
            edges:allEdges
          });
        });
      }
      // General case: return up to 25 unique org connections
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
      // Collect all orgs involved to load their evidence shards
      var allOrgs={};allOrgs[fromMatch]=true;allOrgs[toMatch]=true;
      foundPaths.forEach(function(p){p.forEach(function(s){allOrgs[s.from]=true;allOrgs[s.to]=true;});});
      var orgNames=Object.keys(allOrgs);
      return Promise.all(orgNames.map(function(o){return loadEvidence(o).then(function(e){return e||{};});})).then(function(evidences){
        var evByOrg={};
        for(var ei=0;ei<orgNames.length;ei++){evByOrg[orgNames[ei]]=evidences[ei];}
        var allSourceUrls={};
        var enriched=foundPaths.map(function(path){
          return path.map(function(step){
            var aedges=adjData[step.from]||[], aedge=aedges.find(function(e){return e.t===step.to;});
            var evidence=null;
            var ee=evByOrg[step.from];
            if(ee&&ee.edges){
              for(var i=0;i<ee.edges.length;i++){
                var ex=ee.edges[i];
                if((ex.source===step.from&&ex.target===step.to)||(ex.source===step.to&&ex.target===step.from)){
                  evidence={description:ex.descriptions?ex.descriptions[0]:'',time_period:ex.time_periods?ex.time_periods.join(', '):'',evidence_quote:ex.evidence_quote||'',source_urls:ex.source_urls||[]};
                  if(ex.source_urls)ex.source_urls.forEach(function(u){allSourceUrls[u]=true;});
                  break;
                }
              }
            }
            return {from:step.from,to:step.to,relationships:aedge?aedge.r:['unknown'],evidence:evidence};
          });
        });
        return JSON.stringify({from:fromMatch,to:toMatch,paths:enriched,source_urls:Object.keys(allSourceUrls)});
      });
    });
  }

  function tool_find_cooperation_routes(args){
    var orgA=args.organization_a||'', orgB=args.organization_b||'';
    return Promise.all([loadAdj(),loadCompact()]).then(function(){
      var a=bestMatch(orgA), b=bestMatch(orgB);
      if(!a)return JSON.stringify({error:'Organization not found: '+orgA});
      if(!b)return JSON.stringify({error:'Organization not found: '+orgB});
      if(a===b)return JSON.stringify({error:'Same organization: '+a});

      // Check direct cooperation
      var aEdges=adjData[a]||[], directCoop=false;
      for(var i=0;i<aEdges.length;i++){
        if(aEdges[i].t===b&&aEdges[i].r.indexOf('cooperation')>=0){directCoop=true;break;}
      }
      if(directCoop){
        return loadEvidence(a).then(function(entry){
          var evEdges=(entry&&entry.edges)?entry.edges:[];
          var found=null;
          for(var i=0;i<evEdges.length;i++){
            var ee=evEdges[i];
            if((ee.source===a&&ee.target===b)||(ee.source===b&&ee.target===a)){found=ee;break;}
          }
          var result={organization_a:a,organization_b:b,direct_cooperation:true};
          if(found){result.evidence_quote=found.evidence_quote;result.description=found.descriptions?found.descriptions[0]:'';result.time_period=found.time_periods?found.time_periods.join(', '):'';result.source_urls=found.source_urls||[];}
          return JSON.stringify(result);
        });
      }

      // No direct cooperation — BFS cooperation-only paths (max 5 hops)
      var visited={}, queue=[{node:a,path:[a]}], coopPaths=[];
      visited[a]=true;
      while(queue.length>0&&coopPaths.length<3){
        var cur=queue.shift();
        if(cur.path.length>=5)continue; // max 5 hops = up to 4 intermediates + target
        var nbrs=adjData[cur.node]||[];
        for(var i=0;i<nbrs.length;i++){
          var e=nbrs[i];
          if(e.r.indexOf('cooperation')<0)continue; // only follow cooperation
          var n=e.t;
          if(n===b){
            coopPaths.push(cur.path.concat([n]));
            if(coopPaths.length>=3)break;
          }
          if(!visited[n]){visited[n]=true;queue.push({node:n,path:cur.path.concat([n])});}
        }
      }

      if(coopPaths.length===0){
        return JSON.stringify({organization_a:a,organization_b:b,direct_cooperation:false,cooperation_routes:[],message:'No cooperation route found between '+a+' and '+b+'. They are not directly allied and no chain of cooperation links connects them.'});
      }

      // Collect all orgs on cooperation paths, load evidence for source URLs
      var coopOrgs={};
      coopPaths.forEach(function(p){p.forEach(function(o){coopOrgs[o]=true;});});
      var coopOrgNames=Object.keys(coopOrgs);
      return Promise.all(coopOrgNames.map(function(o){return loadEvidence(o).then(function(e){return e||{};});})).then(function(coopEv){
        var coopEvByOrg={};
        for(var ei=0;ei<coopOrgNames.length;ei++){coopEvByOrg[coopOrgNames[ei]]=coopEv[ei];}
        var allSrc={};
        var routes=coopPaths.map(function(path){
          var steps=[];
          for(var s=0;s<path.length-1;s++){
            var f=path[s], t=path[s+1];
            var entry=coopEvByOrg[f];var ev=null;
            if(entry&&entry.edges){
              for(var i=0;i<entry.edges.length;i++){
                var ex=entry.edges[i];
                if((ex.source===f&&ex.target===t||ex.source===t&&ex.target===f)&&ex.relationship.indexOf('cooperation')>=0){
                  ev={description:ex.descriptions?ex.descriptions[0]:'',time_period:ex.time_periods?ex.time_periods.join(', '):'',evidence_quote:ex.evidence_quote||'',source_urls:ex.source_urls||[]};
                  if(ex.source_urls)ex.source_urls.forEach(function(u){allSrc[u]=true;});
                  break;
                }
              }
            }
            steps.push({from:f,to:t,evidence:ev});
          }
          return {hops:path.length-1,steps:steps};
        });
        return JSON.stringify({organization_a:a,organization_b:b,direct_cooperation:false,cooperation_routes_found:routes.length,source_urls:Object.keys(allSrc),cooperation_routes:routes});
      });
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
      case 'find_cooperation_routes':return tool_find_cooperation_routes(args);
      case 'get_network_neighborhood':return tool_get_network_neighborhood(args);
      case 'get_community':return tool_get_community(args);
      case 'get_triadic_signals':return tool_get_triadic_signals(args);
      case 'get_bridges':return tool_get_bridges(args);
      default:return JSON.stringify({error:'Unknown tool: '+name});
    }
  }

  // ── System prompt ─────────────────────────────────────────────────────
  var SYSTEM_PROMPT=[
    'You are CRIMENET AI. Answer in English.',
    '',
    'CRIMENET: 4,505 criminal organizations and 10,935 relationships from Wikipedia.',
    'Relationships: cooperation (alliances, joint operations, commercial dealings),',
    'conflict (wars, rivalries, clashes), other (structural ties: sub-unit, faction,',
    'wing, splinter, successor, merged into, truce). Every edge has a verbatim quote.',
    '',
    'Tools:',
    'get_organization — search orgs by name (metadata, sources, footprints)',
    'get_connections — connections for an org, or all edges between two orgs',
    '  (pass organization + target_organization). Returns every edge with evidence',
    '  quotes, time periods, and source_urls. Also returns a source_urls array',
    '  listing every Wikipedia article the evidence comes from.',
    'get_relationship_summary — LLM narrative for a specific org pair',
    'find_by_country — orgs in a country (headquartered or with footprints)',
    'find_paths — multi-hop paths between two orgs, any type (max 5 hops).',
    '  Returns paths with evidence quotes and source URLs per hop, plus a',
    '  consolidated source_urls list.',
    'find_cooperation_routes — direct cooperation check, or cooperation-only',
    '  routes. Use for "do X cooperate with Y?"',
    'get_network_neighborhood — direct + second-degree connections around an org',
    'get_community — community membership, or list all communities',
    'get_triadic_signals — candidate undocumented ties (shared partners/adversaries)',
    'get_bridges — orgs spanning multiple communities',
    '',
    'Rules:',
    '- Use tools. Never guess org names.',
    '- "What are X\'s clans / factions / sub-units / wings / splinters?":',
    '  get_organization for X first — read the description, which often names',
    '  the specific term (e.g. \'ndrina for \'Ndrangheta, cosca for Sicilian mafia).',
    '  Then get_connections with relationship_type "other" (structural ties).',
    '  These edges are how the graph models internal breakdowns. If no structural',
    '  edges exist, check the description — it may state the total number of',
    '  sub-units even when the individual units are not all named in Wikipedia.',
    '- "How do X and Y relate?": get_relationship_summary, then get_connections',
    '  with target_organization set. get_connections returns ALL edges between',
    '  the two orgs (from both orgs\' evidence shards). Always list every',
    '  evidence quote grouped by relationship type. Sources are added automatically.',
    '- "Do X and Y cooperate?": find_cooperation_routes.',
    '- "Allies of allies" / "X\'s network position": get_network_neighborhood.',
    '- Multi-hop any type: find_paths. Sources are added automatically.',
    '- Potential undocumented ties: get_triadic_signals (statistical, not confirmed).',
    '- When citing facts, mention the Wikipedia article name inline where possible',
    '  (e.g. "according to the Jalisco New Generation Cartel article, CJNG broke away...").',
    '  This makes claims traceable even before the user expands the Evidence section.',
    '- Every answer ends with a structured Evidence section (collapsed by default)',
    '  showing every edge with Source/Time/Quote pills, plus a Sources list.',
    '  These are added automatically — no need to repeat sources manually.',
    '- Bullet points. Concise.',
    '- Outside scope? Say so.',
    '- If find_paths returns nothing, fall back to find_cooperation_routes.',
    '- Plan your tool calls before making them. If a question needs two tools,',
    '  call them in order. Do not repeat the same call.'
  ].join('\n');


  // ── Agent loop ────────────────────────────────────────────────────────
  async function runAgent(userQuestion, onStatus){
    await dataReady;
    var messages=[{role:'system',content:SYSTEM_PROMPT},{role:'user',content:userQuestion}];
    var collectedSources={};  // url -> {title, url}
    var collectedEvidence={pairs:{}, paths:[], routes:[], orgPairsSeen:new Set()};

    function extractSources(toolResult){
      // Parse JSON tool results and collect any source URLs found and edge evidence
      try{
        var r=JSON.parse(toolResult);
      }catch(e){return;}
      if(!r)return;
      // Direct source_urls array
      if(Array.isArray(r.source_urls))r.source_urls.forEach(function(u){collectedSources[u]={title:titleFromUrl(u),url:u};});
      // Per-edge source_urls
      var edges=r.edges||r.connections||null;
      if(edges){edges.forEach(function(e){if(e.source_urls)e.source_urls.forEach(function(u){collectedSources[u]={title:titleFromUrl(u),url:u};});});}
      // Per-path evidence
      var paths=r.paths||r.cooperation_routes||null;
      if(paths){paths.forEach(function(p){var steps=p.steps||(Array.isArray(p)?p:[]);steps.forEach(function(s){var ev=s.evidence||null;if(ev&&ev.source_urls)ev.source_urls.forEach(function(u){collectedSources[u]={title:titleFromUrl(u),url:u};});});});}
      // Organization sources (own_sources mapped as sources)
      var matches=r.matches||null;
      if(matches){matches.forEach(function(m){if(m.sources)m.sources.forEach(function(s){collectedSources[s.url]={title:s.title,url:s.url};});});}
      // get_organization single result
      if(r.sources)r.sources.forEach(function(s){collectedSources[s.url]={title:s.title,url:s.url};});

      // ── Collect edge evidence for structured rendering ──
      // get_connections pair: {organization_a, organization_b, edges[], source_urls[]}
      if(r.organization_a&&r.organization_b&&r.edges&&r.edges.length>0){
        var pairKey=[r.organization_a,r.organization_b].sort().join('||');
        if(!collectedEvidence.pairs[pairKey]){
          collectedEvidence.pairs[pairKey]={a:r.organization_a,b:r.organization_b,edges:[],summaryLoaded:false};
        }
        for(var ei=0;ei<r.edges.length;ei++){
          collectedEvidence.pairs[pairKey].edges.push({
            description:r.edges[ei].description||'',
            relationship:r.edges[ei].relationship||'other',
            time_period:r.edges[ei].time_period||'',
            evidence_quote:r.edges[ei].evidence_quote||'',
            source_urls:r.edges[ei].source_urls||[]
          });
        }
      }
      // find_paths: {from, to, paths[]}
      if(r.from&&r.to&&r.paths&&r.paths.length>0){
        collectedEvidence.paths.push({from:r.from,to:r.to,paths:r.paths});
      }
      // find_cooperation_routes: {organization_a, organization_b, cooperation_routes[]}
      if(r.organization_a&&r.organization_b&&r.cooperation_routes&&r.cooperation_routes.length>0){
        collectedEvidence.routes.push({from:r.organization_a,to:r.organization_b,routes:r.cooperation_routes});
      }
      // get_relationship_summary: {organization_a, organization_b, summary}
      if(r.organization_a&&r.organization_b&&r.summary){
        var pk=[r.organization_a,r.organization_b].sort().join('||');
        if(!collectedEvidence.pairs[pk]){
          collectedEvidence.pairs[pk]={a:r.organization_a,b:r.organization_b,edges:[],summaryLoaded:true};
        }
        collectedEvidence.pairs[pk].summary=r.summary;
      }
    }

    // ── Render evidence section (matching Trace a Connection format) ──
    var EDGE_LABELS={cooperation:'Cooperation',conflict:'Conflict',other:'Other'};
    var FAMILY_COLORS={cooperation:'var(--fam-coop)',conflict:'var(--fam-hostile)',other:'var(--fam-loose)'};

    function renderSourcePill(url){
      return '<div class="ev-srcs"><span class="ev-srcs-label">Source:</span> <a href="'+esc(url)+'" target="_blank" rel="noopener nofollow">'+esc(titleFromUrl(url))+'</a></div>';
    }

    function renderTimeToggle(timeVal){
      var tid='evt-'+Math.random().toString(36).slice(2,10);
      var btn='<button type="button" class="ev-toggle t" data-target="'+tid+'"><span>Time</span><span class="chev">▾</span></button>';
      var reveal='<div class="fp-reveal" id="'+tid+'" hidden><span class="ev-time">'+esc(timeVal||'Unknown')+'</span></div>';
      return btn+reveal;
    }

    function renderQuoteToggle(quote){
      var qid='evq-'+Math.random().toString(36).slice(2,10);
      var btn='<button type="button" class="ev-toggle q" data-target="'+qid+'"><span>Quote</span><span class="chev">▾</span></button>';
      var reveal='<div class="fp-reveal" id="'+qid+'" hidden><blockquote class="ev-quote">'+esc(quote||'')+'</blockquote></div>';
      return btn+reveal;
    }

    function renderEdgeBlock(e){
      var desc=e.description||'';
      var html='<div class="rp-linkage">';
      html+='<div class="rp-linkage-desc">'+(desc?esc(desc):'<em style="color:var(--text-muted)">No description.</em>')+'</div>';
      // Meta row: sources + time + quote
      var metaParts='';
      if(e.source_urls&&e.source_urls.length)for(var u=0;u<e.source_urls.length;u++)metaParts+=renderSourcePill(e.source_urls[u]);
      metaParts+=renderTimeToggle(e.time_period||'');
      metaParts+=renderQuoteToggle(e.evidence_quote||'');
      html+='<div class="ev-meta">'+metaParts+'</div>';
      html+='</div>';
      return html;
    }

    function renderEvidenceSection(){
      var html='';
      var pairKeys=Object.keys(collectedEvidence.pairs);
      var hasPaths=collectedEvidence.paths.length>0;
      var hasRoutes=collectedEvidence.routes.length>0;
      if(!pairKeys.length&&!hasPaths&&!hasRoutes)return '';

      html+='<div class="ask-evid">';
      html+='<div class="ask-evid-head collapsed" onclick="var b=this.nextElementSibling;var opening=b.classList.contains(\'collapsed\');this.classList.toggle(\'collapsed\');b.classList.toggle(\'collapsed\');">Evidence</div>';
      html+='<div class="ask-evid-body collapsed">';

      // Direct pairs
      pairKeys.forEach(function(pk){
        var pair=collectedEvidence.pairs[pk];
        // Group edges by relationship type
        var byRel={};
        pair.edges.forEach(function(e){
          var r=e.relationship||'other';
          if(!byRel[r])byRel[r]=[];
          byRel[r].push(e);
        });
        // Deduplicate edges (same description+relationship+quote)
        var deduped={};
        ['cooperation','conflict','other'].forEach(function(r){
          if(!byRel[r])return;
          var seen=new Set();deduped[r]=[];
          byRel[r].forEach(function(e){
            var key=JSON.stringify([e.description,e.evidence_quote]);
            if(!seen.has(key)){seen.add(key);deduped[r].push(e);}
          });
          if(!deduped[r].length)delete deduped[r];
        });

        // Relationship Summary (from get_relationship_summary tool)
        if(pair.summary){
          html+='<div class="rs-heading">Relationship Summary</div>';
          html+='<div class="rs-ai-note">AI-generated summary based on the connection details below</div>';
          html+='<div class="rs-summary">'+esc(pair.summary)+'</div>';
        }

        // Render each relationship group
        var order=['cooperation','conflict','other'];
        order.forEach(function(r){
          if(!deduped[r]||!deduped[r].length)return;
          var color=FAMILY_COLORS[r]||FAMILY_COLORS.other;
          html+='<div class="rp-section" style="--rc:'+color+'">';
          html+='<div class="rp-section-title collapsed" onclick="var b=this.nextElementSibling;this.classList.toggle(\'collapsed\');b.classList.toggle(\'collapsed\');">'+(EDGE_LABELS[r]||r)+'<span class="rp-section-count">'+deduped[r].length+'</span></div>';
          html+='<div class="rp-section-body collapsed">';
          deduped[r].forEach(function(e){html+=renderEdgeBlock(e);});
          html+='</div></div>';
        });
      });

      // Multi-hop paths
      if(hasPaths){
        collectedEvidence.paths.forEach(function(pathResult,pi){
          if(!pathResult.paths||!pathResult.paths.length)return;
          pathResult.paths.forEach(function(path,pp){
            var hops=path.length||0;
            html+='<div class="rp-section" style="--rc:var(--fam-loose)">';
            html+='<div class="rp-section-title collapsed" onclick="var b=this.nextElementSibling;this.classList.toggle(\'collapsed\');b.classList.toggle(\'collapsed\');">Path '+(pp+1)+'<span class="rp-section-count">'+hops+' hop'+(hops!==1?'s':'')+'</span></div>';
            html+='<div class="rp-section-body collapsed">';
            for(var hi=0;hi<path.length;hi++){
              var step=path[hi];
              var ev=step.evidence||null;
              var label=(step.from||'?')+' → '+(step.to||'?');
              var rels=step.relationships?step.relationships.join(', '):'';
              if(rels)label+=' ('+rels+')';
              html+='<div class="rp-linkage">';
              html+='<div class="rp-linkage-desc"><strong>'+esc(label)+'</strong></div>';
              if(ev){
                var mp='';
                if(ev.source_urls&&ev.source_urls.length)for(var su=0;su<ev.source_urls.length;su++)mp+=renderSourcePill(ev.source_urls[su]);
                mp+=renderTimeToggle(ev.time_period||'');
                mp+=renderQuoteToggle(ev.evidence_quote||'');
                html+='<div class="ev-meta">'+mp+'</div>';
              }
              html+='</div>';
            }
            html+='</div></div>';
          });
        });
      }

      // Cooperation routes (similar structure to paths)
      if(hasRoutes){
        collectedEvidence.routes.forEach(function(routeResult,ri){
          if(!routeResult.routes||!routeResult.routes.length)return;
          routeResult.routes.forEach(function(route,rp){
            var steps=route.steps||[];
            html+='<div class="rp-section" style="--rc:var(--fam-coop)">';
            html+='<div class="rp-section-title collapsed" onclick="var b=this.nextElementSibling;this.classList.toggle(\'collapsed\');b.classList.toggle(\'collapsed\');">Cooperation Route '+(rp+1)+'<span class="rp-section-count">'+route.hops+' hop'+(route.hops!==1?'s':'')+'</span></div>';
            html+='<div class="rp-section-body collapsed">';
            for(var si=0;si<steps.length;si++){
              var st=steps[si];
              var sev=st.evidence||null;
              var slabel=(st.from||'?')+' → '+(st.to||'?');
              html+='<div class="rp-linkage">';
              html+='<div class="rp-linkage-desc"><strong>'+esc(slabel)+'</strong></div>';
              if(sev){
                var sp='';
                if(sev.source_urls&&sev.source_urls.length)for(var su2=0;su2<sev.source_urls.length;su2++)sp+=renderSourcePill(sev.source_urls[su2]);
                sp+=renderTimeToggle(sev.time_period||'');
                sp+=renderQuoteToggle(sev.evidence_quote||'');
                html+='<div class="ev-meta">'+sp+'</div>';
              }
              html+='</div>';
            }
            html+='</div></div>';
          });
        });
      }

      html+='</div></div>'; // .ask-evid-body, .ask-evid
      return html;
    }

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
          extractSources(result);
          messages.push({role:'tool',tool_call_id:tc.id,content:result});
        }
        continue;
      }

      // Final answer — insert evidence section, then sources footer
      var answer=msg.content||'No response generated.';
      var evidHtml=renderEvidenceSection();
      if(evidHtml)answer+='\n'+evidHtml;
      var urls=Object.keys(collectedSources);
      if(urls.length>0){
        answer+='\n<div class="ask-src-head">Sources</div>';
        answer+='<div class="ask-src-list">';
        urls.forEach(function(u){
          var s=collectedSources[u];
          answer+='<a href="'+esc(s.url)+'" target="_blank" rel="noopener nofollow">'+esc(s.title)+'</a>';
        });
        answer+='</div>';
      }
      return answer;
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

    // Set panel subtitle when Ask tab activates
    var sub=document.getElementById('finder-panel-sub');
    if(sub)sub.textContent='Ask questions about organized crime in natural language. Backed by 4,505 organizations and 10,935 relationships with verbatim Wikipedia evidence.';

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
