import{_ as s,o as n,c as a,Q as p}from"./chunks/framework.53d25516.js";const d=JSON.parse('{"title":"Leetcode-160-相交链表","description":"","frontmatter":{"title":"Leetcode-160-相交链表","date":"2021-03-25T18:51:59.000Z","toc":true,"tags":["算法","面试"],"categories":["Leetcode"]},"headers":[],"relativePath":"posts/zh/Leetcode-160-相交链表.md","filePath":"posts/zh/Leetcode-160-相交链表.md"}'),l={name:"posts/zh/Leetcode-160-相交链表.md"},o=p(`<h2 id="相交链表" tabindex="-1">相交链表 <a class="header-anchor" href="#相交链表" aria-label="Permalink to &quot;相交链表&quot;">​</a></h2><p>题目: <a href="https://leetcode-cn.com/problems/intersection-of-two-linked-lists/" target="_blank" rel="noreferrer">相交链表</a></p><h2 id="破题" tabindex="-1">破题 <a class="header-anchor" href="#破题" aria-label="Permalink to &quot;破题&quot;">​</a></h2><p>一开始面对这题, 第一反应就是暴力去解题了。看了一眼题解, 双指针的解法特别的优雅。</p><p>如果两个单链表有相同节点的话, 那两个链表的指针必然 <strong>headA --&gt; headB</strong> 和 <strong>headB --&gt; headA</strong> 过程中有相遇, 相遇的时候节点就是交叉的节点。</p><p>举个栗子</p><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">headA</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> [</span><span style="color:#79B8FF;">4</span><span style="color:#E1E4E8;">, </span><span style="color:#79B8FF;">1</span><span style="color:#E1E4E8;">, </span><span style="color:#79B8FF;">8</span><span style="color:#E1E4E8;">, </span><span style="color:#79B8FF;">4</span><span style="color:#E1E4E8;">, </span><span style="color:#79B8FF;">5</span><span style="color:#E1E4E8;">]</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">headB</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> [</span><span style="color:#79B8FF;">5</span><span style="color:#E1E4E8;">, </span><span style="color:#79B8FF;">0</span><span style="color:#E1E4E8;">, </span><span style="color:#79B8FF;">1</span><span style="color:#E1E4E8;">, </span><span style="color:#79B8FF;">8</span><span style="color:#E1E4E8;">, </span><span style="color:#79B8FF;">4</span><span style="color:#E1E4E8;">, </span><span style="color:#79B8FF;">5</span><span style="color:#E1E4E8;">]</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">// pA: 4 -&gt; 1 -&gt; 8 -&gt; 4 -&gt; 5 -&gt; null -&gt; 5 -&gt; 0 -&gt; 1 -&gt; 8 -&gt; 4 -&gt; 5 -&gt; null</span></span>
<span class="line"><span style="color:#6A737D;">// pB: 5 -&gt; 0 -&gt; 1 -&gt; 8 -&gt; 4 -&gt; 5 -&gt; null -&gt; 4 -&gt; 1 -&gt; 8 -&gt; 4 -&gt; 5 -&gt; null</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">headA</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> [</span><span style="color:#005CC5;">4</span><span style="color:#24292E;">, </span><span style="color:#005CC5;">1</span><span style="color:#24292E;">, </span><span style="color:#005CC5;">8</span><span style="color:#24292E;">, </span><span style="color:#005CC5;">4</span><span style="color:#24292E;">, </span><span style="color:#005CC5;">5</span><span style="color:#24292E;">]</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">headB</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> [</span><span style="color:#005CC5;">5</span><span style="color:#24292E;">, </span><span style="color:#005CC5;">0</span><span style="color:#24292E;">, </span><span style="color:#005CC5;">1</span><span style="color:#24292E;">, </span><span style="color:#005CC5;">8</span><span style="color:#24292E;">, </span><span style="color:#005CC5;">4</span><span style="color:#24292E;">, </span><span style="color:#005CC5;">5</span><span style="color:#24292E;">]</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">// pA: 4 -&gt; 1 -&gt; 8 -&gt; 4 -&gt; 5 -&gt; null -&gt; 5 -&gt; 0 -&gt; 1 -&gt; 8 -&gt; 4 -&gt; 5 -&gt; null</span></span>
<span class="line"><span style="color:#6A737D;">// pB: 5 -&gt; 0 -&gt; 1 -&gt; 8 -&gt; 4 -&gt; 5 -&gt; null -&gt; 4 -&gt; 1 -&gt; 8 -&gt; 4 -&gt; 5 -&gt; null</span></span></code></pre></div><h2 id="题解" tabindex="-1">题解 <a class="header-anchor" href="#题解" aria-label="Permalink to &quot;题解&quot;">​</a></h2><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;">/**</span></span>
<span class="line"><span style="color:#6A737D;"> * Definition for singly-linked list.</span></span>
<span class="line"><span style="color:#6A737D;"> * function ListNode(val) {</span></span>
<span class="line"><span style="color:#6A737D;"> *     this.val = val;</span></span>
<span class="line"><span style="color:#6A737D;"> *     this.next = null;</span></span>
<span class="line"><span style="color:#6A737D;"> * }</span></span>
<span class="line"><span style="color:#6A737D;"> */</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">/**</span></span>
<span class="line"><span style="color:#6A737D;"> * </span><span style="color:#F97583;">@param</span><span style="color:#6A737D;"> </span><span style="color:#B392F0;">{ListNode}</span><span style="color:#6A737D;"> </span><span style="color:#E1E4E8;">headA</span></span>
<span class="line"><span style="color:#6A737D;"> * </span><span style="color:#F97583;">@param</span><span style="color:#6A737D;"> </span><span style="color:#B392F0;">{ListNode}</span><span style="color:#6A737D;"> </span><span style="color:#E1E4E8;">headB</span></span>
<span class="line"><span style="color:#6A737D;"> * </span><span style="color:#F97583;">@return</span><span style="color:#6A737D;"> </span><span style="color:#B392F0;">{ListNode}</span></span>
<span class="line"><span style="color:#6A737D;"> */</span></span>
<span class="line"><span style="color:#F97583;">var</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">getIntersectionNode</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">function</span><span style="color:#E1E4E8;">(</span><span style="color:#FFAB70;">headA</span><span style="color:#E1E4E8;">, </span><span style="color:#FFAB70;">headB</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> (headA </span><span style="color:#F97583;">===</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">null</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">||</span><span style="color:#E1E4E8;"> headB </span><span style="color:#F97583;">===</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">null</span><span style="color:#E1E4E8;">) </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">null</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">let</span><span style="color:#E1E4E8;"> pA </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> headA, pB </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> headB</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">while</span><span style="color:#E1E4E8;">(pA </span><span style="color:#F97583;">!==</span><span style="color:#E1E4E8;"> pB) {</span></span>
<span class="line"><span style="color:#E1E4E8;">        pA </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> pA </span><span style="color:#F97583;">===</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">null</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">?</span><span style="color:#E1E4E8;"> headB </span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> pA.next</span></span>
<span class="line"><span style="color:#E1E4E8;">        pB </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> pB </span><span style="color:#F97583;">===</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">null</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">?</span><span style="color:#E1E4E8;"> headA </span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> pB.next</span></span>
<span class="line"><span style="color:#E1E4E8;">        console.</span><span style="color:#B392F0;">log</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;pA&quot;</span><span style="color:#E1E4E8;">, pA)</span></span>
<span class="line"><span style="color:#E1E4E8;">        console.</span><span style="color:#B392F0;">log</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;pB&quot;</span><span style="color:#E1E4E8;">, pB)</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> pA</span></span>
<span class="line"><span style="color:#E1E4E8;">};</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">// 控制台输出:</span></span>
<span class="line"><span style="color:#6A737D;">// pA [1,8,4,5]</span></span>
<span class="line"><span style="color:#6A737D;">// pB [6,1,8,4,5]</span></span>
<span class="line"><span style="color:#6A737D;">// pA [8,4,5]</span></span>
<span class="line"><span style="color:#6A737D;">// pB [1,8,4,5]</span></span>
<span class="line"><span style="color:#6A737D;">// pA [4,5]</span></span>
<span class="line"><span style="color:#6A737D;">// pB [8,4,5]</span></span>
<span class="line"><span style="color:#6A737D;">// pA [5]</span></span>
<span class="line"><span style="color:#6A737D;">// pB [4,5]</span></span>
<span class="line"><span style="color:#6A737D;">// pA null</span></span>
<span class="line"><span style="color:#6A737D;">// pB [5]</span></span>
<span class="line"><span style="color:#6A737D;">// pA [5,6,1,8,4,5]</span></span>
<span class="line"><span style="color:#6A737D;">// pB null</span></span>
<span class="line"><span style="color:#6A737D;">// pA [6,1,8,4,5]</span></span>
<span class="line"><span style="color:#6A737D;">// pB [4,1,8,4,5]</span></span>
<span class="line"><span style="color:#6A737D;">// pA [1,8,4,5]</span></span>
<span class="line"><span style="color:#6A737D;">// pB [1,8,4,5]</span></span>
<span class="line"><span style="color:#6A737D;">// pA [8,4,5]</span></span>
<span class="line"><span style="color:#6A737D;">// pB [8,4,5]</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;">/**</span></span>
<span class="line"><span style="color:#6A737D;"> * Definition for singly-linked list.</span></span>
<span class="line"><span style="color:#6A737D;"> * function ListNode(val) {</span></span>
<span class="line"><span style="color:#6A737D;"> *     this.val = val;</span></span>
<span class="line"><span style="color:#6A737D;"> *     this.next = null;</span></span>
<span class="line"><span style="color:#6A737D;"> * }</span></span>
<span class="line"><span style="color:#6A737D;"> */</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">/**</span></span>
<span class="line"><span style="color:#6A737D;"> * </span><span style="color:#D73A49;">@param</span><span style="color:#6A737D;"> </span><span style="color:#6F42C1;">{ListNode}</span><span style="color:#6A737D;"> </span><span style="color:#24292E;">headA</span></span>
<span class="line"><span style="color:#6A737D;"> * </span><span style="color:#D73A49;">@param</span><span style="color:#6A737D;"> </span><span style="color:#6F42C1;">{ListNode}</span><span style="color:#6A737D;"> </span><span style="color:#24292E;">headB</span></span>
<span class="line"><span style="color:#6A737D;"> * </span><span style="color:#D73A49;">@return</span><span style="color:#6A737D;"> </span><span style="color:#6F42C1;">{ListNode}</span></span>
<span class="line"><span style="color:#6A737D;"> */</span></span>
<span class="line"><span style="color:#D73A49;">var</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">getIntersectionNode</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">function</span><span style="color:#24292E;">(</span><span style="color:#E36209;">headA</span><span style="color:#24292E;">, </span><span style="color:#E36209;">headB</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> (headA </span><span style="color:#D73A49;">===</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">null</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">||</span><span style="color:#24292E;"> headB </span><span style="color:#D73A49;">===</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">null</span><span style="color:#24292E;">) </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">null</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">let</span><span style="color:#24292E;"> pA </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> headA, pB </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> headB</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">while</span><span style="color:#24292E;">(pA </span><span style="color:#D73A49;">!==</span><span style="color:#24292E;"> pB) {</span></span>
<span class="line"><span style="color:#24292E;">        pA </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> pA </span><span style="color:#D73A49;">===</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">null</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">?</span><span style="color:#24292E;"> headB </span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> pA.next</span></span>
<span class="line"><span style="color:#24292E;">        pB </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> pB </span><span style="color:#D73A49;">===</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">null</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">?</span><span style="color:#24292E;"> headA </span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> pB.next</span></span>
<span class="line"><span style="color:#24292E;">        console.</span><span style="color:#6F42C1;">log</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;pA&quot;</span><span style="color:#24292E;">, pA)</span></span>
<span class="line"><span style="color:#24292E;">        console.</span><span style="color:#6F42C1;">log</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;pB&quot;</span><span style="color:#24292E;">, pB)</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> pA</span></span>
<span class="line"><span style="color:#24292E;">};</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">// 控制台输出:</span></span>
<span class="line"><span style="color:#6A737D;">// pA [1,8,4,5]</span></span>
<span class="line"><span style="color:#6A737D;">// pB [6,1,8,4,5]</span></span>
<span class="line"><span style="color:#6A737D;">// pA [8,4,5]</span></span>
<span class="line"><span style="color:#6A737D;">// pB [1,8,4,5]</span></span>
<span class="line"><span style="color:#6A737D;">// pA [4,5]</span></span>
<span class="line"><span style="color:#6A737D;">// pB [8,4,5]</span></span>
<span class="line"><span style="color:#6A737D;">// pA [5]</span></span>
<span class="line"><span style="color:#6A737D;">// pB [4,5]</span></span>
<span class="line"><span style="color:#6A737D;">// pA null</span></span>
<span class="line"><span style="color:#6A737D;">// pB [5]</span></span>
<span class="line"><span style="color:#6A737D;">// pA [5,6,1,8,4,5]</span></span>
<span class="line"><span style="color:#6A737D;">// pB null</span></span>
<span class="line"><span style="color:#6A737D;">// pA [6,1,8,4,5]</span></span>
<span class="line"><span style="color:#6A737D;">// pB [4,1,8,4,5]</span></span>
<span class="line"><span style="color:#6A737D;">// pA [1,8,4,5]</span></span>
<span class="line"><span style="color:#6A737D;">// pB [1,8,4,5]</span></span>
<span class="line"><span style="color:#6A737D;">// pA [8,4,5]</span></span>
<span class="line"><span style="color:#6A737D;">// pB [8,4,5]</span></span></code></pre></div>`,9),e=[o];function t(c,r,y,E,i,A){return n(),a("div",null,e)}const F=s(l,[["render",t]]);export{d as __pageData,F as default};
