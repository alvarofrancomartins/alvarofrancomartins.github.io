---
title: A computational model for political corruption networks 
subtitle: NaN

# Summary for listings and search engines
summary: Welcome [...]

# Link this post with a project
projects: []

# Date published
date: "2020-12-13T00:00:00Z"

# Date updated
lastmod: "2020-12-13T00:00:00Z"

# Is this an unpublished draft?
draft: false

# Show this page in the Featured widget?
featured: true

authors:
- admin

tags:
- Corruption networks

categories:
- corruption_networks

---

{{< toc >}}

# Play with the model

Donec eget orci at felis auctor malesuada vel a ante. Aliquam dictum, tellus id pharetra varius, lacus elit auctor mi, ut consequat risus metus at neque. Praesent ut tortor quis magna eleifend pulvinar et sit amet libero. Interdum et malesuada fames ac ante ipsum primis in faucibus. Duis ut leo convallis, tristique risus nec, placerat mauris. Fusce urna orci, ullamcorper in metus sed, tincidunt efficitur tellus. Phasellus iaculis urna a orci pulvinar, at lacinia ligula cursus.


{{< include-html "content/post/model/model.html" >}}


# Python code

First of all, 

```py
import numpy          as np
import graph_tool.all as gt

from itertools import combinations
```

[See graph-tool installation instructions.](https://git.skewed.de/count0/graph-tool/wikis/installation-instructions)

Duis ut leo convallis, tristique risus nec, placerat mauris. Fusce urna orci, ullamcorper in metus sed, tincidunt efficitur tellus. Phasellus iaculis urna a orci pulvinar, at lacinia ligula cursus. Vivamus ullamcorper purus in mauris volutpat, ac aliquet risus molestie. Nulla a nisi laoreet, imperdiet augue id, dictum magna. Integer vel quam nec augue maximus elementum nec et ex. 


{{< spoiler text="Click to view the full algorithm" >}}
```py
def generate_net_links(tmax = 100, lambda_ = 7.33, a = 0.09, b = -11.5, proba = 0.024):
    """
    Generate a corruption network based on our model.
    
    Parameters
    ---------

    tmax : int
           Number of iteration steps (default: 100).
    lambda_ : float
           Characteristic number of people per scandal (default: 7.33).
    a, b : float
           Parameters defining the number of repeated agents (nr) as a function
           of total number of agents (n): nr = a*n + b (default: 0.09, -11.5).
    proba : float
            Probability of selecting a repeated agent that was already involved in
            another scandal (default: 0.024091841863485983).

    Returns
    -------
    links_list : list
                 A list of edge lists where each element correspond to
                 a particular iteration step.
    """
    
    t                          = 0
    links                      = []
    links_list                 = []
    agent_names                = set()
    last_agent_index           = 0
    repeated_agent_names       = set()
    total_repeated_agents      = 0
    
    while t < tmax:
        n_new_agents = int(np.round(np.random.exponential(lambda_)))
            
        if n_new_agents > 1:
        
            new_agent_names     = [x for x in np.arange(last_agent_index, last_agent_index + n_new_agents)]
            last_agent_index   += n_new_agents
            
            new_repeated_agents = int(np.round((a*(len(agent_names)) + b - total_repeated_agents)))
            
            if new_repeated_agents > 0:
                for i in range(min(new_repeated_agents, len(new_agent_names))):

                    if (np.random.uniform() <= proba) & (len(repeated_agent_names) > 0):
                        #select from repeated_agent_names
                        repeated_agent = np.random.choice(list(repeated_agent_names))
                    else:
                        #select from agent_names
                        repeated_agent = np.random.choice(list(repeated_agent_names^agent_names))
                        total_repeated_agents += 1

                    new_agent_names[i] = repeated_agent
                    repeated_agent_names.add(repeated_agent)
                    
            for agent_ in new_agent_names:
                agent_names.add(agent_)
            
            new_links = list(combinations(new_agent_names, 2))
            
            links_list += [new_links]
            t          += 1

    return links_list
```
{{< /spoiler >}}


Donec eleifend turpis sit amet magna faucibus egestas. Duis nulla mi, venenatis in lacinia vitae, volutpat maximus enim.


```py
edge_lists = generate_net_links(tmax = 100, a = 0.09)
```

Vivamus ullamcorper purus in mauris volutpat, ac aliquet risus molestie. Nulla a nisi laoreet, imperdiet augue id, dictum magna. Integer vel quam nec augue maximus elementum nec et ex. Nunc id lobortis nunc. Morbi aliquam nec arcu sed iaculis. Maecenas vitae varius mi, in imperdiet lacus. 

```py
def network(i, edges_list):
    g           = gt.Graph(directed = False)
    edge_list_i = np.concatenate(edges_list[:i])
    
    g.add_edge_list(edge_list_i, hashed = True)
    
    gt.remove_self_loops(g)
    gt.remove_parallel_edges(g)
    
    return g
```

Finally, generate the network until $i$ steps

```py
rede_final = network(100, edge_lists)
rede_final
```

Returning the following network

> _<Graph object, undirected, with 767 vertices and 4805 edges, at 0x7f2789007d60>_