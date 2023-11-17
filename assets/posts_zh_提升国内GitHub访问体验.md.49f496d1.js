import{_ as s,o as n,c as a,Q as e}from"./chunks/framework.9818e7a8.js";const f=JSON.parse('{"title":"提升国内GitHub访问体验","description":"","frontmatter":{"title":"提升国内GitHub访问体验","date":"2021-01-21T15:43:41.000Z","toc":true,"tags":["GitHub","github.io"]},"headers":[],"relativePath":"posts/zh/提升国内GitHub访问体验.md","filePath":"posts/zh/提升国内GitHub访问体验.md"}'),l={name:"posts/zh/提升国内GitHub访问体验.md"},p=e(`<h2 id="概述" tabindex="-1">概述 <a class="header-anchor" href="#概述" aria-label="Permalink to &quot;概述&quot;">​</a></h2><p>提升GitHub的体验, 主要是下面几个方面的提升</p><ul><li>无障碍访问<code>github.io</code>域名的网站</li><li>无障碍加载GitHub的静态资源, 比如图片</li><li>通过cdn快速获取GitHub可获取的资源</li></ul><h2 id="无障碍访问github-io" tabindex="-1">无障碍访问<code>github.io</code> <a class="header-anchor" href="#无障碍访问github-io" aria-label="Permalink to &quot;无障碍访问\`github.io\`&quot;">​</a></h2><p>之前访问<code>xxx.github.io</code>这类GitHub Pages的网站的时候总出现404的情况, 甚至连挂梯子都没用, 这是非常不合理的。后来在V2EX上面有老哥提到了一个很难被发现的问题, 国内的电信运营商污染DNS。往常我以为它们就喜欢搞一些广告什么的, 结果非常的操蛋。之后就ping了一下<code>herberthe.github.io</code>我自己的GitHub Pages, 非常amazing啊结果是<code>127.0.0.1</code>。关于hosts和DNS这些不了解的话, 建议直接百度, 这里就不解释了。</p><p>我们访问<code>github.io</code>这类域名的网站通常需要经历的过程拓扑为: 本地局域网 --- 运营商网络(就不区分各层局域网了) --- 公网 --- 目标的DNS服务 --- 目标服务器</p><p>以<code>www.baidu.com</code>为例, 咱们用<code>tracert</code>追踪一下路由跳转情况(使用的Windows cmd), 其中标注的ip路由数据来源于<a href="https://www.ip138.com/" target="_blank" rel="noreferrer">ip318</a>和站长之家的站长工具, 也可能不是很准确</p><div class="language-text line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki nord"><code><span class="line"><span style="color:#d8dee9ff;">通过最多 30 个跃点跟踪</span></span>
<span class="line"><span style="color:#d8dee9ff;">到 www.a.shifen.com [14.215.177.38] 的路由:</span></span>
<span class="line"><span style="color:#d8dee9ff;"></span></span>
<span class="line"><span style="color:#d8dee9ff;">  1    &lt;1 毫秒   &lt;1 毫秒   &lt;1 毫秒 OPENWRT [192.168.7.1]   // 路由器</span></span>
<span class="line"><span style="color:#d8dee9ff;">  2     2 ms     1 ms    &lt;1 毫秒 192.168.1.1              // 本地网关</span></span>
<span class="line"><span style="color:#d8dee9ff;">  3     3 ms     4 ms     2 ms  100.100.128.1            // 保留地址 NAT局域网</span></span>
<span class="line"><span style="color:#d8dee9ff;">  4     4 ms     5 ms     4 ms  61.132.183.81            // 安徽省 宣城市 电信</span></span>
<span class="line"><span style="color:#d8dee9ff;">  5     5 ms    12 ms     8 ms  202.102.219.81           // 安徽省 合肥市 电信</span></span>
<span class="line"><span style="color:#d8dee9ff;">  6     *        *        *     请求超时。</span></span>
<span class="line"><span style="color:#d8dee9ff;">  7    38 ms     *        *     113.96.4.90              // 广东省 广州市 电信</span></span>
<span class="line"><span style="color:#d8dee9ff;">  8     *       29 ms    30 ms  113.96.11.78             // 广东省 广州市 电信</span></span>
<span class="line"><span style="color:#d8dee9ff;">  9    26 ms    25 ms    26 ms  121.14.67.146            // 广东省 广州市 电信</span></span>
<span class="line"><span style="color:#d8dee9ff;"> 10     *        *        *     请求超时。</span></span>
<span class="line"><span style="color:#d8dee9ff;"> 11    25 ms    25 ms    25 ms  14.215.177.38            // 广东省 广州市 电信 idc机房</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br></div></div><p>以<code>github.com</code>为例</p><div class="language-text line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki nord"><code><span class="line"><span style="color:#d8dee9ff;">通过最多 30 个跃点跟踪</span></span>
<span class="line"><span style="color:#d8dee9ff;">到 github.com [140.82.112.3] 的路由:</span></span>
<span class="line"><span style="color:#d8dee9ff;"></span></span>
<span class="line"><span style="color:#d8dee9ff;">  1     1 ms    &lt;1 毫秒    1 ms  OPENWRT [192.168.7.1]                             // 路由器</span></span>
<span class="line"><span style="color:#d8dee9ff;">  2     3 ms     2 ms     1 ms  192.168.1.1                                       // 本地网关</span></span>
<span class="line"><span style="color:#d8dee9ff;">  3     4 ms     3 ms     4 ms  100.100.128.1                                     // 保留地址 NAT局域网</span></span>
<span class="line"><span style="color:#d8dee9ff;">  4     6 ms     3 ms     5 ms  60.173.80.49                                      // 安徽省 宣城市 电信</span></span>
<span class="line"><span style="color:#d8dee9ff;">  5     8 ms     8 ms     7 ms  61.132.190.169                                    // 安徽省 合肥市 电信</span></span>
<span class="line"><span style="color:#d8dee9ff;">  6    20 ms    22 ms    21 ms  202.97.96.181                                     // 上海市 中国电信骨干网接入点</span></span>
<span class="line"><span style="color:#d8dee9ff;">  7    30 ms    29 ms    30 ms  202.97.24.190                                     // 中国 电信骨干网</span></span>
<span class="line"><span style="color:#d8dee9ff;">  8    16 ms    16 ms    15 ms  202.97.12.190                                     // 中国 电信骨干网</span></span>
<span class="line"><span style="color:#d8dee9ff;">  9   227 ms     *      221 ms  202.97.74.98                                      // 中国 电信骨干网</span></span>
<span class="line"><span style="color:#d8dee9ff;"> 10   228 ms   239 ms   229 ms  118.85.205.246                                    // 中国 电信骨干网</span></span>
<span class="line"><span style="color:#d8dee9ff;"> 11   270 ms   269 ms   269 ms  ae1.cs1.ams17.nl.eth.zayo.com [64.125.29.78]      // 美国 zayo集团骨干网</span></span>
<span class="line"><span style="color:#d8dee9ff;"> 12   262 ms     *        *     ae4.cs3.ams10.nl.eth.zayo.com [64.125.28.37]      // 美国 zayo集团骨干网</span></span>
<span class="line"><span style="color:#d8dee9ff;"> 13     *      271 ms     *     ae10.cs1.lhr15.uk.eth.zayo.com [64.125.29.17]     // 美国 zayo集团骨干网</span></span>
<span class="line"><span style="color:#d8dee9ff;"> 14     *        *        *     请求超时。</span></span>
<span class="line"><span style="color:#d8dee9ff;"> 15     *        *        *     请求超时。</span></span>
<span class="line"><span style="color:#d8dee9ff;"> 16     *        *        *     请求超时。</span></span>
<span class="line"><span style="color:#d8dee9ff;"> 17   271 ms   270 ms     *     ae1.ter1.iad10.us.zip.zayo.com [64.125.25.137]    // 美国 zayo集团骨干网</span></span>
<span class="line"><span style="color:#d8dee9ff;"> 18   266 ms   271 ms   268 ms  209.66.120.181.IPYX-243981-004-ZYO.zip.zayo.com [209.66.120.181]  // 美国 纽约州威彻斯特县怀**莱恩市abovenet通信股份有限公司</span></span>
<span class="line"><span style="color:#d8dee9ff;"> 19     *        *        *     请求超时。</span></span>
<span class="line"><span style="color:#d8dee9ff;"> 20     *        *        *     请求超时。</span></span>
<span class="line"><span style="color:#d8dee9ff;"> 21     *        *        *     请求超时。</span></span>
<span class="line"><span style="color:#d8dee9ff;"> 22   279 ms   279 ms   278 ms  github.com [140.82.112.3]                         // 美国 华盛顿州西雅图github公司</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br></div></div><p>如果运营商在中间搞鬼的话, 就算挂梯子也没办法绕过, 因此需要修改映射公网的DNS。类似<code>8.8.8.8</code>和<code>114.114.114.114</code>这些公用DNS大家都比较了解, 但是使用的人并不少, 体验也并没有提升多少。在这里建议使用<a href="https://www.alidns.com/setup" target="_blank" rel="noreferrer">AliDNS的公用DNS</a>做替代, 我寻思阿里不会那么闲去污染GitHub的DNS</p><p>遵循AliDNS的教程, 在运营商污染DNS这一块的问题基本上已经解决了, 如果还是访问不了的话, 很可能是被墙了。那一波就在中国电信骨干网的GFW了, 只能各显神通了, 正常的话不会这样的。</p><h2 id="无障碍加载github的静态资源" tabindex="-1">无障碍加载GitHub的静态资源 <a class="header-anchor" href="#无障碍加载github的静态资源" aria-label="Permalink to &quot;无障碍加载GitHub的静态资源&quot;">​</a></h2><p>经常有这么个情况, GitHub访问没问题, 但是头像还有<code>README.md</code>里面的图片加载不出来, 因为GitHub的静态资源不是<strong>github.com</strong>这个域名</p><p>而很可能是下面这些</p><div class="language-text line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki nord"><code><span class="line"><span style="color:#d8dee9ff;">github.githubassets.com</span></span>
<span class="line"><span style="color:#d8dee9ff;">camo.githubusercontent.com</span></span>
<span class="line"><span style="color:#d8dee9ff;">github.map.fastly.net</span></span>
<span class="line"><span style="color:#d8dee9ff;">github.global.ssl.fastly.net</span></span>
<span class="line"><span style="color:#d8dee9ff;">gist.github.com</span></span>
<span class="line"><span style="color:#d8dee9ff;">github.io</span></span>
<span class="line"><span style="color:#d8dee9ff;">github.com</span></span>
<span class="line"><span style="color:#d8dee9ff;">api.github.com</span></span>
<span class="line"><span style="color:#d8dee9ff;">raw.githubusercontent.com</span></span>
<span class="line"><span style="color:#d8dee9ff;">user-images.githubusercontent.com</span></span>
<span class="line"><span style="color:#d8dee9ff;">favicons.githubusercontent.com</span></span>
<span class="line"><span style="color:#d8dee9ff;">avatars5.githubusercontent.com</span></span>
<span class="line"><span style="color:#d8dee9ff;">avatars4.githubusercontent.com</span></span>
<span class="line"><span style="color:#d8dee9ff;">avatars3.githubusercontent.com</span></span>
<span class="line"><span style="color:#d8dee9ff;">avatars2.githubusercontent.com</span></span>
<span class="line"><span style="color:#d8dee9ff;">avatars1.githubusercontent.com</span></span>
<span class="line"><span style="color:#d8dee9ff;">avatars0.githubusercontent.com</span></span>
<span class="line"><span style="color:#d8dee9ff;">codeload.github.com</span></span>
<span class="line"><span style="color:#d8dee9ff;">github-cloud.s3.amazonaws.com</span></span>
<span class="line"><span style="color:#d8dee9ff;">github-com.s3.amazonaws.com</span></span>
<span class="line"><span style="color:#d8dee9ff;">github-production-release-asset-2e65be.s3.amazonaws.com</span></span>
<span class="line"><span style="color:#d8dee9ff;">github-production-user-asset-6210df.s3.amazonaws.com</span></span>
<span class="line"><span style="color:#d8dee9ff;">github-production-repository-file-5c1aeb.s3.amazonaws.com</span></span>
<span class="line"><span style="color:#d8dee9ff;">githubstatus.com</span></span>
<span class="line"><span style="color:#d8dee9ff;">github.community</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br></div></div><p>最简单的方法其实是挂梯子, 不过也可以通过修改<strong>hosts</strong>文件的方法来改。在类Unix平台比较简单, 也就是<code>vim /etc/hosts</code>的事情。但是要一个个找IP是个非常操蛋的事情。。</p><p>在此建议参考这个项目 <a href="https://github.com/521xueweihan/GitHub520" target="_blank" rel="noreferrer">GitHub520</a>, 然后参考教程使用 <a href="https://github.com/oldj/SwitchHosts" target="_blank" rel="noreferrer">SwitchHosts!</a> 这个开源软件解决<strong>hosts</strong>修改的问题</p><blockquote><p>不过GitHub520那个项目是GitHub Action实现的, 可能存在能用但是不是最快的节点的情况, 实在不行就自己部署更新也没啥问题</p></blockquote><h2 id="通过cdn快速获取github可获取的资源" tabindex="-1">通过cdn快速获取GitHub可获取的资源 <a class="header-anchor" href="#通过cdn快速获取github可获取的资源" aria-label="Permalink to &quot;通过cdn快速获取GitHub可获取的资源&quot;">​</a></h2><p>上面那些解决了, 咱们使用GitHub基本上没啥问题了。但是, GitHub Release和GitHub仓库下载的速度非常的难受!!!</p><p>在<a href="https://github.com/NucoTech/nuco-backend-cli" target="_blank" rel="noreferrer">nbc</a>这个项目的实践过程中就屡次被这个问题搞得非常恼火, 油猴上面其实有针对GitHub专门写了一些插件, 也专门有一些cdn来提高GitHub下载慢的情况, 下面是一些总结也可以用于开发</p><h3 id="获取分支资源" tabindex="-1">获取分支资源 <a class="header-anchor" href="#获取分支资源" aria-label="Permalink to &quot;获取分支资源&quot;">​</a></h3><p>正常情况下, GitHub的仓库分支资源其实是不能单独下载的, 那咋办? 很简单, 通过cdn完成</p><p>举个例子, 我要下载<code>nuco-backend-cli</code>下面的<code>install.darwin.sh</code>, 可以通过访问下面的cdn获取</p><div class="language-text line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki nord"><code><span class="line"><span style="color:#d8dee9ff;">https://cdn.jsdelivr.net/gh/NucoTech/nuco-backend-cli@main/install.darwin.sh</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br></div></div><p><a href="https://www.jsdelivr.com/" target="_blank" rel="noreferrer">jsdelivr</a>这个cdn其实前端的小伙伴应该是非常熟悉的, 前端的npm包里面的静态资源都可以通过这个cdn来直接引用</p><p>官网也贴心的, 给了下面的使用格式</p><div class="language-text line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki nord"><code><span class="line"><span style="color:#d8dee9ff;">https://cdn.jsdelivr.net/gh/&lt;用户名&gt;/&lt;仓库名&gt;@&lt;分支&gt;/&lt;文件名&gt;</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br></div></div><h3 id="获取github-release资源" tabindex="-1">获取GitHub Release资源 <a class="header-anchor" href="#获取github-release资源" aria-label="Permalink to &quot;获取GitHub Release资源&quot;">​</a></h3><p>这个cdn就比较多了, 列举几个, 所有的都是以<code>nbc.exe</code>资源获取为例的</p><div class="language-text line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki nord"><code><span class="line"><span style="color:#d8dee9ff;">https://gh.con.sh/https://github.com/NucoTech/nuco-backend-cli/releases/download/v1.3.0/nbc.exe</span></span>
<span class="line"><span style="color:#d8dee9ff;"></span></span>
<span class="line"><span style="color:#d8dee9ff;">https://gh.api.99988866.xyz/https://github.com/NucoTech/nuco-backend-cli/releases/download/v1.3.0/nbc.exe</span></span>
<span class="line"><span style="color:#d8dee9ff;"></span></span>
<span class="line"><span style="color:#d8dee9ff;">https://download.fastgit.org/NucoTech/nuco-backend-cli/releases/download/v1.3.0/nbc.exe</span></span>
<span class="line"><span style="color:#d8dee9ff;"></span></span>
<span class="line"><span style="color:#d8dee9ff;">https://github.xiu2.xyz/https://github.com/NucoTech/nuco-backend-cli/releases/download/v1.3.0/nbc.exe</span></span>
<span class="line"><span style="color:#d8dee9ff;"></span></span>
<span class="line"><span style="color:#d8dee9ff;">https://ghproxy.com/https://github.com/NucoTech/nuco-backend-cli/releases/download/v1.3.0/nbc.exe</span></span>
<span class="line"><span style="color:#d8dee9ff;"></span></span>
<span class="line"><span style="color:#d8dee9ff;">https://pd.zwc365.com/seturl/https://github.com/NucoTech/nuco-backend-cli/releases/download/v1.3.0/nbc.exe</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br></div></div><p>你也可以使用插件<a href="https://greasyfork.org/scripts/412245" target="_blank" rel="noreferrer">GitHub增强 - 高速下载</a> 这个油猴脚本来实现</p><p>其中的部分cdn可以传入下面的格式, 实现获取latest release里面的资源</p><div class="language-text line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki nord"><code><span class="line"><span style="color:#d8dee9ff;">https://github.com/&lt;用户名&gt;/latest/releases/download/&lt;资源名&gt;</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br></div></div>`,35),c=[p];function o(t,r,i,d,b,u){return n(),a("div",null,c)}const h=s(l,[["render",o]]);export{f as __pageData,h as default};
