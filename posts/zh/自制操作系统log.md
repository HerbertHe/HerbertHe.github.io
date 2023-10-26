---
title: 自制操作系统log
date: 2019-09-15 21:42:42
toc: true
tags: [ OS, 操作系统, 自制, 记录 ]
---

## 参考书

* 《三十天自制操作系统（川合秀实）》
* 《ORANGE'S：一个操作系统的实现》

## 写在前面的

本记录不展示原版书籍的内容，仅作为自己历程的记录和总结。两本书各有所长，根据自己的喜好选择和实践。书籍中的内容根据自己的喜好、习惯，有一定的自己理解和改变！本记录默认对二进制、十六进制和基础硬件等都有一定的了解！

<!-- more -->

## 制作启动区(512字节)

从开始我对两本书都是懵逼的，结合两本书涉及的启动盘代码总结一点东西

```asm
ORG 0x7c00                  ; 程序加载0x7c00

; FAT12格式软盘代码位
; (--省略--)

JMP entry
DB 0x90

entry:
        MOV AX, 0           ; 初始化寄存器
        MOV SS, AX
        MOV SP, 0x7c00
        MOV DS, AX
        MOV ES, AX

        MOV SI, msg

putloop:
        MOV AL, [SI]        ; []表示内存中
        ADD SI, 1           ; SI加一
        CMP AL, 0

        JE fin              ; jump if equal
        MOV AH, 0x0e        ; 显示一个文字
        MOV BX, 15          ; 指定字符颜色
        INT 0x10            ; 调用显卡BIOS，INT软件中断指令
        JMP putloop

fin:
        HLT                 ; 让CPU停止等待指令
        JMP fin             ; 无限循环

msg:
        DB 0x0a, 0x0a       ; 换行
        DB "hello, world"
        DB 0x0a
        DB 0

        RESB 0x7dfe-$       ; 填写0x00直到0x001fe
        DB 0x55, 0xaa       ; 结束
```

> 注意：30天那个书制作启动盘的部分完全可以看看就行。。。代码就是上面的，就是helloos.nas节选那个末尾加上了两行，写满512字节和结束标志！

代码直接看[这个库](https://github.com/yourtion/30dayMakeOS)
