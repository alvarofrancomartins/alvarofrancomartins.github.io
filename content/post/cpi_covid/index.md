---
title: Visualizando a CPI da COVID
subtitle: Entenda melhor a rede dos supostos crimes praticados durante a pandemia da COVID-19
summary: Entenda melhor a rede dos supostos crimes praticados durante a pandemia da COVID-19
authors:
- admin
- Diego Domingues Lopes 
- Andre Seiji Sunahara
tags: []
categories: []
date: "2021-11-04"
featured: true
draft: false
tags: 
- Redes criminosas
- CPI da Covid-19
- COVID
- Comissão Parlamentar de Inquérito

categories:
- criminal_networks
- redes_criminosas

image:
  placement: 3
  caption: "Estrutura de comunidades da CPI da COVID-19"
  focal_point: "Smart"
  preview_only: true

projects: [criminal_networks, redes_criminosas]
# profile: true
---

<script type="text/javascript" src="https://d3js.org/d3.v6.min.js"></script>
<!-- <script type="text/javascript" src="js/formatter.js"> </script> -->
<link rel="stylesheet" type="text/css" href="css/style.css">

Nessa postagem apresento uma perspectiva inédita para entender as relações entre os citados pela CPI da COVID-19. Essa comissão parlamentar de inquérito apresenta uma rede de supostos envolvidos em diversos crimes, entre eles _corrupção ativa_, _charlatanismo_, _prevaricação_ e _fraude_. Todas as informações são de público acesso e foram coletadas do [portal G1](https://g1.globo.com/politica/cpi-da-covid/noticia/2021/10/20/cpi-da-covid-crimes-atribuidos-lista.ghtml).

<br>

Nossa análise terá o enfoque da [ciência de redes](https://en.wikipedia.org/wiki/Network_science). A representação de dados em grafos fornece uma abordagem poderosa, capaz de revelar padrões e estruturas não triviais entre agentes que possuem alguma relação de conexão. A CPI da COVID apresenta **24 acusações** e **78 nomes** citados, resultando em um total de **695 conexões**. Por meio de ferramentas advindas da teoria dos grafos, elaboramos uma visualização dessa rede, calculamos algumas medidas de centralidade e mostramos que ela possui uma estrutura de comunidades.

<br>

# A rede da CPI da COVID

Uma rede (ou grafo) é composta por vértices (pessoas, no nosso caso) e ligações entre esses vértices. Aqui, a ligação entre duas pessoas ocorre se elas foram acusadas de um mesmo crime[^1]. Abaixo você encontra uma visualização interativa dessa rede, com 75 nomes[^2] e 695 conexões. Cada vértice possui um tamanho proporcional ao seu número de ligações e, ao passar ao mouse sobre os vértices, você pode ver suas quantidades de conexões e acusações.

[^1]: É importante frisar que ligação entre duas pessoas significa **apenas** que elas foram citadas em um mesmo crime. Portanto, não afirmamos que, se existe ligação entre duas pessoas, elas necessariamente possuem uma relação e/ou comunicação direta.

[^2]: Do total de [78 nomes](https://g1.globo.com/politica/cpi-da-covid/noticia/2021/10/20/cpi-da-covid-lista-alvos-de-sugestao-de-indiciamento.ghtml), três deles estão citados separadamente em três diferentes supostos crimes. Uma vez que esses vértices são isolados, não os incluímos na rede e, portanto, o número de vértices se reduz a 75.

<div id="cpi_covid"></div>
<script type="text/javascript" src="js/cpi_covid.js"> </script>
<p style="text-align: center"><b>Rede da CPI da COVID</b>: 24 acusações, 75 vértices e 695 conexões.<p/><br>

# Medidas de Centralidade

## Grau

A centralidade de **grau** oferece uma das grandezas mais básicas de redes. O grau de um vértice representa simplesmente seu número de conexões. Valores mais altos dessa grandeza indicam **indivíduos populares** e que possuem uma **posição privilegiada** na rede. A <b>Figura 1</b> mostra os nomes dos vértices da rede que possuem os maiores valores de grau. 

<br>
<br>

<div id="barplots_degree"></div>
<script type="text/javascript" src="js/barplots_degree.js"> </script>
<p style="text-align: center"><b>Figura 1</b>: Dez nomes da rede que possuem os maiores valores de <b>grau</b>.<p/><br>

## Intermediação

A **intermediação** quantifica o número de vezes que um vértice age como ponte de comunicação entre dois vértices quaisquer da rede. Ou ainda, essa medida para um determinado vértice representa a quantidade de vezes que ele atua como intermediário das comunicações. Pessoas com alto valor de intermediação conseguem **transmitir informações com facilidade** e também têm tendência de serem **bem informados**. A <b>Figura 2</b> mostra os nomes dos vértices da rede que possuem os maiores valores de intermediação. 

<br>
<br>

<div id="barplots_bets"></div>
<script type="text/javascript" src="js/barplots_bets.js"> </script>
<p style="text-align: center"><b>Figura 2</b>: Dez nomes da rede que possuem os maiores valores de <b>intermediação</b>.<p/><br>

## Proximidade

A **proximidade** de um vértice quantifica sua distância média em relação a todas os outros vértices. Assim, pessoas com maiores valores de proximidade estão, em média, **mais perto de todas** as outras pessoas. Numa rede social, por exemplo, a pessoa com maior proximidade, assim como para intermediação, consegue **disseminar melhor as informações**. A <b>Figura 3</b> mostra os nomes dos vértices da rede que possuem os maiores valores de proximidade.

<br>
<br>

<div id="barplots_clos"></div>
<script type="text/javascript" src="js/barplots_clos.js"> </script>
<p style="text-align: center"><b>Figura 3</b>: Dez nomes da rede que possuem os maiores valores de <b>proximidade</b>.<p/><br>

Apesar de aparentarem ser medidas parecidas, a intermediação e a proximidade medem características diferentes: a intermediação fornece um quantitativo de **quantos caminhos** passam por determinado vértice durante a comunicação entre todos os vértices da rede; a proximidade, por outro lado, quantifica a **distância média** de um vértice em relação aos demais vértices. Podemos dizer que pessoas com maior intermediação (ou proximidade) possuem influência considerável na rede por virtude de seu **controle sobre a informação que circula**. 

<br>

# Estrutura de Comunidades

A estrutura de comunidades (ou módulos) é uma propriedade encontrada em diversos tipos de redes. De forma simplificada, essas comunidades podem ser pensadas como **grupos de vértices mais densamente conectados** entre si do que com outros grupos de vértices da rede. A detecção dessas estruturas pode fornecer informações importantes. Em geral, redes e organizações criminosas possuem a tendência de formar comunidades com a finalidade de reduzir o risco de vazamento de informações. 

<br>

Com o objetivo de encontrar a estrutura de comunidades da rede da CPI, utilizamos um algoritmo de detecção de comunidades conhecido como _infomap_[^3]. A visualização abaixo apresenta a rede da CPI da COVID com destaque para sua estrutura modular, onde as cores representam as diferentes comunidades encontradas.

[^3]: O [_infomap_](https://www.mapequation.org/infomap/) é bastante robusto pois busca encontrar comunidades por meio de caminhadas aleatórias na rede. São consideradas comunidades as regiões nas quais o caminhante aleatório tende a permanecer por um tempo maior do que o esperado. Entretanto, por se tratar de um algoritmo [não supervisionado](https://en.wikipedia.org/wiki/Unsupervised_learning), o resultado de 5 módulos obtido via _infomap_ deve ser encarado com ceticismo. Por outro lado, uma breve análise via [maximização de modularidade](https://www.pnas.org/content/103/23/8577) nos retornou um valor próximo a esse, com média de [4 comunidades](https://alvarofrancomartins.com/cpi_covid/modularity.png). Futuramente podemos podem considerar [outros algoritmos](https://graph-tool.skewed.de/static/doc/demos/inference/inference.html) para tratar esse problema. 

<br>
<div id="cpi_covid_modulos"></div>
<script type="text/javascript" src="js/cpi_covid_modulos.js"> </script>
<p style="text-align: center"><b>Rede da CPI da COVID</b>: Destaque para 5 comunidades encontradas.<p/><br>

No total, nossa análise retornou 5 comunidades[^4]. Portanto, o número de supostos crimes (24) é quase cinco vezes o número de comunidades. Isso surpreende porque poderia se imaginar, por exemplo, que a maioria dos crimes configurariam uma comunidade. No entanto, nosso resultado sugere que vários desses supostos crimes poderiam ser considerados como um só. Ou ainda, podemos pensar que nessa rede existem grupos de pessoas mais densamente conectadas que estão citadas em diversos crimes mas que talvez pudessem estar envolvidos em um crime diferente pelo qual não foram descobertas.

[^4]: Por se tratar de um algoritmo [não supervisionado](https://en.wikipedia.org/wiki/Unsupervised_learning), o resultado de 5 módulos obtido via _infomap_ deve ser encarado com ceticismo. Entretanto, uma breve análise via [maximização de modularidade](https://www.pnas.org/content/103/23/8577) nos retornou um valor próximo a esse, com média de [4 comunidades](https://alvarofrancomartins.com/cpi_covid/modularity.png). Futuramente podemos podem considerar [outros algoritmos](https://graph-tool.skewed.de/static/doc/demos/inference/inference.html) para tratar esse problema. 

<br>

Para se ter uma ideia quantitativa dessas comunidades, a <b>Figura 6</b> mostra a quantidade de pessoas e supostos crimes dentro de cada um dos módulos. Os valores do eixo-x representam cada comunidade, de acordo com os índices mostrados na rede acima. Além disso, as cores das barras também são correspondentes às cores de cada comunidade.

<br>

<button class="btn btn-secondary btn-lg" onclick="update('pessoas')">Número de pessoas</button>
<button class="btn btn-secondary btn-lg" onclick="update('crimes')"> Número de crimes</button>

<br>
<br>

<div id="barplots_nc"></div>
<script type="text/javascript" src="js/barplots_nc.js"> </script>
<p style="text-align: center"><b>Figura 6</b>: Número de pessoas e seus supostos crimes dentro de cada comunidade.<p/><br>

Existem outras inúmeras informações desses dados que poderíamos explorar. A próxima informação que, ao meu ver, seria interessante saber é se a distribuição de grau da rede apresenta algum padrão. Ou ainda, poderíamos também explorar a informação sobre o número de acusações dos citados: encontrar, por exemplo, se existe alguma relação entre o número de acusações de cada pessoa e suas medidas de centralidade.

<br>

Poderíamos ir ainda além e agregar outras informações não contidas nesse conjunto de dados. Um exemplo seria as funções (ou cargos) dos envolvidos citados. Isso nos possibilitaria verificar a existência de cargos mais privilegiados na rede. As opções são inúmeras. Entretanto, vou deixar essas questões em aberto para o caso de alguma colaboração futura. Caso você tenha interesse em trabalhar com esses dados, não hesite em entrar [em contato](mailto:alvarought@gmail.com). Também fico à disposição para quaisquer dúvidas. 

<br>

Por fim, agradeço a contribuição dos colegas [Diego Domingues Lopes](https://www.linkedin.com/in/diego-domingues-lopes-963a761b9/) e [Andre Seiji Sunahara](https://ansesu.github.io/) na elaboração dessa postagem.

<br>

# Informações gerais

Abaixo você encontra quatro tabelas contendo os dados da rede da CPI. As duas primeiras são para uma checagem rápida dos acusados e de seus supostos crimes, e as duas últimas contém essas informações[^5] para cada comunidade.

[^5]: Note que duas comunidades diferentes podem compartilhar um mesmo crime. Nada impede, por exemplo, que duas pessoas com os mesmos crimes atribuídos estejam em comunidades diferentes.

## Acusados e seus supostos crimes

<br>

{{< include-html "content/post/cpi_covid/tabela.html" >}}

<br>

## Acusados que compartilham as mesmas acusações

<br>

{{< include-html "content/post/cpi_covid/tabela2.html" >}}

<br>

## Acusados dentro de cada comunidade

<br>

{{< include-html "content/post/cpi_covid/tabela3.html" >}}

<br>

## Supostos crimes dentro de cada comunidade

<br>

{{< include-html "content/post/cpi_covid/tabela4.html" >}}

<br>