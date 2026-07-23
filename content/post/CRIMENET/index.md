---
title: "An AI assistant on global organized crime"
subtitle: "A knowledge graph of global organized crime, with an AI you can ask about it."
summary: "A knowledge graph of 4,505 criminal organizations and 10,935 relationships extracted from 1,418 Wikipedia articles across four languages. A GraphRAG AI answers questions about the global organized crime network. Every claim cites a specific Wikipedia source."
projects: []

date: "2026-07-13"

draft: true

featured: true

toc: true

authors:
- admin

tags:
- organized crime
- criminal networks
- network science
- LLM extraction
- Wikipedia
- knowledge graph
- GraphRAG
- complex systems
- mafia
- cartel
- gang
- motorcycle club
- triad
- D3js
- three.js
- DeepSeek
- open source
- AI

categories:
- criminal_networks
- organized_crime
- artificial_intelligence

image:
 placement: 2
 caption: "CRIMENET: 4,505 criminal organizations connected by 10,935 relationships across cooperation, conflict, and structural ties."
 focal_point: "Center"
 preview_only: false
---

A few months ago I published the <a href="https://www.alvarofrancomartins.com/post/crimenet_1.0/">first version of CRIMENET</a>, a knowledge graph of criminal organizations and their connections. Everything extracted from hundreds of Wikipedia articles. Now I have rebuilt it into something much larger: 4,505 organizations and 10,935 relationships extracted from 1,418 Wikipedia articles across four languages. I built it with a three-layer pipeline (extraction, audit, and build) described <a href="#building-the-graph">at the end of this post</a>.

<br>

For each profiled organization[^1], the graph now captures its description, country of origin, activity period, founding year, and so on. Every edge carries a verbatim evidence quote, a description, a versioned Wikipedia URL, and a time period when the source provides one. The three relationship types are cooperation, conflict, and other (mainly structural ties).

