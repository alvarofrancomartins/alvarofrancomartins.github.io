---
title: Test
subtitle: Test
summary: Test
projects: []

date: "2025-03-06"

draft: false

featured: false

authors:
- admin

tags:
- test

categories:
- test

# toc: true

image:
  placement: 3
  caption: "A network simulation using the model of political corruption networks." 
  focal_point: "Smart"
  preview_only: false
---

In our [latest paper](/publication/universality-of-political-corruption-networks/), the findings of universal characteristics in political corruption networks allowed us to propose a model to simulate the growth of corruption networks. Among other results, our research revealed the prominent role of recidivist agents on corruption networks. For instance, we discover that recidivists act as bridges among minor corrupt groups and coordinate peripheral criminals to perform more extensive and often much more harmful corruption processes. 

<br>

- Describe the model  [{{< icon name="fas fa-link" pack="fas" >}}](#model)
- Display an interactive demonstration [{{< icon name="fas fa-link" pack="fas" >}}](#play)
- Present the algorithm of the model in Python [{{< icon name="fas fa-link" pack="fas" >}}](#algorithm)


{{< include-html "content/post/corruption-networks-model/model.html" >}}

This interactive visualization was made using [visjs](https://visjs.org/), a browser based visualization library. The figures below show a visual comparison between simulated and empirical networks. Figure 1 is a simulation of the Brazilian corruption network using its recidivism rate, and Figure 2 shows the empirical network.
