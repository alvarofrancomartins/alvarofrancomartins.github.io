---
title: "Dendrite: an AI-powered branching recommendation engine"
date: 2026-03-16
subtitle: "A recommendation engine that grows a tree of connected suggestions"
summary: "A recommendation engine that grows a tree of connected suggestions"
draft: false
featured: True
authors:
- admin
tags:
- Dendrite
- LLM
- Recommendations
- Music Discovery
- DeepSeek
- D3.js
- Sankey Diagram
- Interactive Visualization
categories:
- Artificial Intelligence
image:
  placement: 2
  caption: ""
  focal_point: "center"
  preview_only: false
---

LLMs are great at recommendations. What if you could watch its whole tree of recommendations branch out in front of you?

<br>

Start with Radiohead with a "chaotic" vibe. Maybe it branches into The Mars Volta and Swans. Now, given the path Radiohead > Swans, we ask the LLM: what's the next most natural recommendation? And so on. The path is the query.

<br>

This is great for someone like me who is constantly trying to listen to new (and much different) bands or artists. Different vibes will generate completely different trees from the same starting point. Vibes are optional and leaving it blank returns a vanilla tree.

<br>

The fun thing is that this kind of branching tree works for everything. Dishes, cocktails, perfumes, games, podcasts. The structure is general.

<br>

This is actually a generalization of something I built a while ago ([a sankey diagram to find new artists](/post/sankey/)) powered by Last.fm's similar artists API. Now the recommendations come from a large language model. Powered by DeepSeek, because it's cheap and it works well enough. Works on mobile too.

<br>

**[Try Dendrite →](/dendrite/)**