[^1]: Of the 4,505 organizations, 1,032 are profiled from their own Wikipedia article (with full descriptions, aliases, country of origin, country footprints, time periods, and defunct status), 3,473 are mention-only (they appear in other orgs' articles but have no dedicated Wikipedia page). 3,521 organizations (78%) are connected to at least one other; 984 (22%) are isolated.

<br>

In this new version I also built <a href="https://www.alvarofrancomartins.com/crimenet/ask.html">CRIMENET AI</a>, a GraphRAG system that answers natural language questions by querying the graph. I will start there because it is the part I find most interesting. If you just want to browse the data directly, the <a href="https://www.alvarofrancomartins.com/crimenet/">dashboard</a> lists all organizations and lets you filter by country. The <a href="https://www.alvarofrancomartins.com/crimenet/browse.html">connection finder</a> shows connections between organizations, with the evidence behind each link. For everything else, see <a href="#what-you-can-explore">what you can explore</a>. 

# CRIMENET AI

Answering simple questions like what is the most important organization in the network or [... fill here and improve the first example] is just a matter of look up. However, to answer more interesting questions like [... fill here] requires combining information from across the graph. For instance, what are some of the biggest criminal communities of the global network of organized crime and which organizations bridge the most communities? Who might the 'Ndrangheta be secretly allied with, based on shared partners? How do organized crime patterns in Mexico and Colombia compare? What is the most central organization in the global network? How are the Yakuza and the Sicilian Mafia connected? [give more examples and improve the current ones] What is the most unique/unusual criminal community? 

<!-- Answering simple questions like "Tell me about the Sinaloa Cartel" or "What criminal organizations operate in Brazil?" is just a matter of looking up a node or filtering by country. But to answer questions like "Are the Yakuza and the Sicilian Mafia connected?" or "Who might the 'Ndrangheta be secretly allied with, based on shared partners?" requires combining information from across the graph. For instance, what are the largest criminal communities and which organizations bridge the most communities? How do organized crime patterns in Mexico and Colombia compare? Who are the most connected criminal organizations in the world?  -->


<br>

A standard LLM would most likely hallucinate the answers. Or simply would not know how to answer those questions. Its training data does not contain a structured database of criminal organizations such as CRIMENET, so it would guess.

<br>

I built <a href="https://www.alvarofrancomartins.com/crimenet/ask.html">CRIMENET AI</a>, a GraphRAG[^2] that answers questions by querying the knowledge graph. The language model decides what to look up, the browser runs the queries against static data files, and the model synthesizes the results. The facts come from the graph. The model reasons and the graph provides the evidence. Every answer carries two automatically generated sections the AI does not write: Evidence (every edge used, with source link, time period, and verbatim quote) and Sources (every Wikipedia URL that appeared in the results).

[^2]: GraphRAG stands for Graph Retrieval-Augmented Generation. A standard RAG system retrieves text chunks and asks the model to reason over them. A GraphRAG system retrieves structured data from a knowledge graph by calling tools that traverse nodes, edges, communities, and paths. The 13 tools available to the AI are documented in the <a href="https://github.com/alvarofrancomartins/CRIMENET">GitHub repository</a>.

<figure>
<img style="width: 100%; display: inline-block;" src="figs/crimenet_ai.png">
<figcaption>Figure 1: CRIMENET AI. Ask a question in plain English, get an evidence-backed answer with citations to specific Wikipedia sentences.</figcaption>
</figure>

Here are the kinds of questions it can answer, covering communities, bridges, direct connections, and triadic signals.

## Communities

Communities are groups of nodes more connected to each other than to the rest of the network. Here, I applied the Infomap algorithm to the cooperation graph to find all its communities.

<br>

Before CRIMENET, if someone asked "How do criminal organizations group together around the world?" the honest answer was: nobody knew. The question was too big to answer. Now this have an approximate (which i do not claim to be the absolute truth but it is at least it is a first) answer: 224 communities, named and described.

<br>

I fed each community's member organizations, their descriptions, and their relationships to DeepSeek to generate a title and a summary. You can browse all 224 communities with their full descriptions and member lists in the <a href="https://www.alvarofrancomartins.com/crimenet/browse.html">Community Browser</a> (select the Communities tab). Here are the top 10.

<br>

<table style="display:block; overflow:hidden; max-width:100%; margin:0 auto;">
<thead>
<tr style="border-bottom:2px solid #cbd5e1;"><th style="text-align:left; padding:8px;">Community</th><th style="text-align:left; padding:8px;">Short description</th><th style="text-align:right; padding:8px;">Members</th></tr>
</thead>
<tbody>
<tr style="border-bottom:1px solid #e2e8f0;"><td style="padding:8px; vertical-align:top;">Mexican and Colombian Cartel Alliance Network</td><td style="padding:8px; vertical-align:top;">A dense network of Mexican and Colombian cartels, paramilitaries, and street gangs cooperating in drug trafficking and shifting alliances.</td><td style="padding:8px; text-align:right; vertical-align:top;">88</td></tr>
<tr style="border-bottom:1px solid #e2e8f0;"><td style="padding:8px; vertical-align:top;">Global Jihadist Network and Allies</td><td style="padding:8px; vertical-align:top;">A global jihadist network uniting al-Qaeda, Taliban, and allied militant groups across Asia, Africa, and the Middle East.</td><td style="padding:8px; text-align:right; vertical-align:top;">81</td></tr>
<tr style="border-bottom:1px solid #e2e8f0;"><td style="padding:8px; vertical-align:top;">American Mafia Network</td><td style="padding:8px; vertical-align:top;">A dense network of Italian-American Mafia families and allied gangs cooperating across the U.S. in traditional organized crime.</td><td style="padding:8px; text-align:right; vertical-align:top;">76</td></tr>
<tr style="border-bottom:1px solid #e2e8f0;"><td style="padding:8px; vertical-align:top;">Nuova Famiglia Camorra Alliance</td><td style="padding:8px; vertical-align:top;">A Camorra alliance of clans united against the Nuova Camorra Organizzata, dominating Campania through drug trafficking and violence.</td><td style="padding:8px; text-align:right; vertical-align:top;">53</td></tr>
<tr style="border-bottom:1px solid #e2e8f0;"><td style="padding:8px; vertical-align:top;">Hells Angels and Allied Outlaw Gangs</td><td style="padding:8px; vertical-align:top;">A Hells Angels-led network of outlaw biker gangs and Canadian organized crime groups cooperating in drug trafficking and violence.</td><td style="padding:8px; text-align:right; vertical-align:top;">49</td></tr>
<tr style="border-bottom:1px solid #e2e8f0;"><td style="padding:8px; vertical-align:top;">Calabrian 'Ndrangheta Clans Network</td><td style="padding:8px; vertical-align:top;">A network of Calabrian 'Ndrangheta clans cooperating in international drug trafficking, money laundering, and extortion across Europe and beyond.</td><td style="padding:8px; text-align:right; vertical-align:top;">42</td></tr>
<tr style="border-bottom:1px solid #e2e8f0;"><td style="padding:8px; vertical-align:top;">Brazilian PCC-Led Criminal Alliance Network</td><td style="padding:8px; vertical-align:top;">A PCC-centered network of Brazilian criminal factions and international allies cooperating in drug trafficking and prison control.</td><td style="padding:8px; text-align:right; vertical-align:top;">36</td></tr>
<tr style="border-bottom:1px solid #e2e8f0;"><td style="padding:8px; vertical-align:top;">US Street and Prison Gang Alliances</td><td style="padding:8px; vertical-align:top;">A network of US street and prison gangs, centered on the People Nation alliance, cooperating in drug trafficking and violence.</td><td style="padding:8px; text-align:right; vertical-align:top;">34</td></tr>
<tr style="border-bottom:1px solid #e2e8f0;"><td style="padding:8px; vertical-align:top;">Sicilian Mafia Corleonesi Alliance Network</td><td style="padding:8px; vertical-align:top;">A coalition of Sicilian Mafia families led by the Corleonesi, united through drug trafficking, extortion, and violent power consolidation.</td><td style="padding:8px; text-align:right; vertical-align:top;">34</td></tr>
<tr style="border-bottom:1px solid #e2e8f0;"><td style="padding:8px; vertical-align:top;">Cutro-based 'Ndrangheta Clans Alliance</td><td style="padding:8px; vertical-align:top;">A network of Cutro-based 'Ndrangheta clans cooperating in drug trafficking, extortion, and money laundering across Italy and Europe.</td><td style="padding:8px; text-align:right; vertical-align:top;">31</td></tr>
</tbody>
</table>
<p style="margin:8px 0 24px 0; text-align:center; font-weight:600; font-size:0.95em;">Table 1: The top 10 communities by membership, titled and described by DeepSeek.</p>

<br>

Examples of questions to ask the AI: What community does the Sinaloa Cartel belong to? Show me communities related to motorcycle clubs. Find communities with "mafia" in the title. Which communities span the most countries? Compare the top five communities by size.

## Bridges

Some organizations cooperate across community boundaries. A bridge is a node that connects different communities, sitting at the intersection of possibly distinct criminal ecosystems.

<br>

Before CRIMENET, if someone asked "Which criminal organizations connect different communities?" the honest answer was: nobody knew. The question was too big to answer. Now it has an answer: every bridge organization, ranked by how many communities it connects, with the evidence for each cross-community edge.

<br>

<div style="text-align:center;">
<table style="display:inline-table; overflow:hidden; text-align:left; width:auto; max-width:900px; max-width:100%;">
<thead>
<tr style="border-bottom:2px solid #cbd5e1;"><th style="text-align:left; padding:8px;">Organization</th><th style="text-align:left; padding:8px; white-space:nowrap;">Top communities bridged (top 3 shown)</th><th style="text-align:right; padding:8px; white-space:nowrap;">Cross-community edges</th><th style="text-align:right; padding:8px; white-space:nowrap;">Communities spanned</th></tr>
</thead>
<tbody>
<tr style="border-bottom:1px solid #e2e8f0;"><td style="padding:8px; vertical-align:top;">Hells Angels Motorcycle Club</td><td style="padding:8px; vertical-align:top;">Mexican and Colombian Cartel Alliance Network, American Mafia Network, Calabrian 'Ndrangheta Clans Network</td><td style="padding:8px; text-align:right; vertical-align:top;">88</td><td style="padding:8px; text-align:right; vertical-align:top;">27</td></tr>
<tr style="border-bottom:1px solid #e2e8f0;"><td style="padding:8px; vertical-align:top;">American Mafia</td><td style="padding:8px; vertical-align:top;">Mexican and Colombian Cartel Alliance Network, American Mafia Network, Nuova Famiglia Camorra Alliance</td><td style="padding:8px; text-align:right; vertical-align:top;">84</td><td style="padding:8px; text-align:right; vertical-align:top;">22</td></tr>
<tr style="border-bottom:1px solid #e2e8f0;"><td style="padding:8px; vertical-align:top;">'Ndrangheta</td><td style="padding:8px; vertical-align:top;">Mexican and Colombian Cartel Alliance Network, American Mafia Network, Nuova Famiglia Camorra Alliance</td><td style="padding:8px; text-align:right; vertical-align:top;">83</td><td style="padding:8px; text-align:right; vertical-align:top;">28</td></tr>
<tr style="border-bottom:1px solid #e2e8f0;"><td style="padding:8px; vertical-align:top;">Sinaloa Cartel</td><td style="padding:8px; vertical-align:top;">Hells Angels and Allied Outlaw Gangs, US Street and Prison Gang Alliances, Italian Mafia Alliances and Offshoots</td><td style="padding:8px; text-align:right; vertical-align:top;">72</td><td style="padding:8px; text-align:right; vertical-align:top;">20</td></tr>
<tr style="border-bottom:1px solid #e2e8f0;"><td style="padding:8px; vertical-align:top;">Camorra</td><td style="padding:8px; vertical-align:top;">Mexican and Colombian Cartel Alliance Network, Global Jihadist Network and Allies, Sicilian Mafia Corleonesi Alliance Network</td><td style="padding:8px; text-align:right; vertical-align:top;">52</td><td style="padding:8px; text-align:right; vertical-align:top;">16</td></tr>
<tr style="border-bottom:1px solid #e2e8f0;"><td style="padding:8px; vertical-align:top;">Outlaws Motorcycle Club</td><td style="padding:8px; vertical-align:top;">American Mafia Network, Neo-Nazi Terror Network, Canadian Outlaw Motorcycle Gangs Alliance</td><td style="padding:8px; text-align:right; vertical-align:top;">52</td><td style="padding:8px; text-align:right; vertical-align:top;">10</td></tr>
<tr style="border-bottom:1px solid #e2e8f0;"><td style="padding:8px; vertical-align:top;">Sicilian Mafia</td><td style="padding:8px; vertical-align:top;">Mexican and Colombian Cartel Alliance Network, American Mafia Network, Nuova Famiglia Camorra Alliance</td><td style="padding:8px; text-align:right; vertical-align:top;">48</td><td style="padding:8px; text-align:right; vertical-align:top;">14</td></tr>
<tr style="border-bottom:1px solid #e2e8f0;"><td style="padding:8px; vertical-align:top;">Mexican Mafia</td><td style="padding:8px; vertical-align:top;">Mexican and Colombian Cartel Alliance Network, American Mafia Network, Hells Angels and Allied Outlaw Gangs</td><td style="padding:8px; text-align:right; vertical-align:top;">44</td><td style="padding:8px; text-align:right; vertical-align:top;">9</td></tr>
<tr style="border-bottom:1px solid #e2e8f0;"><td style="padding:8px; vertical-align:top;">'Ndrina Mancuso</td><td style="padding:8px; vertical-align:top;">Mexican and Colombian Cartel Alliance Network, Nuova Famiglia Camorra Alliance, Calabrian 'Ndrangheta Clans Network</td><td style="padding:8px; text-align:right; vertical-align:top;">43</td><td style="padding:8px; text-align:right; vertical-align:top;">11</td></tr>
<tr style="border-bottom:1px solid #e2e8f0;"><td style="padding:8px; vertical-align:top;">Gambino crime family</td><td style="padding:8px; vertical-align:top;">Nuova Famiglia Camorra Alliance, Hells Angels and Allied Outlaw Gangs, Calabrian 'Ndrangheta Clans Network</td><td style="padding:8px; text-align:right; vertical-align:top;">32</td><td style="padding:8px; text-align:right; vertical-align:top;">12</td></tr>
</tbody>
</table>
</div>
<p style="margin:8px 0 24px 0; text-align:center; font-weight:600; font-size:0.95em;">Table 2: The top 10 bridge organizations, ranked by cross-community cooperation edges.</p>

<br>

A bridge is structurally important not because it has many connections, but because its connections reach into different worlds. The Mexican Mafia connects ecosystems that otherwise never touch.

<br>

Examples of questions to ask the AI: which organizations bridge the most communities? What communities does the 'Ndrangheta bridge?

## Triadic signals

The graph has 10,935 documented relationships, but those are only the relationships Wikipedia happens to record. Many real-world connections are undocumented. Or they aren't even in Wikipedia but in other sources.

<br>

We can infer some of these missing links from the structure of the graph itself. If two organizations share many of the same partners, or the same enemies, it is likely they have a relationship with each other, even if nobody has written it down. This is triadic closure. There are three kinds of signal[^4]. Common cooperation partners: Friends of friends might be friends. Common adversaries: Enemies of enemies might be friends. Both: A pair that shares both cooperation partners and adversaries. This is the strongest signal, because two independent structural patterns point to the same missing relationship.

<br>

<div style="text-align:center;">
<table style="display:inline-table; overflow:hidden; text-align:left; width:auto; max-width:900px; max-width:100%;">
<thead>
<tr style="border-bottom:2px solid #cbd5e1;"><th style="text-align:left; padding:8px;">Organization A</th><th style="text-align:left; padding:8px;">Organization B</th><th style="text-align:left; padding:8px;">Signal</th><th style="text-align:right; padding:8px;">Shared partners</th><th style="text-align:right; padding:8px;">Shared adversaries</th></tr>
</thead>
<tbody>
<tr style="border-bottom:1px solid #e2e8f0;"><td style="padding:8px; vertical-align:top;">Gambino crime family</td><td style="padding:8px; vertical-align:top;">Rizzuto crime family</td><td style="padding:8px; vertical-align:top;">Both</td><td style="padding:8px; text-align:right; vertical-align:top;">4</td><td style="padding:8px; text-align:right; vertical-align:top;">1</td></tr>
<tr style="border-bottom:1px solid #e2e8f0;"><td style="padding:8px; vertical-align:top;">Cártel de Santa Rosa de Lima</td><td style="padding:8px; vertical-align:top;">Knights Templar Cartel</td><td style="padding:8px; vertical-align:top;">Both</td><td style="padding:8px; text-align:right; vertical-align:top;">3</td><td style="padding:8px; text-align:right; vertical-align:top;">2</td></tr>
<tr style="border-bottom:1px solid #e2e8f0;"><td style="padding:8px; vertical-align:top;">La Familia Michoacana</td><td style="padding:8px; vertical-align:top;">Nueva Plaza Cartel</td><td style="padding:8px; vertical-align:top;">Both</td><td style="padding:8px; text-align:right; vertical-align:top;">1</td><td style="padding:8px; text-align:right; vertical-align:top;">1</td></tr>
<tr style="border-bottom:1px solid #e2e8f0;"><td style="padding:8px; vertical-align:top;">Cártel de Santa Rosa de Lima</td><td style="padding:8px; vertical-align:top;">Nueva Plaza Cartel</td><td style="padding:8px; vertical-align:top;">Both</td><td style="padding:8px; text-align:right; vertical-align:top;">2</td><td style="padding:8px; text-align:right; vertical-align:top;">1</td></tr>
<tr style="border-bottom:1px solid #e2e8f0;"><td style="padding:8px; vertical-align:top;">Cleveland crime family</td><td style="padding:8px; vertical-align:top;">Patriarca crime family</td><td style="padding:8px; vertical-align:top;">Only Common Partners</td><td style="padding:8px; text-align:right; vertical-align:top;">8</td><td style="padding:8px; text-align:right; vertical-align:top;">-</td></tr>
<tr style="border-bottom:1px solid #e2e8f0;"><td style="padding:8px; vertical-align:top;">New Orleans crime family</td><td style="padding:8px; vertical-align:top;">Patriarca crime family</td><td style="padding:8px; vertical-align:top;">Only Common Partners</td><td style="padding:8px; text-align:right; vertical-align:top;">6</td><td style="padding:8px; text-align:right; vertical-align:top;">-</td></tr>
<tr style="border-bottom:1px solid #e2e8f0;"><td style="padding:8px; vertical-align:top;">'Ndrina Pesce</td><td style="padding:8px; vertical-align:top;">Commisso 'ndrina</td><td style="padding:8px; vertical-align:top;">Only Common Partners</td><td style="padding:8px; text-align:right; vertical-align:top;">8</td><td style="padding:8px; text-align:right; vertical-align:top;">-</td></tr>
<tr style="border-bottom:1px solid #e2e8f0;"><td style="padding:8px; vertical-align:top;">Mongols MC</td><td style="padding:8px; vertical-align:top;">Rebels Motorcycle Club</td><td style="padding:8px; vertical-align:top;">Only Common Adversaries</td><td style="padding:8px; text-align:right; vertical-align:top;">-</td><td style="padding:8px; text-align:right; vertical-align:top;">2</td></tr>
<tr style="border-bottom:1px solid #e2e8f0;"><td style="padding:8px; vertical-align:top;">Comanchero Motorcycle Club</td><td style="padding:8px; vertical-align:top;">Rebels Motorcycle Club</td><td style="padding:8px; vertical-align:top;">Only Common Adversaries</td><td style="padding:8px; text-align:right; vertical-align:top;">-</td><td style="padding:8px; text-align:right; vertical-align:top;">3</td></tr>
<tr style="border-bottom:1px solid #e2e8f0;"><td style="padding:8px; vertical-align:top;">Nuestra Familia</td><td style="padding:8px; vertical-align:top;">Texas Syndicate</td><td style="padding:8px; vertical-align:top;">Only Common Adversaries</td><td style="padding:8px; text-align:right; vertical-align:top;">-</td><td style="padding:8px; text-align:right; vertical-align:top;">3</td></tr>
</tbody>
</table>
</div>
<p style="margin:8px 0 24px 0; text-align:center; font-weight:600; font-size:0.95em;">Table 3: The strongest signals for each type, scored by weighted common partners and adversaries.</p>


<br>

I computed all three across the entire graph. The result is 2,561 candidate pairs, each scored by how many common partners and adversaries they share. About half (1,292) are cross-country pairs: organizations operating in different countries that share the same partners or enemies. The other 1,269 are pairs from the same country. Every pair is listed in the <a href="https://www.alvarofrancomartins.com/crimenet/browse.html">Triadic Signals tab</a>, with the actual names of the shared partner and adversary organizations, signal types, and scores.

<br>

Who might the 'Ndrangheta be secretly allied with? The AI returns candidate pairs ranked by signal strength.

<br>

The strongest signal in the entire dataset comes from the Cleveland crime family and the Patriarca crime family. They share 8 cooperation partners (Bufalino, Chicago Outfit, DeCavalcante, Detroit Partnership, Gambino, Genovese, Hells Angels, and Los Angeles crime family) yet have no documented direct edge. 'Ndrina Pesce and Commisso 'ndrina also share 8 partners, seven of which are fellow Calabrian clans plus the Gulf Cartel: a signal that two 'ndrine from different towns cooperate through a dense web of shared allies.

<br>

The New Orleans crime family and the Patriarca crime family share 6 partners. The Gambino crime family and the Rizzuto crime family share 4 cooperation partners plus a common adversary (the Bonanno crime family): a "Both" signal. La Familia Michoacana and the Nueva Plaza Cartel share the Sinaloa Cartel as a common partner and CJNG as a common adversary: a weaker "Both" signal but one that aligns with what is known about the Mexican cartel landscape: both groups are CJNG rivals.

<br>

Some signals come purely from shared enemies. The Mongols MC and the Rebels Motorcycle Club share two common adversaries (Bandidos and Hells Angels) with no direct edge. The Comanchero Motorcycle Club and the Rebels Motorcycle Club share three (Bandidos, Hells Angels, and Rock Machine Motorcycle Club). Nuestra Familia and the Texas Syndicate share three adversaries (Aryan Brotherhood, Mexican Mafia, Mexikanemi): two prison gangs united by shared enemies rather than shared allies.

<br>

What potential rivalries does the Sinaloa Cartel have based on shared adversaries? The AI filters for the adversary-only signal and returns candidate pairs.

<br>

What makes this powerful is that it uses only the topology. No new data. No additional LLM calls. The graph's structure alone encodes information about relationships that have not been explicitly recorded.

[^4]: Common cooperation partners: two organizations that share at least 3 cooperation partners but have no direct edge between them. Common adversaries: two organizations that share at least 2 common adversaries but have no direct edge between them. The "Both" signal requires both conditions simultaneously.

## Centrality

Not all organizations are equal in importance. Centrality measures how important a node is in the network. Some organizations are hubs with many connections. Others sit on the shortest paths between many pairs. I computed three centrality measures (degree, betweenness, and PageRank) across all 3,521 connected organizations, on the full graph.

<br>

<div style="text-align:center;">
<table style="display:inline-table; overflow:hidden; text-align:left; width:auto; max-width:900px; max-width:100%;">
<thead>
<tr style="border-bottom:2px solid #cbd5e1;"><th style="text-align:left; padding:8px;">Organization</th><th style="text-align:right; padding:8px;">Degree rank</th><th style="text-align:right; padding:8px;">Betweenness rank</th><th style="text-align:right; padding:8px;">PageRank rank</th></tr>
</thead>
<tbody>
<tr style="border-bottom:1px solid #e2e8f0;"><td style="padding:8px;">'Ndrangheta</td><td style="padding:8px; text-align:right;">2</td><td style="padding:8px; text-align:right;">1</td><td style="padding:8px; text-align:right;">2</td></tr>
<tr style="border-bottom:1px solid #e2e8f0;"><td style="padding:8px;">Hells Angels Motorcycle Club</td><td style="padding:8px; text-align:right;">1</td><td style="padding:8px; text-align:right;">2</td><td style="padding:8px; text-align:right;">1</td></tr>
<tr style="border-bottom:1px solid #e2e8f0;"><td style="padding:8px;">Camorra</td><td style="padding:8px; text-align:right;">7</td><td style="padding:8px; text-align:right;">3</td><td style="padding:8px; text-align:right;">9</td></tr>
<tr style="border-bottom:1px solid #e2e8f0;"><td style="padding:8px;">American Mafia</td><td style="padding:8px; text-align:right;">5</td><td style="padding:8px; text-align:right;">4</td><td style="padding:8px; text-align:right;">8</td></tr>
<tr style="border-bottom:1px solid #e2e8f0;"><td style="padding:8px;">Sinaloa Cartel</td><td style="padding:8px; text-align:right;">3</td><td style="padding:8px; text-align:right;">5</td><td style="padding:8px; text-align:right;">4</td></tr>
<tr style="border-bottom:1px solid #e2e8f0;"><td style="padding:8px;">Al-Qaeda</td><td style="padding:8px; text-align:right;">17</td><td style="padding:8px; text-align:right;">6</td><td style="padding:8px; text-align:right;">10</td></tr>
<tr style="border-bottom:1px solid #e2e8f0;"><td style="padding:8px;">Islamic State</td><td style="padding:8px; text-align:right;">10</td><td style="padding:8px; text-align:right;">7</td><td style="padding:8px; text-align:right;">5</td></tr>
<tr style="border-bottom:1px solid #e2e8f0;"><td style="padding:8px;">Gambino crime family</td><td style="padding:8px; text-align:right;">14</td><td style="padding:8px; text-align:right;">8</td><td style="padding:8px; text-align:right;">19</td></tr>
<tr style="border-bottom:1px solid #e2e8f0;"><td style="padding:8px;">Hezbollah</td><td style="padding:8px; text-align:right;">50</td><td style="padding:8px; text-align:right;">9</td><td style="padding:8px; text-align:right;">36</td></tr>
<tr style="border-bottom:1px solid #e2e8f0;"><td style="padding:8px;">Outlaws Motorcycle Club</td><td style="padding:8px; text-align:right;">8</td><td style="padding:8px; text-align:right;">10</td><td style="padding:8px; text-align:right;">6</td></tr>
</tbody>
</table>
</div>
<p style="margin:8px 0 24px 0; text-align:center; font-weight:600; font-size:0.95em;">Table 4: The top 10 organizations by betweenness centrality, with their degree and PageRank ranks across 3,521 connected organizations.</p>

<br>

The AI has access to all three measures, computed on the cooperation, conflict, and full graphs.

<br>

Examples of questions to ask the AI: What is the most important criminal organization in the global network? Which Mexican cartels have the most network influence? How does the Sinaloa Cartel rank in network importance, and how does it compare to the American Mafia?

<br>

The AI consults the centrality rankings and answers with context: which metrics drive the ranking, how the top organizations compare, and what the edges that give them their position actually represent.

<br>

The AI cross-references centrality rankings with Mexican organizations, retrieves both profiles with their centrality ranks, and produces a comparison grounded in the numbers.

## Paths

A path is a chain of relationships connecting two organizations through intermediaries. If A cooperates with B and B cooperates with C, then A and C are connected by a path of length two, even if they have no direct relationship.

<br>

Examples of questions to ask the AI: Are the Yakuza and the Sicilian Mafia connected? Does the Sinaloa Cartel cooperate with the Sicilian Mafia? Who are the allies of allies of Mara Salvatrucha?

<br>

The AI searches for the shortest path through the graph up to 5 hops. It returns the chain of intermediaries, with the evidence quote at each step.

<br>

The AI searches for cooperation-only paths. If one exists, it traces the route. If not, it tells you there is no documented cooperation path and may suggest alternatives: a conflict relationship, a shorter path through any relationship type, or a shared third party. The AI returns first-degree and second-degree connections, grouped by relationship type.

## Countries

Every profiled organization carries a list of countries where Wikipedia documents its presence, each backed by a verbatim evidence quote. The AI can query this data directly. Here are the top 10 countries by how many organizations are based there.

<br>

<div style="text-align:center;">
<table style="display:inline-table; overflow:hidden; text-align:left; width:auto; max-width:900px; max-width:100%;">
<thead>
<tr style="border-bottom:2px solid #cbd5e1;"><th style="text-align:left; padding:8px;">Country</th><th style="text-align:right; padding:8px;">Organizations based here</th></tr>
</thead>
<tbody>
<tr style="border-bottom:1px solid #e2e8f0;"><td style="padding:8px;">United States</td><td style="padding:8px; text-align:right;">337</td></tr>
<tr style="border-bottom:1px solid #e2e8f0;"><td style="padding:8px;">Italy</td><td style="padding:8px; text-align:right;">229</td></tr>
<tr style="border-bottom:1px solid #e2e8f0;"><td style="padding:8px;">Mexico</td><td style="padding:8px; text-align:right;">54</td></tr>
<tr style="border-bottom:1px solid #e2e8f0;"><td style="padding:8px;">Canada</td><td style="padding:8px; text-align:right;">47</td></tr>
<tr style="border-bottom:1px solid #e2e8f0;"><td style="padding:8px;">United Kingdom</td><td style="padding:8px; text-align:right;">46</td></tr>
<tr style="border-bottom:1px solid #e2e8f0;"><td style="padding:8px;">Japan</td><td style="padding:8px; text-align:right;">37</td></tr>
<tr style="border-bottom:1px solid #e2e8f0;"><td style="padding:8px;">Colombia</td><td style="padding:8px; text-align:right;">29</td></tr>
<tr style="border-bottom:1px solid #e2e8f0;"><td style="padding:8px;">Brazil</td><td style="padding:8px; text-align:right;">21</td></tr>
<tr style="border-bottom:1px solid #e2e8f0;"><td style="padding:8px;">Australia</td><td style="padding:8px; text-align:right;">14</td></tr>
<tr style="border-bottom:1px solid #e2e8f0;"><td style="padding:8px;">Russia</td><td style="padding:8px; text-align:right;">14</td></tr>
</tbody>
</table>
</div>
<p style="margin:8px 0 24px 0; text-align:center; font-weight:600; font-size:0.95em;">Table 5: The 10 countries where the most criminal organizations are based.</p>

<br>

Examples of questions to ask the AI: What criminal organizations operate in Brazil? Which countries does the 'Ndrangheta have a footprint in? Which criminal organizations operate in both Colombia and Venezuela? Compare organized crime in Mexico and Colombia.

<br>

You can also see the footprints directly on a [world map](https://www.alvarofrancomartins.com/crimenet/footprints.html). Each organization's country of origin and its documented footprints create arcs across the map. Each arc represents an organization's footprint from its country of origin to a country where it operates. Each arc is backed by a verbatim evidence quote from Wikipedia. Not a statistical guess. A specific sentence.

<br>

The AI returns every organization with a documented footprint. The AI lists all documented country footprints with evidence. The multi-country intersection returns only organizations that appear in both lists. The AI retrieves organizations from both countries, examines their types and connections, and produces a comparative analysis.

<br>

Every country footprint is backed by a verbatim evidence quote from Wikipedia. When the AI says an organization operates in a country, you can open the source and read the exact sentence that documents it.

# What you can explore

The <a href="https://www.alvarofrancomartins.com/crimenet/">home page</a> is a dashboard with two panels. On the left, you can browse all 4,505 organizations or browse by country. Click any name and the right panel shows its full profile: description, aliases, country of origin, time period, and where it operates, each backed by an evidence quote. If you just want to see which organizations are based in Brazil, or what the Sinaloa Cartel's profile looks like, the dashboard has it.

<br>

The <a href="https://www.alvarofrancomartins.com/crimenet/browse.html">connection finder</a> lets you pick any two organizations and see exactly how they relate. Each connection comes with a source link, a time period, and the verbatim Wikipedia sentence that documents it. The browser loads only the data it needs, fetching tens of kilobytes instead of the full dataset. Besides that, if you go to Communities tab lists all 224 Infomap communities with their LLM-generated titles and summaries. Bridges ranks the organizations that span multiple communities. Triadic Signals lists 2,561 candidate pairs that share common partners or adversaries but have no direct edge: statistical signals of undocumented relationships.

<br>

The <a href="https://www.alvarofrancomartins.com/crimenet/ask.html">CRIMENET AI</a> lets you ask any question in plain English and get an evidence-backed answer that cites specific Wikipedia sentences. You can trace the exact relationship between any two organizations with verbatim evidence quotes. You can browse 224 communities of organizations that cooperate with each other. You can identify which organizations bridge different criminal ecosystems. You can discover 2,561 candidate relationships that likely exist but have not been documented, inferred purely from the structure of the graph.

<br>

The full network is viewable as an [interactive 3D force-directed graph](https://www.alvarofrancomartins.com/crimenet/knowledge_graph.html) built with three.js. Nodes are organizations and edges are colored by relationship type (green for cooperation and red for conflict). You can rotate, zoom, click any node to see its details, and filter by relationship type.

<figure>
<img style="width: 80%; display: inline-block;" src="videos/crimenet_3d_video.gif">
<figcaption>Figure 5: The 3D knowledge graph in motion. Nodes are criminal organizations; edges are colored by relationship type. The third dimension disentangles dense clusters that would collapse into a hairball in 2D.</figcaption>
</figure>

The 3D view does something a 2D layout cannot: it uses the third dimension to disentangle dense clusters. In a 2D force layout, highly connected hubs pull everything into a hairball. In 3D, you can rotate around a cluster and see its internal structure.

<br>

There is, to my knowledge, no larger directory of criminal organizations anywhere. Wikipedia's most extensive list <a href="https://en.wikipedia.org/wiki/List_of_criminal_enterprises,_gangs,_and_syndicates">list of criminal enterprises, gangs, and syndicates</a> covers a few hundred groups. And it only mentions organizations, not their relationships. CRIMENET is by far the most complete catalog of this kind: nearly 5,000 organizations mapped across nearly 11,000 relationships, each backed by a specific Wikipedia source.

<br>

This was an accidental achievement. The goal was to build a knowledge graph of how criminal organizations relate to each other, not to catalog every group mentioned on Wikipedia. But because the pipeline reads nearly 1,500 articles across four languages and extracts every organization mentioned in each one, it ended up capturing the vast majority of criminal organizations documented on English, Italian, Portuguese, and Spanish Wikipedia. 


# Building the graph

The raw material is 1,418 manually curated Wikipedia articles about criminal organizations across English, Italian, Portuguese, and Spanish Wikipedia. The extraction pipeline fetches each article, cleans the HTML into plain text, then sends it to DeepSeek to identify organizations and the relationships between them: cooperation, conflict, and other.[^7] The pipeline then profiles each organization from its own Wikipedia article (canonical name, aliases, description, country of origin, time period, founded and dissolved years, defunct status, and country footprints, each backed by a verbatim evidence quote) and merges everything into a single graph, folding variant names across languages so the Sinaloa Cartel and the Cártel de Sinaloa become one node.

<br>

An LLM extraction pipeline produces errors: it conflates names, misses duplicates, invents edges between orgs that were merely mentioned in the same paragraph, and sometimes pulls in non-criminal entities. I built an audit pipeline that targets each class of error, one audit per error type.[^8] The correction loop is designed to be iterative: spot an error, add one line to a corrections file, re-run the apply step. Manual overrides always win over auto-suggestions.

<figure>
<img style="width: 100%; display: inline-block;" src="figs/pipeline.png">
<figcaption>Figure 7: The three-layer architecture. Extraction (Wikipedia to raw graph), audit and correction (find and fix errors), build and deploy (generate the static web app).</figcaption>
</figure>

Every detail is documented on [GitHub](https://github.com/alvarofrancomartins/CRIMENET).

[^7]: Cooperation covers alliances, joint operations, and commercial dealings. Conflict covers fighting, war, and clashes. Other covers structural ties (sub-units, splinters), truces, and unspecified links. The pipeline proceeds in five steps: (0) resolve Wikipedia URLs to versioned URLs; (1) fetch HTML and extract clean body text with infobox tables; (2) send text to DeepSeek to extract organizations and relationships; (3) DeepSeek enriches each profiled organization with description, aliases, country, time period, defunct status, and country footprints; (4) merge all fragments, auto-dedup, attach profiles, and normalize country names. Full details in the <a href="https://github.com/alvarofrancomartins/CRIMENET">GitHub repository</a>.

[^8]: Seven steps in total. Audits 0 through 5 find wrong merges, missed merges, spurious edges, unsupported country links, umbrella terms, and non-criminal entities. Audit 6 provides an LLM second opinion that can veto identity corrections. Audit 7 applies all corrections, with manual overrides from a curated file always winning over auto-suggestions. Full details in the <a href="https://github.com/alvarofrancomartins/CRIMENET">GitHub repository</a>.

# Limitations

Wikipedia coverage skews toward English-language and Western sources. The pipeline processes four languages (English, Italian, Portuguese, and Spanish), which is better than one but still leaves gaps. Because the data comes from Wikipedia, the graph inherits the biases and gaps of its source material.

<br>

Relationships are aggregated across time. Every edge carries its own time period, so the data is there, but the graph view flattens time into a single snapshot.

<br>

The current graph models organizations and their relationships, not individuals or cyber criminal groups. This means we lose some information about criminal organizations built around a single person.

<br>

None of this is fatal. The architecture is designed for iteration: add more languages, widen the scope, promote individuals to nodes. Each is a pipeline extension, not a rewrite.

<br>

If you have questions or ideas, get in touch.