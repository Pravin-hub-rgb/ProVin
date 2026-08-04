Chalo Phase 1 ki full list — pattern-wise organized, easy se medium tak progression ke saath. LeetCode pe search karo naam se, sab mil jayenge.

## 1. Arrays — Basics (warm-up, jaldi nikal jayenge)
1. Find Maximum/Minimum in Array
2. Reverse an Array
3. Move Zeroes to End
4. Rotate Array (by k steps)
5. Find Second Largest Element
6. Remove Duplicates from Sorted Array

## 2. Two Pointers
7. Two Sum (sorted array version)
8. Valid Palindrome
9. Container With Most Water
10. Sort Colors (Dutch National Flag)
11. Remove Duplicates from Sorted Array II
12. 3Sum
13. 3Sum Closest
14. Trapping Rain Water (thoda tough hai, Phase end pe try karna)

## 3. Sliding Window
15. Maximum Sum Subarray of Size K (fixed window)
16. Longest Substring Without Repeating Characters
17. Minimum Size Subarray Sum
18. Fruits Into Baskets
19. Longest Repeating Character Replacement
20. Minimum Window Substring (tough — end me karna)
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

## 6. Hashing (HashMap/HashSet) — bahut important hai yeh section
29. Two Sum (classic — unsorted)
30. Contains Duplicate
31. Group Anagrams
32. Top K Frequent Elements
33. Longest Consecutive Sequence
34. Valid Anagram
35. Subarray Sum Equals K (dobara — hashmap approach se)
36. First Unique Character in a String
37. Intersection of Two Arrays

## 7. Basic String Patterns
38. Reverse Words in a String
39. Valid Anagram (already covered above)
40. String Compression
41. Longest Common Prefix
42. Check if String is Rotation of Another
43. Isomorphic Strings

## 8. Mixed/Extra (jab confidence aa jaye tab)
44. Merge Intervals
45. Insert Interval
46. Majority Element (Boyer-Moore)
47. Next Permutation

---

**Kaise attack karna hai:**
- Ek section pura karo before next pe jao (Arrays → Two Pointers → Sliding Window → ...)
- Har problem: 20-30 min khud try karo, phir solution dekho, phir **bina dekhe dobara likho**
- Weekly ek revision session rakho jisme purane 5-6 solved problems phir se (bina dekhe) solve karo — yeh pattern ko permanent banata hai

Yeh 47 ho gaye — thoda extra rakha hai target se, so agar kuch skip bhi karo to 40+ ka target easily hit ho jayega.

Phase 1 khatam karne ke baad bata dena, Phase 2 (Linked List + Stack + Queue + Binary Search) ki list de dunga.

Chalo Phase 2 — Linked List + Stack + Queue + Binary Search.

