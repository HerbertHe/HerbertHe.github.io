import{_ as s,o as n,c as a,Q as l}from"./chunks/framework.9818e7a8.js";const d=JSON.parse('{"title":"Leetcode-206-反转链表","description":"","frontmatter":{"title":"Leetcode-206-反转链表","date":"2021-03-23T15:31:27.000Z","toc":true,"tags":["算法","面试"],"categories":["Leetcode"]},"headers":[],"relativePath":"posts/zh/Leetcode-206-反转链表.md","filePath":"posts/zh/Leetcode-206-反转链表.md"}'),p={name:"posts/zh/Leetcode-206-反转链表.md"},e=l(`<h2 id="反转链表" tabindex="-1">反转链表 <a class="header-anchor" href="#反转链表" aria-label="Permalink to &quot;反转链表&quot;">​</a></h2><p>题见: <a href="https://leetcode-cn.com/problems/reverse-linked-list/" target="_blank" rel="noreferrer">反转链表</a></p><h2 id="破题" tabindex="-1">破题 <a class="header-anchor" href="#破题" aria-label="Permalink to &quot;破题&quot;">​</a></h2><div class="language-text line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki nord"><code><span class="line"><span style="color:#d8dee9ff;">输入: 1 -&gt; 2 -&gt; 3 -&gt; 4 -&gt; 5 -&gt; NULL</span></span>
<span class="line"><span style="color:#d8dee9ff;">输出: 5 -&gt; 4 -&gt; 3 -&gt; 2 -&gt; 1 -&gt; NULL</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><p>注释给的定义为</p><div class="language-js line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki nord"><code><span class="line"><span style="color:#616E88;">/**</span></span>
<span class="line"><span style="color:#616E88;"> * Definition for singly-linked list.</span></span>
<span class="line"><span style="color:#616E88;"> * function ListNode(val, next) {</span></span>
<span class="line"><span style="color:#616E88;"> *     this.val = (val===undefined ? 0 : val)</span></span>
<span class="line"><span style="color:#616E88;"> *     this.next = (next===undefined ? null : next)</span></span>
<span class="line"><span style="color:#616E88;"> * }</span></span>
<span class="line"><span style="color:#616E88;"> */</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br></div></div><p>题解中给的遍历很好理解, 即把<code>next</code>指向上一个, 而当前的节点是下一个的上一个节点, 需要定义一个变量<code>prev</code>储存为下一个节点使用的上一个节点(也就是当前节点), 最后的返回值必定为最后保存的<code>prev</code>(此时迭代已经越界)</p><h2 id="题解" tabindex="-1">题解 <a class="header-anchor" href="#题解" aria-label="Permalink to &quot;题解&quot;">​</a></h2><div class="language-js line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki nord"><code><span class="line"><span style="color:#616E88;">/**</span></span>
<span class="line"><span style="color:#616E88;"> * </span><span style="color:#ECEFF4;">@</span><span style="color:#8FBCBB;">param</span><span style="color:#616E88;"> </span><span style="color:#ECEFF4;">{</span><span style="color:#616E88;">ListNode</span><span style="color:#ECEFF4;">}</span><span style="color:#616E88;"> </span><span style="color:#D8DEE9;">head</span></span>
<span class="line"><span style="color:#616E88;"> * </span><span style="color:#ECEFF4;">@</span><span style="color:#8FBCBB;">return</span><span style="color:#616E88;"> </span><span style="color:#ECEFF4;">{</span><span style="color:#616E88;">ListNode</span><span style="color:#ECEFF4;">}</span></span>
<span class="line"><span style="color:#616E88;"> */</span></span>
<span class="line"><span style="color:#81A1C1;">var</span><span style="color:#D8DEE9FF;"> </span><span style="color:#88C0D0;">reverseList</span><span style="color:#D8DEE9FF;"> </span><span style="color:#81A1C1;">=</span><span style="color:#D8DEE9FF;"> </span><span style="color:#81A1C1;">function</span><span style="color:#ECEFF4;">(</span><span style="color:#D8DEE9;">head</span><span style="color:#ECEFF4;">)</span><span style="color:#D8DEE9FF;"> </span><span style="color:#ECEFF4;">{</span></span>
<span class="line"><span style="color:#D8DEE9FF;">    </span><span style="color:#81A1C1;">let</span><span style="color:#D8DEE9FF;"> </span><span style="color:#D8DEE9;">prev</span><span style="color:#D8DEE9FF;"> </span><span style="color:#81A1C1;">=</span><span style="color:#D8DEE9FF;"> </span><span style="color:#81A1C1;">null</span></span>
<span class="line"><span style="color:#D8DEE9FF;">    </span><span style="color:#81A1C1;">let</span><span style="color:#D8DEE9FF;"> </span><span style="color:#D8DEE9;">curr</span><span style="color:#D8DEE9FF;"> </span><span style="color:#81A1C1;">=</span><span style="color:#D8DEE9FF;"> </span><span style="color:#D8DEE9;">head</span><span style="color:#D8DEE9FF;">  </span><span style="color:#616E88;">// 初始化当前节点</span></span>
<span class="line"><span style="color:#D8DEE9FF;">    </span><span style="color:#81A1C1;">while</span><span style="color:#D8DEE9FF;">(</span><span style="color:#D8DEE9;">curr</span><span style="color:#D8DEE9FF;">) </span><span style="color:#ECEFF4;">{</span></span>
<span class="line"><span style="color:#D8DEE9FF;">        </span><span style="color:#81A1C1;">const</span><span style="color:#D8DEE9FF;"> </span><span style="color:#D8DEE9;">next</span><span style="color:#D8DEE9FF;"> </span><span style="color:#81A1C1;">=</span><span style="color:#D8DEE9FF;"> </span><span style="color:#D8DEE9;">curr</span><span style="color:#ECEFF4;">.</span><span style="color:#D8DEE9;">next</span><span style="color:#D8DEE9FF;">  </span><span style="color:#616E88;">// 储存下一个节点, 需要反转</span></span>
<span class="line"><span style="color:#D8DEE9FF;">        </span><span style="color:#D8DEE9;">curr</span><span style="color:#ECEFF4;">.</span><span style="color:#D8DEE9;">next</span><span style="color:#D8DEE9FF;"> </span><span style="color:#81A1C1;">=</span><span style="color:#D8DEE9FF;"> </span><span style="color:#D8DEE9;">prev</span><span style="color:#D8DEE9FF;">  </span><span style="color:#616E88;">// 反转链表</span></span>
<span class="line"><span style="color:#D8DEE9FF;">        </span><span style="color:#D8DEE9;">prev</span><span style="color:#D8DEE9FF;"> </span><span style="color:#81A1C1;">=</span><span style="color:#D8DEE9FF;"> </span><span style="color:#D8DEE9;">curr</span><span style="color:#D8DEE9FF;">  </span><span style="color:#616E88;">// 保存反转之后的链表</span></span>
<span class="line"><span style="color:#D8DEE9FF;">        </span><span style="color:#D8DEE9;">curr</span><span style="color:#D8DEE9FF;"> </span><span style="color:#81A1C1;">=</span><span style="color:#D8DEE9FF;"> </span><span style="color:#D8DEE9;">next</span><span style="color:#D8DEE9FF;">  </span><span style="color:#616E88;">// 继续迭代</span></span>
<span class="line"><span style="color:#D8DEE9FF;">    </span><span style="color:#ECEFF4;">}</span></span>
<span class="line"><span style="color:#ECEFF4;">    </span><span style="color:#616E88;">// 返回最后的最前</span></span>
<span class="line"><span style="color:#D8DEE9FF;">    </span><span style="color:#81A1C1;">return</span><span style="color:#D8DEE9FF;"> </span><span style="color:#D8DEE9;">prev</span></span>
<span class="line"><span style="color:#ECEFF4;">}</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br></div></div>`,9),o=[e];function r(c,t,E,i,y,D){return n(),a("div",null,o)}const b=s(p,[["render",r]]);export{d as __pageData,b as default};
