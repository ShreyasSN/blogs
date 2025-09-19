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
  - Level-1
---

> Beginners:
>
> - [TopCoder Binary Search Article](https://www.topcoder.com/community/competitive-programming/tutorials/binary-search)

### Binary Search

Searching for an element in a given array has always been an interesting task, but when it comes to retrieving it with the most optimal time and space complexity, we often fall into the trap of looping approaches. Binary Search, however, is a method that comes in handy, as it strikes a balance between both time and auxiliary complexities. It works in $O(log n)$ time and uses $O(1)$ space. Additionally, we can even implement a [branchless binary search](https://probablydance.com/2023/04/27/beautiful-branchless-binary-search/) for low-level hardware usage to optimize CPU operations.

### How does Binary Search work?

For any given `sorted array`, we can apply binary search to retrieve the index of a target element.

A famous analogy is looking up the page number of a word in a dictionary. How do you usually check the meaning of a word there? Personally, I open the dictionary in the middle, look at the first word on that page, and compare its initial letter with the word I’m searching for. Depending on whether it comes before or after, I then keep narrowing down the range until I get to the exact word. Isn’t it surprising how much time it saves compared to checking every page sequentially?

Similarly, in binary search, we first calculate the middle of a range $$[l, r]$$. Usually its calculated as $mid = (l + r) / 2$
but when $$l$$ or $$r$$ are very large, adding them directly ($$l + r$$) can cause integer overflow. To avoid that, you can use this trick $mid = l + (r - l)/2$

$$
\text{bsearch}(arr, k) =
\begin{cases}
   \text{return mid} & \text{if } arr[\text{mid}] = k \\
   \text{right} \gets \text{mid} - 1 & \text{if k is present left of arr[mid]} \\
   \text{left} \gets \text{mid} + 1 & \text{if k is present right of arr[mid]}
\end{cases}
$$

Lets visualize things
<img width="500" src="{{ "/img/in-post/post-binary-search/bs1.svg" | prepend: site.baseurl }}" />
<small class="img-hint">Binary Search</small>

### Find exact index of target in an array

Get started with this [problem](https://leetcode.com/problems/binary-search/description/)

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

### QuestionList-1: Get exact position of target

### Return index of First/Last Occurrence

Lets say a number is occuring more than 1 times. In this sitution we gotta return index of either of first or last occurance.

a small changes brings pointer to first/last occurance

| variant          | return            | changes to do in $if()$                |
| ---------------- | ----------------- | -------------------------------------- |
| First occurrence | return $left$     | $if\ (arr[mid] \geq k)\ \ right = mid$ |
| Last occurrence  | return $left - 1$ | $if\ (arr[mid] > k)\ \ right = mid$    |

{% tabs bs %}
{% tab bs first occurrence %}

make sure use of $\leq$ as this will help pointer to slide to very begining of target of multiple occurrence.

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

[Find First and Last Position of Element in Sorted Array](https://leetcode.com/problems/find-first-and-last-position-of-element-in-sorted-array)

### \[T, T, F, F] Sequence

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

### C++ STL _lower_bound()_ and _upper_bound()_

C++ has this in-built functions which returns iterator to the element present in container. Both $\text{lower_bound()}$ and $\text{upper_bound()}$ available under header file `#include <algorithm>`

lets say $f_i$ be _find first element_ i will be using fi in below like fi > target, which translates to find first element > target

This functions were compiled from [blog](https://codeforces.com/blog/entry/113032).
{% tabs stl %}

  {% tab stl $f_i$ > Target %}

  ```cpp
  int firstGreater(vector <int>& a, int target) {
      auto it = upper_bound(a.begin(), a.end(), target);
      return it = a.end() ? -1 : it - a.begin();
  }
  ```

  {% endtab %}

  {% tab stl $f_i$ $\geq$ Target %}

  ```cpp
  int firstGreaterEqual(vector<int>& a, int target) {
      auto it = lower_bound(a.begin(), a.end(), target);
      return it == a.end() ? -1 : it - a.begin();
  }
  ```

  {% endtab %}

{% endtabs %}

{% tabs stl1 %}

  {% tab stl1 $f_i$ < Target %}

  ```cpp
  int firstLess(vector<int>& a , int target) {
      auto it = lower_bound(a.begin(), arr.end(), target);
      if (it == a.begin()) return -1;
      return (it - a.begin()) - 1;
  }
  ```

  {% endtab %}

  {% tab stl1 $f_i$ $\leq$ Target %}

  ```cpp
  int firstLessEqual(vector<int>& a , int target) {
      auto it = upper_bound(a.begin(), a.end(), target);
      if (it == a.begin()) return -1;
      return (it - a.begin()) - 1;
  }
  ```

  {% endtab %}

{% endtabs %}

### Minimax Problems

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

Fixed-start binary search on subarrays ending with a monotonic window.

```cpp
ll binary_search(vector<int> &nums, ll k) {
    int n = nums.size();
    ll totalCount = 0;

    for (int start = 0; start < n; ++start) {
        int l = start, r = n - 1;
        int validEnd = -1;

        while (l <= r) {
            int m = l + (r - l) / 2;

            ll score = /* operation */

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

- [Kth Smallest Element in a Sorted Matrix](https://leetcode.com/problems/kth-smallest-element-in-a-sorted-matrix/)
- [Kth Smallest Element in a BST](https://leetcode.com/problems/kth-smallest-element-in-a-bst/)
- [Kth Missing Positive Number](https://leetcode.com/problems/kth-missing-positive-number/)
- [Find First and Last Position of Element in Sorted Array](https://leetcode.com/problems/find-first-and-last-position-of-element-in-sorted-array/)
- [Search Insert Position](https://leetcode.com/problems/search-insert-position/)
- [Find Minimum in Rotated Sorted Array](https://leetcode.com/problems/find-minimum-in-rotated-sorted-array/)
- [Find Peak Element](https://leetcode.com/problems/find-peak-element/)
- [Koko Eating Bananas](https://leetcode.com/problems/koko-eating-bananas/)
- [First Bad Version](https://leetcode.com/problems/first-bad-version/)
- [Median of Two Sorted Arrays](https://leetcode.com/problems/median-of-two-sorted-arrays/)

### Segment Tree + K-th Element Binary Search

Use **Segment Tree** + Binary Search to guess the optimal segment.

> Prefix Arrays: XOR, Sum (refer previous template)
> Segment Tree is useful for operations like max/min, OR/AND, GCD/LCM, frequency count, etc., which can't be efficiently done with prefix arrays.

Below code implements LeetCode `3171. Find Subarray With Bitwise OR Closest to K`.

```cpp
namespace rangeQuery {
  template <class S, auto op, auto e>
  struct init {
public:
  init() : init(0) {}
  explicit init(int n, S init_val = e()) : init(std::vector<S>(n, init_val)) {}
  explicit init(const std::vector<S> &v) : _n(int(v.size())) {
    size = 1 << (32 - __builtin_clz(_n - 1));
    log = __builtin_ctz(size);
    d = std::vector<S>(2 * size, e());
    for (int i = 0; i < _n; i++) { d[size + i] = v[i]; }
    for (int i = size - 1; i >= 1; i--) { set(i); }
  }
  void update(int p, S x) {
    d[p += size] = x;
    for (int i = 1; i <= log; i++) set(p >> i);
  }
  S get(int p) const {
    return d[p + size];
  }
  S get_all() const { return d[1]; }
  S query(int l, int r) const {
    S sml = e(), smr = e();
    for (l += size, r += size + 1; l < r; l >>= 1, r >>= 1) {
      if (l & 1) sml = op(sml, d[l++]);
      if (r & 1) smr = op(d[--r], smr);
    }
    return op(sml, smr);
  }
private:
    int _n, size, log;
    std::vector<S> d;
    void set(int k) { d[k] = op(d[k << 1], d[k << 1 | 1]); }
  };
}
struct info {
  int v;
  info() : v(0) {}
  info(int _v) {
    v = _v;
  }
};
info e() { return info(0); }
info op(const info &l, const info &r) {
  return {l.v + r.v};
}
using segtree = rangeQuery::init<info, op, e>;

class Solution {
public:
    int minimumDifference(vector<int>& a, int k) {
        int n = a.size();
        vector<info> t(n);
        for(int i=0; i<n; i++) t[i] = info(a[i]);
        segtree seg(t);

        int res = INT_MAX;
        for (int start = 0; start < n; ++start) {
            int lo = start, hi = n - 1;

            while (lo <= hi) {
                int mid = (lo + hi) >> 1;

                int val = seg.query(start, mid).v;
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
> <p style="color:gree; font-size:2em"> I strongly encaourage to enroll this in codeforce and try to solve </p>
> As of now should be able to solve the problems(not necesserly to get AC, I strongly encourage to recognise pattern or get approach  on how to solve) from [Codeforces — ITMO Academy: Pilot Course](https://codeforces.com/edu/course/2) _(Enroll in this course otherwise cannot access)_ 

### Parallel Binary Search

### Binary seach on rotated array

simple yet tricky and also its kind of special binary search variant i admire. Questions such as
get peak/low value of unique/duplicate array can be asked. If you know that than any other variations can easily be solved if given roatated array of sorted array

### Template Competetive Programming

{% tabs cf %}
{% tab cf CP Template %}
`firstTSeq` set to `true` when the given solution space in the monotonic sequence of the form `[T,T,F,F]`
`Lbound` lower_bound

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

Not recommended but can be used to slighly improvement run time milli seconds.

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

### Special Problems

- [Median of Two Sorted Arrays](https://leetcode.com/problems/median-of-two-sorted-arrays/)
- [Search in Rotated Sorted Array](https://leetcode.com/problems/search-in-rotated-sorted-array)
- [Search in 2D matrix](https://leetcode.com/problems/search-a-2d-matrix)
