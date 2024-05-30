---
title: Windows下Vim的安装与插件管理
date: 2020-02-04 15:37:07
toc: true
tags: [ Vim, Windows, Vundle ]
---

## 关于Vim

Vim是一款优秀的编辑器，可以在环境艰苦的纯shell端进行代码及配置文件的编辑。相比于带有GUI的vscode、notepad++等编辑器，Vim的学习成本比较高，但是却被称为“上古神器”。在Linux端`vi`、`vim`经常是修改配置文件教程的首选，Linux发行版也大都自带Vim；现在很多的Linux发行版开始自带`nano`编辑器，相比于Vim足够简单，但是所提供的功能甚少可以做简单编辑操作，对于完全无需鼠标的编辑操作Vim仍然是不二之选！

大多的Vim使用场景在Linux端，很多的教程和配置文件并不适用Windows的环境，这一路走来遇到了不少的坑。因为在学《汇编语言》下纯的shell环境相较于GUI的编辑器更能提高编辑效率，本篇心得将从Windows的环境下说明和配置Vim结构与配置文件

## 下载与安装Vim

在GitHub仓库下的[releases](https://github.com/vim/vim-win32-installer/releases)下选择对应的`.exe`可执行文件，`x86`32位，`x64`64位。

> 在Windows的环境下默认vim默认为带GUI的`gvim`

根据安装教程来，均无需修改配置，没有默认将Vim装到C盘，请尽量把软件隔离系统盘安装！这里的安装路径是`D:\Vim`

安装完成之后，在`D:\Vim`的目录下有`vim82`和`_vimrc`两个子项，对应于linux的`.vim`和`.vimrc`

## 测试安装

```shell
# 打开powershell
vim --version
```

## 基本配置`_vimrc`

这里贴上我的基本配置文件

```txt
" Vim with all enhancements
source $VIMRUNTIME/vimrc_example.vim

" Use the internal diff if available.
" Otherwise use the special 'diffexpr' for Windows.
if &diffopt !~# 'internal'
  set diffexpr=MyDiff()
endif
function MyDiff()
  let opt = '-a --binary '
  if &diffopt =~ 'icase' | let opt = opt . '-i ' | endif
  if &diffopt =~ 'iwhite' | let opt = opt . '-b ' | endif
  let arg1 = v:fname_in
  if arg1 =~ ' ' | let arg1 = '"' . arg1 . '"' | endif
  let arg1 = substitute(arg1, '!', '\!', 'g')
  let arg2 = v:fname_new
  if arg2 =~ ' ' | let arg2 = '"' . arg2 . '"' | endif
  let arg2 = substitute(arg2, '!', '\!', 'g')
  let arg3 = v:fname_out
  if arg3 =~ ' ' | let arg3 = '"' . arg3 . '"' | endif
  let arg3 = substitute(arg3, '!', '\!', 'g')
  if $VIMRUNTIME =~ ' '
    if &sh =~ '\<cmd'
      if empty(&shellxquote)
        let l:shxq_sav = ''
        set shellxquote&
      endif
      let cmd = '"' . $VIMRUNTIME . '\diff"'
    else
      let cmd = substitute($VIMRUNTIME, ' ', '" ', '') . '\diff"'
    endif
  else
    let cmd = $VIMRUNTIME . '\diff'
  endif
  let cmd = substitute(cmd, '!', '\!', 'g')
  silent execute '!' . cmd . ' ' . opt . arg1 . ' ' . arg2 . ' > ' . arg3
  if exists('l:shxq_sav')
    let &shellxquote=l:shxq_sav
  endif
endfunction

"设置文件的代码形式 utf8
set encoding=utf-8
set termencoding=utf-8
set fileencoding=utf-8
set fileencodings=ucs-bom,utf-8,chinese,cp936

" 设置中文帮助 "
set helplang=cn

" 保留历史记录 "
set history=500

" 设置字体 "
set guifont=Consolas:h14

" 设置行号 "
set number

" 设置Tab四个空格 "
set tabstop=4
set softtabstop=4
set wrap " 设置自动换行
set linebreak " 设置整词换行
set scrolloff=5 " 设置自动上滚或者下滚
set autoread " 设置外部修改更新

" 查找/替换
set hlsearch " 高亮显示
set incsearch " 增量查找

" 状态栏显示
set statusline=[%F]%y%r%m%*%=[Line:%l/%L,Column:%c][%p%%]  " 显示文件名：总行数，总的字符数
set ruler " 在编辑过程中，在右下角显示光标位置的状态行

" 代码设置
syntax enable " 打开语法高亮
syntax on " 打开语法高亮
set showmatch " 设置匹配模式，相当于括号匹配
set smartindent " 智能对齐
set autoindent " 设置自动对齐
set ai! " 设置自动缩进
set fdm=indent
```

关于`vimrc`文件的配置可以直接百度或者GitHub搜索`vimrc配置`的相关词条，`vimrc`的配置确实让很多人看到就会想放弃Vim (￣▽￣)"

## 设置Vundle插件管理

Vundle是一个很棒的Vim插件管理工具，同样它也是Vim的插件。根据搜到的配置教程和官方仓库的关于Windows的配置教程，尽量简化了Vundle的安装，但是同样带来了默认C盘的尴尬事情发生，你如果按照官方配置文件来一定会在C盘的`User(用户)`目录下多出一个`.vim`的文件夹！！

> 官方配置流程: [Vundle-for-Windows](https://github.com/VundleVim/Vundle.vim/wiki/Vundle-for-Windows)

下面是详细的配置过程

### 下载安装 [Git on Windows](https://git-scm.com/download/win)

在`Adjusting your PATH environment`这一步，一定要勾选`Use Git from the Windows Command Prompt`这一项配置`PATH`！

### 下载安装 [Curl on Windows](https://curl.haxx.se/windows/)

1. 下载完成之后解压缩文件获取里面的内容，我解压缩到了`D:\curl`这个文件夹下！
2. `bin`文件夹添加到系统的环境变量`Path`，我的配置是`D:\curl\bin`   **这一步不做无法在命令行使用curl命令**

### 测试安装git和curl

```shell
git --version

curl --version
```

### Vundle on Windows

> 与官方文档不同！很重要！

打开到`vim`的安装目录`D:\Vim`，在此目录下打开`PowerShell`

```shell
git clone https://github.com/VundleVim/Vundle.vim.git /vim82/bundle/Vundle.vim

# 你同样也可以使用我在Gitee备份的仓库，提高下载速度
git clone https://gitee.com/HerbertHe/Vundle.vim.git /vim82/bundle/Vundle.vim
```

> 说明：命令里的`vim82`对应的就是`.vim`这个目录！因为Vim版本的不同可能会导致目录的名称不同，请参考修改！

配置插件，打开修改`_vimrc`文件

```txt
set nocompatible              " 去除VI一致性,必须
filetype off                  " 必须

" 设置包括vundle和初始化相关的runtime path，重要！！
set rtp+=D:/Vim/vim82/bundle/Vundle.vim

" 指定一个vundle安装插件的路径，重要！！
"call vundle#begin('D:/Vim/vim82/bundle')

" 让vundle管理插件版本,必须
Plugin 'VundleVim/Vundle.vim'

" 以下范例用来支持不同格式的插件安装.
" 请将安装插件的命令放在vundle#begin和vundle#end之间.
" Github上的插件
" 格式为 Plugin '用户名/插件仓库名'
" Plugin 'tpope/vim-fugitive'
" 来自 http://vim-scripts.org/vim/scripts.html 的插件
" Plugin '插件名称' 实际上是 Plugin 'vim-scripts/插件仓库名' 只是此处的用户名可以省略
" Plugin 'L9'
" 由Git支持但不再github上的插件仓库 Plugin 'git clone 后面的地址'
" Plugin 'git://git.wincent.com/command-t.git'
" 本地的Git仓库(例如自己的插件) Plugin 'file:///+本地插件仓库绝对路径'
" Plugin 'file:///home/gmarik/path/to/plugin'
" 插件在仓库的子目录中.
" 正确指定路径用以设置runtimepath. 以下范例插件在sparkup/vim目录下
" Plugin 'rstacruz/sparkup', {'rtp': 'vim/'}
" 安装L9，如果已经安装过这个插件，可利用以下格式避免命名冲突
" Plugin 'ascenator/L9', {'name': 'newL9'}

call vundle#end()            " 插件管理结束标志，必须
filetype plugin indent on    " 必须 加载vim自带和插件相应的语法和文件类型相关脚本
" 忽视插件改变缩进,可以使用以下替代:
"filetype plugin on
"
" 简要帮助文档
" :PluginList       - 列出所有已配置的插件
" :PluginInstall    - 安装插件,追加 `!` 用以更新或使用 :PluginUpdate
" :PluginSearch foo - 搜索 foo ; 追加 `!` 清除本地缓存
" :PluginClean      - 清除未使用插件,需要确认; 追加 `!` 自动批准移除未使用插件
"
" 查阅 :h vundle 获取更多细节和wiki以及FAQ
" 将你自己对非插件片段放在这行之后
```

在配置内容中，我额外配置的是

```txt
" 设置Vundle插件管理
set nocompatible
filetype off

" 设置Vundle路径和初始化
set rtp+=D:/Vim/vim82/bundle/Vundle.vim

" 指定插件安装
call vundle#begin('D:/Vim/vim82/bundle')
Plugin 'VundleVim/Vundle.vim'
Plugin 'scrooloose/nerdtree'
Plugin 'altercation/vim-colors-solarized'

call vundle#end()   " 结束

" 加载vim自带和插件对应语法和文件类型相关脚本
filetype plugin indent on

" 目录树插件配置
let NERDTreeHighlightCursorline = 1       " 高亮当前行
let NERDTreeShowLineNumbers     = 1       " 显示行号
map <C-n> :NERDTreeToggle<CR>    " Ctrl+n打开插件
let g:NERDTreeDirArrowExpandable = '▸'
let g:NERDTreeDirArrowCollapsible = '▾'

" 主题配置
let g:solarized_termtrans  = 1        " 使用 termnal 背景
let g:solarized_visibility = "high"   " 使用 :set list 显示特殊字符时的高亮级别
" GUI 模式浅色背景，终端模式深色背景
if has('gui_running')
    set background=light
else
    set background=dark
endif

" 主题设置为 solarized
colorscheme solarized

```

## 命令行启动Vim并且安装插件

* 打开PowerShell
* 键入`vim`命令行下打开编辑器
* 在视图模式下键入`:PluginInstall`回车

安装完成后即可使用插件，上面的配置中我使用了`Plugin 'scrooloose/nerdtree'`和`Plugin 'altercation/vim-colors-solarized'`
