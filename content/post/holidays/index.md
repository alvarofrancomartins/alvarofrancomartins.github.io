---
title: When does the world take a day off?
subtitle: Two calendars show the days when the most countries, and the most people, are on holiday
summary: Two calendars show the days when the most countries, and the most people, are on holiday
projects: []

date: "2026-11-11"

draft: false

featured: false

authors:
- admin

tags:
- DataViz
- Data visualization
- Holidays
- Calendar
- World
- 2025
- Population

toc: false

image:
  placement: 1
  caption: ""
  focal_point: "Smart"
  preview_only: true

---

In this short post, you'll see two calendars of national holidays. I created these (interactive) data visualizations because I was curious about the dates of holidays around the world. Keep in mind this data is based on the 2025 Gregorian Calendar, which is used by most countries but not all.

<br>

{{< include-html "content/post/holidays/holidays_countries_heatmap.html" >}}

On the other hand...

{{< include-html "content/post/holidays/holidays_population_heatmap.html" >}}

Overall, three dates dominate: January 1st, Christmas and Labour Day. And then, weighting by population keeps the same top three dates but redraws the rest of the calendar. I assume populous countries like India and China drive most of the other holidays' figures. 

<br>

Source: national holidays via [python-holidays](https://github.com/vacanza/holidays) (v0.83); population from the [World Bank](https://data.worldbank.org/) (2025).
