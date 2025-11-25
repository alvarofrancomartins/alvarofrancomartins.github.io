---
title: Mapping Epstein's Email Network with K-Core Decomposition and AI-Generated Relationship Summaries
subtitle: Using graph algorithms and large language models to analyze communication patterns
summary: An interactive visualization of email networks using k-core decomposition to identify core connections, enhanced with AI-powered relationship summaries generated from email content.
projects: []

date: "2025-11-25"

draft: false

featured: false

authors:
- admin
- Peterson Wagner Kava

tags:
- Network Analysis
- Graph Theory
- Data Visualization
- Natural Language Processing
- LLMs
categories:
- artificial_intelligence

toc: true

image:
  placement: 2
  caption: "Coordination between Large Language Models" 
  focal_point: "Smart"
  preview_only: false

---

## Overview

This project combines advanced graph analysis with artificial intelligence to visualize and understand email communication networks. The visualization uses k-core decomposition to identify densely connected groups and leverages large language models to automatically generate relationship summaries from email content.

[Click here](https://github.com/alvarofrancomartins/content/post/epstein_email_network/network_undirected.html).

## K-Core Decomposition

K-core decomposition is a graph algorithm that identifies the most densely connected subgraph by iteratively removing nodes with fewer connections than a threshold k. This approach reveals the core group of individuals with the strongest communication ties, filtering out peripheral connections to focus on the most interconnected network members.
The algorithm works by progressively peeling away outer layers of the network until only the densest core remains. This provides a natural way to identify influential nodes and cohesive subgroups within large communication networks.

## AI-Powered Relationship Summaries

The distinctive feature of this visualization is the integration of large language models to automatically generate relationship summaries between any two individuals. When selecting two people in the network, the system analyzes their complete email history and produces a natural language summary of their documented interactions.
This represents a novel application of AI to communication analysis. Rather than manually reading through potentially hundreds of emails, the LLM synthesizes the relationship dynamics, key topics discussed, and interaction patterns into concise summaries. This approach enables network analysis at scale while preserving qualitative insights from the correspondence.

The system displays both quantitative metrics (total emails exchanged, directional counts) and AI-generated contextual summaries, providing a comprehensive view of each relationship.

## Technical Implementation

The visualization combines several technologies:

D3.js for interactive network rendering with drag-and-drop node positioning
K-core decomposition algorithm for network analysis
Large language models for relationship extraction and summarization
File-based architecture for individual node descriptions

Users can explore the network by selecting pairs of individuals to view their relationship details, or clicking individual nodes to access biographical information. The interface highlights connected nodes and edges dynamically, making it easy to understand local network structure around any person.
Methodology

Email correspondence data was processed through a multi-stage pipeline. First, the k-core decomposition algorithm identified the core network members based on connection density. Then, for each pair of connected individuals, their email threads were extracted and passed to a large language model with instructions to summarize the nature of their relationship and key interaction topics.
Individual node descriptions were compiled from available biographical sources and stored as text files, allowing for easy updates and manual curation when needed.

## Disclaimer
Inclusion in this network reflects email correspondence only and does not imply wrongdoing by any individual. Relationships are summarized by AI using email content and may contain inaccuracies. This visualization is for research and network mapping purposes only, not to make accusations or implications about any individual shown.