---
layout: post
title: "Binary Search"
subtitle: "All patterns of binary search"
date: 2025-07-25
author: "Shreyas S N"
header-img: "img/post/binarysearch.png"
header-mask: 0.3
catalog: true
mathjax: true
tags:
  - C++
  - Algorithms
---

> Beginners:
>
> - [TopCoder Binary Search Article](https://www.topcoder.com/community/competitive-programming/tutorials/binary-search)
> - [Codeforces — ITMO Academy: Pilot Course](https://codeforces.com/edu/course/2) _(Enroll in this course)_

## Exact Index

Searching for an element in a given array was always been a fun task but when it comes for retriveing in most opitimistic time complexity and
space complexity trick us into pit hole of thinking loop. Binary search is one among them. It comes with $log(n)$ time complexity and $O(1)$
space complexity. further we can implement branchless binary search too for low level hardware usage to optimise cpu operations,
lets keep it aside as of now.

How does binary search words?
For any given `sorted array` we can apply binary search to retrive index of an target element.
Famous example given to explain is a searching of an page number of an word present in a dictionay.
How do you usualy check a meaning of an word using dictionary? for me. i just open dictionary on middle and look at the word on this page
and cross check if the first letter comes before or after the page like that way i repeatedly do to get an exact word im looking for.
Isn't it surprise how much time it saves and not have to iteratively search from starting to end of the dictrionary.

and here we go, likwise we first calculate middile of range $[l, r]$ then check

$$
\text{bsearch}(arr, k) =
\begin{cases}
   \text{return mid} & \text{if } arr[\text{mid}] = k \\
   \text{right} \gets \text{mid} - 1 & \text{if } arr[\text{mid}] > k \\
   \text{left} \gets \text{mid} + 1 & \text{if } arr[\text{mid}] < k
\end{cases}
$$

Getting exact index pattern of binary search could be applied wide range
and it is somewhat direct question. little difficulty could be seen in problem
when asked to retrieve `Kth optimal result of op(arr[i], arr[j])` where $1 \leq i, j \leq n $

here is a simple template for getting exact index of and k

take a closer look on $ l \leq r $. We use $\leq$ when we have to return answer within the loop.

```cpp
int binarySearch(vector<int>& arr, int k) {
    int n = arr.size();
    int l = 0, r = n - 1;
    while (l <= r) {
        int m = l + ((r - l) / 2);
        if (arr[m] == k) return m;
        else if (arr[m] > k) r = m - 1;
        else l = m + 1;
    }
    return -1;
}
```

### Return index of First/Last Occurrence

Lets say a number is occuring more than 1 times. In this sitution we gotta return index of either of first or last occurance.

a small changes brings pointer to first/last occurance

| variant          | return type       | changes to do in $if()$                |
| ---------------- | ----------------- | -------------------------------------- |
| First occurrence | return $left$     | $if\ (arr[mid] \geq k)\ \ right = mid$ |
| Last occurrence  | return $left - 1$ | $if\ (arr[mid] > k)\ \ right = mid$    |

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
{% tab bs last occurrence %}

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

Till now we have seen of $\text{[False, False, True, True]}$ form of monotonic sequence. Now lets see of it reverse. Its important pattern where lot of hidden problems can be expected in such sequence and this is one of the tie breaker from beginner and intermediate.

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
When a question is about `minimizing the maximum value`, it can often be solved using the minimax binary search pattern.

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

### Template Competetive Programming

{% tabs cf %}
{% tab cf CP Template %}
```cpp
template <typename T, typename U>
T bsearch(T l, T r, U condition, bool Lbound = true, bool firstTSeq = false) {
  while (l < r) {
    T mid = l + (r - l + firstTSeq) / 2;
    if (condition(mid)) firstTSeq ? l = mid : r = mid;
    else firstTSeq ? r = mid - 1 : l = mid + 1;
  }
  return (Lbound ? l : l - 1);
}
```
{% endtab %}

{% tab cf Mostly Branchless BSearch Template %}
```cpp
template <typename T, typename Pred>
T bsearch(T l, T r, const Pred &pred, bool Lbound = true, bool firstTSeq = false) {
  using CT = std::common_type_t<T, std::ptrdiff_t>;
  using U = std::make_unsigned_t<CT>;
  CT base_ct = static_cast<CT>(l);
  U n = static_cast<U>(static_cast<CT>(r) - base_ct) + static_cast<U>(firstTSeq ? 1u : 0u);
  if (n == 0) {
    if (firstTSeq)  return Lbound ? l : static_cast<T>(base_ct - 1);
    else return Lbound ? r : static_cast<T>(base_ct - 1);
  }
  U pos = 0;
  U step = U(1) << (std::bit_width(n) - 1);
  for (; step; step >>= 1) {
    U nxt = pos + step;
    U inRange = static_cast<U>(nxt <= n);
    U mask_in = static_cast<U>(0) - inRange;
    U safe_idx = ((nxt - 1) & mask_in) | ((n - 1) & ~mask_in);
    T candidate = static_cast<T>(static_cast<CT>(base_ct + static_cast<CT>(safe_idx)));
    U pred_v = static_cast<U>(static_cast<bool>(pred(candidate)));
    U move_cond = firstTSeq ? pred_v : static_cast<U>(!pred_v);
    U take_mask = static_cast<U>(0) - (inRange & move_cond);
    pos += step & take_mask;
  }
  if (firstTSeq) {
    U pos_nonzero = static_cast<U>(pos != 0);
    CT out_ct = base_ct + static_cast<CT>(pos) - static_cast<CT>(pos_nonzero);
    CT final_ct = out_ct - static_cast<CT>(Lbound ? 0 : 1);
    return static_cast<T>(final_ct);
  } else {
    CT out_ct = base_ct + static_cast<CT>(pos) - static_cast<CT>(Lbound ? 0 : 1);
    return static_cast<T>(out_ct);
  }
}
```
{% endtab %}
{% endtabs %}