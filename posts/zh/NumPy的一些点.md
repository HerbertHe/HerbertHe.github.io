---
title: NumPy的一些点
date: 2019-07-16 10:13:57
toc: true
tags: [ python, numpy, 图像处理基础 ]
---

## 参考教程

[runoob numpy](https://www.runoob.com/numpy)

## NumPy Ndarray对象

* N维数组对象
* 同类型数据的集合
* 从0下标开始元素索引

<!-- more -->

组成

* 一个指向数据的指针
* 数据类型\/dtype(描述数组中固定大小值)
* 一个表示数组形状的元组(表示各维度大小的元组)
* 一个跨度元组，其中的整数是指为了前进到当前维度下一个元素所需要“跨过”的字节数

> 跨度可以是负数，这样会使数组在内存中后向移动

```python
numpy.array(object, dtype = None, copy = True, oreder = None, subok = False, ndmin = 0)
```

| 名称 | 描述 |
| :--- | :--- |
| object | 数组或嵌套的数列 |
| dtype | 元素的数据类型，可选 |
| copy | 对象是否需要复制，可选 |
| order | 创建数据的样式，C行，F列，A任意(默认) |
| subok | 默认返回一个与基类类型一致的数组 |
| ndmin | 指定生成数组的最小维度 |

## NumPy数据类型

参考NumPy数据类型的[教程](https://www.runoob.com/numpy/numpy-dtype.html)，主要规定数据类型对象的数据结构(类似于C的结构体，内建类型相当于是正则)

## NumPy数组属性

NumPy数组的维数成为秩(rank)，一维数组的秩为1，以此类推。每一个一维线性数组称为一个轴(axis)，也就是维度(dimensions)。

![图片](/img/20190219173235151.jpg)

> axis所代表的如上图所示，图片来源于 [CSDN](https://blog.csdn.net/Babyfatliang/article/details/87721282)

| 属性 | 说明 |
| :--- | :--- |
| ndarray.ndim | 秩，轴的数量(维度的数量) |
| ndarray.shape | 数组的维度，对于矩阵， n行m列 |
| ndarray.size | 元素的总个数，相当于.shape中n*m的值 |
| ndarray.dtype | ndarray对象的元素类型 |
| ndarray.itemsize | ndarray对象中每个元素的大小，以字节为单位 |
| ndarray.flasgs | ndarray对象的内存信息 |
| ndarray.real | ndarray元素的实部 |
| ndarray.imag | ndarray元素的虚部 |
| ndarray.data | 包含实际数组元素的缓冲区，通常不使用这个属性 |

## NumPy创建数组

### numpy.empty

用来创建一个指定形状和数据类型的未初始化的数组：

```python
numpy.empty(shape, dtype = float, order = 'C')
```

| 参数 | 描述 |
| :--- | :--- |
| shape | 数组形状 |
| dtype | 数据类型，可选 |
| order | C行优先，F列优先 |

### numpy.zeros

创建指定大小的数组，元素全是0

```python
numpy.zeros(shape, dtype = float, order = 'C')
```

| 参数 | 描述 |
| :--- | :--- |
| shape | 数组的形状 |
| dtype | 数据类型，可选 |
| order | C行数组，F列数组 |

### numpy.ones

同上

## NumPy从已有的数组创建数组

### numpy.asarray

numpy.asarray类似numpy.array，但numpy.asarray只有三个参数

```python
numpy.asarray(a, dtype = None, order = None)
```

| 参数 | 描述 |
| :--- | :--- |
| a | 任意形式的输入参数，列表、元组及其嵌套和多维数组 |
| dtype | 数据类型，可选 |
| order | C行优先，F列优先 |

### numpy.frombuffer

numpy.frombuffer用于实现动态数组

numpy.frombuffer接受buffer输入参数，以流的形式读入转化成ndarray对象

```python
numpy.frombuffer(buffer, dtype = float, count = -1, offset = 0)
```

> buffer是字符串的时候，python3默认str是Unicode，转化成bytestring在原str前加b

报错：**AttributeError: \'str\' object has no attribute \'\_\_buffer\_\_\'**

| 参数 | 描述 |
| :--- | :--- |
| buffer | 任意对象，流式读入 |
| dtype | 返回的数组数据类型 |
| count | 读取的数据数量，默认-1读取所有 |
| offset | 读取的起始位置，默认0 |

```python
s = b'Hello World'
x = np.frombuffer(s, dtype = 'S1')
```

### numpy.fromiter

从可迭代对象中建立ndarray对象，返回一维数组

```python
numpy.fromiter(iterable, dtype, count = -1)
```

| 参数 | 描述 |
| :--- | :--- |
| iterable | 可迭代对象 |
| dtype | 返回数组的数据类型 |
| count | 读取的数据数量 |

## NumPy从数值范围创建数组

### numpy.arange

使用arange函数创建数值范围并返回ndarray对象

```python
numpy.arange(start, stop, step, dtype)
```

参数说明，略

### numpy.linspace

numpy.linspace函数用于创建一个一维数组，并且为等差数列

```python
np.linspace(start, stop, num=50, endpoint=True, retstep=False, dtype=None)
```

| 参数 | 描述 |
| :--- | :--- |
| start | 序列起始值 |
| stop | 序列终止值，endpoint为True包含 |
| num | 要生成等步长的样本数量，默认50 |
| endpoint | 见上 |
| retstep | True时生成数组会显示间距，反之 |
| dtype | ndarray的数据类型 |

### numpy.logspace

用于创建等比数列

```python
np.logspace(start, stop, num=50, endpoint=True, base=10.0, dtype=None)
```

base即为取对数的时候log的下标(底数)

## NumPy切片和索引

与python的list切片操作一样

完全可以使用列表的 **start:stop:step** 的切片操作！

或者：

```python
a = np.arange(10)
s = slice(2, 7, 2)
print(a[s])
```

切片还可以使用省略号 (...)

```python
import numpy as np

a = np.array([[1,2,3],[3,4,5],[4,5,6]])
print(a[...,1])   # 第2列元素
print(a[1,...])   # 第2行元素
print(a[...,1:])  # 第2列及剩下的所有元素
```

输出结果：

> 1. [2 4 5]
> 2. [3 4 5]
> 3. [[2 3]
[4 5]
[5 6]]

## NumPy高级索引

相比于Python的索引，numpy提供了更多的索引方式。数组可以整数数组索引、布尔索引及花式索引。

### 整数数组索引

获取(0, 0) (1, 1) (2, 0)处的元素：

```python
import numpy as np

x = np.array([[1, 2], [3, 4], [5, 6]])
y = x[[0, 1, 2], [0, 1, 0]]
print(y)

# 输出 [1 4 5]
```

> 返回结果为ndarray对象

可以借助 : , ... 和索引数组组合

```python
import numpy as np

a = np.array([[1,2,3], [4,5,6],[7,8,9]])
b = a[1:3, 1:3]
c = a[1:3,[1,2]]
d = a[...,1:]
print(b)
print(c)
print(d)

# 输出：
# [[5 6]
#  [8 9]]
# [[5 6]
#  [8 9]]
# [[2 3]
#  [5 6]
#  [8 9]]
```

### 布尔索引

通过布尔数组索引目标数组，对数组元素进行布尔运算获取符合指定元素条件的数组。

```python
import numpy as np

x = np.array([[0, 1, 2],[3, 4, 5],[6, 7, 8],[9, 10, 11]])
print(x[x > 5])

# 输出：[6 7 8 9 10 11]
```

使用取补运算符 \~ 来过滤NaN

```python
import numpy as np

a = np.array([np.nan, 1, 2, np.nan, 3, 4, 5])
print(a[~np.isnan(a)])

# 输出：[1. 2. 3. 4. 5.]
```

过滤非复数元素

```python
import numpy as np
a = np.array([1, 2+6j, 5, 3.5+5j])
print (a[np.iscomplex(a)])

# 输出：[2.0+6.j 3.5+5.j]
```

### 花式索引

花式索引利用整数数组来索引，把整数索引当作轴进行索引。对于轴的理解，可以参考上面！跟切片不一样的是它将数据复制到新的数组中（对切片感兴趣的可以使用id()这个函数研究列表和元素对应关系的！这样便于理解这一句话！）

```python

import numpy as np

x = np.arange(32).reshape((8, 4))
print(x)
print(x[[4, 2, 1, 7]])
# 倒序
print(x[[-4, -2, -1, -7]])
# 多个索引数组
print(x[np.ix_([1, 5, 7, 2], [0, 3, 1, 2])])

# 输出：
# [[ 0  1  2  3]
#  [ 4  5  6  7]
#  [ 8  9 10 11]
#  [12 13 14 15]
#  [16 17 18 19]
#  [20 21 22 23]
#  [24 25 26 27]
#  [28 29 30 31]]

# [[16 17 18 19]
#  [ 8  9 10 11]
#  [ 4  5  6  7]
#  [28 29 30 31]]

# [[16 17 18 19]
#  [24 25 26 27]
#  [28 29 30 31]
#  [ 4  5  6  7]]

# [[ 4  7  5  6]
#  [20 23 21 22]
#  [28 31 29 30]
#  [ 8 11  9 10]]
```

## NumPy广播

广播(Broadcast)是 numpy 对不同形状(shape)的数组进行数值计算的方式， 对数组的算术运算通常在相应的元素上进行

如果形状相同即对应位运算，不同则触发广播机制。

```python
import numpy as np

a = np.array([[0, 0, 0], [10, 10, 10], [20, 20, 20], [30, 30, 30]])
b = np.array([1, 2, 3])
print(a + b)

# [[ 1  2  3]
#  [11 12 13]
#  [21 22 23]
#  [31 32 33]]
```

![图片](/img/1222.png)

原理和要求请参考 [NumPy广播](https://www.runoob.com/numpy/numpy-broadcast.html)

## NumPy迭代数组

使用迭代器对象numpy.nditer访问元素

```python
import numpy as np
a = np.arange(6).reshape(2, 3)

for x in np.nditer(a):
    print (x, end=", " )
```

！！！默认行序优先！！！

可以通过传入nditer的order参数改变遍历顺序 order = \'F\'

可以改变可选参数op_flags获得权限修改值，默认为 *readonly* 可以改为 *readwrite* 。op_flags=[\'readwrite\']

flags参数：可选参数，用于外部循环

| 参数 | 描述 |
| :---: | :--- |
| c_index | C顺序索引 |
| f_index | F顺序索引 |
| multi_index | 每次迭代可以跟踪一种索引类型 |
| external_loop | 给出的值是具有多个值的一维数组，而不是零维数组 |

> NumPy的可选参数可以参考 [scipy.org](https://docs.scipy.org/doc/numpy/reference/generated/numpy.nditer.html?highlight=multi_index)

### 广播迭代

如果两个数组是可广播的，nditer 组合对象能够同时迭代它们。假设数组 a 的维度为 3X4，数组 b 的维度为 1X4，则使用以下迭代器（数组 b 被广播到 a 的大小）。

```python
import numpy as np

a = np.arange(0,60,5)
a = a.reshape(3,4)
print  ('第一个数组为：')
print (a)
print  ('\n')
print ('第二个数组为：')
b = np.array([1, 2, 3, 4], dtype =  int)
print (b)
print ('\n')
print ('修改后的数组为：')
for x,y in np.nditer([a,b]):
    print ("%d:%d" % (x,y), end=", " )

# 输出
# 第一个数组为：
# [[ 0  5 10 15]
#  [20 25 30 35]
#  [40 45 50 55]]


# 第二个数组为：
# [1 2 3 4]


# 修改后的数组为：
# 0:1, 5:2, 10:3, 15:4, 20:1, 25:2, 30:3, 35:4, 40:1, 45:2, 50:3, 55:4,
```

> 上述例子来源于runoob
