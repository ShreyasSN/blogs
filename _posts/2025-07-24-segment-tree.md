---
layout:     post
title:      "Simple Segment Tree"
subtitle:   "All patterns of classical dp"
date:       2025-07-25
author:     "Shreyas S N"
header-img: "img/post/segtreee.png"
header-mask: 0.3
catalog:    true
mathjax: true
tags:
  - Algorithms
  
---

# Segment Tree 

<img src="{{"/img/in-post/post-segment-tree/seg1.svg" | prepend: site.baseurl }}" />

Facing subarray variant problems in competetive programming is not a surprise anymore and sometimes it doesnt seems to be easy as always but when you are supposed to come up with _quasi linear time complexity_ for the problems that asks you to compute result for each queries and update will put you in trouble. Dont worry, we can solve such question in most simpler and easiest way by taking advantage of segment tree data structure.

To understand it better let me take this simple problem:
given an array of `N` elements and `Q` range queries $[L,R]$, return sum in that range.



