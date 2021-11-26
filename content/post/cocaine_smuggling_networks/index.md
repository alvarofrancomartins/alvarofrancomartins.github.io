---
title: Cocaine smuggling networks
subtitle: Comparing the costs of dismantling cocaine smuggling networks
summary: Comparing the costs of dismantling cocaine smuggling networks
authors:
- admin
tags: []
categories: []
date: "2021-11-23"
featured: false
draft: false
tags: 
- Networks
- Cocaine
- Organized crime
- Criminal networks
- Cocaine networks
- Smuggling networks  
- Cocaine smuggling

categories:
- criminal_networks

image:
  placement: 3
  # caption: "Network Attack"
  focal_point: "Smart"
  preview_only: false

projects: [criminal_networks]
---

<script type="text/javascript" src="https://d3js.org/d3.v6.min.js"></script>
<!-- <script type="text/javascript" src="js/formatter.js"> </script> -->
<link rel="stylesheet" type="text/css" href="css/style.css">

Criminal networks are a huge and ubiquitous problem in modern societies. However, effective and general approaches to interrupt their functioning are still an open problem. In this post, I will be applying a method of network dismantling in four cocaine smuggling networks. These networks are a result of operations[^1] from 2006 to 2009, covering countries such as Brazil, Colombia, Mexico, Spain and Uruguay.

