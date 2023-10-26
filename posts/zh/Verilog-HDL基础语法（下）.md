---
title: Verilog-HDL基础语法（下）
date: 2019-07-19 21:50:01
toc: true
tags: [ Verilog, HDL, 硬件开发, 数字电子技术, FPGA ]
---

## 过程块

* initial块，只执行一次
* always块，循环执行

过程块中的部件：

* 过程赋值语句
* 高级结构（循环，条件语句）
* 时序控制

<!-- more -->

## 过程赋值

过程赋值的对象必须是寄存器类型，过程赋值语句给wire赋值会产生错误！！

## 过程时序控制

* 简单延时(\#delay)：延时指定时间之后执行
* 边沿敏感的时序控制：\@(\<signal\>)，上升沿(posedge)，下降沿(negedge)，用关键字or指定多个参数
* 电平敏感的时序控制：wait(\<expr\>)，expr为真时执行

！！！综合工具不支持 **wait语句** ！！！

内容参考 [百度文库](https://wenku.baidu.com/view/b4a43aefaeaad1f346933f7d.html)，不支持综合的部分内容，略。

## 块语句

* 顺序块：语句置于begin和end之间，块中语句顺序执行
* 并行块：语句置于fork和join之间，语句并行执行（不可综合）

## 延时赋值语句（可以用于模拟寄存器交换和移位）

```verilog
LHS = <timing_control> RHS;

// 举例
begin
    temp = b;
    @(posedge clk) a = temp;
end

// 等价于

a = @(posedge clk) b;
```

## 阻塞赋值与非阻塞赋值

* 阻塞赋值：语句结束立即完成赋值操作，前面的赋值语句完成之前，后面的语句不能被执行，使用 "="
* 非阻塞赋值：整个过程块结束时才完成赋值操作，使用 "<="

对比举例

```verilog
// 非阻塞赋值
module non_block(c, b, a, clk);
    output c, b;
    input a, clk;
    reg c, b;
    always @(posedge clk)
        begin
        b <= a;
        c <= b;
        end
endmodule

// 阻塞赋值
module block(c, b, a, clk);
    output c, b;
    input a, clk;
    reg c, b;
    always @(posedge clk)
        begin
        b = a;
        c = b;
        end
endmodule

// 非阻塞赋值中c的结果为上一个时刻的b的值（旧值），阻塞赋值中c和b的值相等
```
