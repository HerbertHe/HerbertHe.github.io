import{_ as s,o as n,c as a,Q as l}from"./chunks/framework.9818e7a8.js";const e="/img/matlab基础.jpg",_=JSON.parse('{"title":"写给程序员的MATLAB快速上手教程","description":"","frontmatter":{"title":"写给程序员的MATLAB快速上手教程","date":"2021-03-21T21:37:42.000Z","toc":true,"tags":["MATLAB","快速上手","程序员"]},"headers":[],"relativePath":"posts/zh/写给程序员的MATLAB快速上手教程.md","filePath":"posts/zh/写给程序员的MATLAB快速上手教程.md"}'),p={name:"posts/zh/写给程序员的MATLAB快速上手教程.md"},r=l('<h2 id="写在前面的" tabindex="-1">写在前面的 <a class="header-anchor" href="#写在前面的" aria-label="Permalink to &quot;写在前面的&quot;">​</a></h2><p>MATLAB更多的是一门面向非程序员的计算机编程语言, 因此其教程往往对于程序员同学来说并不算是很&quot;友好&quot;。因为自己的本科毕业论文是利用MATLAB来研究光的波动性, 之前因为教程的问题一直感觉MATLAB这个语言奇奇怪怪的, 故作为一个程序员的视角自己来写一份教程。本教程会对比其它语言或者编程语言通用的概念来书写, 所以需要至少有一门语言的编程经验。</p><h2 id="基本架构图" tabindex="-1">基本架构图 <a class="header-anchor" href="#基本架构图" aria-label="Permalink to &quot;基本架构图&quot;">​</a></h2><ul><li>参考书籍: 北京航空航天大学出版的由胡章芳老师编写的《matlab仿真及其在光学课程中的应用》（第二版）</li></ul><p>使用软件:</p><ul><li>MindLine</li><li>Matlab</li><li>GNU Octave</li><li>Anoc Octave Pro Editor</li></ul><img src="'+e+`"><h2 id="变量" tabindex="-1">变量 <a class="header-anchor" href="#变量" aria-label="Permalink to &quot;变量&quot;">​</a></h2><h3 id="标识符" tabindex="-1">标识符 <a class="header-anchor" href="#标识符" aria-label="Permalink to &quot;标识符&quot;">​</a></h3><p>MATLAB的标识符的规则符合下面的正则表达式:</p><blockquote><p>^[A-Za-z]{1}[A-Za-z0-9_]*</p></blockquote><ul><li>标识符只能以 <strong>英文字母</strong> 开头</li><li>标识符只能由 <strong>大小写字母、数字、下划线（_）</strong> 组成</li><li>标识符不能与 <strong><a href="#关键字">关键字</a> 和 预定义量</strong> 重复</li><li>长度不超过 <strong>namelengthmax</strong> （不同的MATLAB版本长度也不一样）</li></ul><blockquote><p>那本书把预定义量叫做const, 这个跟我们常规编程语言理解的const（常量）意义不太一样, 因此我翻译为了 <strong>预定义量</strong></p></blockquote><h4 id="关键字" tabindex="-1">关键字 <a class="header-anchor" href="#关键字" aria-label="Permalink to &quot;关键字&quot;">​</a></h4><blockquote><p>执行<code>iskeyword</code>输出关键字</p></blockquote><div class="language-matlab line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">matlab</span><pre class="shiki nord"><code><span class="line"><span style="color:#D8DEE9FF;">iskeyword</span></span>
<span class="line"></span>
<span class="line"><span style="color:#616E88;">% ans =</span></span>
<span class="line"></span>
<span class="line"><span style="color:#616E88;">%   20×1 cell 数组</span></span>
<span class="line"></span>
<span class="line"><span style="color:#616E88;">%     {&#39;break&#39;     }</span></span>
<span class="line"><span style="color:#616E88;">%     {&#39;case&#39;      }</span></span>
<span class="line"><span style="color:#616E88;">%     {&#39;catch&#39;     }</span></span>
<span class="line"><span style="color:#616E88;">%     {&#39;classdef&#39;  }</span></span>
<span class="line"><span style="color:#616E88;">%     {&#39;continue&#39;  }</span></span>
<span class="line"><span style="color:#616E88;">%     {&#39;else&#39;      }</span></span>
<span class="line"><span style="color:#616E88;">%     {&#39;elseif&#39;    }</span></span>
<span class="line"><span style="color:#616E88;">%     {&#39;end&#39;       }</span></span>
<span class="line"><span style="color:#616E88;">%     {&#39;for&#39;       }</span></span>
<span class="line"><span style="color:#616E88;">%     {&#39;function&#39;  }</span></span>
<span class="line"><span style="color:#616E88;">%     {&#39;global&#39;    }</span></span>
<span class="line"><span style="color:#616E88;">%     {&#39;if&#39;        }</span></span>
<span class="line"><span style="color:#616E88;">%     {&#39;otherwise&#39; }</span></span>
<span class="line"><span style="color:#616E88;">%     {&#39;parfor&#39;    }</span></span>
<span class="line"><span style="color:#616E88;">%     {&#39;persistent&#39;}</span></span>
<span class="line"><span style="color:#616E88;">%     {&#39;return&#39;    }</span></span>
<span class="line"><span style="color:#616E88;">%     {&#39;spmd&#39;      }</span></span>
<span class="line"><span style="color:#616E88;">%     {&#39;switch&#39;    }</span></span>
<span class="line"><span style="color:#616E88;">%     {&#39;try&#39;       }</span></span>
<span class="line"><span style="color:#616E88;">%     {&#39;while&#39;     }</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br></div></div><h3 id="默认变量" tabindex="-1">默认变量 <a class="header-anchor" href="#默认变量" aria-label="Permalink to &quot;默认变量&quot;">​</a></h3><p>MATLAB是一门默认支持REPL的语言而且与计算有关, 因此MATLAB定义了一个默认变量 <code>ans</code> 作为未赋值的计算结果的赋值, eg.</p><div class="language-matlab line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">matlab</span><pre class="shiki nord"><code><span class="line"><span style="color:#B48EAD;">2</span><span style="color:#D8DEE9FF;"> </span><span style="color:#81A1C1;">*</span><span style="color:#D8DEE9FF;"> </span><span style="color:#B48EAD;">3</span></span>
<span class="line"></span>
<span class="line"><span style="color:#616E88;">% 输出: ans = 6</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><p>未完待续...</p>`,20),o=[r];function c(i,t,b,u,d,m){return n(),a("div",null,o)}const A=s(p,[["render",c]]);export{_ as __pageData,A as default};
