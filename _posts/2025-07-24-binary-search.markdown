---
layout:     post
title:      "Binary Search"
subtitle:   "All patterns of binary search"
date:       2025-07-25
author:     "Shreyas S N"
header-img: "img/post/binarysearch.png"
header-mask: 0.3
catalog:    true
mathjax: true
tags:
    - C++
    - Algorithms
---

> Beginners:
> - [TopCoder Binary Search Article](https://www.topcoder.com/community/competitive-programming/tutorials/binary-search)
> - [Codeforces — ITMO Academy: Pilot Course](https://codeforces.com/edu/course/2) *(Enroll in this course)*

## Exact Index

Use `l <= r` if returning result within the loop.  
This pattern can be seen in:
- Get `k`th smallest `abs(a[i] - a[j])` where $1 \le i,j \le n$
- Finding square root of a given perfect square  
…and many more.

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

{% tabs bs %}
{% tab bs first occurrence %}

make sure use `>=`
```cpp
int firstOccurrence() {
    int l = 0, r = arr.size();
    while (l < r) {
        int m = l + (r - l) / 2;
        if (arr[m] >= k) r = m;
        else l = m + 1;
    }
    // return (arr.size() > l && arr[l] == k) ? l : -1;
    return l;
}
```

{% endtab %}
{% tab bs last\_occurrence %}

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

{% endtab %}
{% endtabs %}

## \[T, T, F, F] Sequence

It's important to analyze the **monotonic sequence of candidate solutions** before implementing.

This pattern means: after some point, all values become `false`.
Seen in problems where we construct a candidate solution and check if the current score/target is below/above a midpoint.

This pattern frequently appears in medium-to-hard problems.

{% tabs var %}
{% tab var variations_1 %}

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

{% endtab %}
{% tab var variations_2 %}

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

{% endtab %}
{% endtabs %}

## Minimax Problems

Usually hard-level in LeetCode.
When a question is about **minimizing the maximum value**, it can often be solved using the minimax binary search pattern.

```cpp
int minimax_binarySearch(vector<int>& nums, int k) {
    int l = *min_element(nums.begin(), nums.end());
    int h = accumulate(nums.begin(), nums.end(), 0ll);

    if (k == 1) return h;
    if (k == (int)nums.size()) return l;

    auto checkUpperGuess = [&](int upperSum) {
        int res = 1;
        long long sum = 0;
        for (int num : nums) {
            if (sum + num > upperSum) {
                res++;
                sum = num;
                if (res > k) return false;
            } else {
                sum += num;
            }
        }
        return true;
    };
  
    while (l < h) {
        int m = l + (h - l) / 2;
        if (checkUpperGuess(m)) h = m;
        else l = m + 1;
    }
    return l;
}
```

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

### Segment Tree + K-th Element Binary Search

Use **Segment Tree** + Binary Search to guess the optimal segment.

> Prefix Arrays: XOR, Sum (refer previous template)
> Segment Tree is useful for operations like max/min, OR/AND, GCD/LCM, frequency count, etc., which can't be efficiently done with prefix arrays.

Below code implements LeetCode `3171. Find Subarray With Bitwise OR Closest to K`.

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
        for (int i = 0; i < n; i++) t[i + n] = a[i];
        for (int i = n - 1; i > 0; --i) t[i] = merge(t[i << 1], t[i << 1 | 1]);
    }

    void modify(int p, int value) {
        for (t[p += n] = value; p > 1; p >>= 1) t[p >> 1] = merge(t[p], t[p ^ 1]);
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

### First tabs

{% tabs log %}

{% tab log php %}
```php
var_dump('hello');
```
{% endtab %}

{% tab log js %}
```javascript
console.log('hello');
```
{% endtab %}

{% tab log ruby %}
```javascript
pputs 'hello'
```
{% endtab %}

{% endtabs %}

### Second tabs

{% tabs data-struct %}

{% tab data-struct yaml %}
```yaml
hello:
  - 'whatsup'
  - 'hi'
```
{% endtab %}

{% tab data-struct json %}
```json
{
    "hello": ["whatsup", "hi"]
}
```
{% endtab %}

{% endtabs %}