## 1. Linked List — Basics
1. Reverse a Linked List (iterative + recursive dono try karna)
2. Middle of Linked List (slow-fast pointer)
3. Detect Cycle in Linked List (Floyd's cycle detection)
4. Find Cycle Starting Point
5. Merge Two Sorted Linked Lists
6. Remove Nth Node From End of List
7. Palindrome Linked List

## 2. Linked List — Intermediate
8. Reverse Linked List in Groups of K (roadmap me "must do" bola tha — important hai)
9. Add Two Numbers (represented as linked list)
10. Intersection of Two Linked Lists
11. Copy List with Random Pointer
12. Flatten a Multilevel Doubly Linked List
13. Rotate List

## 3. LRU Cache (concept — thoda alag hai but bahut common interview question)
14. LRU Cache (Design) — yeh HashMap + Doubly Linked List combine karta hai, thoda tough hai, but bahut frequently poocha jata hai. Isko akela treat karo, time do isse.

## 4. Stack — Basics
15. Valid Parentheses
16. Min Stack (design)
17. Implement Stack using Array/Queue

## 5. Stack — Patterns
18. Next Greater Element I
19. Next Greater Element II (circular array version)
20. Daily Temperatures
21. Largest Rectangle in Histogram (tough — end me karna)
22. Trapping Rain Water using Stack (already Phase 1 me Two Pointer se kiya tha, ab stack approach try karo — same problem, dusra tareeka)
23. Evaluate Reverse Polish Notation
24. Remove K Digits (Monotonic stack)

## 6. Queue + Deque
25. Implement Queue using Stacks
26. Implement Circular Queue
27. Sliding Window Maximum (Deque-based — important, Phase 1 ke Sliding Window ka advanced version)
28. First Negative Number in Every Window of Size K

## 7. Binary Search — Basics
29. Binary Search (classic)
30. Search Insert Position
31. First and Last Position of Element in Sorted Array
32. Search in Rotated Sorted Array
33. Find Minimum in Rotated Sorted Array

## 8. Binary Search — "Search on Answer" (yeh pattern alag samjho, important hai)
34. Aggressive Cows (GFG pe milega, LeetCode pe nahi)
35. Koko Eating Bananas
36. Capacity To Ship Packages Within D Days
37. Painter's Partition Problem / Split Array Largest Sum

---

**Total: 37 questions.**

### Ek note "Search on Answer" pattern pe:
Yeh naya concept hoga tumhare liye — normal binary search me hum array me search karte hain, but yahan hum **possible answers ke range** pe binary search karte hain (e.g. "minimum capacity kya ho sakti hai" — capacity ki range pe search). Recognition signal: jab problem me "minimum/maximum X aisa dhundo jisse condition Y satisfy ho" — aur brute force me tum har possible value try kar sakte ho — tab samajh jao yeh pattern hai.

### Priority order agar time kam lage:
Reverse LL, Cycle Detect, Merge Two Sorted LL → Valid Parentheses, Next Greater Element → Binary Search classic + Rotated Array → phir baaki.

LRU Cache aur "Search on Answer" wale thoda zyada time maang sakte hain — ghabrana mat, yeh naturally tough hote hain shuru me.

Jab yeh khatam ho jaye, bata dena — Phase 3 (Recursion + Backtracking + Trees + BST) ki list ready rakhunga.



Chalo Phase 3 — Recursion + Backtracking + Trees + BST.

## 1. Recursion — Basics (warm-up, pehle yeh clear karo)
1. Factorial (recursive)
2. Fibonacci Number (recursive + memoization dono try karna)
3. Sum of Digits (recursive)
4. Power of a Number (x^n) — recursive, O(log n) wala trick
5. Reverse a String (recursive)
6. Check if String is Palindrome (recursive)

## 2. Recursion — Intermediate
7. Print All Subsequences of a String/Array
8. Generate All Subsets (Power Set) — yeh backtracking ka bridge hai
9. Josephus Problem
10. Tower of Hanoi

## 3. Backtracking
11. Subsets
12. Subsets II (with duplicates)
13. Permutations
14. Permutations II (with duplicates)
15. Combination Sum
16. Combination Sum II
17. N-Queens (roadmap me tha, low priority for Gurgaon startups — but concept samajhna achha hai)
18. Word Search
19. Palindrome Partitioning

## 4. Binary Tree — Traversals (yeh sab foundation hai, bahut zaroori)
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
35. Flatten Binary Tree to Linked List (roadmap ka "must do")
36. Vertical Order Traversal (roadmap ka "must do")
37. Construct Binary Tree from Inorder and Preorder
38. Serialize and Deserialize Binary Tree (roadmap ka "must do" — tough hai, end me karna)

## 7. Binary Search Tree (BST)
39. Validate Binary Search Tree
40. Insert into a BST
41. Delete Node in a BST
42. Kth Smallest Element in a BST
43. Lowest Common Ancestor of BST (normal tree se easier hai, BST property use hoti hai)
44. Convert Sorted Array to BST
45. Two Sum IV — Input is a BST

---

**Total: 45 questions.**

### Priority order agar time kam lage:
Recursion basics → Subsets/Permutations → Tree Traversals (sab 4) → Height/Diameter/LCA → BST Validate/Insert/Delete → baaki Word Search, Serialize-Deserialize jaise tough wale end me.

### Ek important note:
Yeh phase pichle dono se thoda heavy hai — recursion ka "trust the recursion" mindset build hone me time lagta hai shuru me (khud ko baar baar samjhana padta hai "main is function ka kaam nahi soch raha, bas iska base case aur ek step aage ka trust kar raha hoon"). Agar atko to normal hai — Tree traversals ke baad chize apne aap click karne lagti hain.

Jab yeh khatam ho, Phase 4 (Heaps + Graphs + DP — light version) ready rakhunga.

Chalo Phase 4 — Heaps (light) + Graphs (basic) + DP (basic). Yeh phase thodi trimmed hai jaanbujh ke — Gurgaon full-stack roles ke hisaab se deep advanced stuff skip kiya hai.

## 1. Heaps / Priority Queue (light — sirf yeh karo)
1. Kth Largest Element in an Array
2. Top K Frequent Elements (Phase 1 me hashmap se kiya tha, ab heap approach try karo)
3. Last Stone Weight
4. K Closest Points to Origin
5. Find Median from Data Stream (thoda tough — two-heap trick, important hai)

*(MST, advanced heap wale skip — Tier-1 companies ke liye chahiye, abhi nahi)*

## 2. Graphs — Traversal Basics
6. Number of Islands (BFS/DFS classic — bahut common)
7. Flood Fill
8. Max Area of Island
9. Clone Graph
10. Rotting Oranges (BFS multi-source)

## 3. Graphs — Cycle Detection + Topological Sort
11. Course Schedule (cycle detect — directed graph)
12. Course Schedule II (topological sort output)
13. Detect Cycle in Undirected Graph

## 4. Graphs — Extra Useful
14. Word Ladder (roadmap ka "must do", BFS shortest path)
15. Number of Provinces (Union-Find bhi try kar sakte ho yahan)
16. Graph Valid Tree

*(Dijkstra, Bellman-Ford, Prim's/Kruskal skip — abhi ki priority nahi, agar future me Tier-1 target karo tab add karenge)*

## 5. DP — 1D
17. Climbing Stairs
18. House Robber
19. House Robber II (circular)
20. Frog Jump (GFG pe milega)
21. Maximum Subarray (already Kadane se kiya tha Phase 1 — ab DP lens se dekho)
22. Decode Ways

## 6. DP — 2D / Grid
23. Unique Paths
24. Unique Paths II (with obstacles)
25. Minimum Path Sum

## 7. DP — Knapsack Family (roadmap ne priority #1 bataya tha)
26. 0/1 Knapsack (GFG — classic, concept clear karo)
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

### Priority order agar time kam lage:
Number of Islands → Course Schedule (I & II) → Climbing Stairs/House Robber → 0/1 Knapsack → LCS → baaki.

### Ek important mindset note for DP:
DP sabse zyada log darte hain, but pattern simple hai — har DP problem me poochho:
1. **Choice kya hai** har step pe? (le lo ya chhodo, is index tak jao ya na jao)
2. **State kya define karta hai** problem ko? (index, remaining capacity, etc.)
3. Pehle **recursion likho** (brute force), phir **memoize** karo (top-down), phir chaho to **tabulation** (bottom-up) me convert karo.

Seedha tabulation se shuru mat karo — recursion → memoization wala flow follow karo, samajh jaldi aayega.

Phase 4 khatam hote hi tum **already interview-ready** ho Gurgaon full-stack roles ke liye. Phase 5 sirf polish hai — JS/TS interview questions + SQL + resume + mocks. Woh list bhi chahiye ho to bata dena.