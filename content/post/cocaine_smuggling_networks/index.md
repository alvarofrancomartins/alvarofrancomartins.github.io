---
title: Cocaine Smuggling Networks
subtitle: Entenda melhor a rede dos supostos crimes praticados durante a pandemia da COVID-19
summary: Entenda melhor a rede dos supostos crimes praticados durante a pandemia da COVID-19
authors:
- admin
tags: []
categories: []
date: "2021-11-17"
featured: false
draft: false
tags: 
- Networks
- Cocaine
- Criminal networks
- Cocaine networks
- Smuggling networks  
- Cocaine smuggling

categories:
- criminal_networks

image:
  placement: 3
  caption: "Estrutura de comunidades da CPI da COVID-19"
  focal_point: "Smart"
  preview_only: true

projects: [criminal_networks]
# profile: true
---

<script type="text/javascript" src="https://d3js.org/d3.v6.min.js"></script>
<!-- <script type="text/javascript" src="js/formatter.js"> </script> -->
<link rel="stylesheet" type="text/css" href="css/style.css">

Parece haver um padrão onde a conexão de dois vértices com grais mais alto é usualmente intermediada por um outro vértice.

Nessa postagem apresento uma perspectiva inédita para entender as relações entre os citados pela CPI da COVID-19. Essa comissão parlamentar de inquérito apresenta uma rede de supostos envolvidos em diversos crimes, entre eles _corrupção ativa_, _charlatanismo_, _prevaricação_ e _fraude_. Todas as informações são de público acesso e foram coletadas do [portal G1](https://g1.globo.com/politica/cpi-da-covid/noticia/2021/10/20/cpi-da-covid-crimes-atribuidos-lista.ghtml).

<br>

Nossa análise terá o enfoque da [ciência de redes](https://en.wikipedia.org/wiki/Network_science). A representação de dados em grafos fornece uma abordagem poderosa, capaz de revelar padrões e estruturas não triviais entre agentes que possuem alguma relação de conexão. A CPI da COVID apresenta **24 acusações** e **78 nomes** citados, resultando em um total de **695 conexões**. Por meio de ferramentas advindas da teoria dos grafos, elaboramos uma visualização dessa rede, calculamos algumas medidas de centralidade e mostramos que ela possui uma estrutura de comunidades.

<br>

# The four operations

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

# Medidas de Centralidade

A centralidade de **grau** oferece uma das grandezas mais básicas de redes. O grau de um vértice representa simplesmente seu número de conexões. Valores mais altos dessa grandeza indicam **indivíduos populares** e que possuem uma **posição privilegiada** na rede. A <b>Figura 1</b> mostra os nomes dos vértices da rede que possuem os maiores valores de grau. No nosso caso, um grau elevado indica que a pessoa está sendo acusada por crime(s) com grande número de acusados, enquanto um grau reduzido indica que as acusações são por crimes com baixo número de acusados.