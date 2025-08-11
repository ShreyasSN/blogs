---
layout:     post
title:      "Binary Search"
subtitle:   "All patterns of binary search"
date:       2025-07-25
author:     "Shreyas S N"
header-img: "img/post/binarysearch.png"
header-mask: 0.3
catalog:    true
tags:
    - C++
    - Algorithms
---


> **Note**: This article presumes that you already understand how binary search works.  
> If not, I recommend these two resources:
>
> - [TopCoder Binary Search Article](https://www.topcoder.com/community/competitive-programming/tutorials/binary-search)
> - [Codeforces — ITMO Academy: Pilot Course](https://codeforces.com/edu/course/2) *(Enroll in this course)*

---

## Exact Index

This is the classical binary search technique used when you're looking for the exact position of a target element. If not found, return `-1`.

```cpp
int binarySearch() {
  int l = 0, r = n - 1;
  while (l <= r) {
    int m = l + ((r - l) / 2);
    if (arr[m] == k) return m;
    else if (arr[m] > k) r = m - 1;
    else l = m + 1;
  }
  return -1;
}
````

---

## First Occurrence

This is a **lower bound** binary search.

> Use cases: Q1, Q2, Q3

```cpp
int firstOccurrence() {
  int l = 0, r = arr.size();
  while (l < r) {
    int m = l + (r - l) / 2;
    if (arr[m] >= k) r = m;
    else l = m + 1;
  }
  // return (arr.size() < l && arr[l] == k) ? l : -1;
  return l;
}
```

---

## Last Occurrence

This is an **upper bound** binary search.

> Use cases: Q1, Q2

```cpp
int lastOccurrence() {
  int l = 0, r = arr.size();
  while (l < r) {
    int m = l + (r - l) / 2;
    if (arr[m] > k) r = m;
    else l = m + 1;
  }
  // return (l > 0 && arr[l-1] == k) ? l-1 : -1;
  return l - 1;
}
```

---

## \[ T, T, F, F ] Sequence

It's important to analyze the **monotonic sequence of candidate solutions** before implementing.

This pattern means: after some point, all the values become `false`.

### Variant 1

```cpp
int firstTrueSeq() {
  int l = 0, r = n;
  while (l < r) {
    int m = l + (r - l + 1) / 2;
    if (condition(m) == true) l = m;
    else r = m - 1;
  }
  return l;
}
```

### Variant 2

```cpp
int firstTrueSeq() {
  int l = 0, r = n;
  while (l + 1 < r) {
    int m = l + (r - l) / 2;
    if (condition(m) == true) l = m;   // e.g., res <= k
    else r = m;
  }
  return l;
}
```

---

## \[ F, F, T, T ] Sequence

This pattern means: all values are `false` until some least index `x`, after which all are `true`.

> Example: You start with 0 score. As you increment, after some least x score you're declared a winner. Find that x.

```cpp
int LastTrueSeq() {
  int l = 0, r = n;
  while (l < r) {
    int m = l + (r - l + 1) / 2;
    if (condition(m) == true) r = m;
    else l = m + 1;
  }
  return l;
}
```

---

## Minimax Problems

### Finding the K-th Element

**Fixed-start binary search** on subarrays ending with a **monotonic window**.

```cpp
ll binary_search(vector<int> &nums, ll k) {
  int n = nums.size();
  vector<ll> pref(n + 1, 0);

  for (int i = 0; i < n; i++) {
    pref[i + 1] = pref[i] + nums[i];
  }

  ll totalCount = 0;

  for (int start = 0; start < n; ++start) {
    int l = start, r = n - 1;
    int validEnd = -1;

    while (l <= r) {
      int m = l + (r - l) / 2;
      ll sum = pref[m + 1] - pref[start];
      ll score = sum * (m - start + 1);

      if (score < k) {
        validEnd = m;
        l = m + 1;
      } else {
        r = m - 1;
      }
    }

    if (validEnd != -1) {
      totalCount += (validEnd - start + 1);
    }
  }
  return totalCount;
}
```

---

## Segment Tree + Binary Search

### 3171. Find Subarray With Bitwise OR Closest to K

Use **Segment Tree** + Binary Search to guess the optimal segment.

> Prefix Arrays: XOR, Sum (refer previous template)
> Segment Tree: max/min, OR/AND, GCD/LCM, frequency count, etc.

```cpp
struct SegTree {
    vector<int> t;
    int n;

    SegTree(vector<int>& a) {
        n = a.size();
        t.resize(2 * n);
        build(a);
    }

    int merge(int l, int r) { return l | r; }

    void build(vector<int>& a) { 
        for (int i = 0; i < n; i++) t[i+n] = a[i];
        for (int i = n - 1; i > 0; --i) t[i] = merge(t[i<<1], t[i<<1|1]);
    }

    void modify(int p, int value) {
        for (t[p += n] = value; p > 1; p >>= 1) t[p>>1] = merge(t[p], t[p^1]);
    }
    
    int query(int l, int r) { 
        int res = 0;
        for (l += n, r += n + 1; l < r; l >>= 1, r >>= 1)  {
            if (l & 1) res = merge(res, t[l++]);
            if (r & 1) res = merge(t[--r], res);
        }
        return res;
    }
};
```

```cpp
class Solution {
public: 
    int minimumDifference(vector<int>& a, int k) {
        int n = a.size();
        SegTree seg(a);  

        int res = INT_MAX;
        for (int start = 0; start < n; ++start) {
            int lo = start, hi = n - 1;

            while (lo <= hi) {
                int mid = (lo + hi) >> 1;

                int val = seg.query(start, mid);
                res = min(res, abs(k - val));

                if (val == k) return 0;
                if (val > k) hi = mid - 1;
                else lo = mid + 1;
            }
        }
        return res;
    }
};
```