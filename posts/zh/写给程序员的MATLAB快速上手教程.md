---
title: 写给程序员的MATLAB快速上手教程
date: 2021-03-21 21:37:42
toc: true
tags: [ MATLAB, 快速上手, 程序员 ]
---

## 写在前面的

MATLAB更多的是一门面向非程序员的计算机编程语言, 因此其教程往往对于程序员同学来说并不算是很"友好"。因为自己的本科毕业论文是利用MATLAB来研究光的波动性, 之前因为教程的问题一直感觉MATLAB这个语言奇奇怪怪的, 故作为一个程序员的视角自己来写一份教程。本教程会对比其它语言或者编程语言通用的概念来书写, 所以需要至少有一门语言的编程经验。

## 基本架构图

- 参考书籍: 北京航空航天大学出版的由胡章芳老师编写的《matlab仿真及其在光学课程中的应用》（第二版）

使用软件:

- MindLine
- Matlab
- GNU Octave
- Anoc Octave Pro Editor

<!-- more -->

<img src="/img/matlab基础.jpg" />

## 变量

### 标识符

MATLAB的标识符的规则符合下面的正则表达式:

> \^[A-Za-z]{1}[A-Za-z0-9_]*

- 标识符只能以 **英文字母** 开头
- 标识符只能由 **大小写字母、数字、下划线（\_）** 组成
- 标识符不能与 **[关键字](#关键字) 和 预定义量** 重复
- 长度不超过 **namelengthmax** （不同的MATLAB版本长度也不一样）

> 那本书把预定义量叫做const, 这个跟我们常规编程语言理解的const（常量）意义不太一样, 因此我翻译为了 **预定义量**

#### 关键字

> 执行`iskeyword`输出关键字

```matlab
iskeyword

% ans =

%   20×1 cell 数组

%     {'break'     }
%     {'case'      }
%     {'catch'     }
%     {'classdef'  }
%     {'continue'  }
%     {'else'      }
%     {'elseif'    }
%     {'end'       }
%     {'for'       }
%     {'function'  }
%     {'global'    }
%     {'if'        }
%     {'otherwise' }
%     {'parfor'    }
%     {'persistent'}
%     {'return'    }
%     {'spmd'      }
%     {'switch'    }
%     {'try'       }
%     {'while'     }
```

### 默认变量

MATLAB是一门默认支持REPL的语言而且与计算有关, 因此MATLAB定义了一个默认变量 `ans` 作为未赋值的计算结果的赋值, eg.

```matlab
2 * 3

% 输出: ans = 6
```

未完待续...
