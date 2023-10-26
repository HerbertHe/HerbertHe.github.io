import{_ as s,o as n,c as a,Q as l}from"./chunks/framework.53d25516.js";const C=JSON.parse('{"title":"自制操作系统log","description":"","frontmatter":{"title":"自制操作系统log","date":"2019-09-15T21:42:42.000Z","toc":true,"tags":["OS","操作系统","自制","记录"]},"headers":[],"relativePath":"posts/zh/自制操作系统log.md","filePath":"posts/zh/自制操作系统log.md"}'),p={name:"posts/zh/自制操作系统log.md"},o=l(`<h2 id="参考书" tabindex="-1">参考书 <a class="header-anchor" href="#参考书" aria-label="Permalink to &quot;参考书&quot;">​</a></h2><ul><li>《三十天自制操作系统（川合秀实）》</li><li>《ORANGE&#39;S：一个操作系统的实现》</li></ul><h2 id="写在前面的" tabindex="-1">写在前面的 <a class="header-anchor" href="#写在前面的" aria-label="Permalink to &quot;写在前面的&quot;">​</a></h2><p>本记录不展示原版书籍的内容，仅作为自己历程的记录和总结。两本书各有所长，根据自己的喜好选择和实践。书籍中的内容根据自己的喜好、习惯，有一定的自己理解和改变！本记录默认对二进制、十六进制和基础硬件等都有一定的了解！</p><h2 id="制作启动区-512字节" tabindex="-1">制作启动区(512字节) <a class="header-anchor" href="#制作启动区-512字节" aria-label="Permalink to &quot;制作启动区(512字节)&quot;">​</a></h2><p>从开始我对两本书都是懵逼的，结合两本书涉及的启动盘代码总结一点东西</p><div class="language-asm vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">asm</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">ORG </span><span style="color:#79B8FF;">0x7c00</span><span style="color:#E1E4E8;">                  </span><span style="color:#6A737D;">; 程序加载0x7c00</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">; FAT12格式软盘代码位</span></span>
<span class="line"><span style="color:#6A737D;">; (--省略--)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">JMP</span><span style="color:#E1E4E8;"> entry</span></span>
<span class="line"><span style="color:#F97583;">DB</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">0x90</span></span>
<span class="line"></span>
<span class="line"><span style="color:#B392F0;">entry:</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">MOV</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">AX</span><span style="color:#E1E4E8;">, </span><span style="color:#79B8FF;">0</span><span style="color:#E1E4E8;">           </span><span style="color:#6A737D;">; 初始化寄存器</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">MOV</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">SS</span><span style="color:#E1E4E8;">, </span><span style="color:#79B8FF;">AX</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">MOV</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">SP</span><span style="color:#E1E4E8;">, </span><span style="color:#79B8FF;">0x7c00</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">MOV</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">DS</span><span style="color:#E1E4E8;">, </span><span style="color:#79B8FF;">AX</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">MOV</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">ES</span><span style="color:#E1E4E8;">, </span><span style="color:#79B8FF;">AX</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">MOV</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">SI</span><span style="color:#E1E4E8;">, msg</span></span>
<span class="line"></span>
<span class="line"><span style="color:#B392F0;">putloop:</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">MOV</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">AL</span><span style="color:#E1E4E8;">, [</span><span style="color:#79B8FF;">SI</span><span style="color:#E1E4E8;">]        </span><span style="color:#6A737D;">; []表示内存中</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">ADD</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">SI</span><span style="color:#E1E4E8;">, </span><span style="color:#79B8FF;">1</span><span style="color:#E1E4E8;">           </span><span style="color:#6A737D;">; SI加一</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">CMP</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">AL</span><span style="color:#E1E4E8;">, </span><span style="color:#79B8FF;">0</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">JE</span><span style="color:#E1E4E8;"> fin              </span><span style="color:#6A737D;">; jump if equal</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">MOV</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">AH</span><span style="color:#E1E4E8;">, </span><span style="color:#79B8FF;">0x0e</span><span style="color:#E1E4E8;">        </span><span style="color:#6A737D;">; 显示一个文字</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">MOV</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">BX</span><span style="color:#E1E4E8;">, </span><span style="color:#79B8FF;">15</span><span style="color:#E1E4E8;">          </span><span style="color:#6A737D;">; 指定字符颜色</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">INT</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">0x10</span><span style="color:#E1E4E8;">            </span><span style="color:#6A737D;">; 调用显卡BIOS，INT软件中断指令</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">JMP</span><span style="color:#E1E4E8;"> putloop</span></span>
<span class="line"></span>
<span class="line"><span style="color:#B392F0;">fin:</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">HLT</span><span style="color:#E1E4E8;">                 </span><span style="color:#6A737D;">; 让CPU停止等待指令</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">JMP</span><span style="color:#E1E4E8;"> fin             </span><span style="color:#6A737D;">; 无限循环</span></span>
<span class="line"></span>
<span class="line"><span style="color:#B392F0;">msg:</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">DB</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">0x0a</span><span style="color:#E1E4E8;">, </span><span style="color:#79B8FF;">0x0a</span><span style="color:#E1E4E8;">       </span><span style="color:#6A737D;">; 换行</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">DB</span><span style="color:#E1E4E8;"> &quot;hello, world&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">DB</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">0x0a</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">DB</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">0</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">RESB</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">0x7dfe</span><span style="color:#E1E4E8;">-$       </span><span style="color:#6A737D;">; 填写0x00直到0x001fe</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">DB</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">0x55</span><span style="color:#E1E4E8;">, </span><span style="color:#79B8FF;">0xaa</span><span style="color:#E1E4E8;">       </span><span style="color:#6A737D;">; 结束</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">ORG </span><span style="color:#005CC5;">0x7c00</span><span style="color:#24292E;">                  </span><span style="color:#6A737D;">; 程序加载0x7c00</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">; FAT12格式软盘代码位</span></span>
<span class="line"><span style="color:#6A737D;">; (--省略--)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">JMP</span><span style="color:#24292E;"> entry</span></span>
<span class="line"><span style="color:#D73A49;">DB</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">0x90</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6F42C1;">entry:</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">MOV</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">AX</span><span style="color:#24292E;">, </span><span style="color:#005CC5;">0</span><span style="color:#24292E;">           </span><span style="color:#6A737D;">; 初始化寄存器</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">MOV</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">SS</span><span style="color:#24292E;">, </span><span style="color:#005CC5;">AX</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">MOV</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">SP</span><span style="color:#24292E;">, </span><span style="color:#005CC5;">0x7c00</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">MOV</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">DS</span><span style="color:#24292E;">, </span><span style="color:#005CC5;">AX</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">MOV</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">ES</span><span style="color:#24292E;">, </span><span style="color:#005CC5;">AX</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">MOV</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">SI</span><span style="color:#24292E;">, msg</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6F42C1;">putloop:</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">MOV</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">AL</span><span style="color:#24292E;">, [</span><span style="color:#005CC5;">SI</span><span style="color:#24292E;">]        </span><span style="color:#6A737D;">; []表示内存中</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">ADD</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">SI</span><span style="color:#24292E;">, </span><span style="color:#005CC5;">1</span><span style="color:#24292E;">           </span><span style="color:#6A737D;">; SI加一</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">CMP</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">AL</span><span style="color:#24292E;">, </span><span style="color:#005CC5;">0</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">JE</span><span style="color:#24292E;"> fin              </span><span style="color:#6A737D;">; jump if equal</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">MOV</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">AH</span><span style="color:#24292E;">, </span><span style="color:#005CC5;">0x0e</span><span style="color:#24292E;">        </span><span style="color:#6A737D;">; 显示一个文字</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">MOV</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">BX</span><span style="color:#24292E;">, </span><span style="color:#005CC5;">15</span><span style="color:#24292E;">          </span><span style="color:#6A737D;">; 指定字符颜色</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">INT</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">0x10</span><span style="color:#24292E;">            </span><span style="color:#6A737D;">; 调用显卡BIOS，INT软件中断指令</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">JMP</span><span style="color:#24292E;"> putloop</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6F42C1;">fin:</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">HLT</span><span style="color:#24292E;">                 </span><span style="color:#6A737D;">; 让CPU停止等待指令</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">JMP</span><span style="color:#24292E;"> fin             </span><span style="color:#6A737D;">; 无限循环</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6F42C1;">msg:</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">DB</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">0x0a</span><span style="color:#24292E;">, </span><span style="color:#005CC5;">0x0a</span><span style="color:#24292E;">       </span><span style="color:#6A737D;">; 换行</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">DB</span><span style="color:#24292E;"> &quot;hello, world&quot;</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">DB</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">0x0a</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">DB</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">0</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">RESB</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">0x7dfe</span><span style="color:#24292E;">-$       </span><span style="color:#6A737D;">; 填写0x00直到0x001fe</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">DB</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">0x55</span><span style="color:#24292E;">, </span><span style="color:#005CC5;">0xaa</span><span style="color:#24292E;">       </span><span style="color:#6A737D;">; 结束</span></span></code></pre></div><blockquote><p>注意：30天那个书制作启动盘的部分完全可以看看就行。。。代码就是上面的，就是helloos.nas节选那个末尾加上了两行，写满512字节和结束标志！</p></blockquote><p>代码直接看<a href="https://github.com/yourtion/30dayMakeOS" target="_blank" rel="noreferrer">这个库</a></p>`,9),e=[o];function c(t,r,y,E,i,F){return n(),a("div",null,e)}const D=s(p,[["render",c]]);export{C as __pageData,D as default};
