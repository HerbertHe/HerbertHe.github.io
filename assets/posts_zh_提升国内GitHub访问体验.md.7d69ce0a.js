import{_ as s,o as a,c as n,Q as e}from"./chunks/framework.53d25516.js";const b=JSON.parse('{"title":"提升国内GitHub访问体验","description":"","frontmatter":{"title":"提升国内GitHub访问体验","date":"2021-01-21T15:43:41.000Z","toc":true,"tags":["GitHub","github.io"]},"headers":[],"relativePath":"posts/zh/提升国内GitHub访问体验.md","filePath":"posts/zh/提升国内GitHub访问体验.md"}'),l={name:"posts/zh/提升国内GitHub访问体验.md"},p=e(`<h2 id="概述" tabindex="-1">概述 <a class="header-anchor" href="#概述" aria-label="Permalink to &quot;概述&quot;">​</a></h2><p>提升GitHub的体验, 主要是下面几个方面的提升</p><ul><li>无障碍访问<code>github.io</code>域名的网站</li><li>无障碍加载GitHub的静态资源, 比如图片</li><li>通过cdn快速获取GitHub可获取的资源</li></ul><h2 id="无障碍访问github-io" tabindex="-1">无障碍访问<code>github.io</code> <a class="header-anchor" href="#无障碍访问github-io" aria-label="Permalink to &quot;无障碍访问\`github.io\`&quot;">​</a></h2><p>之前访问<code>xxx.github.io</code>这类GitHub Pages的网站的时候总出现404的情况, 甚至连挂梯子都没用, 这是非常不合理的。后来在V2EX上面有老哥提到了一个很难被发现的问题, 国内的电信运营商污染DNS。往常我以为它们就喜欢搞一些广告什么的, 结果非常的操蛋。之后就ping了一下<code>herberthe.github.io</code>我自己的GitHub Pages, 非常amazing啊结果是<code>127.0.0.1</code>。关于hosts和DNS这些不了解的话, 建议直接百度, 这里就不解释了。</p><p>我们访问<code>github.io</code>这类域名的网站通常需要经历的过程拓扑为: 本地局域网 --- 运营商网络(就不区分各层局域网了) --- 公网 --- 目标的DNS服务 --- 目标服务器</p><p>以<code>www.baidu.com</code>为例, 咱们用<code>tracert</code>追踪一下路由跳转情况(使用的Windows cmd), 其中标注的ip路由数据来源于<a href="https://www.ip138.com/" target="_blank" rel="noreferrer">ip318</a>和站长之家的站长工具, 也可能不是很准确</p><div class="language-text vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">通过最多 30 个跃点跟踪</span></span>
<span class="line"><span style="color:#e1e4e8;">到 www.a.shifen.com [14.215.177.38] 的路由:</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">  1    &lt;1 毫秒   &lt;1 毫秒   &lt;1 毫秒 OPENWRT [192.168.7.1]   // 路由器</span></span>
<span class="line"><span style="color:#e1e4e8;">  2     2 ms     1 ms    &lt;1 毫秒 192.168.1.1              // 本地网关</span></span>
<span class="line"><span style="color:#e1e4e8;">  3     3 ms     4 ms     2 ms  100.100.128.1            // 保留地址 NAT局域网</span></span>
<span class="line"><span style="color:#e1e4e8;">  4     4 ms     5 ms     4 ms  61.132.183.81            // 安徽省 宣城市 电信</span></span>
<span class="line"><span style="color:#e1e4e8;">  5     5 ms    12 ms     8 ms  202.102.219.81           // 安徽省 合肥市 电信</span></span>
<span class="line"><span style="color:#e1e4e8;">  6     *        *        *     请求超时。</span></span>
<span class="line"><span style="color:#e1e4e8;">  7    38 ms     *        *     113.96.4.90              // 广东省 广州市 电信</span></span>
<span class="line"><span style="color:#e1e4e8;">  8     *       29 ms    30 ms  113.96.11.78             // 广东省 广州市 电信</span></span>
<span class="line"><span style="color:#e1e4e8;">  9    26 ms    25 ms    26 ms  121.14.67.146            // 广东省 广州市 电信</span></span>
<span class="line"><span style="color:#e1e4e8;"> 10     *        *        *     请求超时。</span></span>
<span class="line"><span style="color:#e1e4e8;"> 11    25 ms    25 ms    25 ms  14.215.177.38            // 广东省 广州市 电信 idc机房</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">通过最多 30 个跃点跟踪</span></span>
<span class="line"><span style="color:#24292e;">到 www.a.shifen.com [14.215.177.38] 的路由:</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">  1    &lt;1 毫秒   &lt;1 毫秒   &lt;1 毫秒 OPENWRT [192.168.7.1]   // 路由器</span></span>
<span class="line"><span style="color:#24292e;">  2     2 ms     1 ms    &lt;1 毫秒 192.168.1.1              // 本地网关</span></span>
<span class="line"><span style="color:#24292e;">  3     3 ms     4 ms     2 ms  100.100.128.1            // 保留地址 NAT局域网</span></span>
<span class="line"><span style="color:#24292e;">  4     4 ms     5 ms     4 ms  61.132.183.81            // 安徽省 宣城市 电信</span></span>
<span class="line"><span style="color:#24292e;">  5     5 ms    12 ms     8 ms  202.102.219.81           // 安徽省 合肥市 电信</span></span>
<span class="line"><span style="color:#24292e;">  6     *        *        *     请求超时。</span></span>
<span class="line"><span style="color:#24292e;">  7    38 ms     *        *     113.96.4.90              // 广东省 广州市 电信</span></span>
<span class="line"><span style="color:#24292e;">  8     *       29 ms    30 ms  113.96.11.78             // 广东省 广州市 电信</span></span>
<span class="line"><span style="color:#24292e;">  9    26 ms    25 ms    26 ms  121.14.67.146            // 广东省 广州市 电信</span></span>
<span class="line"><span style="color:#24292e;"> 10     *        *        *     请求超时。</span></span>
<span class="line"><span style="color:#24292e;"> 11    25 ms    25 ms    25 ms  14.215.177.38            // 广东省 广州市 电信 idc机房</span></span></code></pre></div><p>以<code>github.com</code>为例</p><div class="language-text vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">通过最多 30 个跃点跟踪</span></span>
<span class="line"><span style="color:#e1e4e8;">到 github.com [140.82.112.3] 的路由:</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">  1     1 ms    &lt;1 毫秒    1 ms  OPENWRT [192.168.7.1]                             // 路由器</span></span>
<span class="line"><span style="color:#e1e4e8;">  2     3 ms     2 ms     1 ms  192.168.1.1                                       // 本地网关</span></span>
<span class="line"><span style="color:#e1e4e8;">  3     4 ms     3 ms     4 ms  100.100.128.1                                     // 保留地址 NAT局域网</span></span>
<span class="line"><span style="color:#e1e4e8;">  4     6 ms     3 ms     5 ms  60.173.80.49                                      // 安徽省 宣城市 电信</span></span>
<span class="line"><span style="color:#e1e4e8;">  5     8 ms     8 ms     7 ms  61.132.190.169                                    // 安徽省 合肥市 电信</span></span>
<span class="line"><span style="color:#e1e4e8;">  6    20 ms    22 ms    21 ms  202.97.96.181                                     // 上海市 中国电信骨干网接入点</span></span>
<span class="line"><span style="color:#e1e4e8;">  7    30 ms    29 ms    30 ms  202.97.24.190                                     // 中国 电信骨干网</span></span>
<span class="line"><span style="color:#e1e4e8;">  8    16 ms    16 ms    15 ms  202.97.12.190                                     // 中国 电信骨干网</span></span>
<span class="line"><span style="color:#e1e4e8;">  9   227 ms     *      221 ms  202.97.74.98                                      // 中国 电信骨干网</span></span>
<span class="line"><span style="color:#e1e4e8;"> 10   228 ms   239 ms   229 ms  118.85.205.246                                    // 中国 电信骨干网</span></span>
<span class="line"><span style="color:#e1e4e8;"> 11   270 ms   269 ms   269 ms  ae1.cs1.ams17.nl.eth.zayo.com [64.125.29.78]      // 美国 zayo集团骨干网</span></span>
<span class="line"><span style="color:#e1e4e8;"> 12   262 ms     *        *     ae4.cs3.ams10.nl.eth.zayo.com [64.125.28.37]      // 美国 zayo集团骨干网</span></span>
<span class="line"><span style="color:#e1e4e8;"> 13     *      271 ms     *     ae10.cs1.lhr15.uk.eth.zayo.com [64.125.29.17]     // 美国 zayo集团骨干网</span></span>
<span class="line"><span style="color:#e1e4e8;"> 14     *        *        *     请求超时。</span></span>
<span class="line"><span style="color:#e1e4e8;"> 15     *        *        *     请求超时。</span></span>
<span class="line"><span style="color:#e1e4e8;"> 16     *        *        *     请求超时。</span></span>
<span class="line"><span style="color:#e1e4e8;"> 17   271 ms   270 ms     *     ae1.ter1.iad10.us.zip.zayo.com [64.125.25.137]    // 美国 zayo集团骨干网</span></span>
<span class="line"><span style="color:#e1e4e8;"> 18   266 ms   271 ms   268 ms  209.66.120.181.IPYX-243981-004-ZYO.zip.zayo.com [209.66.120.181]  // 美国 纽约州威彻斯特县怀**莱恩市abovenet通信股份有限公司</span></span>
<span class="line"><span style="color:#e1e4e8;"> 19     *        *        *     请求超时。</span></span>
<span class="line"><span style="color:#e1e4e8;"> 20     *        *        *     请求超时。</span></span>
<span class="line"><span style="color:#e1e4e8;"> 21     *        *        *     请求超时。</span></span>
<span class="line"><span style="color:#e1e4e8;"> 22   279 ms   279 ms   278 ms  github.com [140.82.112.3]                         // 美国 华盛顿州西雅图github公司</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">通过最多 30 个跃点跟踪</span></span>
<span class="line"><span style="color:#24292e;">到 github.com [140.82.112.3] 的路由:</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">  1     1 ms    &lt;1 毫秒    1 ms  OPENWRT [192.168.7.1]                             // 路由器</span></span>
<span class="line"><span style="color:#24292e;">  2     3 ms     2 ms     1 ms  192.168.1.1                                       // 本地网关</span></span>
<span class="line"><span style="color:#24292e;">  3     4 ms     3 ms     4 ms  100.100.128.1                                     // 保留地址 NAT局域网</span></span>
<span class="line"><span style="color:#24292e;">  4     6 ms     3 ms     5 ms  60.173.80.49                                      // 安徽省 宣城市 电信</span></span>
<span class="line"><span style="color:#24292e;">  5     8 ms     8 ms     7 ms  61.132.190.169                                    // 安徽省 合肥市 电信</span></span>
<span class="line"><span style="color:#24292e;">  6    20 ms    22 ms    21 ms  202.97.96.181                                     // 上海市 中国电信骨干网接入点</span></span>
<span class="line"><span style="color:#24292e;">  7    30 ms    29 ms    30 ms  202.97.24.190                                     // 中国 电信骨干网</span></span>
<span class="line"><span style="color:#24292e;">  8    16 ms    16 ms    15 ms  202.97.12.190                                     // 中国 电信骨干网</span></span>
<span class="line"><span style="color:#24292e;">  9   227 ms     *      221 ms  202.97.74.98                                      // 中国 电信骨干网</span></span>
<span class="line"><span style="color:#24292e;"> 10   228 ms   239 ms   229 ms  118.85.205.246                                    // 中国 电信骨干网</span></span>
<span class="line"><span style="color:#24292e;"> 11   270 ms   269 ms   269 ms  ae1.cs1.ams17.nl.eth.zayo.com [64.125.29.78]      // 美国 zayo集团骨干网</span></span>
<span class="line"><span style="color:#24292e;"> 12   262 ms     *        *     ae4.cs3.ams10.nl.eth.zayo.com [64.125.28.37]      // 美国 zayo集团骨干网</span></span>
<span class="line"><span style="color:#24292e;"> 13     *      271 ms     *     ae10.cs1.lhr15.uk.eth.zayo.com [64.125.29.17]     // 美国 zayo集团骨干网</span></span>
<span class="line"><span style="color:#24292e;"> 14     *        *        *     请求超时。</span></span>
<span class="line"><span style="color:#24292e;"> 15     *        *        *     请求超时。</span></span>
<span class="line"><span style="color:#24292e;"> 16     *        *        *     请求超时。</span></span>
<span class="line"><span style="color:#24292e;"> 17   271 ms   270 ms     *     ae1.ter1.iad10.us.zip.zayo.com [64.125.25.137]    // 美国 zayo集团骨干网</span></span>
<span class="line"><span style="color:#24292e;"> 18   266 ms   271 ms   268 ms  209.66.120.181.IPYX-243981-004-ZYO.zip.zayo.com [209.66.120.181]  // 美国 纽约州威彻斯特县怀**莱恩市abovenet通信股份有限公司</span></span>
<span class="line"><span style="color:#24292e;"> 19     *        *        *     请求超时。</span></span>
<span class="line"><span style="color:#24292e;"> 20     *        *        *     请求超时。</span></span>
<span class="line"><span style="color:#24292e;"> 21     *        *        *     请求超时。</span></span>
<span class="line"><span style="color:#24292e;"> 22   279 ms   279 ms   278 ms  github.com [140.82.112.3]                         // 美国 华盛顿州西雅图github公司</span></span></code></pre></div><p>如果运营商在中间搞鬼的话, 就算挂梯子也没办法绕过, 因此需要修改映射公网的DNS。类似<code>8.8.8.8</code>和<code>114.114.114.114</code>这些公用DNS大家都比较了解, 但是使用的人并不少, 体验也并没有提升多少。在这里建议使用<a href="https://www.alidns.com/setup" target="_blank" rel="noreferrer">AliDNS的公用DNS</a>做替代, 我寻思阿里不会那么闲去污染GitHub的DNS</p><p>遵循AliDNS的教程, 在运营商污染DNS这一块的问题基本上已经解决了, 如果还是访问不了的话, 很可能是被墙了。那一波就在中国电信骨干网的GFW了, 只能各显神通了, 正常的话不会这样的。</p><h2 id="无障碍加载github的静态资源" tabindex="-1">无障碍加载GitHub的静态资源 <a class="header-anchor" href="#无障碍加载github的静态资源" aria-label="Permalink to &quot;无障碍加载GitHub的静态资源&quot;">​</a></h2><p>经常有这么个情况, GitHub访问没问题, 但是头像还有<code>README.md</code>里面的图片加载不出来, 因为GitHub的静态资源不是<strong>github.com</strong>这个域名</p><p>而很可能是下面这些</p><div class="language-text vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">github.githubassets.com</span></span>
<span class="line"><span style="color:#e1e4e8;">camo.githubusercontent.com</span></span>
<span class="line"><span style="color:#e1e4e8;">github.map.fastly.net</span></span>
<span class="line"><span style="color:#e1e4e8;">github.global.ssl.fastly.net</span></span>
<span class="line"><span style="color:#e1e4e8;">gist.github.com</span></span>
<span class="line"><span style="color:#e1e4e8;">github.io</span></span>
<span class="line"><span style="color:#e1e4e8;">github.com</span></span>
<span class="line"><span style="color:#e1e4e8;">api.github.com</span></span>
<span class="line"><span style="color:#e1e4e8;">raw.githubusercontent.com</span></span>
<span class="line"><span style="color:#e1e4e8;">user-images.githubusercontent.com</span></span>
<span class="line"><span style="color:#e1e4e8;">favicons.githubusercontent.com</span></span>
<span class="line"><span style="color:#e1e4e8;">avatars5.githubusercontent.com</span></span>
<span class="line"><span style="color:#e1e4e8;">avatars4.githubusercontent.com</span></span>
<span class="line"><span style="color:#e1e4e8;">avatars3.githubusercontent.com</span></span>
<span class="line"><span style="color:#e1e4e8;">avatars2.githubusercontent.com</span></span>
<span class="line"><span style="color:#e1e4e8;">avatars1.githubusercontent.com</span></span>
<span class="line"><span style="color:#e1e4e8;">avatars0.githubusercontent.com</span></span>
<span class="line"><span style="color:#e1e4e8;">codeload.github.com</span></span>
<span class="line"><span style="color:#e1e4e8;">github-cloud.s3.amazonaws.com</span></span>
<span class="line"><span style="color:#e1e4e8;">github-com.s3.amazonaws.com</span></span>
<span class="line"><span style="color:#e1e4e8;">github-production-release-asset-2e65be.s3.amazonaws.com</span></span>
<span class="line"><span style="color:#e1e4e8;">github-production-user-asset-6210df.s3.amazonaws.com</span></span>
<span class="line"><span style="color:#e1e4e8;">github-production-repository-file-5c1aeb.s3.amazonaws.com</span></span>
<span class="line"><span style="color:#e1e4e8;">githubstatus.com</span></span>
<span class="line"><span style="color:#e1e4e8;">github.community</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">github.githubassets.com</span></span>
<span class="line"><span style="color:#24292e;">camo.githubusercontent.com</span></span>
<span class="line"><span style="color:#24292e;">github.map.fastly.net</span></span>
<span class="line"><span style="color:#24292e;">github.global.ssl.fastly.net</span></span>
<span class="line"><span style="color:#24292e;">gist.github.com</span></span>
<span class="line"><span style="color:#24292e;">github.io</span></span>
<span class="line"><span style="color:#24292e;">github.com</span></span>
<span class="line"><span style="color:#24292e;">api.github.com</span></span>
<span class="line"><span style="color:#24292e;">raw.githubusercontent.com</span></span>
<span class="line"><span style="color:#24292e;">user-images.githubusercontent.com</span></span>
<span class="line"><span style="color:#24292e;">favicons.githubusercontent.com</span></span>
<span class="line"><span style="color:#24292e;">avatars5.githubusercontent.com</span></span>
<span class="line"><span style="color:#24292e;">avatars4.githubusercontent.com</span></span>
<span class="line"><span style="color:#24292e;">avatars3.githubusercontent.com</span></span>
<span class="line"><span style="color:#24292e;">avatars2.githubusercontent.com</span></span>
<span class="line"><span style="color:#24292e;">avatars1.githubusercontent.com</span></span>
<span class="line"><span style="color:#24292e;">avatars0.githubusercontent.com</span></span>
<span class="line"><span style="color:#24292e;">codeload.github.com</span></span>
<span class="line"><span style="color:#24292e;">github-cloud.s3.amazonaws.com</span></span>
<span class="line"><span style="color:#24292e;">github-com.s3.amazonaws.com</span></span>
<span class="line"><span style="color:#24292e;">github-production-release-asset-2e65be.s3.amazonaws.com</span></span>
<span class="line"><span style="color:#24292e;">github-production-user-asset-6210df.s3.amazonaws.com</span></span>
<span class="line"><span style="color:#24292e;">github-production-repository-file-5c1aeb.s3.amazonaws.com</span></span>
<span class="line"><span style="color:#24292e;">githubstatus.com</span></span>
<span class="line"><span style="color:#24292e;">github.community</span></span></code></pre></div><p>最简单的方法其实是挂梯子, 不过也可以通过修改<strong>hosts</strong>文件的方法来改。在类Unix平台比较简单, 也就是<code>vim /etc/hosts</code>的事情。但是要一个个找IP是个非常操蛋的事情。。</p><p>在此建议参考这个项目 <a href="https://github.com/521xueweihan/GitHub520" target="_blank" rel="noreferrer">GitHub520</a>, 然后参考教程使用 <a href="https://github.com/oldj/SwitchHosts" target="_blank" rel="noreferrer">SwitchHosts!</a> 这个开源软件解决<strong>hosts</strong>修改的问题</p><blockquote><p>不过GitHub520那个项目是GitHub Action实现的, 可能存在能用但是不是最快的节点的情况, 实在不行就自己部署更新也没啥问题</p></blockquote><h2 id="通过cdn快速获取github可获取的资源" tabindex="-1">通过cdn快速获取GitHub可获取的资源 <a class="header-anchor" href="#通过cdn快速获取github可获取的资源" aria-label="Permalink to &quot;通过cdn快速获取GitHub可获取的资源&quot;">​</a></h2><p>上面那些解决了, 咱们使用GitHub基本上没啥问题了。但是, GitHub Release和GitHub仓库下载的速度非常的难受!!!</p><p>在<a href="https://github.com/NucoTech/nuco-backend-cli" target="_blank" rel="noreferrer">nbc</a>这个项目的实践过程中就屡次被这个问题搞得非常恼火, 油猴上面其实有针对GitHub专门写了一些插件, 也专门有一些cdn来提高GitHub下载慢的情况, 下面是一些总结也可以用于开发</p><h3 id="获取分支资源" tabindex="-1">获取分支资源 <a class="header-anchor" href="#获取分支资源" aria-label="Permalink to &quot;获取分支资源&quot;">​</a></h3><p>正常情况下, GitHub的仓库分支资源其实是不能单独下载的, 那咋办? 很简单, 通过cdn完成</p><p>举个例子, 我要下载<code>nuco-backend-cli</code>下面的<code>install.darwin.sh</code>, 可以通过访问下面的cdn获取</p><div class="language-text vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">https://cdn.jsdelivr.net/gh/NucoTech/nuco-backend-cli@main/install.darwin.sh</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">https://cdn.jsdelivr.net/gh/NucoTech/nuco-backend-cli@main/install.darwin.sh</span></span></code></pre></div><p><a href="https://www.jsdelivr.com/" target="_blank" rel="noreferrer">jsdelivr</a>这个cdn其实前端的小伙伴应该是非常熟悉的, 前端的npm包里面的静态资源都可以通过这个cdn来直接引用</p><p>官网也贴心的, 给了下面的使用格式</p><div class="language-text vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">https://cdn.jsdelivr.net/gh/&lt;用户名&gt;/&lt;仓库名&gt;@&lt;分支&gt;/&lt;文件名&gt;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">https://cdn.jsdelivr.net/gh/&lt;用户名&gt;/&lt;仓库名&gt;@&lt;分支&gt;/&lt;文件名&gt;</span></span></code></pre></div><h3 id="获取github-release资源" tabindex="-1">获取GitHub Release资源 <a class="header-anchor" href="#获取github-release资源" aria-label="Permalink to &quot;获取GitHub Release资源&quot;">​</a></h3><p>这个cdn就比较多了, 列举几个, 所有的都是以<code>nbc.exe</code>资源获取为例的</p><div class="language-text vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">https://gh.con.sh/https://github.com/NucoTech/nuco-backend-cli/releases/download/v1.3.0/nbc.exe</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">https://gh.api.99988866.xyz/https://github.com/NucoTech/nuco-backend-cli/releases/download/v1.3.0/nbc.exe</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">https://download.fastgit.org/NucoTech/nuco-backend-cli/releases/download/v1.3.0/nbc.exe</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">https://github.xiu2.xyz/https://github.com/NucoTech/nuco-backend-cli/releases/download/v1.3.0/nbc.exe</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">https://ghproxy.com/https://github.com/NucoTech/nuco-backend-cli/releases/download/v1.3.0/nbc.exe</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">https://pd.zwc365.com/seturl/https://github.com/NucoTech/nuco-backend-cli/releases/download/v1.3.0/nbc.exe</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">https://gh.con.sh/https://github.com/NucoTech/nuco-backend-cli/releases/download/v1.3.0/nbc.exe</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">https://gh.api.99988866.xyz/https://github.com/NucoTech/nuco-backend-cli/releases/download/v1.3.0/nbc.exe</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">https://download.fastgit.org/NucoTech/nuco-backend-cli/releases/download/v1.3.0/nbc.exe</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">https://github.xiu2.xyz/https://github.com/NucoTech/nuco-backend-cli/releases/download/v1.3.0/nbc.exe</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">https://ghproxy.com/https://github.com/NucoTech/nuco-backend-cli/releases/download/v1.3.0/nbc.exe</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">https://pd.zwc365.com/seturl/https://github.com/NucoTech/nuco-backend-cli/releases/download/v1.3.0/nbc.exe</span></span></code></pre></div><p>你也可以使用插件<a href="https://greasyfork.org/scripts/412245" target="_blank" rel="noreferrer">GitHub增强 - 高速下载</a> 这个油猴脚本来实现</p><p>其中的部分cdn可以传入下面的格式, 实现获取latest release里面的资源</p><div class="language-text vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">https://github.com/&lt;用户名&gt;/latest/releases/download/&lt;资源名&gt;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">https://github.com/&lt;用户名&gt;/latest/releases/download/&lt;资源名&gt;</span></span></code></pre></div>`,35),o=[p];function c(t,i,r,h,m,u){return a(),n("div",null,o)}const y=s(l,[["render",c]]);export{b as __pageData,y as default};
