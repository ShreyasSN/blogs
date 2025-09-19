---
layout: post
title: "Divide & Conquer Application & Phenomena"
subtitle: "It's beyond just sorting"
date: 2025-07-25
author: "Shreyas S N"
header-img: "img/post/merge-sort.png"
header-mask: 0.3
catalog: true
mathjax: true
tags:
---

### Merge-Sort Algorithm 
Merge-sort uses principle called divide & conquer which means first it divides the given input and then tries to build back by applying some of special tricks and techniques. Likewise for merge-sort first it divides given array into half recursively till it hits base case $\text{if(l >= r) return;}$ and build back by comparing minimum/maximum element to carefully place in sorted order.

Dividing array into left and right half. 
```cpp
void mergeSort(vector<int>& arr, int left, int right, vector<int>& temp) {
    if (left >= right) return;

    int mid = left + (right - left) / 2;
    mergeSort(arr, left, mid, temp);
    mergeSort(arr, mid + 1, right, temp);

    merge(arr, left, mid, right, temp);
}
```

### Divide-and-conquer principle and beyond


### Code Template

```cpp
template<typename T, typename Compare = std::less<T>, 
         typename Hook = std::function<void(const vector<T>&,int,int,int)>>
void mergesort(vector<T> &a, Compare cmp = Compare(), Hook pre_merge_hook = nullptr) {
    int n = (int)a.size();
    if (n <= 1) return;
    vector<T> buf(n);

    function<void(int,int)> dnc = [&](int l, int r) {
        if (r - l <= 1) return;
        int m = (l + r) >> 1;
        dnc(l, m);
        dnc(m, r);
        pre_merge_hook(a, l, m, r);
        int i = l, j = m, k = l;
        while (i < m && j < r) {
            if (cmp(a[j], a[i])) buf[k++] = a[j++];
            else buf[k++] = a[i++];
        }
        while (i < m) buf[k++] = a[i++];
        while (j < r) buf[k++] = a[j++];
        for (int t = l; t < r; ++t) a[t] = std::move(buf[t]);
    }; dnc(0, n);
}
```