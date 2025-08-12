---
layout: post
title: "binary search Programming Problems"
subtitle: "All patterns of classical bs"
date: 2025-07-25
author: "Shreyas S N"
header-img: "img/post/dp.png"
header-mask: 0.3
catalog: true
tags:
  - Algorithms
---

# Binary Search

## Runtime analysis

$$
T(n)=T(\frac{n}{2})+O(1)=O(\log n)
$$

## Take note…

* Is array sorted?
  * If not, can you sort it and still preserve information?
* Can the array be separated into two distinct parts where the first half satisfies a condition while the other does not?

## Techniques

### Peak finding

Move towards the direction of larger/smaller values relative to the mid-point chosen.

* This does not work with arrays that can have duplicates (naively picking a direction to move in could be disastrous)
* This can only produce local peaks

### Peak finding in rotated arrays


The arrays always exhibit the following properties:

* `nums[0] > nums[-1]`
* There are essentially 2 sorted arrays, the boundary can be found by comparing `nums[i]` against `nums[0]`
  * If `nums[i] > nums[0]`, `i` is in the first half, otherwise, it is in the second half

Problems commonly test to see if you can identify these properties (such as [Find Minimum in Rotated Sorted Array](https://leetcode.com/problems/find-minimum-in-rotated-sorted-array/) or [Search in Rotated Sorted Array](https://leetcode.com/problems/search-in-rotated-sorted-array/))

* Use `nums[0]` as a marker for determining where `i` is in the array

### Apply binary search to matrices

Try using the values of the arrays as a range or treating using the pure index like `(0, 0)` to `(n - 1, n - 1)` has the last index as `(n * n) - 1`

* These problems are harder to notice but a common property that can be found is when the matrix is sorted in some order (row)

Problems can include [searching a fully sorted 2D matrix](https://leetcode.com/problems/kth-smallest-element-in-a-sorted-matrix/description/) or modifying binary search to search the matrix in a consistent manner such as [Kth Smallest Element in a Sorted Matrix](https://leetcode.com/problems/kth-smallest-element-in-a-sorted-matrix/solutions/1322101/c-java-python-maxheap-minheap-binary-search-picture-explain-clean-concise/)

## General template

### First tabs

{% tabs log %}

{% tab log php %}
```php
var_dump('hello');
```
{% endtab %}

{% tab log js %}
asdfoi ljas d;lfkj 
 asdlkj;l kas

 safldkjal;skdjf
 asl;kfj;lkasjdfl;kjas;ldkfj;laksjfd 
 as;flkja; 
 szzdf;lkjas al kj;lak sj;l ;laskj ;lkajsdf ;la a'sj ;lka
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