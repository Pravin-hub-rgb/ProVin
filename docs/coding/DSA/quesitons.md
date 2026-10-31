Here's the full Phase 1 list — organized by pattern, with easy-to-medium progression. Search by name on LeetCode; you'll find them all.

> **Progress tracker:** ✅ marked problems already have solved files in the course — `1.3.x` files for the Arrays series, `1.4.x` files for the Two Pointers series. Read the solution file, then write it again yourself (without looking) — that's when it really sticks.

## 1. Arrays — Basics (warm-up, quick to clear) — non-two-pointer problems only
1. ✅ Find Maximum/Minimum in Array → `1.3.1`
2. ✅ Rotate Array (by k steps) → `1.3.2`
3. Find Second Largest Element
4. Plus One (digits with carry)
5. Single Number (XOR trick — every number appears twice, one appears once)
6. Missing Number (one missing from 0 to n)
7. Valid Mountain Array (increases before peak, decreases after)
8. Monotonic Array (entirely non-decreasing or non-increasing)

## 2. Two Pointers
9. ✅ Move Zeroes to End → `1.4.1` (fast/slow same-direction variant)
10. ✅ Reverse an Array → `1.4.2` (left/right swap variant)
11. Remove Duplicates from Sorted Array → `1.4.3` (fast/slow — same pattern as Move Zeroes)
12. Two Sum (sorted array version)
13. Valid Palindrome
14. Container With Most Water
15. Sort Colors (Dutch National Flag)
16. Remove Duplicates from Sorted Array II
17. 3Sum
18. 3Sum Closest
19. Trapping Rain Water (a bit tough — try at end of phase)

## 3. Sliding Window
15. Maximum Sum Subarray of Size K (fixed window)
16. Longest Substring Without Repeating Characters
17. Minimum Size Subarray Sum
18. Fruits Into Baskets
19. Longest Repeating Character Replacement
20. Minimum Window Substring (tough — do at the end)
21. Permutation in String

## 4. Prefix Sum
22. Range Sum Query — Immutable
23. Subarray Sum Equals K
24. Product of Array Except Self
25. Find Pivot Index

