---
layout: post
title: "Classical Dynamic Programming"
subtitle: "All patterns of classical bs"
date: 2025-07-25
author: "Shreyas S N"
header-img: "img/post/dp.png"
header-mask: 0.3
catalog: true
mathjax: true
tags:
  - Algorithms
  - Level-1
---

> dots connecting to reach goal where each dots is a sub-task that builds up to solution

### What is Dynamic Programming

DP is just a caching the recursion tree. DP optimizes recursive algorithms by storing and reusing the results of overlapping subproblems (i.e., repeated states in the recursion tree), ensuring that each distinct state is computed only once and if subtask needs to be computed again then it can be get result in $O(1)$. This technique transforms exponential time complexity of recursion solution such as $O(\text{#choices}^N)$ into a more efficient polynomial or pseudo-polynomial complexity, commonly $O(\text{#choices}*N)$
or $O(N^\text{#choices})$, depending on state representation and problem constraints. This is huge optimization as for array of size $ N \leq 10^4 $ and choices are $\text{take, not-take}$. So $O(2^N) \ggg O(N^2)$

If you are a beginnner then you $must$ first come up with recursion solution. I have observed that lot of video/editorial explaination of DP problems are already optimised solution(iterative DP) which can be understood for current problem but if you see varient of another DP problem then you are most likey gonna feel hard to come up with solution.

### Understanding of optimization

Problem-1. Fibonacci Series

Fibonacci series is sum of previous two numbers. Series start with $[0, 1]$ and second number is determined by privous 2 numbers that is $[0,1,1,2,3,5,8,13,...]$

$$
F_n =
\begin{cases}
0 & \text{if } n = 0 \\
1 & \text{if } n = 1 \\
F_{n-1} + F_{n-2} & \text{if } n > 1
\end{cases}
$$

$$
F_n = \frac{\varphi^n - \psi^n}{\sqrt{5}},
\quad \varphi = \frac{1+\sqrt{5}}{2},\
\psi = \frac{1-\sqrt{5}}{2}.
$$

$$
\sum_{n=0}^\infty F_n x^n = \frac{x}{1-x-x^2},\quad |x|<\frac{1}{\varphi}.
$$

<details>
  <summary>Bonus: Matrix Exponention To Get Sequential Series in $O(log(n))$</summary>

<div class="details-content">

<b>Matrix Representation</b><br>
$$
\begin{pmatrix}
F_{n+1} & F_n \\
F_n & F_{n-1}
\end{pmatrix}
=
\begin{pmatrix}
1 & 1 \\
1 & 0
\end{pmatrix}^{\!n}
$$
This states that calculating Fibonacci numbers can be expressed as raising a $2 \times 2$ matrix to the $n$th power. Using exponentiation by squaring, this allows computation of $F_n$ in $O(\log n)$ time.
<br><br>

Introduction<br>
Many problems in computer science and mathematics involve sequences defined by recurrence relations.  
The Fibonacci sequence is the most famous example:  

$$
F(n) = F(n-1) + F(n-2), \quad F(0) = 0, \quad F(1) = 1
$$

Naively computing $F(n)$ using recursion or iteration takes $O(n)$ time.  
However, by representing the recurrence as a matrix multiplication problem and using matrix exponentiation, we can compute $F(n)$ in $O(\log n)$ time.<br><br>

This tutorial covers:  
- How to represent linear recurrences as matrix multiplication  
- How to perform fast matrix exponentiation  
- Generalizing the method to other recurrence relations  

<br>

Step 1: Representing the Recurrence as a Matrix Equation<br>
Take Fibonacci as an example. Its recurrence can be written as:  

$$
\begin{bmatrix}
F(n) \\
F(n-1)
\end{bmatrix}
= 
\begin{bmatrix}
1 & 1 \\
1 & 0
\end{bmatrix}
\times
\begin{bmatrix}
F(n-1) \\
F(n-2)
\end{bmatrix}
$$

Define the matrix:  

$$
M =
\begin{bmatrix}
1 & 1 \\
1 & 0
\end{bmatrix}
$$

So,  

$$
\begin{bmatrix}
F(n) \\
F(n-1)
\end{bmatrix} = M \times \begin{bmatrix} F(n-1) \\ F(n-2) \end{bmatrix}
$$

Applying repeatedly,  

$$
\begin{bmatrix}
F(n) \\
F(n-1)
\end{bmatrix} = M^{n-1} \times \begin{bmatrix} F(1) \\ F(0) \end{bmatrix}
$$

Thus, computing $F(n)$ reduces to computing $M^{n-1}$.<br><br>

Step 2: Fast Matrix Exponentiation Using Exponentiation by Squaring<br>
Naively multiplying $M$ $n-1$ times is $O(n)$, but we can reduce it:  

- If $n$ is even: $M^n = (M^{n/2}) \times (M^{n/2})$  
- If $n$ is odd: $M^n = M \times M^{n-1}$  

This gives $O(\log n)$ complexity.<br><br>

<b>Algorithm (Python style):</b>  

```python
def matrix_power(M, n):
    if n == 1:
        return M
    half = matrix_power(M, n // 2)
    half_squared = matrix_multiply(half, half)
    if n % 2 == 0:
        return half_squared
    else:
        return matrix_multiply(half_squared, M)
````

<br>

Step 3: Generalizing to Other Recurrence Relations<br>
Any linear homogeneous recurrence of order $k$:  

$$
T(n) = c_1 T(n-1) + c_2 T(n-2) + \ldots + c_k T(n-k)
$$

can be written as:

$$
\begin{bmatrix}
T(n) \\
T(n-1) \\
\vdots \\
T(n-k+1)
\end{bmatrix}
=
M \times
\begin{bmatrix}
T(n-1) \\
T(n-2) \\
\vdots \\
T(n-k)
\end{bmatrix}
$$

where \$M\$ is the \$k \times k\$ companion matrix:

$$
M = \begin{bmatrix}
c_1 & c_2 & \cdots & c_k \\
1 & 0 & \cdots & 0 \\
0 & 1 & \cdots & 0 \\
\vdots & \vdots & \ddots & \vdots \\
0 & 0 & \cdots & 1
\end{bmatrix}
$$

Then:

$$
\begin{bmatrix}
T(n) \\
T(n-1) \\
\vdots \\
T(n-k+1)
\end{bmatrix}
= M^{n-k+1} \times
\begin{bmatrix}
T(k) \\
T(k-1) \\
\vdots \\
T(1)
\end{bmatrix}
$$

<br>

Step 4: Practical Example<br>
Consider:  

$$
T(n) = 2T(n-1) + 3T(n-2), \quad T(1) = 1, \quad T(2) = 2
$$

Matrix form:

$$
M =
\begin{bmatrix}
2 & 3 \\
1 & 0
\end{bmatrix}, \quad
\text{Initial vector} =
\begin{bmatrix}
T(2) \\
T(1)
\end{bmatrix}
=
\begin{bmatrix}
2 \\
1
\end{bmatrix}
$$

Compute $M^{n-2} \times \text{Initial vector}$ to get $T(n)$.<br><br>

Step 5: Summary and Tips<br>
- Matrix exponentiation optimizes recurrences from $O(n)$ to $O(\log n)$.<br>
- Works for any linear homogeneous recurrence.<br>
- Construct the companion matrix $M$ carefully.<br>
- Use exponentiation by squaring.<br>
- Handle base cases with the initial state vector.<br>


More formulaes can be studied from <a href="https://r-knott.surrey.ac.uk/fibonacci/fibformulae.html" style="color:yellow">Fibonacci Formulae (R. Knott)</a>


</div>
</details>


### Table of Contents

1. [Linear DP](#linear-dp)
2. [Kadane’s Algorithm](#kadanes-algorithm)
3. [0/1 and Unbound Knapsack](#01-and-unbound-knapsack)
4. [2D Grid Traversal](#2d-grid-traversal)
5. [Edit Distance](#edit-distance)
6. [Longest Substring](#longest-substring)
7. [Longest Subsequence](#longest-subsequence)
8. [Longest common Subsequence](#longest-common-subsequence)
9. [Cumulative Sum DP](#cumulative-sum-dp)
10. [String DP](#string-dp)
11. [Interval DP](#interval-dp)
12. [Bitmask DP](#bitmask-dp)
13. [Digit DP](#digit-dp)
14. [Multi Dimensional DP](#multi-dimensional-dp)
15. [Probability DP](#probability-dp)
16. [Sigma DP](#sigma-dp)
17. [Divide and Conquer DP](#divide-and-conquer-dp)
18. [Sum Over Subset](#sum-over-subset)
19. [Tree DP](#tree-dp)
20. [Graph DP](#graph-dp)
21. [Profile DP](#profile-dp)
22. [Knuth Optimization DP](#knuth-optimization-dp)
23. [Convex Hull Trick DP](#convex-hull-trick-dp)
24. [Monotonic Queue Optimization DP](#monotonic-queue-optimization-dp)
25. [Matrix Exponentiation DP](#matrix-exponentiation-dp)
26. [Game Theory DP](#game-theory-dp)
27. [Expectation/Variance DP](#expectationvariance-dp)
28. [Online/Streaming DP](#onlinestreaming-dp)

### Linear DP

### Reference and thanks to

- [LeetCode – DP Problems List](https://leetcode.com/discuss/post/1000929/solved-all-dynamic-programming-dp-proble-8m82/) @chuka231
- [CP-Algorithms – Intro to DP](https://cp-algorithms.com/dynamic_programming/intro-to-dp.html#classic-dynamic-programming-problems) @cp-algorithms
- [Competitive Programmer’s Handbook (PDF, p.75)](https://usaco.guide/CPH.pdf#page=75) @AnttiLaaksonen
- [Codeforces Blog – DP Tutorial](https://codeforces.com/blog/entry/67679) @Ahnaf.Shahriar.Asif
- [AtCoder – Educational DP Contest](https://atcoder.jp/contests/dp/tasks) @atcoder
- [Bitmask DP – Blog](https://nwatx.me/post/dpbitmasks) @NeoWang
- [Codeforces Blog – Knapsack & Subset Sum](https://codeforces.com/blog/entry/98663) @Errorgorn
- [Codeforces Blog – DP Tricks](https://codeforces.com/blog/entry/47764) @zscoder
- [SPOJ – Digit Sum Problem](https://www.spoj.com/problems/PR003004/) @spoj
- [Codeforces Blog – SOS DP](https://codeforces.com/blog/entry/45223) @usaxena95