[^1]: The data used here was downloaded from the [UCINET](https://sites.google.com/site/ucinetsoftware/home?authuser=0) covert datasets. 

<br>

The United Nations Office on Drugs and Crime (UNODC) [defines](https://www.unodc.org/unodc/en/drug-trafficking/index.html) drug trafficking as "a global illicit trade involving the cultivation, manufacture, distribution and sale of substances which are subject to drug prohibition laws". A 2021 [report](https://www.unodc.org/documents/data-and-analysis/cocaine/Cocaine_Insights_2021.pdf) revealed that the global quantity of cocaine seized reached record levels in 2019, and its bulk continues to be seized in the Americas. Overall, despite immense and increasingly efforts to interrupt these activities, counterdrug interdictions seems to make things [even worse](https://doi.org/10.1073/pnas.1812459116). Drug trafficking networks are [flexible, fluid structures](https://doi.org/10.1080/17440572.2013.787927) and can respond immediately to attacks. It has been argued, for example, that [some](https://doi.org/10.1038/srep04238) networks might even become more efficient after targeted attacks.

<figure>
    <img src="images/worldwide_cocaine_trafficking_flow.png" width="1200px" height="570px" />
    <figcaption><b>Figure 1</b>: Main cocaine trafficking flows, 2015–2019. Source: UNODC, World Drug Report 2021.</figcaption>
</figure>

In terms of network dismantling, a naive approach for attacking criminal networks is to target the high ranking individuals or the most connected people (highest degree centrality). But this does not work realistically. It turns out that the cost of targeting these individuals are substantially greater than attacking other criminals in the network. Moreover, in times of conflicts these positions are often replaceable by another criminals. The resilience of a criminal network also depends on its level of [redundancy](https://doi.org/10.1371/journal.pone.0236476), that is, how easily the invididuals are repleacable. These features makes the efforts of dismantling criminal networks an arduous task.

<br>

Several approaches have been proposed for the purpose of dismantling networks. These approaches are divided in either link or node removal. [Here](https://www.nature.com/articles/s41598-018-31902-8) you can see a comparative analysis of the main methods currently used in scientific research. In particular, I will be applying a dismantling method proposed in a PNAS paper ([Generalized network dismantling](https://doi.org/10.1073/pnas.1806108116)) on four [Cocaine Smuggling Networks](https://sites.google.com/site/ucinetsoftware/datasets/covert-networks/cocaine-smuggling?authuser=0). The advantage of this method is that it takes into account the cost of attacking the vertices. More specifically, the cost of removing a vertex is its degree centrality.

<br>

To carry out the dismatling analysis, I have adapted Petter Holme's [implementation](https://github.com/pholme/gnd/blob/master/gnd.py). Thanks to him, the method proposed in the paper was converted from [C++](https://github.com/renxiaolong/Generalized-Network-Dismantling) to Python 2. I then converted to Python 3 and applied on the networks. Ultimately, my goal here is to present the method by examining its effectiveness and comparing the costs when the simplest dismantling approach (removing the highest degree vertices) is applied. 

<br>

# The four operations

<br>

The networks are shown below[^2]. The short descriptions of each operation was taken from [here](https://sites.google.com/site/ucinetsoftware/datasets/covert-networks/cocaine-smuggling?authuser=0). Unfortunately, I could not find more details about the operations. 

[^2]: The network visualizations were made using [d3js](https://d3js.org) and the size of each node is proportional to its degree.

<br>

Operation **MAMBO**: The investigation started in 2006 and involved Colombian citizens that were introducing 50 kg of cocaine to be adulterated and distributed in Madrid (Spain). Ultimately, the group was involved in smuggling cocaine from Colombia through Brazil and Uruguay to be distributed in Spain. This is a typical Spanish middle cocaine group acting as wholesale supplier between a South American importer group and retailers in Madrid.

<div id="cocaine_smuggling_1"></div>
<script type="text/javascript" src="js/cocaine_smuggling_1.js"> </script>
<p style="text-align: center"><b>Mambo network</b>: 31 vertices and 58 edges.<p/><br>

Operation **ACERO**: This investigation started in 2007 and involved a smaller family-based group. The group was composed mainly of members of a same family and was led by a female. They distributed cocaine in Madrid (Spain) that was provided to them by other groups based in a northwest region of the country, one of the most active areas in the provision of cocaine from the countries of origin. The group also had their own procedures to launder money.

<div id="cocaine_smuggling_2"></div>
<script type="text/javascript" src="js/cocaine_smuggling_2.js"> </script>
<p style="text-align: center"><b>Acero network</b>: 25 vertices and 37 edges.<p/><br>

Operation **JAKE**: In 2008, the group investigated was operating as a wholesale supplier and retail distributor of cocaine and heroin in a large distribution zone located in Madrid (Spain), where gypsy clans traditionally carry out similar activities. The group was in charge of acquiring, manipulating and selling the drugs in the gypsy quarter.

<div id="cocaine_smuggling_3"></div>
<script type="text/javascript" src="js/cocaine_smuggling_3.js"> </script>
<p style="text-align: center"><b>Jake network</b>: 38 vertices and 50 edges.<p/><br>

Operation **JUANES**: In 2009, the police investigation detected a group involved in the smuggling of cocaine from Mexico to be distributed in Madrid (Spain). In this case, the group operated in close cooperation with another organization that was laundering the illegal income from drug distribution from this and other groups. The cocaine traffickers earned an estimated EUR 60 million.

<div id="cocaine_smuggling_4"></div>
<script type="text/javascript" src="js/cocaine_smuggling_4.js"> </script>
<p style="text-align: center"><b>Juanes network</b>: 51 vertices and 93 edges.<p/><br >

In terms of network metrics, these networks have relatively low [density](https://bookdown.org/omarlizardo/_main/2-9-density.html) (which means they are sparse),  negative [assortativity](https://en.wikipedia.org/wiki/Assortativity) (which means that high degree nodes have a slight tendency to connect with low degree nodes) and low [average clustering](https://en.wikipedia.org/wiki/Clustering_coefficient). Since these networks are relatively small in size, a [degree distribution](https://en.wikipedia.org/wiki/Degree_distribution) analysis would not be so meaningful. However, a short preliminary calculation using [powerlaw](https://pypi.org/project/powerlaw/)’s Python package have shown more accordance with free scale distributions when compared to exponential distributions. The community structure analysis was also not very helpful. Although I have used [Infomap](https://www.mapequation.org/infomap/) for coloring the nodes according to each module, I was not able to find community structures with the [Bayesian SBM](https://graph-tool.skewed.de/static/doc/demos/inference/inference.html).

## Network metrics
Below you can find some of the main metrics that I have calculated for these networks.

<br>

{{< spoiler text="Click to show the density" >}}
```py
smuggling_networks_density

0.125 # Mambo
0.123 # Acero
0.071 # Jake
0.073 # Juanes
```
{{< /spoiler >}}

{{< spoiler text="Click to show the assortativity" >}}
```py
smuggling_networks_assortativity

-0.088 # Mambo
-0.160 # Acero
-0.173 # Jake 
-0.081 # Juanes
```
{{< /spoiler >}}

{{< spoiler text="Click to show average clustering" >}}
```py
smuggling_networks_average_clustering

0.442 # Mambo
0.268 # Acero
0.110 # Jake
0.364 # Juanes
```
{{< /spoiler >}}

{{< spoiler text="Click to show network efficiency" >}}
```py
smuggling_networks_global_efficiency

0.473 # Mambo
0.481 # Acero
0.420 # Jake
0.373 # Juanes
```
{{< /spoiler >}}

{{< spoiler text="Click to show average shortest path" >}}
```py
smuggling_networks_average_shortest_path

2.473 # Mambo
2.413 # Acero
2.705 # Jake
3.308 # Juanes
```
{{< /spoiler >}}

{{< spoiler text="Click to show the pseudo network diameter" >}}
```py
smuggling_networks_global_efficiency

4.0 # Mambo
5.0 # Acero
4.0 # Jake
7.0 # Juanes
```
{{< /spoiler >}}

# Network dismantling

The video below demonstrate the Juanes network dismantling using the simplest removing approach (based on degree).

<br>

{{< youtube pUi6Qi8tzhA >}}

<br>

The figures below show the (normalized) size of the largest connected component (LCC) as a function of the number of removed nodes. I have used the LLC size to measure the effect of the dismantling, but other metrics could also be used, such as the efficiency of the network. In each figure, the pale pink color represents the dismantling using the degree centrality and the pale blue color represents the dismantling using the _Generalized network dismantling_ method.

<br>

<figure>
    <img src="images/mambo.png" width="900px" height="563px" />
    <figcaption><b>Figure 2</b>: Mambo network dismantling.</figcaption>
</figure>

Cras hendrerit feugiat ipsum et mattis. Integer eu aliquet sapien. Ut sed elit id neque mollis cursus. Proin vel odio volutpat, hendrerit turpis ut, posuere dolor. Nam non nibh sapien. Proin id dapibus sapien. Nunc venenatis mauris id orci suscipit, a sagittis nunc eleifend. Vestibulum vitae rhoncus urna. Sed non lacus massa.

<figure>
    <img src="images/acero.png" width="900px" height="563px" />
    <figcaption><b>Figure 3</b>: Acero network dismantling.</figcaption>
</figure>

Cras hendrerit feugiat ipsum et mattis. Integer eu aliquet sapien. Ut sed elit id neque mollis cursus. Proin vel odio volutpat, hendrerit turpis ut, posuere dolor. Nam non nibh sapien. Proin id dapibus sapien. Nunc venenatis mauris id orci suscipit, a sagittis nunc eleifend. Vestibulum vitae rhoncus urna. Sed non lacus massa.

<figure>
    <img src="images/jake.png" width="900px" height="563px" />
    <figcaption><b>Figure 4</b>: Jake network dismantling.</figcaption>
</figure>

Cras hendrerit feugiat ipsum et mattis. Integer eu aliquet sapien. Ut sed elit id neque mollis cursus. Proin vel odio volutpat, hendrerit turpis ut, posuere dolor. Nam non nibh sapien. Proin id dapibus sapien. Nunc venenatis mauris id orci suscipit, a sagittis nunc eleifend. Vestibulum vitae rhoncus urna. Sed non lacus massa.

<figure>
    <img src="images/juanes.png" width="900px" height="563px" />
    <figcaption><b>Figure 5</b>: Juanes network dismantling.</figcaption>
</figure>

The general thing that I can see in these networks that I found interesting is that they all (especially the Jake network) appear to have nodes with a lot of connections with other nodes that do not have any connections themselves. This is an indication of preferential attachment, a core property of free scale networks. Since there is not a lot information about these networks, all I can do is hypothesis, but these nodes could be people selling drugs or a provider of several other people making the drug, I dont know. 

<br>

# Network modeling

<br>

Since I have a suspection that these cocaine smuggling networks are shaped by preferential attachment, I could think of using the Barabási-Albert model. I know that in this model, the networks also display negative assortativity, low diameter and low average clustering. In this case, a graph of $n$ nodes is grown by attaching new nodes each with $m$ edges that are preferentially attached to existing nodes with high degree. However, this would not produces the behavior seen before, in which a node has high degree because is connected to a lot of nodes that themselves are not connected with anyone. Click <a href="images/barabasi.png" target="_blank">here</a> to view an example of this model.

<br>

Searching a little bit a found a version of the barabasi model called [dual Barabási–Albert preferential attachment model](https://arxiv.org/abs/1810.10538). I think I could be able to model these networks using the dual_barabasi_albert_graph model implemented in [NetworkX](https://networkx.org/documentation/stable/reference/generated/networkx.generators.random_graphs.dual_barabasi_albert_graph.html). This model have two parameters that control the attachment probabilities of new nodes, that is, a graph of $n$ nodes is grown by attaching new nodes each with either $m_1$ edges (with probability $p$) or $m_2$ edges (with probability $1-p$) that are preferentially attached to existing nodes with high degree.

<br>

This is because even though I haven't proved the networks are scale free, they look that are functioning with preferential attachment. Also, similar to networks generated using this principle have shown negative assortativity, low average clustering e low density. The network below is an example of a random network generated by the dual_barabasi_albert_graph model. You can see the visual similarity. This is something that I could further do more analysis on it, because I think there's something interesting in it. Moreover, as they explain in the paper of the dual model, this model does not necessarily have a degree distribution of power law. So, it would not be a problem to try and model the smuggling networks using this model.

<br>

What's the importance of modeling networks?

<br>

<div id="teste"></div>
<script type="text/javascript" src="js/teste.js"> </script>
<p style="text-align: center"><b>Random network</b>: A random network generated ($n = 38$,  $m_1 = 1$ and $m_2 = 5$) using the dual Barabási–Albert preferential attachment model. The resulting graph has 65 edges.<p/><br>

<br>

I now present a comparison between the metrics for the empirical and modeled networks. 

<br>

{{< spoiler text="Click to show the density" >}}
```py
smuggling_networks_density

0.125 # Mambo 
0.130 # Random (1000 iterations)

0.123 # Acero
0.156 # Random (1000 iterations)

0.071 # Jake
0.110 # Random (1000 iterations)

0.073 # Juanes
0.081 # Random (1000 iterations)
```
{{< /spoiler >}}

{{< spoiler text="Click to show the assortativity" >}}
```py
smuggling_networks_assortativity

-0.088 # Mambo
-0.090 # Random (1000 iterations)

-0.160 # Acero
-0.108 # Random (1000 iterations)

-0.173 # Jake 
-0.082 # Random (1000 iterations)

-0.081 # Juanes
-0.067 # Random (1000 iterations)

```
{{< /spoiler >}}

{{< spoiler text="Click to show average clustering" >}}
```py
smuggling_networks_average_clustering

0.442 # Mambo
0.207 # Random (1000 iterations)

0.268 # Acero
0.240 # Random (1000 iterations)

0.110 # Jake
0.180 # Random (1000 iterations)

0.364 # Juanes
0.151 # Random (1000 iterations)
```
{{< /spoiler >}}

{{< spoiler text="Click to show network efficiency" >}}
```py
smuggling_networks_global_efficiency

0.473 # Mambo
0.473 # Random (1000 iterations)

0.481 # Acero
0.500 # Random (1000 iterations)

0.420 # Jake
0.425 # Random (1000 iterations)

0.373 # Juanes
0.424 # Random (1000 iterations)
```
{{< /spoiler >}}

{{< spoiler text="Click to show average shortest path" >}}
```py
smuggling_networks_average_shortest_path

2.473 # Mambo
2.479 # Random (1000 realizations)

2.413 # Acero
2.372 # Random (1000 iterations)

2.705 # Jake
2.601 # Random (1000 iterations)

3.308 # Juanes
2.740 # Random (1000 iterations)
```
{{< /spoiler >}}

{{< spoiler text="Click to show the pseudo network diameter" >}}
```py
smuggling_networks_global_efficiency

4.0 # Mambo
4.9 # Random (1000 iterations)

5.0 # Acero
4.7 # Random (1000 iterations)

4.0 # Jake
5.2 # Random (1000 iterations)

7.0 # Juanes
5.6 # Random (1000 iterations)
```
{{< /spoiler >}}

<br>

Lastly, I also have carry out a link prediction analysis using [Node2Vec](https://snap.stanford.edu/node2vec/) and a [Random Forest Classifier](https://scikit-learn.org/stable/modules/generated/sklearn.ensemble.RandomForestClassifier.html). Since there is not information about the time evolution of these networks, the link prediction was done by trying to create a graph which may have been existed at a previous point in time. To do this, I removed some vertices which the links would not change the structure of the graphs. Then, I was able to get an AUC score greater than .7 for all networks. I haven't finish this analysis yet, so I may post it in the future.