## 5. Kadane's Algorithm (Subarray/Max-Min pattern)
26. Maximum Subarray (Kadane's)
27. Maximum Product Subarray
28. Best Time to Buy and Sell Stock

## 6. Hashing (HashMap/HashSet) — very important section
29. Two Sum (classic — unsorted)
30. Contains Duplicate
31. Group Anagrams
32. Top K Frequent Elements
33. Longest Consecutive Sequence
34. Valid Anagram
35. Subarray Sum Equals K (again — hashmap approach)
36. First Unique Character in a String
37. Intersection of Two Arrays

## 7. Basic String Patterns
38. Reverse Words in a String
39. Valid Anagram (already covered above)
40. String Compression
41. Longest Common Prefix
42. Check if String is Rotation of Another
43. Isomorphic Strings

## 8. Mixed/Extra (once confidence builds)
44. Merge Intervals
45. Insert Interval
46. Majority Element (Boyer-Moore)
47. Next Permutation

---

**How to attack:**
- Finish one section before moving to the next (Arrays → Two Pointers → Sliding Window → ...)
- For each problem: try 20-30 min yourself, then look at the solution, then **write it again without looking**
- Keep a weekly revision session where you re-solve 5-6 old problems (without looking) — this makes patterns permanent

That's 47 problems — a little extra over target, so even if you skip some, 40+ is easily hit.

Let me know when Phase 1 is done, I'll give the Phase 2 list (Linked List + Stack + Queue + Binary Search).

Moving on to Phase 2 — Linked List + Stack + Queue + Binary Search.

## 1. Linked List — Basics
1. Reverse a Linked List (try both iterative and recursive)
2. Middle of Linked List (slow-fast pointer)
3. Detect Cycle in Linked List (Floyd's cycle detection)
4. Find Cycle Starting Point
5. Merge Two Sorted Linked Lists
6. Remove Nth Node From End of List
7. Palindrome Linked List

## 2. Linked List — Intermediate
8. Reverse Linked List in Groups of K (roadmap called this "must do" — important)
9. Add Two Numbers (represented as linked list)
10. Intersection of Two Linked Lists
11. Copy List with Random Pointer
12. Flatten a Multilevel Doubly Linked List
13. Rotate List

## 3. LRU Cache (concept — a bit different but very common interview question)
14. LRU Cache (Design) — combines HashMap + Doubly Linked List, a bit tough, but asked very frequently. Treat it as standalone, give it time.

## 4. Stack — Basics
15. Valid Parentheses
16. Min Stack (design)
17. Implement Stack using Array/Queue

## 5. Stack — Patterns
18. Next Greater Element I
19. Next Greater Element II (circular array version)
20. Daily Temperatures
21. Largest Rectangle in Histogram (tough — do at the end)
22. Trapping Rain Water using Stack (already did with Two Pointers in Phase 1 — now try the stack approach, same problem, different method)
23. Evaluate Reverse Polish Notation
24. Remove K Digits (Monotonic stack)

## 6. Queue + Deque
25. Implement Queue using Stacks
26. Implement Circular Queue
27. Sliding Window Maximum (Deque-based — important, advanced version of Phase 1's Sliding Window)
28. First Negative Number in Every Window of Size K

## 7. Binary Search — Basics
29. Binary Search (classic)
30. Search Insert Position
31. First and Last Position of Element in Sorted Array
32. Search in Rotated Sorted Array
33. Find Minimum in Rotated Sorted Array

## 8. Binary Search — "Search on Answer" (understand this pattern separately, it's important)
34. Aggressive Cows (find on GFG, not on LeetCode)
35. Koko Eating Bananas
36. Capacity To Ship Packages Within D Days
37. Painter's Partition Problem / Split Array Largest Sum

---

**Total: 37 questions.**

### A note on the "Search on Answer" pattern:
This will be a new concept — in normal binary search we search inside the array, but here we binary search over the **range of possible answers** (e.g., "what's the minimum capacity?" — search over the capacity range). Recognition signal: when the problem says "find the minimum/maximum X such that condition Y holds" — and in brute force you could try every possible value — then this is the pattern.

### Priority order if time is short:
Reverse LL, Cycle Detect, Merge Two Sorted LL → Valid Parentheses, Next Greater Element → Binary Search classic + Rotated Array → then the rest.

LRU Cache and "Search on Answer" may take more time — don't panic, these are naturally tough at first.

When this is done, let me know — Phase 3 (Recursion + Backtracking + Trees + BST) list is ready.

Moving on to Phase 3 — Recursion + Backtracking + Trees + BST.

## 1. Recursion — Basics (warm-up, clear these first)
1. Factorial (recursive)
2. Fibonacci Number (try both recursive + memoization)
3. Sum of Digits (recursive)
4. Power of a Number (x^n) — recursive, the O(log n) trick
5. Reverse a String (recursive)
6. Check if String is Palindrome (recursive)

## 2. Recursion — Intermediate
7. Print All Subsequences of a String/Array
8. Generate All Subsets (Power Set) — this bridges to backtracking
9. Josephus Problem
10. Tower of Hanoi

## 3. Backtracking
11. Subsets
12. Subsets II (with duplicates)
13. Permutations
14. Permutations II (with duplicates)
15. Combination Sum
16. Combination Sum II
17. N-Queens (roadmap said low priority for Gurgaon startups — but the concept is worth knowing)
18. Word Search
19. Palindrome Partitioning

## 4. Binary Tree — Traversals (foundation, very important)
20. Inorder Traversal (recursive + iterative)
21. Preorder Traversal (recursive + iterative)
22. Postorder Traversal (recursive + iterative)
23. Level Order Traversal (BFS)
24. Zigzag Level Order Traversal

## 5. Binary Tree — Properties
25. Maximum Depth/Height of Binary Tree
26. Diameter of Binary Tree
27. Check if Balanced Binary Tree
28. Symmetric Tree
29. Same Tree
30. Invert/Mirror a Binary Tree

## 6. Binary Tree — Intermediate/Important
31. Lowest Common Ancestor of Binary Tree
32. Path Sum
33. Path Sum II (all paths)
34. Binary Tree Maximum Path Sum
35. Flatten Binary Tree to Linked List (roadmap "must do")
36. Vertical Order Traversal (roadmap "must do")
37. Construct Binary Tree from Inorder and Preorder
38. Serialize and Deserialize Binary Tree (roadmap "must do" — tough, do at the end)

## 7. Binary Search Tree (BST)
39. Validate Binary Search Tree
40. Insert into a BST
41. Delete Node in a BST
42. Kth Smallest Element in a BST
43. Lowest Common Ancestor of BST (easier than normal tree, uses BST property)
44. Convert Sorted Array to BST
45. Two Sum IV — Input is a BST

---

**Total: 45 questions.**

### Priority order if time is short:
Recursion basics → Subsets/Permutations → Tree Traversals (all 4) → Height/Diameter/LCA → BST Validate/Insert/Delete → then tough ones like Word Search, Serialize-Deserialize at the end.

### One important note:
This phase is heavier than the previous two — building the "trust the recursion" mindset takes time at first (you have to keep telling yourself "I'm not thinking about what this function does, I'm trusting its base case and one step forward"). Getting stuck is normal — things start clicking on their own after Tree Traversals.

When this is done, Phase 4 (Heaps + Graphs + DP — light version) is ready.

Moving on to Phase 4 — Heaps (light) + Graphs (basic) + DP (basic). This phase is trimmed on purpose — advanced stuff skipped per Gurgaon full-stack role needs.

## 1. Heaps / Priority Queue (light — just do these)
1. Kth Largest Element in an Array
2. Top K Frequent Elements (did with hashmap in Phase 1 — now try heap approach)
3. Last Stone Weight
4. K Closest Points to Origin
5. Find Median from Data Stream (a bit tough — two-heap trick, important)

*(MST, advanced heap stuff skipped — needed for Tier-1 companies, not now)*

## 2. Graphs — Traversal Basics
6. Number of Islands (BFS/DFS classic — very common)
7. Flood Fill
8. Max Area of Island
9. Clone Graph
10. Rotting Oranges (BFS multi-source)

## 3. Graphs — Cycle Detection + Topological Sort
11. Course Schedule (cycle detect — directed graph)
12. Course Schedule II (topological sort output)
13. Detect Cycle in Undirected Graph

## 4. Graphs — Extra Useful
14. Word Ladder (roadmap "must do", BFS shortest path)
15. Number of Provinces (can try Union-Find here too)
16. Graph Valid Tree

*(Dijkstra, Bellman-Ford, Prim's/Kruskal skipped — not a priority right now; add when targeting Tier-1)*

## 5. DP — 1D
17. Climbing Stairs
18. House Robber
19. House Robber II (circular)
20. Frog Jump (find on GFG)
21. Maximum Subarray (already did with Kadane in Phase 1 — now view through DP lens)
22. Decode Ways

## 6. DP — 2D / Grid
23. Unique Paths
24. Unique Paths II (with obstacles)
25. Minimum Path Sum

## 7. DP — Knapsack Family (roadmap said priority #1)
26. 0/1 Knapsack (GFG — classic, get the concept clear)
27. Subset Sum
28. Partition Equal Subset Sum
29. Coin Change (unbounded knapsack variant)
30. Coin Change II

## 8. DP — LCS Family (priority #2)
31. Longest Common Subsequence
32. Longest Palindromic Subsequence
33. Edit Distance
34. Longest Increasing Subsequence (LIS)

---

**Total: 34 questions.**

### Priority order if time is short:
Number of Islands → Course Schedule (I & II) → Climbing Stairs/House Robber → 0/1 Knapsack → LCS → then the rest.

### One important mindset note for DP:
Most people fear DP, but the pattern is simple — ask these on every DP problem:
1. **What's the choice** at each step? (take or skip, go to this index or not)
2. **What does the state define** about the problem? (index, remaining capacity, etc.)
3. First **write recursion** (brute force), then **memoize** (top-down), then convert to **tabulation** (bottom-up) if you want.

Don't start directly with tabulation — follow the recursion → memoization flow, understanding comes faster.

After Phase 4 you're **already interview-ready** for Gurgaon full-stack roles. Phase 5 is just polish — JS/TS interview questions + SQL + resume + mocks. Let me know if you want that list too.