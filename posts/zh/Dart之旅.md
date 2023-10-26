---
title: Dart之旅
date: 2018-12-02 18:19:00
tags: [ Dart, Flutter ]
toc: true
categories: [ 语言 ]
---

> 本文于2020/1/27修订

## 写在前面

> 本文是参考了[Dart官网](https://www.dartlang.org) 的教程、参考的机翻以及对于其他语言学习的经验来翻译的本入门教程，译者精力和学历有限，如有不妥之处欢迎指正。

> 本文出于知识共享的目的，转载请注明出处，如果用于商用请联系 admin@jieec.cn

## 在线编译

> [DartPad](https://dartpad.dartlang.org/)

<!-- more -->

## 概念

* Dart变量中的内容都是对象，对象都是类的实例，所有对象都是从Object类继承的
* Dart要求规定类型，但是可以自行推断类型。var num = 10; 就可以推断其类型为int（**不需要类型之dynamic**）
* Dart之泛型类型List <int\> (*整数列表*)or List <dynamic\>（*任何类型的对象列表*）
* 主函数main(),支持自定义函数和函数嵌套
* 支持全局变量，私有变量。实例的变量可以称为字段或者属性
* 不具备数据保护相关的关键字，用（\_)开头确定私有
* 标识符可以以字母或者（\_）下划线开头，后面字母和数字任意组合

## 关键字

| 关键字列表  |            |              |           |
| :---------: | :--------: | :----------: | :-------: |
| abstract 2  | dynamic 2  | implements 2 |  show 1   |
|    as 2     |    else    |   import 2   | static 2  |
|   assert    |    enum    |      in      |   super   |
|   async 1   |  export 2  | interface 2  |  switch   |
|   await 3   | external 2 |      is      |  sync 1   |
|    break    |  extends   |  library 2   |   this    |
|    case     | factory 2  |   mixin 2    |   throw   |
|    catch    |   false    |     new      |   true    |
|    class    |   final    |     null     |    try    |
|    const    |  finally   |     on 1     | typedef 2 |
|  continue   |    for     |  operator 2  |    var    |
| covariant 2 | Function 2 |    part 2    |   void    |
|   default   |   get 2    |   rethrow    |   while   |
| deferred 2  |   hide 1   |    return    |   with    |
|     do      |     if     |    set 2     |  yield 3  |

避免使用关键字作为标识符，如果有必要标数字的关键字可以作为标识符：

1. 上下文关键字标识符，仅在特定位置有含义
2. 内置标识符，简化js转移dart的工作，不能作为类或者类型的标识符，不能用作导入前缀
3. dart 1.0发布后添加的异步支持相关的更新，有限的保留字。不能使用await or yield作为任何函数体中的标识符标记async,async\* or sync\*

## 变量

### * var（属于Object）& dynamic的辨析

* var可以被解析为任意类型，但是一旦确定就不可更改！
* dynamic的值不可以被编译器解析或者类型检查
* dynamic编译到Object中，dynamic编译时存在，运行时不存在

### 默认值

未初始化的默认值都为null，断言*assert(condition);*

### final & const

不打算更改变量的值用final或者const定义变量。final变量只能被设置一次；const变量是编译时常量（const变量是隐式final的）。final的全局变量和类变量第一次使用的时候要被初始化。

> 注意：在实例变量中只可以用final而非const。必须在构造函数体之前初始化final变量（在变量声明，构造函数参数或者构造函数的初始化列表中。）

示例：

```dart
  final name = 'Bob';//无法再更改值
```

如果const变量在类内，请标记为static const,const属于Object类

```dart
  const bar = 1000000;//压力单位(dynes/cm2)
  const double atm = 1.01325*bar;//标准大气压
```

const不仅仅可以声明常变量，也可以用来创建常量值constant values，以及声明常量值的构造函数，任何变量都可以具有常量值。

```dart
  var foo = const [];
  final bar = const [];
  const baz = [];//与"const []"等价
```

* 可以省略声明const的初始化表达式，如上所示。不要冗余使用const！
* 你可以修改非final，非const变量的值，即使变量曾用过const的值

```dart
  foo = [1,2,3];√
  baz = [1,2,3];×
```

## 内置类型

* 数字
* 字符串
* 布尔型
* 列表（数组）
* 地图map
* 符文runes（用于在字符串中表示Unicode字符）
* 符号symbols

> 因为Dart中的每个变量都引用一个对象 - 一个类的实例 - 您通常可以使用构造函数来初始化变量。一些内置类型有自己的构造函数。例如，您可以使用Map()构造函数来创建地图。 ——来源于官网引用

### 数字

* int

  > 整数值不大于64位，具体视平台而定

* double

  *64位双精度浮点数，IEEE 754标准*

  > int & double都属于数字这一类型，数字基本运算符有+、-、\*、/之类的，也包括abs()、ceil()、floor()和其他方法。（类似于">>"的位运算符，在int类中被定义），如果在num及其子类中没有要找的，去dart:math库中看看！

int示例

```dart
  int x = 1;
  int hex = 0xDEADBEEF;
```

double示例

```dart
  double y = 1.1;
  double exponents = 1.42e5;
```

以下是字符串如何转化为数字，反之亦然

```dart
  // String -> int
  var one = int.parse('1');
  assert(one == 1);

  // String -> double
  var onePointOne = double.parse('1.1');
  assert(onePointOne == 1.1);

  // int -> String
  String oneAsString = 1.toString();
  assert(oneAsString == '1');

  // double -> String
  String piAsString = 3.14159.toStringAsFixed(2);
  assert(piAsString == '3.14');

```

int类型指定移位操作（<<、>>）,AND（&）和OR（|）运算符。

```dart
  assert((3<<1)==6);// 0011 << 1 == 0110
  assert((3>>1)==1);// 0011 >> 1 == 0001
  assert((3|4)==7);// 0011 | 0100 == 0111
```

> Literal numbers（能力有限，不知道如何翻译）是编译时常量，很多的算术表达式也是编译时的常量，只要它们的操作数是编译为数字的编译时常量——引用自dart官网

```dart
  const msPerSecond = 1000;
  const secondsUntilRetry = 5;
  const msUntilRetry = secondsUntilRetry*msPerSecond;
```

### 字符串

Dart字符串是一系列的UTF-16代码单元，可以使用 '' or "" 创建字符串。

示例

```dart
  var s1 = 'Single quotes work well for string literals.';
  var s2 = "Double quotes work just as well.";
  var s3 = 'It\'s easy to escape the string delimiter.'; // 译者注\'是转译输出'
  var s4 = "It's even easier to use the other delimiter.";
```

你可以将表达式的值置入字符串中通过使用${expression}。如果表达式是标识符，你可以跳过{}（就是省略{}）。要获取会对象对应的字符串，Dart会调用对象的toString()方法。

```dart
  var s = 'string interpolation';

  assert('Dart has $s, which is very handy.' == 'Dart has string interpolation, ' + 'which is very handy.');
  assert('That deserves all caps. ' + '${s.toUpperCase()} is very handy!' == 'That deserves all caps. ' + 'STRING INTERPOLATION is very handy!');

```

> "=="运算符是测试两个对象是否是等价的，如果它们包含相同的代码单元序列，那么就是等价的。

你可以使用运算符'+'连接字符串（译者省略了演示代码）

另一种创建多行字符串的方法是：使用三个单引号或者双引号

```dart
  var s1 = '''
  多行字符串1
  ''';

  var s2 = """
  多行字符串2
  """;

```

你可以通过添加前缀r来创建原始字符串（在原始字符串中，字符串是不会被特殊处理的）

```dart
  var s = r'这是一个原始字符串';
```

有关如何在字符串中表示Unicode字符的详细信息，请参阅*Runes*。

只要任何插值表达式是一个编译时常量，其值为null或数值，字符串或布尔值；文字字符串即为编译时常量。

演示代码

```dart
  // 常字符串
  const aConstNum = 0;
  const aConstBool = true;
  const aConstString = 'a constant string';

  // 并非常字符串
  var aNum = 0;
  var aBool = true;
  var aString = 'a string';

  const aConstList = [1, 2, 3];
  const validConstString = '$aConstNum $aConstBool $aConstString';
  // const invalidConstString = '$aNum $aBool $aString $aConstList';
```

获取更多的字符串的使用信息，请参考*字符串与正则表达式*

### 布尔型

Dart用bool类表示布尔值，只有两个对象true、false，它们都是编译时常量。

Dart的类型安全意味着你不能使用类似于if(非布尔值)或者assert(非布尔值)的语句，不过可以明确地检查值，如示例：

```dart
  // 检查空字符串
  var fullName = '';
  assert(fullName.isEmpty);

  // 检查零
  var hitPoints = 0;
  assert(hitPoints <= 0);

  // 检查null
  var unicorn;
  assert(unicorn == null);

  // 检查NaN
  var iMeantToDoThis = 0 / 0;
  assert(iMeantToDoThis.isNaN);

```

### 列表

几乎每种语言中最常见的是数组或者有序对象组。在Dart中数组是List对象，因此大多人也称为列表。

Dart列表看起来想JavaScript数组。示例：

```dart
  var list = [1,2,3];
```

> 分析器推断list类型为list<int\>。如果将非int类型对象加入此列表，会引发错误。获取更多的信息，阅读有关 *类型推断*。

列表从零开始索引，0是列表的第一个元素索引，list.length - 1是列表的最后一个元素索引。可以像JavaScript那样获取一个列表的长度并引用元素。

```dart
  var list = [1,2,3];
  assert(list.length == 3);
  assert(list[1] == 2);

  list[1] == 1;
  assert(list[1] == 1);
```

创建一个编译时常量列表，在列表文字前添加const：

```dart
  var constantList = const [1,2,3]
  // 同样，值不可以更改
```

List类型有很多方便的方法来操作列表。有关更多信息，请参阅 *泛型Generics* 和 *集合Collections* 。

### 地图型Maps

**译者注：根据译者对于其他语言的学习和开发经验，Dart语言的Maps型和Python中的字典是一样的，其中键就是key，值就是value。**

通常，map型是一个有键值对构成的对象。键和值可以是任意类型的对象。键不能重复，而同样的值是可以的。Dart对于map的支持是通过地图文字和Map类型。

以下是一些简单使用map文字创建的Dart maps：

```dart
  var gifts = {
    // key:value
    'first': 'partridge',
    'second': 'turtledoves',
    'fifth': 'golden rings',
  };

  var nobleGases = {
    2: 'helium',
    10: 'neon',
    18: 'argon',
  };
```

> 解析推断gifts类型为Map<String,String>，nobleGases的类型为Map<int,String>。如果尝试去添加非对应类型的值，解析器或者运行的时候会报错。获取更多的信息，请参阅 *类型推断* 。

你也可以使用构造函数Map()创建相同的对象：

```dart
  var gifts = Map();
  gifts['first'] = 'partridge';
  gifts['second'] = 'turtledoves';

  // 不想写了，省略···
```

> 你可能想看到的是new Map()，而非Map()。从Dart 2开始，new关键字是可选的。有关详细信息，请参阅 *使用构造函数* 。

跟在JavaScript中一样，将新的键值对加到现有的地图中（**译者注：在python的字典中其实也是这样的···**）

```dart
  var gifts = {'first': 'partridge'};
  gifts['fourth'] = 'calling birds';
```

跟在JavaScript中一样的方式在地图中检索值，不在就返回null：（**译者注：译者懒得注了**）

```dart
  var gifts = {'first': 'partridge'};
  assert(gifts['first'] == 'partridge');
  assert(gifts['fifth'] == null);
```

使用.length获取map中键值对的数目

```dart
  var gifts = {'first': 'partridge'};
  gifts['fourth'] = 'calling birds';
  assert(gifts.length == 2);
```

常地图，定义与上面相似，不写了···

```dart
  final constantMap = const {
    2: 'helium',
    10: 'neon',
    18: 'argon',
  };
  // const改都报错，后面就不写了
```

获取更多的信息，请参阅 *泛型Generics* 和 *地图型Maps*

### 符文

在Dart中，符文是字符串中UTF-32代码点

Unicode为世界上所有书写系统中的每一个字母、数字、符号都定义了唯一的数值。由于Dart字符串是一系列的UTF-16代码单元，因此在字符串中表示32位要用特殊的语法。

表达Unicode代码点的常用的方法是\\uXXXX，其中XXXX是4位十六进制值。例如心（💗）是\\u2665。要指定多于或者少于4个十六进制值，请将值放在大括号里。例如，笑脸（😆）是\\u{1f600}。

该字符串类有几个属性，你可以用它来提取符文信息。codeUnitAt和codeUnit属性返回16位编码单元。使用该runes属性获取字符串的符文。

以下示例说明了符文，16位代码单元和32位代码点之间的关系。

```dart
  main()
  {
    var clapping = '\u{1f44f}';
    print(clapping);
    print(clapping.codeUnits);
    print(clapping.runes.toList());

    Runes input = new Runes(
      '\u2665  \u{1f605}  \u{1f60e}  \u{1f47b}  \u{1f596}  \u{1f44d}');
    print(new String.fromCharCodes(input));
  }
```

> 注意：使用列表操作符文要小心，这种方法容易分解，具体取决于特定的语言，字符集和操作。更多信息，请在Stack Overflow上参阅 *如何在Dart中反转字符串？* ——引用自dart官网

### 符号Symbols

符号对象表示Dart程序的操作或者声明。你可能不会去使用符号对象，但是它们对于API通过名称引用是非常有用的，因为缩小会更改标识符名称而不会更改标识符符号。（**译者并不清楚官网这句话的具体含义，引用自Dart官网**）

请使用符号文字获取标识符的符号（#后面跟着标识符）：

```dart
  #radix
  #bar
```

符号文字是编译时常量！

## 函数Function

Dart是一门面向对象的语言，即便是函数也是对象，并且具有类型 *Function* 。这意味着函数可以被赋值给变量，或者作为参数传递给其他函数。你也可以跟调用函数一样，调用Dart类的实例。有关信息请参阅 *可调用类Callable classes* 。

以下是一个实现函数的示例：

```dart
  bool isNoble(int atomicNumber){
    return _nobleGases[atomicNumber] != null;
  }
```

虽然Effective Dart建议 ***为公共API键入注释*** ，但是省略类型，函数还是有效的

```dart
  isNoble(atomicNumber){
    return _nobleGases[atomicNumber] != null;
  }
```

对于只含有一个表达式的函数，可以使用简写的语法：

```dart
  bool isNoble(int atomicNumber) => _nobleGases[atomicNumber] != null;
```

该语法是速记，有时候称为 *箭头语法* 。=> expr {return expr;}

> 只有 *表达式* 而非 *语句* 可以出现在 "=>" 和 ";" 之间。例如，不能在其中放入if语句，但可以使用条件表达式。 **（译者注：也就是类似于其他语言也有的条件判断表达式比如 ? : 和 if语句的区别）**

函数可以有两种类型的参数：必需和可选。首先列出所需的参数，然后列出任何可选参数。命名的可选参数也可以标记为 *@required* 。有关详细信息，参阅下一节。

### 可选参数

可选参数可以是位置参数，也可以是命名参数，不局限于这些。

#### 可选命名参数

调用函数的时候，可以使用 *paramName: value* 指定的命名参数。例如：

```dart
  enableFlags(bold: true, hidden: false);
```

定义函数时，使用 *{param1, param2, ...}* 指定命名参数：

```dart
  // 设置[bold]和[hidden]标志flags...
  void enableFlags({bool bold, bool hidden}){...}
```

**Flutter** 实例创建表达式变得会更复杂，因此窗口小部件构造函数仅使用命名参数，使实例创建表达式更易于阅读。

可以使用 *@required* 在任何Dart代码（不仅仅是Flutter）中注释命名参数，以指示它是 *必需参数* 。例如：

```dart
  const Scrollbar({Key key, @required Widget child})
```

当一个构造Scrollbar，分析器会报错child不存在。

*必需Required* 在 *元meta* 包中被定义。可以直接导入 **package:meta/meta.dart** ，也可以导入另一个导出的包 **meta**，例如Flutter的包 **package:flutter/material.dart** 。

#### 可选位置参数

包装一组函数参数在[]内标记它们作为可选位置参数：

```dart
  String say(String from, String msg, [String device]){
    var result = '$from says $msg';
    if (device != null){
      result = '$result with a $device';
    }
    return result;
  }
```

下面是一个没有可选参数情况下调用此函数的示例：

```dart
  assert(say('Bob', 'Howdy') == 'Bob says Howdy');
```

下面是一个带有第三个参数情况下调用此函数的示例：

```dart
  assert(say('Bob', 'Howdy', 'smoke signal') == 'Bob says Howdy with a smoke signal');
```

#### 默认参数值

你的函数可以使用 "=" 给命名或者位置参数定义默认值。默认值必须是编译时常量。如果未设默认值，则默认值为null。

这是一个为命名参数设置默认值的示例：

```dart
  // 设置[bold]和[hidden]flag
  void enableFlags({bool bold = false,bool hidden = false}) {...}

  // bold值为true hidden为false
  enableFlags(bold: true);

```

> 在老代码中使用冒号取代等号设置命名参数，原因是原生的问题。只有冒号支持命名参数。这种支持遭到了反对，建议使用等号设置默认值。

这个示例演示了如何去给位置参数设置默认值

```dart
  String say(String from, String msg, [String device = 'carrier pigeon', String mood]){
    var result = '$from says $msg';
    if (device != null){
      result = '$result with a $device';
    }
    if (mood != null){
      result = '$result (in a $mood mood)';
    }
    return result;
  }

  assert(say('Bob', 'Howdy') == 'Bob says Howdy with a carrier pigeon');
```

你也可以将列表或者地图作为默认值传递。下面的示例定义了一个doStuff()的函数，为list参数指定了一个默认的列表，为gifts参数指定了一个默认的地图。

```dart
  void doStuff(
  {List<int> list = const [1, 2, 3],
    Map<String, String> gifts = const {
      'first': 'paper',
      'second': 'cotton',
      'third': 'leather'
    }
  }){
    print('list: $list');
    print('gifts: $gifts');
  }
```

### main()函数

每一个app都必须有个顶级函数main()，相当于是app的入口。main()函数返回void并且有一个可选的List<String\>参数。

这是一个web app的main()函数示例：

```dart
  void main(){
    querySeletor('#sample_text_id')
      ..text = 'Click me!'
      ..onClick.listen(reverseText);
  }
```

> ..这个先于代码的语法称为 **级联** 。使用级联，你可以对单个对象的成员执行多个操作。

下面是一个带参数的main函数()的命令行app示例：

```dart
  // 像这样运行app：dart args.dart 1 test
  void main(List<String> arguments){
    print(arguments);

    assert(arguments.length == 2);
    assert(int.parse(arguments[0]) == 1);
    assert(arguments[1] == 'test');
  }
```

你可以使用 *args库* 去定义和分析命令行参数。

### 函数作为第一类对象

你可以将一个函数作为参数传递给其他函数。比如：

```dart
  void printElement(int element){
    print(element);
  }

  var list = [1, 2, 3];

  // printElement作为参数传递
  list.forEach(printElement);
```

你也可以将函数分配给一个变量。比如：

```dart
  var loudify = (msg) => '!!! ${msg.toUpperCase()} !!!';
  assert(loudify('hello') == '!!! HELLO !!!');
```

这个例子使用了一个匿名函数。想了解更多，请看下节教程。

### 匿名函数

大多的函数都是被命名过的，比如main()或者printElement()。你也可以创建一个无名函数叫做 *匿名函数* ，有时候也叫做 *lambda* 或者 *closure* 。比如你可以给一个变量指定一个匿名函数，以便你可以从一个集合中添加或者删除。

匿名函数和一个命名函数看起来很相似——没有或者数个参数，在逗号和括号之间用逗号和可选类型注释分隔。

下面的代码块包含了函数的主体

```dart
  ([Type] param1[, ...]){
    codeBlock;
  };
```

下面的例子中定义了一个带有未指定类型参数 *item* 的匿名函数。为列表中的每个项调用的函数将打印一个字符串，该字符串包含指定索引处的值。

```dart
  var list = ['apples', 'bananas', 'oranges'];
  list.forEach((item){
    print('${list.indexOf(item)}: $item');
    });
```

> 写入程序的输出结果为：

1. 0: apples
2. 1: bananas
3. 2: oranges

如果函数只包含了一个语句，你可以使用箭头表示法让代码更短。复制下面的代码到DartPad，然后点击run证明它在功能上是等价的。

```dart
  list.forEach(
    (item) => print('${list.indexOf(item): $item}')
    );
```

### 词汇作用域Lexical scope

Dart是一个有词汇作用域的语言，就意味着变量的作用域是静态定义的，只需通过代码的布局。你可以 *“顺着花冠向外”* （**译者觉得这可能是一个比喻**）去看变量是否在作用域范围内。

以下是在每个范围级别具有变量的嵌套函数的示例：

```dart
  bool topLevel = true;

  void main() {
    var insideMain = true;

    void myFunction() {
      var insideFunction = true;

      void nestedFunction() {
        var insideNestedFunction = true;

        assert(topLevel);
        assert(insideMain);
        assert(insideFunction);
        assert(insideNestedFunction);
      }
    }
  }
```

注意 nestedFunction()是如何使用每一级的变量，一直到顶级。

### 词汇闭包Lexical closures

*闭包closure* 是一个在它的词汇范围有权访问变量的函数对象，即使函数原来的范围之外。

函数关闭在周围定义的变量。在下面的示例中，makeAdder()捕获变量addBy。无论返回的函数在哪里，它都会记住addBy。

```dart
  // 返回一个函数，它为函数的参数添加[addBy]
  Function makeAdder(num addBy){
    return (num i) => addBy + i;
  }

  void main(){
    // 创造一个函数添加2
    var add2 = makeAdder(2);

    // 创造一个函数添加4
    var add4 = makeAdder(4);

    assert(add2(3) == 5);
    assert(add4(3) == 7);
  }

```

### 测试函数是否等价

下面是一个测试顶级函数，静态方法，实例方法等价性的例子：

```dart
  void foo() {} // 顶级函数
  class A {
    static void bar() {} // 静态方法
    void baz() {} // 实例方法
  }

  void main() {
    var x;

    // 比较顶级函数
    x = foo;
    assert(foo == x);

    // 比较静态方法
    x = A.bar;
    assert(A.bar == x);

    // 比较实例方法
    var v = A(); // A的实例#1
    var w = A(); // A的实例#2
    var y = w;
    x = w.baz;

    // 这些闭合参照的是一个实例（#2），所以它们是等价的
    assert(y.baz == x);

    // 这些闭合参照的是不同的实例，所以它们不等价
    assert(v.baz != w.baz);
  }
```

### 返回值

所有的函数都会返回值。如果没有返回值被指定，表达式返回null；隐式添加到函数体。

```dart
  foo() {}
  assert(foo() == null);
```

## 运算符

Dart定义了下述表格中的运算符。你可重载部分的运算符，在 *重载运算符* 中具体介绍。

| 类型           |                                     运算符                                      |
| -------------- | :-----------------------------------------------------------------------------: |
| 一元后缀       |                            expr++ expr-- () [] . ?.                             |
| 一元前缀       |                         -expr !expr ~expr ++expr --expr                         |
| 乘式           |                                    * / % ~/                                     |
| 和式           |                                       + -                                       |
| 移位           |                                      << >>                                      |
| 位与           |                                        &                                        |
| 位异或         |                                        ^                                        |
| 位或           |                                       丨                                        |
|                | **译者注：由于markdown的制表和位或运算的符号发生冲突，故使用的是丨（gun）代替** |
| 关系与类型测试 |                                >= > <= as is is!                                |
| 等价           |                                      == !=                                      |
| 逻辑与         |                                       &&                                        |
| 逻辑或         |                                      丨丨                                       |
|                |                                **译者注：同上**                                 |
| 如果null       |                                       ??                                        |
| 控制表达式     |                              expr1 ? expr2 : expr3                              |
| 级联           |                                       ..                                        |
| 赋值           |                   = *= /= ~/= %= += -= <<= >>= &= ^= 丨= ??=                    |

使用运算符可以创建表达式，下面是几个例子：

```dart
  a++
  a + b
  a = b
  a == b
  c ? a : b
  a is T
```

在 *运算符表* 中，每个运算符的优先级都高于后一行的优先级。例如 % 高于 == ，而 == 高于 && 。就意味着下面两行的代码执行方式是相同的。

```dart
  // 圆括号提高了可读性
  if ((n % i == 0) && (d % i == 0)) ...

  // 难读，但是是等价的
  if (n % i == 0 && d % i == 0)
```

> 注意：对于处理两个操作数的运算符，最左边的操作数确定运算符。——引用自官网

### 算术运算符

Dart支持通用的算术运算符，具体如下表：

| 运算符 |                  意义                  |
| ------ | :------------------------------------: |
| +      |                   加                   |
| -      |                   减                   |
| -expr  | 一元减号，也表示否定（反转表达式符号） |
| *      |                   乘                   |
| /      |                   除                   |
| ~/     |            除，返回整数结果            |
| %      |                  取余                  |

```dart
  // ** 译者在此省略了部分演示代码**
  assert(5 / 2 == 2.5);
  assert(5 ~/ 2 == 2);
  assert(5 % 2 == 1);

  assert('5/2 = ${5 ~/ 2} r ${5 % 2}' == '5/2 = 2 r 1');
```

Dart也支持带前缀和后缀的自加或自减运算 （**具体的优先级及取值参照其他语言的基础**）

### 等价与关系运算符

| 运算符 |       意义       |
| ------ | :--------------: |
| ==     | 等于；看下面讨论 |
| !=     |      不等于      |
| >      |       大于       |
| <      |       小于       |
| >=     |      不小于      |
| <=     |      不大于      |

去测试两个对象 x、y 代表相同的东西，使用 == 运算符。（在极少数的情况下，你需要知道两个对象是不是同一个对象，使用identical()函数代替。）下面展示了 == 是如何工作的。

1. 如果 x 或者 y 为null，如果他俩都是null返回true，不然返回false
2. 返回方法调用的结果 x.==(y)。（这样是正确的，如同 == 的运算符是在第一个操作数上被调用的方法。你可以重载一些运算符，包括 == ，具体参考 *重载运算符* ）

（**举例略**）

### 键入测试运算符

在程序运行的时候，as、is、is!运算符用于检查类型。

| 运算符 |           意义           |
| ------ | :----------------------: | : |
| as     |         类型转换         |
| is     |  如果是指定类型返回true  |
| is!    | 如果不是指定类型返回true |

使用as运算符将对象强制转换为特定的类型。通常，应该使用它作为is对使用该对象的表达式后跟对象的测试的简写。

```dart
  if(emp is Person){
    // 检查类型
    emp.firstName = 'Bob';
  }

  // 你可以使用as让代码短一点
  (emp as Person).firstName = 'Bob';

```

> 这两个写法是不等价的，如果emp为null或者不是Person，第一个例子啥都不干，第二个例子抛出异常。

### 赋值运算符

（**译者在这一部分省略了大量与其他语言重复的部分，只针对个别特殊的符号加以解析**）

```dart
  b ??= value; // 如果b为null，值将会赋给b；如果不为空，b还是原来的值
```

（**组合赋值运算符，略**）

### 逻辑运算符

| 运算符 |  意义  |
| ------ | :----: | : |
| !expr  | 非运算 |
| 丨丨   | 或运算 |
| &&     | 与运算 |

### 按位和移位运算符

（**运算之前，将值转化为二进制**）

（**译者按照 1为真，0为假编写解释**）

| 运算符 |            意义            |
| ------ | :------------------------: | : |
| &      |     全真则真，一假则假     |
| 丨     |     一真则真，全假为假     |
| ^      | 位异或运算，同为假，异为真 |
| ~expr  |       假为真，真为假       |
| <<     |           左移位           |
| >>     |           右移位           |

### 条件表达式

Dart有两种运算符，可以简明使用if-else表达式

> condition ? expr1 : expr2

***真返回1结果，假返回2结果***

> expr1 ?? expr2

***如果expr1非空，返回它的值；否则，返回2的结果***

**通过布尔表达式控制赋值，考虑?:**

**如果布尔表达式是用来测试是否为空的，考虑??**

```dart
  String playerName(String name) => name ?? 'Guest';
```

前面的例子至少可以使用两种方式来编写，但是不简洁：

```dart
  // 精简使用?:
  String playerName(String name) => name != null ? name : 'Guest';

  // 使用if-else表达式写
  String playerName(String name){
    if (name != null){
      return name;
    }else{
      return 'Guest';
    }
  }
```

### 级联符号（..）

级联（..）允许你对同一个对象进行一系列的操作。除了函数的调用之外，你还可以访问同一对象上的字段。这通常可以节省创建临时变量的步骤，让代码书写更流畅。

```dart
  querySeletor('#confirm') // 获取一个对象
    ..text = 'Confirm' // 使用它的一个成员
    ..classes.add('important')
    ..onClick.listen((e) => window.alert('Confirmed!'));
```

第一个方法调用，querySeletor()，返回一个选择器对象。级联表示法后面的代码对此对象进行操作，忽略可能返回的后续值。

前面的示例相当于：

```dart
  var button = querySeletor('#confirm');
  button.text = 'Confirm';
  button.classes.add('import');
  button.onClick.listen((e) => window.alert('Confirmed!'));
```

你也可以嵌套你的级联：

```dart
  final addressBook = (AddressBookBuilder()
        ..name = 'jenny'
        ..email = 'jenny@example.com'
        ..phone = (PhoneNumberBuilder()
              ..number = '415-555-0100'
              ..label = 'home')
            .build())
      .build();
```

注意在返回实际函数的对象上构造级联。比如，以下代码失败：

```dart
  var sb = StringBuffer();
  sb.write('foo')
    ..write('bar'); // error:write方法没有定义为void
```

sb.write()调用返回void，你不能在void这一类函数上构造级联。

> 注：严格意义上来说，对于级联的两点符号并不是运算符，只是Dart语法的一部分。

### 其他类型运算符

在其他的示例中，你已经见过大多的剩余的运算符了：

| 运算符 |     名称     |                                                                                                                        意义 |
| ------ | :----------: | --------------------------------------------------------------------------------------------------------------------------: |
| ()     |   函数应用   |                                                                                                              表示函数的调用 |
| []     |   列表访问   |                                                                                                    引用列表中指定索引处的值 |
| .      | 成员访问权限 |                                                                    指表达式的属性；示例：fool.bar从表达式foo中选择了属性bar |
| ?.     | 条件成员访问 | 跟 '.' 类似，但是运算符的左边可以为null，比如：foo?.bar 从foo中选择了bar属性即使foo为空（在这种情况下，foo?.bar的值为null） |

了解更多的信息关于 . ，?. ，和 . 运算符，看 *类Classes* 。

## 流程控制语句

你可以用下述的Dart代码控制流程：

* if和else
* for循环
* while和do-while循环
* break和continue
* switch和case
* assert

你也可以使用try-catch和throw影响控制流程，在 *异常Exceptions* 中介绍。

### if-else语句

Dart支持带有可选else的if语句，在下个例子中有演示。另见 *条件表达式* 。

```dart
  if (isRaining()){
    you.bringRainCoat();
  } else if (isSnowing()){
    you.wearJacket();
  } else {
    car.putTopDown();
  }
```

不像JavaScript，条件必须是布尔值，不能为其他。具体信息看 *布尔* 。

### for循环

你可以使用标准的for循环迭代。

```dart
  var message = StringBuffer('Dart is fun');
  for (var i = 0; i < 5; i++){
    message.write('!');
  }
```

在Dart中for循环内部的闭包捕获了索引的值，避免了JavaScript中常见的陷阱。

```dart
  var callbacks = [];
  for (var i = 0; i < 2; i++){
    callbacks.add(() => print(i));
  }
  callbacks.forEach((c) => c());
```

如预期那样，先输出0后1。相反在JavaScript中这个例子先2后2。

如果迭代的对象是可迭代的，你可以使用forEach()方法。如果你不需要当前的迭代计数器，使用forEach()是个不错的选择。

```dart
  candidates.forEach((candidate) => candidate.interview());
```

类似于列表和集合这样的可迭代类也支持迭代的for-in结构：

```dart
  var collection = [0, 1, 2];
  for (var x in collection){
    print(x); // 0 1 2
  }
```

### while和do-while

while控制条件在循环之前

```dart
  while (!isDone()) {
    doSomething();
  }
```

do-while控制条件在循环之后

```dart
  do{
    printLine();
  } while(!atEndOfPage());
```

### break和continue

使用break停止循环

```dart
  while(true){
    if (shutDownRequested()) break;
    processIncomingRequests();
  }
```

使用continue跳到下一个循环迭代

```dart
  for (int i = 0; i < candidates.length; i++){
    var candidate = candidates[i];
    if (candidate.yearsExperience < 5){
      continue;
    }
    candidate.interview();
  }
```

如果你使用类似于列表、集合的 *迭代* ，你可以以不同的方式写示例：

```dart
  candidates
      .where((c) => c.yearsExperience >= 5)
      .forEach((c) => c.interview());
```

### switch和case

（**跟C语言的结构并没有什么本质的区别，略，case内局部变量只在内部有效**）

### 断言assert

如果布尔值为false，使用assert语句将中断程序的正常执行。你可以在这愉快之旅中的例子中感受assert语句的用法。

```dart
  // 确认变量有个非空的值
  assert(text != null);

  // 确认值比100小
  assert(number < 100);

  // 确认是个https链接
  assert(urlString.startsWith('https'));

```

> 注：断言语句对生产代码并没有什么影响；它们只是用于开发。Flutter允许断言在 *debug模式* 。仅限开发的工具（比如dartdevc）通常默认支持断言。一些工具如dart,dart2js通过命令行标志支持断言：--enable-asserts

将消息加到断言，添加字符串作为第二参数。

```dart
  assert(urlString.startsWith('https'),'URL ($urlString) should start with "https".');
```

第一个参数assert可以是任何解析为布尔值的表达式。如果表达式的值为true，则断言成功并继续执行。如果为false，则断言失败并抛出异常（一个 *断言错误* ）

## 异常Exceptions

Dart代码可以抛出和捕获异常，异常是指意外事件发生的错误。如果未能捕获异常，则会暂停引发异常的隔离，并且通常会终止隔离和程序。

与Java相比，所有的Dart异常都是未检查的异常。方法不会声明它们会抛出的异常，你也没必要捕获异常。

Dart提供了 *异常* 和 *错误* 两种类型，以及许多预定义的子类型，当然也可以自己定义的意外情况。Dart程序可以抛出任何非空对象-不仅仅是异常和错误对象-作为例外。

### 抛出throw

一个抛出或者引发异常的示例：

```dart
  throw FormatException('Expected at least 1 section');
```

你也可以任意对象：

```dart
  throw 'Out of llamas!';
```

> 注：生成有质量的代码通常会抛出 *异常* 和 *错误* 。

因为抛出异常是一种表达，你可以使用 => 语句抛出异常，在任何可以表达的地方：

```dart
  void distanceTo(Point other) => throw UnimplementedError();
```

### 捕获Catch

捕获，会阻止异常的传播（除非重新抛出异常）。捕获异常使有机会处理它：

```dart
  try{
    breedMoreLlamas();
  } on OutOfLlamasException {
    buyMoreLlamas();
  }
```

要处理可能抛出多种异常的代码，可以指定多个捕获子句。与抛出对象类型匹配的第一个子句处理异常。如果捕获子句未指定类型，则该子句可以处理任何异常：

```dart
  try{
    breedMoreLlamas();
  } on OutOfLlamasException {
    // 一个指定异常
    buyMoreLlamas();
  } on Exception catch (e) {
    // 其他任何异常
    print('Unkown exception: $e');
  } catch (e) {
    // 没有指定类型，可以处理所有
    print('Someting really unkown: $e');
  }
```

如上面的代码所示，你可使用on或catch，或者一起用。使用on时需要指定异常的类型。使用catch时，你的异常处理程序需要异常对象。

你可以指定一个或者两个catch()参数。第一个抛出异常，第二个是堆栈跟踪（*StackTrace* 对象）

```dart
  try{
    // ...
  } on Exception catch (e) {
    print('Exception details:\n $e');
  } catch (e, s) {
    print('Exception details:\n $e');
    print('Stack trace:\n $s');
  }
```

要处理部分异常，并允许它传播，请使用关键字rethrow。

```dart
  void misbehave() {
    try {
      dynamic foo = true;
      print(foo++); // runtime错误
    } catch (e) {
      print('misbehave() partially handled ${e.runtimeType}.');
      rethrow; // 允许调用者查看异常
    }
  }

  void main(){
    try{
      misbehave();
    } catch (e) {
      print('main() finished handling ${e.runtimeType}.');
    }
  }
```

### 最后Finally

无论是否抛出异常，要确保某些代码的运行，请使用finally子句。如果没有catch子句匹配该异常，则在finally子句运行后传播异常。

```dart
  try{
    breedMoreLlamas();
  } finally {
    // 总是被清理，即使有其他异常
    cleanLlamaStalls();
  }
```

finally子句在任何匹配的catch子句之后运行：

```dart
  try{
    breedMoreLlamas();
  } catch (e) {
    print('Error: $e'); // 首先处理异常
  } finally {
    cleanLlamaStalls(); // 然后清理
  }
```

了解更多，请阅读库之旅的 *异常* 部分。

## 类

Dart是一门面向对象的语言，具有类以及基于mixin的继承。每个对象都是一个类的实例，所有的类都来自于Object。基于Mixin的继承意味着即使每个类（除了Object）只有一个超类（父类），但是类体可以在多个类层次结构中重用。

### 使用类成员

对象有由函数和数据（分别为方法和实例变量）组成的成员。调用方法时，可以在对象上调用它：该方法可以访问该对象的函数和数据。

使用点（.）来引用实例变量或者方法：

```dart
  var p = Point(2, 2);

  // 设置实例变量y的值
  p.y = 3;

  // 获取y的值
  assert(p.y == 3);

  // 在p上调用distanceTo()
  num distance = p.distanceTo(Point(4, 4));
```

使用 ?. 代替 . 避免最左边的操作数为空的情况

```dart
  // 如果p不为空，把它的y的值设为4
  p?.y = 4;
```

### 使用构造函数

你可以使用构造函数来创造对象。构造函数的名称可以是 ClassName 或 ClassName.identifier。举例，下面的代码创建了一个Point对象使用了构造函数 Point() 和 Point.fromJson()：

```dart
  var p1 = Point(2, 2);
  var p2 = Point.fromJson({'x': 1, 'y': 2});
```

下面的代码的效果是一样的，但是在构造函数之前使用了可选的关键字 *new*

```dart
  var p1 = new Point(2, 2);
  var p2 = new Point.fromJson({'x': 1, 'y': 2});
```

> 版本提示：在Dart2中new才是可选的

一些类提供了常构造函数。使用常构造函数去创建一个编译时的常量，在构造函数的名称前添加关键词 *const* 。

```dart
  var p = const ImmutablePoint(2, 2);
```

构造两个相同的编译时常量会产生一个规范的实例：

```dart
  var a = const ImmutablePoint(1, 1);
  var b = const ImmutablePoint(1, 1);

  assert(identical(a, b));// 它们是相同的实例
```

在常量的上下文中，你可以省略构造函数或者文字前的 *const* 关键字，比如，看这段创造一个常地图代码。

```dart
  // 这有太多的const关键字

  const pointAndLine = const {
    'point': const [const ImmutablePoint(0, 0)],
    'line': const [const ImmutablePoint(1, 10), const ImmutablePoint(-2, 11)],
  };
```

你可以省略除了第一个const关键字

```dart
  // 只用一个const
  const pointAndLine = {
    'point': [ImmutablePoint(0, 0)],
    'line': [ImmutablePoint(1,10), ImmutablePoint(-2, 11)],
  };
```

如果一个常构造函数在常上下文外被调用没有const，它创建了一个非 *常对象*：

```dart
  var a = const ImmutablePoint(1, 1);// 创造了一个常对象
  var b = ImmutablePoint(1, 1);// 未创造一个常对象

  assert(!identical(a, b));// 它们不是相同的实例
```

> 版本提示：在Dart2中在常上下文中const才是可选的。

### 获取一个对象的类型

在程序执行的过程中获取对象的类型，你可以使用Object的runtimeType属性，返回 *类型Type* 对象。

```dart
  print('The type of a is ${a.runtimeType}');
```

到目前为止，你已经了解如何使用类了。本节的其余部分将介绍如何实现类。

### 实例变量

这里展示了如何去声明一个实例变量：

```dart
  class Point{
    num x; // 声明实例变量x，初始值为空
    num y; // 声明变量y，初始值为空
    num z=0; // 声明变量，初始值为0
  }
```

没有初始化的变量的值为null

所有的实例变量都生成一个隐式的getter方法。非最终实例变量（Non-final）也生成一个setter方法。获取更多的细节，参照 *Getters和Setters*

```dart
  class Point {
    num x;
    num y;
  }

  void main(){
    var point = Point();
    point.x = 4; // 对x使用setter方法
    assert(point.x == 4); // 对x使用getter方法
    assert(point.y == null); // 默认值为null
  }
```

如果你在实例对象声明的地方初始化对象（而不是在构造函数或者方法中），当实例被创建的时候值就已经被设置了，在构造函数和初始化列表执行之前。

### 构造函数

通过创建一个跟它的类同名的构造函数来实现构造函数的声明。（plus，可选的，还有一个额外的标识符，如同 *命名构造函数* 所述）

最常见的构造函数形式，即生成构造函数，创造类的一个新实例：

```dart
  class Point {
    num x, y;
    Point (num x, num y) {
      // 有更好的方法去做这个

      this.x = x;
      this.y = y;
    }
  }
```

this关键字指向现况的实例

> 使用this时这会有一个命名冲突。否则，Dart代码将会省略this。

将构造函数的值赋给实例变量的模式是很常见的。Dart有语法sugar使实现更简单：

```dart
  class Point {
    num x, y;

    // 使用语法sugar设置x，y的值
    // 在构造函数体运行之前
    Point(this.x, this.y);
  }
```

#### 默认构造函数

如果自己没有声明构造函数，它会自己生成一个。默认生成的构造函数没有参数，并在超类（父类）中调用无参构造函数。

#### 构造函数不是被继承的

子类不从超类（父类）中继承构造函数。声明没有构造函数的子类只有默认构造函数（无参数，无名称）。

#### 命名构造函数

使用命名构造函数为类实现多个构造函数去实现更加的清晰。

```dart
  class Point {
    num x, y;

    Point(this.x, this.y);

    // 命名构造函数

    Point.origin() {
      x=0;
      y=0;
    }
  }
```

记住构造函数是不能被继承的，就意味着超类（父类的）命名构造函数也不能被子类继承。如果希望使用超类中定义的命名构造函数创建子类，则必须在子类中实现该构造函数。

#### 调用非默认的超类构造函数

默认的，在子类调用的超类构造函数是没有命名、没有参数的。超类构造函数在构造函数的开头被调用；如果一个初始化列表也被调用，它将在超类调用之前执行。总之，执行顺序如下：

1. 初始化列表
2. 超类无参构造函数
3. 主类无参构造函数

如果超类没有未命名的无参构造函数，你必须手动在超类中调用一个构造函数。在冒号后面指定超类的构造函数，在构造函数体的前部。

在下面的示例中，Employee类的构造函数调用它的超类Person的命名构造函数

```dart
  class Person {
    String firstName;

    Person.fromJson(Map data) {
      print('in Person');
    }
  }

  class Employee extends Person {
    // Person没有默认的构造函数
    // 你必须调用super.fromJson(data)
    Employee.fromJson(Map data) : super.fromJson(data) {
      print('in Employee');
    }
  }

  main() {
    var emp = new Employee.fromJson({});
  }

  // Prints:
  // in Person
  // in Employee

  if (emp is Person){
    // 类型检查
    emp.firstName = 'Bob';
  }
  (emp as Person).firstName = 'Bob';
```

因为在调用构造函数之前会处理超类构造函数的参数，所以参数可以是一个表达式，比如函数调用：

```dart
  class Employee extends Person {
    Employee() : super.fromJson(getDefaultData());
    // ...
  }
```

> 注意：超类构造函数的参数没有this的权限，例如，参数可以调用静态方法但是不能调用实例方法。

#### 初始化列表

除了调用超类的构造函数外，你也可以在构造函数体运行之前，初始化实例变量。用逗号分隔初始化：

```dart
  // 初始化列表在构造函数体运行之前设置实例的变量

  Point.fromJson(Map<String, num> json)
    : x = json['x'],
      y = json['y'] {
        print('In Point.fromJson() : ($x, $y)');
      }
```

> 注意：初始化程序的右侧无权访问this。

在开发期间，你可以在初始化列表验证输入的值

```dart
  Point.withAssert(this.x, this.y) : assert(x >= 0) {
    print('In Point.withAssert() : ($x, $y)');
  }
```

设置final字段时，设置初始化列表很方便。在下面的示例中在初始化列表中初始化了三个final字段。

```dart
  import 'dart:math';

  class Point {
    final num x;
    final num y;
    final num distanceFromOrigin;

    Point(x, y)
      : x = x,
        y = y,
        distanceFromOrigin = sqrt(x * x + y * y);
  }

  main() {
    var p = new Point(2, 3);
    print(p.distanceFromOrigin);
  }
```

#### 重定向构造函数

有时候构造函数只用于在同一个类中重定向到其他的构造函数。重定向构造函数的函数体是空的，构造函数的调用出现在冒号之后。

```dart
  class Point {
    num x, y;

    // 这个类的主构造函数
    Point(this.x, this.y);

    // 代表主构造函数
    Point.alongXAxis(num x) : this(x, 0);
  }
```

#### 常构造函数

如果你的类生成不打算更改的对象，你可以使这些对象为编译时常量。为了去实现，定义一个const构造函数，并保证所有的实例变量都是final型。

```dart
  class ImmutablePoint {
    static final ImmutablePoint origin  = const ImmutablePoint(0, 0);

    final num x, y;
    const ImmutablePoint(this.x, this.y);
  }
```

常构造函数并不总是创造常量。更多细节，去看 *使用构造函数* 那一节。

#### 工厂构造函数

使用关键字 factory 当实现构造函数不总在它的类中创建新的实例。比如，工厂构造函数可能从缓存（cache）中返回实例，或者返回子类型实例。

下面的示例演示了一个构造函数从缓存中返回了一个对象：

```dart
  class Logger {
    final String name;
    bool mute = false;

    // _cache是库私有，因为标识符前面的_
    static final Map<String, Logger> _cache = <String, Logger>{};

    factory Logger(String name) {
      if (_cache.containsKey(name)) {
        return _cache[name];
      } else {
        final logger = Logger._internal(name);
        _cache[name] = logger;
        return logger;
      }
    }
  }

  Logger._internal(this.name);

  void log(String msg) {
    if(!mute) print(msg);
  }
```

> 工厂构造函数没有this的权限。

调用工厂构造函数跟调用其他的构造函数一样：

```dart
  var logger = Logger('UI');
  logger.log('Button clicked');
```

### 方法

方法是赋予对象动作的函数。

#### 实例方法

在对象中的实例方法有使用实例对象和this的权限。下面例子中的distanceTo()方法就是一个实例方法的示例：

```dart
  import 'dart:math';

  class Point{
    num x, y;

    Point(this.x, this.y);

    num distanceTo(Point other) {
      var dx = x - other.x;
      var dy = y - other.y;
      return sqrt(dx * dx + dy * dy);
    }
  }
```

#### Getters和Setters

Getters和Setters是提供了读写对象属性的特殊方法。回想一下，每一个实例变量都有一个隐性的getter，如果合适的话还有一个setter。你可以通过get和set关键字实现创建额外的属性。

```dart
  class Rectangle {
    num left, top, width, height;

    Rectangle(this.left, this.top, this.width, this.height);

    // 定义两个计算的属性：right和bottom
    num get right => left + width;
    set right(num value) => left = value - width;
    num get bottom => top + height;
    set bottom(num value) => top = value - height;
  }

  void main() {
    var rect = Rectangle(3, 4, 20, 15);
    assert(rect.left == 3);
    rect.right = 12;
    assert(rect.left == -8);
  }

```

通过getters和setters，你从实例变量开始，稍后使用方法包装它们，无需更改客户端的代码。

> 注意：无论是否明确定义了getter，如同++的运算符都会如于其那样工作。去避免任何不可预测的影响，运算发只需要调用一次getter，并将其值保存在临时变量中。

### 抽象类

使用abstract修饰符定义抽象类——不能被实例化的类，抽象类对于定义接口是非常有用的，通常还有一些实现。如果你想使抽象类初始化，那就定义一个 *factory（工厂）构造函数* 。

抽象类一般有抽象方法，下面是一个带有抽象方法的抽象类的示例：

```dart
  // 这个类被定义为抽象类，不能被实例化
  abstract class AbstractContainer {
    // 定义构造函数，域，方法。。。

    void updateChildren(); // 抽象方法
  }
```

### 隐式接口

每个类都隐式定义了一个接口，接口包含所有该类的实例成员及其实现的接口。如果你想在不继承B类的情况下创建支持B类API的A类，A类应该实现B接口。

类通过在implements子句中声明它们，然后提供接口所需的API来实现一个或者多个接口：

```dart
  // 一个Person，隐式接口包含greet()
  class Person {
    // 在界面中，仅能在这个库中可见
    final _name;

    // 因为是个构造函数，所以不在界面中
    Person(this._name);

    // 在界面中
    String greet(String who) => 'Hello, $who.I am &_name.'
  }

  // Person接口的实现
  class Impostor implements Person {
    get _name => '';

    String greet(String who) => 'Hi $who . Do you know who I am?'
  }

  String greetBob(Person person) => person.greet('Bob');

  void main(){
    print(greetBob(Person('Kathy')));
    print(greetBob(Impostor()));
  }

```

这是一个指定类实现多个接口的示例：

```dart
  class Point implements Comparable, Location {...}
```

### 扩展类（继承与派生）

使用extends创造子类，并且使用super指向超类：

```dart
  class Television {
    void turnOn() {
      _illuminateDisplay();
      _activateIrSensor();
    }
    // ...
  }

  class SmartTelevision extends Television {
    void turnOn() {
      super.turnOn();
      _bootNetworkInterface();
      _initializeMemory();
      _upgradeApps();
    }
    // ...
  }
```

#### 重载成员

子类可以重写实例方法，getters，setters。你可以使用 *@override* 注释来指示你有意重载的成员：

```dart
  class SmartTelevision extends Television {
    @override
    void turnOn() {...}
    // ...
  }
```

在代码中，去限制方法参数或者实例变量的类型是 *类型安全* 的，你可以使用 *协变关键字covariant keyword* 。

#### 重载运算符

你可以重载下表中的运算符。举个例子，如果你定义一个Vector类，你可以定义一个 + 方法相加两个vector（**译者注：可以参考C++在这部分的内容**）。

| 可重载运算符表 |       |       |       |
| :------------: | :---: | :---: | :---: |
|       <        |   +   |  丨   |  []   |
|       >        |   /   |   ^   |  []=  |
|       <=       |  ~/   |   &   |   ~   |
|       >=       |   *   |  <<   |  ==   |
|       -        |   %   |  >>   |

> 你可能注意到了!=是不可以重载的运算符，表达式e1 != e2只是!(e1 == e2)的句法糖（**译者注：看到这里，译者觉得所谓句法糖的意思，貌似是等价写法的意思，嘤嘤嘤**）

下面是类重载运算符的一个例子：

```dart
  class Vector {
    final int x, y;

    Vector(this.x, this.y);

    Vector operator + (Vector v) => Vector(x + v.x, y + v.y);
    Vector operator - (Vector v) => Vector(x - v.x, y - v.y);

    // 运算符 == 和 哈希码并没有显示。更多的细节在后面的note中。
  }

  void main() {
    final v = Vector(2, 3);
    final w = Vector(2, 2);

    assert(v + w == Vector(4, 5));
    assert(v - w == Vector(0, 1));
  }
```

如果你重载了 == ，你也应该重载对象的哈希码getter。举个例子重载 == 和哈希码，参见 *实现地图键（在库之旅中）* 。

更多关于重载的信息，通常参考 *扩展类（继承）* 。

#### 没有这个方法noSuchMethod()

要在代码中尝试使用不存在的方法或实例变量时，检测或做出反应，你可以重载noSuchMethod()：

```dart
  class A {
    // 除非你重载noSuchMethod，否则使用不存在的成员会导致NOSuchMethodError。

    @override
    void noSuchMethod(Invocation invocation) {
      print('You tried to use a non-existent member: ' + '${invocation.memberName}');
    }
  }
```

你 **不可以** 调用一个没有实现的方法，除非满足下面的任意一点：

* 接收器具有静态的类型dynamic

* 接收器具有静态的类型定义了没有实现的方法（抽象是可以的），接收器的dynamic类型有noSuchMethod()的实现，跟类对象是不一样的

更多请参照 [noSuchMethod转发规范noSuchMethod forwarding specification](https://github.com/dart-lang/sdk/blob/master/docs/language/informal/nosuchmethod-forwarding.md)

### 枚举类型Enumerated types

枚举类型，通常被称为 *enumerations* 或者 *enums* ，是被用来代表常量的固定数字的特殊一类。

#### 使用枚举

使用关键字enum声明枚举类型：

```dart
  enum Color { red, green, blue }
```

每个枚举的值都有一个 **索引index** getter，返回从零开始的索引。

```dart
  assert(Color.red.index == 0);
  assert(Color.green.index == 1);
  assert(Color.blue.index == 2);
```

去获取枚举中所有值的列表，你可以使用枚举的values常方法

```dart
  List<Color> colors = Color.values;
  assert(Color[2] == Color.blue);
```

你可以在switch语句使用枚举，如果你不处理枚举的所有的值你将会收到警告。

```dart
  var aColor = Color.blue;

  switch (aColor) {
    case Color.red:
      print('Red as roses!');
      break;
    case Color.green:
      print('Green as grass!');
      break;
    default: // 避免警告
      print(aColor);
  }
```

枚举类型有下面的限制：

* 你不可以创建子类，混入，或者实现枚举
* 你不可以明确地实例化枚举

了解更多，参见 *Dart语言规范* 。

### 向类添加功能：混入mixins

Mixins是一种在多个类层次结构中重用类代码的方法。

使用 mixin，请使用with关键字后跟一个或多个mixin名称。以下示例显示了两个使用mixins的类：

```dart
  class Musician extends Performer with Musical {
    // ...
  }

  class Maestro extends Person with Musical, Aggressive, Demented {
    Maestro(String maestroName) {
      name = maestroName;
      canConduct = true;
    }
  }
```

去实现mixin，创建一个类并扩展对象、不要声明构造函数。除非您希望mixin可用作常规类，否则请使用mixin关键字而不是class。

```dart
  mixin Musical {
    bool canPlayPiano = false;
    bool canCompose = false;
    bool canConduct = false;

    void enterainMe() {
      if (canPlayPiano) {
        print('Playing Piano');
      } else if(canConduct) {
        print('Waving hands');
      } else {
        print('Humming to self');
      }
    }
  }
```

可以使用mixin指定一个明确的类型，举个例子，你的mixin可以调用一个没有定义的方法——使用on指向调用的超类。

```dart
  mixin MusicalPerformer on Musician {
    // ...
  }
```

版本提醒：在Dart2.1中介绍了对于mixin的支持。早期版本的代码通常使用抽象类代替。更多关于2.1中mixin变化的信息，参见 [Dart SDK改变日志 Dart SDK changelog](https://github.com/dart-lang/sdk/blob/master/CHANGELOG.md) 和  [2.1 mixin 规范 2.1 mixin specification](https://github.com/dart-lang/language/blob/master/accepted/2.1/super-mixins/feature-specification.md#dart-2-mixin-declarations)。

### 类变量和方法

使用static关键字去实现类范围的变量和方法：

#### 静态变量

静态变量（类变量）对类范围的状态和常量是非常实用的：

```dart
  class Queue {
    static const initialCapacity = 16;
    //...
  }

  void main(){
    assert(Queue.initialCapacity == 16);
  }
```

静态变量直到使用的时候才能被初始化。

此页遵循[样式指南建议](https://www.dartlang.org/guides/language/effective-dart/style#identifiers)更偏向为常名称使用lowerCamelCase。

#### 静态方法

静态方法（类方法）不在实例中作用，因此无this权限。

```dart
  import 'dart:math';

  class Point {
    num x, y;
    Point(this.x, this.y);

    static num distanceBetween(Point s, Point b) {
      var dx = a.x - b.x;
      var dy = a.y - a.y;
      return sqrt(dx * dx + dy * dy);
    }
  }

  void main() {
    var a = Point(2, 2);
    var b = Point(4, 4);
    var distance = Point.distanceBetween(a, b);
    assert(2.8 < distance && distance < 2.9);
    print(distance);
  }
```

> 对于常用或广泛使用的实用程序和功能，请考虑使用顶级函数而不是静态方法。

你可以使用静态方法作为编译时常量。举个例子，可以将静态方法作为参数传递给常量构造函数。

## 泛型Generics

如果你查看基础API文档数组，列表，你将会看到类型其实是List<E\>。<...>将列表标记为泛型（或者参数化）类型——具有正式参数类型的参数。按照惯例，类型变量有单个字母名称，比如E,T,S,K和V。

### 为什么要使用泛型

***译者注：泛型即为模板***

泛型常被用于类型安全，然而它们有比仅仅让你的代码运行的更多好处。

* 正确指定泛型类型可以生成更好的代码。
* 您可以使用泛型来减少代码重复。

如果你希望列表只包含字符串，你可以声明它为List<String\>（读作“字符串列表”）。这样，你，你的程序和你的工具检测列表中的非字符串参数是个错误。

```dart
  var names = List<String>();
  names.addAll(['Seth', 'Kathy', 'Lars']);
  names.add(42); // 错误
```

使用泛型的另一个原因是减少代码重复。泛型允许您在多种类型之间共享单个接口和实现，同时仍然利用静态分析。比如创建一个缓存对象的接口

```dart
  abstract class ObjectCache {
    Object getByKey(String key);
    void setByKey(String Key, Object value);
  }
```

你发现你想创建一个指定字符串版本的接口，你创建另一个接口：

```dart
  abstract class StringCache {
    String getByKey(String key);
    void setByKey(String Key, String value);
  }
```

然后你又想创建一个指定数字版本的接口。。。

泛型类型可以解决你创建所有的这些接口的问题。取而代之，你可以带有类型参数创建单个接口：

```dart
  abstract class Cache<T> {
    T getByKey(String key);
    void setByKey(String key, T value);
  }
```

在这段代码中，T是替身类型。它是一个占位符，您可以将其视为开发人员稍后定义的类型。

### 使用集合文字

列表和集合文字可以被参数化。参数化文字除了在括号之前添加类型，其他就像你之前看到的那样。

```dart
  var names = <String>['Seth', 'Kathy', 'Lars'];
  var pages = <String, String>{
    'index.html': 'Homepage',
    'robot.txt': 'Hints for web robots',
    'humans.txt': 'We are people, not machines'
  };
```

### 使用带有构造函数的参数化类型

在使用构造函数的时候，指定一个或者多个类型，将类型放在类名后面的尖角括号之中

```dart
  var names = List<String>();
  names.addAll(['Seth', 'Kathy', 'Lars']);
  var nameSet = Set<String>.from(names);
```

下面的代码创建了一个整型键、View类型的地图

```dart
  var views = Map<int, View>();
```

### 泛型集合和它们包含的类型

Dart泛型的类型具体化，意味着它们在运行时携带类型信息。

```dart
  var names = List<String>();
  names.addAll(['Seth', 'Kathy', 'Lars']);
  print(names is List<String>); // 输出true
```

> 相反，在Java中泛型擦除，就意味着在运行中删除泛型类型参数。在Java之中，你可以测试对象是否List，但是不能测试它是否是List<String\>。

### 限制参数化类型

当你实现泛型类型之时，你需要去限制参数的类型。你可以使用extends。

```dart
  class Foo<T extends SomeBaseClass> {
    String toString() => "Instance of 'Foo<$T>'";
  }

  class Extender extends SomeBaseClass {...}
```

可以使用SomeBaseClass或其任何子类作为泛型参数：

```dart
  var someBaseClassFoo = Foo<SomeBaseClass>();
  var extenderFoo = Foo<Extender>();
```

也可以不指定泛型参数：

```dart
  var foo = Foo();
  print(foo); // Instance of 'Foo<SomeBaseClass>'
```

指定非SomeBaseClass会导致错误：

```dart
  var foo = Foo<Object>(); // 错误
```

### 使用泛型方法

起初，Dart的泛型支持被限制在类。一个更新的语法，叫做泛型方法，允许类型参数在方法或者函数中：

```dart
  T first<T>(List<T> ts) {
    // 先做一些初始化工作或者错误检查
    T tmp = ts[0];
    //
  }
```

这里在first<T\>中泛型类型参数，允许你在一些地方使用类型参数T

* 在函数的返回类型(T)
* 在参数类型(List<T\>)
* 在局部变量(T tmp)

了解关于泛型的更多信息，参考 [使用泛型方法](https://github.com/dart-lang/sdk/blob/master/pkg/dev_compiler/doc/GENERIC_METHODS.md)

## 库与能见度

import和library指令可以帮助你创建一个模块化的、可分享的代码库。库不仅仅提供API，还有隐私单元：以下划线开头的标识符只在库内可见。每一个Dart APP都是一个库，即使它没有使用library指令。

可以使用包来分发库。在[发布包和内容管理](https://www.dartlang.org/tools/pub)中了解关于pub有关的信息，在SDK中包含包管理。

### 使用库

使用import指定如何从一个库中的命名空间在另一个库的范围内使用。

举个例子，Dart web应用通常使用 [dart:html](https://api.dartlang.org/stable/dart-html)库。

```dart
  import 'dart:html';
```

import需要的唯一参数是指定库的URI。对于内置的库，URI有特殊的 **dart:** 方案。对于其他的库，你可以使用文件系统路径或者 **package:** 方案。package方案指定由类似于pub tool的包管理提供的库。

```dart
  import 'package:test/test.dart';
```

> URI代表了统一资源标识符。URL(uniform resource locators)(统一资源定位符)是一种常见的URI。

#### 指定一个库前缀

如果你输入两个含有冲突的标识符的库，然后你可以为一个或者所有的库指定前缀。举个例子，如果库1和库2都有Element类：

```dart
  import 'package:lib1/lib1.dart';
  import 'package:lib2/lib2.dart' as lib2;

  // 使用来自于库1的Element
  Element element1 = Element();

  // 使用来自于库2的Element
  lib2.Element element2 = lib2.Element();
```

#### 输入库的一部分

如果你只想使用库的一部分，你可以有选择性的输入库。

```dart
  // 只输入foo
  import 'package:lib1/lib.dart' show foo;

  // 输入除了foo
  import 'package:lib2/lib2.dart' hide foo;
```

#### 懒加载一个库

**延期加载（或者称为懒加载）** 允许应用在有需要的时候加载一个库。以下是您可能使用延迟加载的一些情况：

* 减少应用程序的初次启动时间
* 执行A/B测试——尝试算法的替代实现
* 加载很少使用的功能，例如可选的屏幕和对话框

要懒加载一个库，你必须首先使用deferred as。

```dart
  import 'package:greetings/hello.dart' deferred as hello;
```

当你使用库的使用，使用库的标识符调用loadLibrary()

```dart
  Future greet async{
    await hello.loadLibrary();
    hello.printGreeting();
  }
```

在前面的代码中，await关键字暂停了执行，直到库被加载。了解关于async和await，参考 [异步支持asynchrony support](https://www.dartlang.org/guides/language/language-tour#asynchrony-support)。

你可以在一个库中调用loadLibrary()很多次，没有任何问题，库只被加载一次。

使用延时加载的时候，记住以下内容：

* 延迟库的常量不是导入文件中的常量。在加载延迟库之前，这些常量不存在。
* 不能在导入文件中使用延迟库中的类型，考虑将接口类型移动到由延迟库和导入文件导入的库。
* 你使用deferred as namespace，Dart将loadLibrary()隐式插入到命名空间。loadLibrary()函数返回一个Future。

> DartVM区别：即使在调用之前，Dart VM也允许访问延迟库的成员loadLibrary()。此行为可能会更改，因此 *不要依赖于当前的VM行为* 。

详细信息参见 [issue #33118](https://github.com/dart-lang/sdk/issues/33118)。

### 实现库

参阅 [创建库包](https://www.dartlang.org/guides/libraries/create-library-packages) 需求如何去实现一个库包，包括：

* 如何组织库源代码
* 如何使用export指令
* 何时使用part指令

## 异步支持

Dart库中包含很多返回 [Future](https://api.dartlang.org/stable/dart-async/Future-class.html) 或者 [Stream](https://api.dartlang.org/stable/dart-async/Stream-class.html)对象的函数。这些函数是异步的。它们在设置可能耗时的操作后（比如I/O）返回，而不等待操作完成。

async和await关键字支持异步编程，让你写异步代码看起来更像是同步代码。

### 处理Futures

当你需要完成的Future结果时，你有两个选择：

* 使用async和await
* 使用Future API，在 [库之旅](https://www.dartlang.org/guides/libraries/library-tour#future) 中有所描述。

代码使用async和await是异步的，但是它看起来很像是同步代码。举个例子，这有一些使用await关键字等待异步函数结果的代码：

```dart
  await lookUpVersion();
```

去使用await，代码必须是一个异步函数——一个函数被标记为async：

```dart
  Future checkVersion() async {
    var version = await lookUpVersion();
  }
```

> 注意：虽然异步函数可能执行耗时的操作，但它不会等待这些操作。异步函数只有在遇到第一个await表达式（**详情**）时才会执行等待。然后它返回一个Future对象，仅在await表达式完成后才恢复原样执行。

[详情](https://github.com/dart-lang/sdk/blob/master/docs/newsletter/20170915.md#synchronous-async-start)

使用try,catch,finally去处理和清除使用await代码的错误：

```dart
  try {
    version = await lookUpVersion();
  } catch(e) {
    // 无法查找版本
  }
```

你可以在异步函数中多次使用await。举个例子，下面的代码等待了三次函数结果：

```dart
  var entrypoint = await findEntryPoint();
  var exitCode = await runExecutable(entrypoint, args);
  await flushThenExit(exitCode);
```

在await表达式中，通常结果都是Future；如果不是，那么值自动包含在了Future中。这个Future对象表示返回一个对象的承诺，await表达式的值是返回一个对象。await表达式使执行暂停直到对象可用。

**如果使用await的时候出现了编译时错误，请确保await是在一个异步函数之中(async function)。** 举个例子，在app中的main()函数中使用await，main()的函数体必须被标记为async：

```dart
  Future main() async {
    checkVersion();
    print('In main: version is ${await lookUpVersion()}');
  }
```

### 声明异步函数

异步函数是通过标记async修改函数体的函数。

将async关键字加到函数上，使它返回一个Future。举个例子，考虑一个返回String的同步函数：

```dart
  String lookUpVersion() => '1.0.0';
```

如果将它改为异步函数——举个例子，future表现执行起来会非常耗时——返回值是一个Future。

```dart
  Future<String> lookUpVersion() async => '1.0.0';
````

注意这个函数体不需要使用Future的API。在必要的情况下，Dart创造一个Future对象。

如果你的函数不返回任何有用的值，让它的返回类型为Future<void\>。

### 处理流(Streams)

如果你想从流中获取值，你有两种方法：

* 使用async和一个异步for循环(await for)。
* 使用Stream API，在 [库之旅](https://www.dartlang.org/guides/libraries/library-tour#stream) 中有阐述。

>注意：在使用await for之前，请确保它使代码更清晰并且你确实想去等待流的所有的值。例如，你通常不应该为UI事件侦听器使用await for，因为UI框架发送无穷尽的事件流。

异步for循环有以下的形式：

```dart
  await for (var或者类型 标识符 in 表达式) {
    // 在每一次流发射值的时候执行
  }
```

表达式的值必须有流类型。执行过程如下：

1. 等待直到流发射一个值
2. 执行函数体中的for循环，变量值为被射出的值
3. 重复1和2直到流被关闭

停止对流的监听，你可以使用一个break或者return语句，退出for循环和从流中退订。

**如果在表现异步for循环的时候出现编译时错误，确保await for在asyn函数内。** 举个例子，你在你的app的main()函数使用异步for循环，main()的函数体必须被标记为async。

```dart
  Future main() async {
    // ...
    await for (var request in requestServer) {
      handleRequest(requset);
    }
    // ...
  }
```

获取更多关于异步编程的信息，通常上，在库之旅中参考[dart:async](https://www.dartlang.org/guides/libraries/library-tour#dartasync---asynchronous-programming)章节。

也可以看文章[Dart异步支持：1](https://www.dartlang.org/articles/language/await-async)、[Dart异步支持：2](https://www.dartlang.org/articles/language/beyond-async) 和 [Dart语言指向](https://www.dartlang.org/guides/language/spec) 。

## 发生器Generators

当你需要懒生成一连串的值时，考虑使用发生器函数。Dart内置两种发生器函数：

* 同步发生器：返回一个[可迭代](https://api.dartlang.org/stable/dart-core/Iterable-class.html)对象
* 异步发生器：返回一个[流](https://api.dartlang.org/stable/dart-async/Stream-class.html)对象

表现一个同步发生器，用sync*标记函数体，用yield传递值：

```dart
  Iterable<int> naturalsTo(int n) sync* {
    int k = 0;
    while (k < n) yield k++;
  }
```

表现一个异步发生器，用async*标记函数体，用yield传递值：

```dart
  Stream<int> asynchronousNaturalsTo(int n) async* {
    int k = 0;
    while (k < n) yield k++;
  }
```

如果你的生成器是递归，你可以使用yield*提高其性能：

```dart
  Iterable<int> naturalsDownFrom(int n) sync* {
    if (n > 0){
      yield n;
      yield* naturalsDownFrom(n - 1);
    }
  }
```

了解更多关于发生器，参考文章[Dart异步支持：2](https://www.dartlang.org/articles/language/beyond-async)

## 可调用的类

允许你的类像函数一样被调用，使用call()方法。

在下面的示例中，WannabeFunction类定义了一个call()函数，接受三个字符串并连接它们，用空格分隔每个字符串，并附加一个感叹号。

```dart
  class WannabeFunction {
    call(String a, String b, String c) => '$a $b $c!';
  }
  main() {
    var wf = WannabeFunction();
    var out = wf("Hi", "there", "gang");
    print('$out');
  }
```

了解更多关于将类如同函数一样对待的信息，请参考[在Dart中模拟函数](https://www.dartlang.org/articles/language/emulating-functions) 。

## 分离Isolates

大多的计算机，甚至一些移动设备上，都有多核CPU。为了利用所有的核心，开发人员传统上使用并发运行的共享内存线程。但是，共享状态并发容易出错，并且可能导致代码复杂化。所有Dart代码都在隔离区内运行，而不是线程。每个隔离区都有自己的内存堆，确保不会从任何其他隔离区访问隔离区的状态。有关更多信息，请参阅 [dart:isolate库文档](https://api.dartlang.org/stable/dart-isolate)

## 类型定义Typedefs

在Dart中，函数是对象，就如同字符串和数字是对象那样。一个类型定义，或者一个功能型的别名，给予了函数一个名字，你可以在声明的时候和返回类型的时候使用它。当函数类型分配给变量时，typedef会保留类型信息。

下面是没有使用typedef的代码：

```dart
  class SortedCollection {
    Function compare;

    SortedCollection(int f(Object a, Object b)) {
      compare = f;
    }
  }

  // 初始化

  int sort(Object a, Object b) => 0;

  void main() {
    SortedCollection coll = SortedCollection(sort);

    // 我们都知道compare是一个函数，但是什么类型的函数呢？

    assert(coll.compare is Function);
  }
```

当把f的值赋给compare时，类型信息就丢失了。f的类型是(Object, Object) -> int(其中 -> 表示返回)，但是compare的类型是Function。如果我们将代码更改为使用显式名称并保留类型信息，则开发人员和工具都可以使用该信息。

```dart
  typedef Compare = int Function(Object a, Object b);

  class SortedCollection {
    Compare compare;

    SortedCollection(this.compare);
  }

  // 初始化

  int sort(Object a, Object b) => 0;

  void main() {
    SortedCollection coll = SortedCollection(sort);
    assert(coll.compare is Function);
    assert(coll.compare is Compare);
  }
```

> 目前，typedef仅限于函数类型，开发者希望改变这一点。

因为类型定义只是别名，它们提供了检查函数类型的方法。

```dart
  typedef Compare<T> = int Function(T a, T b);

  int sort(int a, int b) => a - b;
  void main() {
    assert(sort is Compare<int>);       // True
  }
```

## 元数据Metadata

使用元数据给关于你的代码额外的信息。元数据注释以字符@开头，后跟对编译时常量（如deprecated）的引用或对常量构造函数的调用。

所有的Dart代码都有两个注释：@deprecated和@override，有关使用@override的示例，参阅[扩展类](https://www.dartlang.org/guides/language/language-tour#extending-a-class)，以下是使用@deprecated的示例：

```dart
  class Television {
    /// _Deprecated:使用[turnOn]代替_
    @deprecated
    void actvate() {
      turnOn();
    }

    /// 打开TV的电源
    void turnOn(){...}
  }
```

你可以定义你自己的元数据注释。下面的例子中定义了一个@todo注释并带有两个参数。

```dart
  library todo;
  class Todo {
    final String who;
    final String what;

    const Todo(this.who, this.what);
  }
```

下面是使用@todo的一个示例：

```dart
  import 'todo.dart';

  @Todo('seth', 'make this do something')
  void doSomething() {
    print('do something');
  }
```

元数据可以在库、类、类型定义、类型参数、工厂、字段、参数、或变量声明以及导入或导出指令之前出现，可以使用反射在运行时检索元数据。

## 评论（代码注释）

Dart支持单行、多行、文档评论。

### 单行（以"//"开头，忽略后面内容）

### 多行（介于/\* \*/之间，可以嵌套）

### 文档

文档评论是以///或者/\*\*开头的多行或者单行评论，在连续的行使用///的效果与多行评论的效果相同。

在文档评论中，Dart编译器忽略所有的文本，除非它在括号之中。使用括号，可以引用类、方法、字段、顶级变量、函数和参数。括号中的名称在已记录的程序元素的词法范围内得到解析。

以下是文档注释的示例，包含对其他的类和参数的引用：

```dart
  /// A domesticated South American camelid (Lama glama).
  ///
  /// Andean cultures have used llamas as meat and pack
  /// animals since pre-Hispanic times.
  class Llama {
    String name;

    /// Feeds your llama [Food].
    ///
    /// The typical llama eats one bale of hay per week.
    void feed(Food food) {
      // ...
    }

    /// Exercises your llama with an [activity] for
    /// [timeLimit] minutes.
    void exercise(Activity activity, int timeLimit) {
      // ...
    }
  }
```

在生成的文档之中，[Food]成为了Food类API文档的链接。

要解析并生成HTML文档，你可以使用SDK的 [文档生成工具](https://github.com/dart-lang/dartdoc#dartdoc) 。有关生成文档的示例，参阅 [Dart API文档](https://api.dartlang.org/stable) 。有关如何构建评论的建议，请参阅 [Dart Doc评论指南](https://www.dartlang.org/guides/language/effective-dart/documentation) 。

## 总结

本教程概述了Dart语言中的常用功能。正在实施更多功能，设计者不希望破坏现有的代码体系。更多信息参阅 [Dart语言规范](https://www.dartlang.org/guides/language/spec) 和 [有效Dart](https://www.dartlang.org/guides/language/effective-dart) 。

学习更多Dart的核心库，参见 [Dart库之旅](https://www.dartlang.org/guides/libraries/library-tour) 。
