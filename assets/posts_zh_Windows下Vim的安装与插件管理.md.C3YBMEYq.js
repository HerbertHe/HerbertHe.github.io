import{_ as n,c as s,o as a,a6 as p}from"./chunks/framework.CRmoCaTl.js";const h=JSON.parse('{"title":"Windows下Vim的安装与插件管理","description":"","frontmatter":{"title":"Windows下Vim的安装与插件管理","date":"2020-02-04T15:37:07.000Z","toc":true,"tags":["Vim","Windows","Vundle"]},"headers":[],"relativePath":"posts/zh/Windows下Vim的安装与插件管理.md","filePath":"posts/zh/Windows下Vim的安装与插件管理.md"}'),e={name:"posts/zh/Windows下Vim的安装与插件管理.md"},l=p(`<h2 id="关于vim" tabindex="-1">关于Vim <a class="header-anchor" href="#关于vim" aria-label="Permalink to &quot;关于Vim&quot;">​</a></h2><p>Vim是一款优秀的编辑器，可以在环境艰苦的纯shell端进行代码及配置文件的编辑。相比于带有GUI的vscode、notepad++等编辑器，Vim的学习成本比较高，但是却被称为“上古神器”。在Linux端<code>vi</code>、<code>vim</code>经常是修改配置文件教程的首选，Linux发行版也大都自带Vim；现在很多的Linux发行版开始自带<code>nano</code>编辑器，相比于Vim足够简单，但是所提供的功能甚少可以做简单编辑操作，对于完全无需鼠标的编辑操作Vim仍然是不二之选！</p><p>大多的Vim使用场景在Linux端，很多的教程和配置文件并不适用Windows的环境，这一路走来遇到了不少的坑。因为在学《汇编语言》下纯的shell环境相较于GUI的编辑器更能提高编辑效率，本篇心得将从Windows的环境下说明和配置Vim结构与配置文件</p><h2 id="下载与安装vim" tabindex="-1">下载与安装Vim <a class="header-anchor" href="#下载与安装vim" aria-label="Permalink to &quot;下载与安装Vim&quot;">​</a></h2><p>在GitHub仓库下的<a href="https://github.com/vim/vim-win32-installer/releases" target="_blank" rel="noreferrer">releases</a>下选择对应的<code>.exe</code>可执行文件，<code>x86</code>32位，<code>x64</code>64位。</p><blockquote><p>在Windows的环境下默认vim默认为带GUI的<code>gvim</code></p></blockquote><p>根据安装教程来，均无需修改配置，没有默认将Vim装到C盘，请尽量把软件隔离系统盘安装！这里的安装路径是<code>D:\\Vim</code></p><p>安装完成之后，在<code>D:\\Vim</code>的目录下有<code>vim82</code>和<code>_vimrc</code>两个子项，对应于linux的<code>.vim</code>和<code>.vimrc</code></p><h2 id="测试安装" tabindex="-1">测试安装 <a class="header-anchor" href="#测试安装" aria-label="Permalink to &quot;测试安装&quot;">​</a></h2><div class="language-shell line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki nord vp-code"><code><span class="line"><span style="color:#616E88;"># 打开powershell</span></span>
<span class="line"><span style="color:#88C0D0;">vim</span><span style="color:#A3BE8C;"> --version</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><h2 id="基本配置-vimrc" tabindex="-1">基本配置<code>_vimrc</code> <a class="header-anchor" href="#基本配置-vimrc" aria-label="Permalink to &quot;基本配置\`_vimrc\`&quot;">​</a></h2><p>这里贴上我的基本配置文件</p><div class="language-txt line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">txt</span><pre class="shiki nord vp-code"><code><span class="line"><span>&quot; Vim with all enhancements</span></span>
<span class="line"><span>source $VIMRUNTIME/vimrc_example.vim</span></span>
<span class="line"><span></span></span>
<span class="line"><span>&quot; Use the internal diff if available.</span></span>
<span class="line"><span>&quot; Otherwise use the special &#39;diffexpr&#39; for Windows.</span></span>
<span class="line"><span>if &amp;diffopt !~# &#39;internal&#39;</span></span>
<span class="line"><span>  set diffexpr=MyDiff()</span></span>
<span class="line"><span>endif</span></span>
<span class="line"><span>function MyDiff()</span></span>
<span class="line"><span>  let opt = &#39;-a --binary &#39;</span></span>
<span class="line"><span>  if &amp;diffopt =~ &#39;icase&#39; | let opt = opt . &#39;-i &#39; | endif</span></span>
<span class="line"><span>  if &amp;diffopt =~ &#39;iwhite&#39; | let opt = opt . &#39;-b &#39; | endif</span></span>
<span class="line"><span>  let arg1 = v:fname_in</span></span>
<span class="line"><span>  if arg1 =~ &#39; &#39; | let arg1 = &#39;&quot;&#39; . arg1 . &#39;&quot;&#39; | endif</span></span>
<span class="line"><span>  let arg1 = substitute(arg1, &#39;!&#39;, &#39;\\!&#39;, &#39;g&#39;)</span></span>
<span class="line"><span>  let arg2 = v:fname_new</span></span>
<span class="line"><span>  if arg2 =~ &#39; &#39; | let arg2 = &#39;&quot;&#39; . arg2 . &#39;&quot;&#39; | endif</span></span>
<span class="line"><span>  let arg2 = substitute(arg2, &#39;!&#39;, &#39;\\!&#39;, &#39;g&#39;)</span></span>
<span class="line"><span>  let arg3 = v:fname_out</span></span>
<span class="line"><span>  if arg3 =~ &#39; &#39; | let arg3 = &#39;&quot;&#39; . arg3 . &#39;&quot;&#39; | endif</span></span>
<span class="line"><span>  let arg3 = substitute(arg3, &#39;!&#39;, &#39;\\!&#39;, &#39;g&#39;)</span></span>
<span class="line"><span>  if $VIMRUNTIME =~ &#39; &#39;</span></span>
<span class="line"><span>    if &amp;sh =~ &#39;\\&lt;cmd&#39;</span></span>
<span class="line"><span>      if empty(&amp;shellxquote)</span></span>
<span class="line"><span>        let l:shxq_sav = &#39;&#39;</span></span>
<span class="line"><span>        set shellxquote&amp;</span></span>
<span class="line"><span>      endif</span></span>
<span class="line"><span>      let cmd = &#39;&quot;&#39; . $VIMRUNTIME . &#39;\\diff&quot;&#39;</span></span>
<span class="line"><span>    else</span></span>
<span class="line"><span>      let cmd = substitute($VIMRUNTIME, &#39; &#39;, &#39;&quot; &#39;, &#39;&#39;) . &#39;\\diff&quot;&#39;</span></span>
<span class="line"><span>    endif</span></span>
<span class="line"><span>  else</span></span>
<span class="line"><span>    let cmd = $VIMRUNTIME . &#39;\\diff&#39;</span></span>
<span class="line"><span>  endif</span></span>
<span class="line"><span>  let cmd = substitute(cmd, &#39;!&#39;, &#39;\\!&#39;, &#39;g&#39;)</span></span>
<span class="line"><span>  silent execute &#39;!&#39; . cmd . &#39; &#39; . opt . arg1 . &#39; &#39; . arg2 . &#39; &gt; &#39; . arg3</span></span>
<span class="line"><span>  if exists(&#39;l:shxq_sav&#39;)</span></span>
<span class="line"><span>    let &amp;shellxquote=l:shxq_sav</span></span>
<span class="line"><span>  endif</span></span>
<span class="line"><span>endfunction</span></span>
<span class="line"><span></span></span>
<span class="line"><span>&quot;设置文件的代码形式 utf8</span></span>
<span class="line"><span>set encoding=utf-8</span></span>
<span class="line"><span>set termencoding=utf-8</span></span>
<span class="line"><span>set fileencoding=utf-8</span></span>
<span class="line"><span>set fileencodings=ucs-bom,utf-8,chinese,cp936</span></span>
<span class="line"><span></span></span>
<span class="line"><span>&quot; 设置中文帮助 &quot;</span></span>
<span class="line"><span>set helplang=cn</span></span>
<span class="line"><span></span></span>
<span class="line"><span>&quot; 保留历史记录 &quot;</span></span>
<span class="line"><span>set history=500</span></span>
<span class="line"><span></span></span>
<span class="line"><span>&quot; 设置字体 &quot;</span></span>
<span class="line"><span>set guifont=Consolas:h14</span></span>
<span class="line"><span></span></span>
<span class="line"><span>&quot; 设置行号 &quot;</span></span>
<span class="line"><span>set number</span></span>
<span class="line"><span></span></span>
<span class="line"><span>&quot; 设置Tab四个空格 &quot;</span></span>
<span class="line"><span>set tabstop=4</span></span>
<span class="line"><span>set softtabstop=4</span></span>
<span class="line"><span>set wrap &quot; 设置自动换行</span></span>
<span class="line"><span>set linebreak &quot; 设置整词换行</span></span>
<span class="line"><span>set scrolloff=5 &quot; 设置自动上滚或者下滚</span></span>
<span class="line"><span>set autoread &quot; 设置外部修改更新</span></span>
<span class="line"><span></span></span>
<span class="line"><span>&quot; 查找/替换</span></span>
<span class="line"><span>set hlsearch &quot; 高亮显示</span></span>
<span class="line"><span>set incsearch &quot; 增量查找</span></span>
<span class="line"><span></span></span>
<span class="line"><span>&quot; 状态栏显示</span></span>
<span class="line"><span>set statusline=[%F]%y%r%m%*%=[Line:%l/%L,Column:%c][%p%%]  &quot; 显示文件名：总行数，总的字符数</span></span>
<span class="line"><span>set ruler &quot; 在编辑过程中，在右下角显示光标位置的状态行</span></span>
<span class="line"><span></span></span>
<span class="line"><span>&quot; 代码设置</span></span>
<span class="line"><span>syntax enable &quot; 打开语法高亮</span></span>
<span class="line"><span>syntax on &quot; 打开语法高亮</span></span>
<span class="line"><span>set showmatch &quot; 设置匹配模式，相当于括号匹配</span></span>
<span class="line"><span>set smartindent &quot; 智能对齐</span></span>
<span class="line"><span>set autoindent &quot; 设置自动对齐</span></span>
<span class="line"><span>set ai! &quot; 设置自动缩进</span></span>
<span class="line"><span>set fdm=indent</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br><span class="line-number">40</span><br><span class="line-number">41</span><br><span class="line-number">42</span><br><span class="line-number">43</span><br><span class="line-number">44</span><br><span class="line-number">45</span><br><span class="line-number">46</span><br><span class="line-number">47</span><br><span class="line-number">48</span><br><span class="line-number">49</span><br><span class="line-number">50</span><br><span class="line-number">51</span><br><span class="line-number">52</span><br><span class="line-number">53</span><br><span class="line-number">54</span><br><span class="line-number">55</span><br><span class="line-number">56</span><br><span class="line-number">57</span><br><span class="line-number">58</span><br><span class="line-number">59</span><br><span class="line-number">60</span><br><span class="line-number">61</span><br><span class="line-number">62</span><br><span class="line-number">63</span><br><span class="line-number">64</span><br><span class="line-number">65</span><br><span class="line-number">66</span><br><span class="line-number">67</span><br><span class="line-number">68</span><br><span class="line-number">69</span><br><span class="line-number">70</span><br><span class="line-number">71</span><br><span class="line-number">72</span><br><span class="line-number">73</span><br><span class="line-number">74</span><br><span class="line-number">75</span><br><span class="line-number">76</span><br><span class="line-number">77</span><br><span class="line-number">78</span><br><span class="line-number">79</span><br><span class="line-number">80</span><br><span class="line-number">81</span><br><span class="line-number">82</span><br><span class="line-number">83</span><br></div></div><p>关于<code>vimrc</code>文件的配置可以直接百度或者GitHub搜索<code>vimrc配置</code>的相关词条，<code>vimrc</code>的配置确实让很多人看到就会想放弃Vim (￣▽￣)&quot;</p><h2 id="设置vundle插件管理" tabindex="-1">设置Vundle插件管理 <a class="header-anchor" href="#设置vundle插件管理" aria-label="Permalink to &quot;设置Vundle插件管理&quot;">​</a></h2><p>Vundle是一个很棒的Vim插件管理工具，同样它也是Vim的插件。根据搜到的配置教程和官方仓库的关于Windows的配置教程，尽量简化了Vundle的安装，但是同样带来了默认C盘的尴尬事情发生，你如果按照官方配置文件来一定会在C盘的<code>User(用户)</code>目录下多出一个<code>.vim</code>的文件夹！！</p><blockquote><p>官方配置流程: <a href="https://github.com/VundleVim/Vundle.vim/wiki/Vundle-for-Windows" target="_blank" rel="noreferrer">Vundle-for-Windows</a></p></blockquote><p>下面是详细的配置过程</p><h3 id="下载安装-git-on-windows" tabindex="-1">下载安装 <a href="https://git-scm.com/download/win" target="_blank" rel="noreferrer">Git on Windows</a> <a class="header-anchor" href="#下载安装-git-on-windows" aria-label="Permalink to &quot;下载安装 [Git on Windows](https://git-scm.com/download/win)&quot;">​</a></h3><p>在<code>Adjusting your PATH environment</code>这一步，一定要勾选<code>Use Git from the Windows Command Prompt</code>这一项配置<code>PATH</code>！</p><h3 id="下载安装-curl-on-windows" tabindex="-1">下载安装 <a href="https://curl.haxx.se/windows/" target="_blank" rel="noreferrer">Curl on Windows</a> <a class="header-anchor" href="#下载安装-curl-on-windows" aria-label="Permalink to &quot;下载安装 [Curl on Windows](https://curl.haxx.se/windows/)&quot;">​</a></h3><ol><li>下载完成之后解压缩文件获取里面的内容，我解压缩到了<code>D:\\curl</code>这个文件夹下！</li><li><code>bin</code>文件夹添加到系统的环境变量<code>Path</code>，我的配置是<code>D:\\curl\\bin</code> <strong>这一步不做无法在命令行使用curl命令</strong></li></ol><h3 id="测试安装git和curl" tabindex="-1">测试安装git和curl <a class="header-anchor" href="#测试安装git和curl" aria-label="Permalink to &quot;测试安装git和curl&quot;">​</a></h3><div class="language-shell line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki nord vp-code"><code><span class="line"><span style="color:#88C0D0;">git</span><span style="color:#A3BE8C;"> --version</span></span>
<span class="line"></span>
<span class="line"><span style="color:#88C0D0;">curl</span><span style="color:#A3BE8C;"> --version</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><h3 id="vundle-on-windows" tabindex="-1">Vundle on Windows <a class="header-anchor" href="#vundle-on-windows" aria-label="Permalink to &quot;Vundle on Windows&quot;">​</a></h3><blockquote><p>与官方文档不同！很重要！</p></blockquote><p>打开到<code>vim</code>的安装目录<code>D:\\Vim</code>，在此目录下打开<code>PowerShell</code></p><div class="language-shell line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki nord vp-code"><code><span class="line"><span style="color:#88C0D0;">git</span><span style="color:#A3BE8C;"> clone</span><span style="color:#A3BE8C;"> https://github.com/VundleVim/Vundle.vim.git</span><span style="color:#A3BE8C;"> /vim82/bundle/Vundle.vim</span></span>
<span class="line"></span>
<span class="line"><span style="color:#616E88;"># 你同样也可以使用我在Gitee备份的仓库，提高下载速度</span></span>
<span class="line"><span style="color:#88C0D0;">git</span><span style="color:#A3BE8C;"> clone</span><span style="color:#A3BE8C;"> https://gitee.com/HerbertHe/Vundle.vim.git</span><span style="color:#A3BE8C;"> /vim82/bundle/Vundle.vim</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div><blockquote><p>说明：命令里的<code>vim82</code>对应的就是<code>.vim</code>这个目录！因为Vim版本的不同可能会导致目录的名称不同，请参考修改！</p></blockquote><p>配置插件，打开修改<code>_vimrc</code>文件</p><div class="language-txt line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">txt</span><pre class="shiki nord vp-code"><code><span class="line"><span>set nocompatible              &quot; 去除VI一致性,必须</span></span>
<span class="line"><span>filetype off                  &quot; 必须</span></span>
<span class="line"><span></span></span>
<span class="line"><span>&quot; 设置包括vundle和初始化相关的runtime path，重要！！</span></span>
<span class="line"><span>set rtp+=D:/Vim/vim82/bundle/Vundle.vim</span></span>
<span class="line"><span></span></span>
<span class="line"><span>&quot; 指定一个vundle安装插件的路径，重要！！</span></span>
<span class="line"><span>&quot;call vundle#begin(&#39;D:/Vim/vim82/bundle&#39;)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>&quot; 让vundle管理插件版本,必须</span></span>
<span class="line"><span>Plugin &#39;VundleVim/Vundle.vim&#39;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>&quot; 以下范例用来支持不同格式的插件安装.</span></span>
<span class="line"><span>&quot; 请将安装插件的命令放在vundle#begin和vundle#end之间.</span></span>
<span class="line"><span>&quot; Github上的插件</span></span>
<span class="line"><span>&quot; 格式为 Plugin &#39;用户名/插件仓库名&#39;</span></span>
<span class="line"><span>&quot; Plugin &#39;tpope/vim-fugitive&#39;</span></span>
<span class="line"><span>&quot; 来自 http://vim-scripts.org/vim/scripts.html 的插件</span></span>
<span class="line"><span>&quot; Plugin &#39;插件名称&#39; 实际上是 Plugin &#39;vim-scripts/插件仓库名&#39; 只是此处的用户名可以省略</span></span>
<span class="line"><span>&quot; Plugin &#39;L9&#39;</span></span>
<span class="line"><span>&quot; 由Git支持但不再github上的插件仓库 Plugin &#39;git clone 后面的地址&#39;</span></span>
<span class="line"><span>&quot; Plugin &#39;git://git.wincent.com/command-t.git&#39;</span></span>
<span class="line"><span>&quot; 本地的Git仓库(例如自己的插件) Plugin &#39;file:///+本地插件仓库绝对路径&#39;</span></span>
<span class="line"><span>&quot; Plugin &#39;file:///home/gmarik/path/to/plugin&#39;</span></span>
<span class="line"><span>&quot; 插件在仓库的子目录中.</span></span>
<span class="line"><span>&quot; 正确指定路径用以设置runtimepath. 以下范例插件在sparkup/vim目录下</span></span>
<span class="line"><span>&quot; Plugin &#39;rstacruz/sparkup&#39;, {&#39;rtp&#39;: &#39;vim/&#39;}</span></span>
<span class="line"><span>&quot; 安装L9，如果已经安装过这个插件，可利用以下格式避免命名冲突</span></span>
<span class="line"><span>&quot; Plugin &#39;ascenator/L9&#39;, {&#39;name&#39;: &#39;newL9&#39;}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>call vundle#end()            &quot; 插件管理结束标志，必须</span></span>
<span class="line"><span>filetype plugin indent on    &quot; 必须 加载vim自带和插件相应的语法和文件类型相关脚本</span></span>
<span class="line"><span>&quot; 忽视插件改变缩进,可以使用以下替代:</span></span>
<span class="line"><span>&quot;filetype plugin on</span></span>
<span class="line"><span>&quot;</span></span>
<span class="line"><span>&quot; 简要帮助文档</span></span>
<span class="line"><span>&quot; :PluginList       - 列出所有已配置的插件</span></span>
<span class="line"><span>&quot; :PluginInstall    - 安装插件,追加 \`!\` 用以更新或使用 :PluginUpdate</span></span>
<span class="line"><span>&quot; :PluginSearch foo - 搜索 foo ; 追加 \`!\` 清除本地缓存</span></span>
<span class="line"><span>&quot; :PluginClean      - 清除未使用插件,需要确认; 追加 \`!\` 自动批准移除未使用插件</span></span>
<span class="line"><span>&quot;</span></span>
<span class="line"><span>&quot; 查阅 :h vundle 获取更多细节和wiki以及FAQ</span></span>
<span class="line"><span>&quot; 将你自己对非插件片段放在这行之后</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br><span class="line-number">40</span><br><span class="line-number">41</span><br><span class="line-number">42</span><br><span class="line-number">43</span><br></div></div><p>在配置内容中，我额外配置的是</p><div class="language-txt line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">txt</span><pre class="shiki nord vp-code"><code><span class="line"><span>&quot; 设置Vundle插件管理</span></span>
<span class="line"><span>set nocompatible</span></span>
<span class="line"><span>filetype off</span></span>
<span class="line"><span></span></span>
<span class="line"><span>&quot; 设置Vundle路径和初始化</span></span>
<span class="line"><span>set rtp+=D:/Vim/vim82/bundle/Vundle.vim</span></span>
<span class="line"><span></span></span>
<span class="line"><span>&quot; 指定插件安装</span></span>
<span class="line"><span>call vundle#begin(&#39;D:/Vim/vim82/bundle&#39;)</span></span>
<span class="line"><span>Plugin &#39;VundleVim/Vundle.vim&#39;</span></span>
<span class="line"><span>Plugin &#39;scrooloose/nerdtree&#39;</span></span>
<span class="line"><span>Plugin &#39;altercation/vim-colors-solarized&#39;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>call vundle#end()   &quot; 结束</span></span>
<span class="line"><span></span></span>
<span class="line"><span>&quot; 加载vim自带和插件对应语法和文件类型相关脚本</span></span>
<span class="line"><span>filetype plugin indent on</span></span>
<span class="line"><span></span></span>
<span class="line"><span>&quot; 目录树插件配置</span></span>
<span class="line"><span>let NERDTreeHighlightCursorline = 1       &quot; 高亮当前行</span></span>
<span class="line"><span>let NERDTreeShowLineNumbers     = 1       &quot; 显示行号</span></span>
<span class="line"><span>map &lt;C-n&gt; :NERDTreeToggle&lt;CR&gt;    &quot; Ctrl+n打开插件</span></span>
<span class="line"><span>let g:NERDTreeDirArrowExpandable = &#39;▸&#39;</span></span>
<span class="line"><span>let g:NERDTreeDirArrowCollapsible = &#39;▾&#39;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>&quot; 主题配置</span></span>
<span class="line"><span>let g:solarized_termtrans  = 1        &quot; 使用 termnal 背景</span></span>
<span class="line"><span>let g:solarized_visibility = &quot;high&quot;   &quot; 使用 :set list 显示特殊字符时的高亮级别</span></span>
<span class="line"><span>&quot; GUI 模式浅色背景，终端模式深色背景</span></span>
<span class="line"><span>if has(&#39;gui_running&#39;)</span></span>
<span class="line"><span>    set background=light</span></span>
<span class="line"><span>else</span></span>
<span class="line"><span>    set background=dark</span></span>
<span class="line"><span>endif</span></span>
<span class="line"><span></span></span>
<span class="line"><span>&quot; 主题设置为 solarized</span></span>
<span class="line"><span>colorscheme solarized</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br></div></div><h2 id="命令行启动vim并且安装插件" tabindex="-1">命令行启动Vim并且安装插件 <a class="header-anchor" href="#命令行启动vim并且安装插件" aria-label="Permalink to &quot;命令行启动Vim并且安装插件&quot;">​</a></h2><ul><li>打开PowerShell</li><li>键入<code>vim</code>命令行下打开编辑器</li><li>在视图模式下键入<code>:PluginInstall</code>回车</li></ul><p>安装完成后即可使用插件，上面的配置中我使用了<code>Plugin &#39;scrooloose/nerdtree&#39;</code>和<code>Plugin &#39;altercation/vim-colors-solarized&#39;</code></p>`,36),i=[l];function r(c,o,t,u,b,m){return a(),s("div",null,i)}const g=n(e,[["render",r]]);export{h as __pageData,g as default};
