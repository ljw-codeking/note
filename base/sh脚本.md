# Shell脚本

*小祥* *2020-09-07* *58* *Linux*

基础的运维知识

## [#](https://www.jtxyh.top/blogs/2020/102-Shell脚本.html#脚本开发规范)脚本开发规范

- 脚本命名要有意义，文件后缀是.sh
- 脚本文件首行是而且必须是脚本解释器：`#!/bin/bash`
- 脚本文件解释器后面要有脚本的基本信息等内容
- 脚本文件中尽量不用中文注释，尽量用英文注释，防止本机或切换系统环境后中文乱码的困扰
- 脚本文件常见执行方式：bash 脚本名

> 常见的注释信息：脚本名称、脚本功能描述、脚本版本、脚本作者、联系方式等

## [#](https://www.jtxyh.top/blogs/2020/102-Shell脚本.html#注释)注释

单行注释：`#`，除了首行的#不是注释外，其他所有行内容，只要首个字符是#,那么就表示该行是注释

```shell
#!/bin/bash
echo '1'
# 注释
```

复制代码

多行注释：`:<<! ... !`

```shell
#!/bin/bash
echo '1'
:<<!
多行注释
多行注释
!
```

复制代码

## [#](https://www.jtxyh.top/blogs/2020/102-Shell脚本.html#变量)变量

变量包括两部分：`变量名=变量值`

shell中变量分为三大类

1. **本地变量**：手工方式定义的**作用范围小**的变量
2. **全局变量**：手工|默认方式定义**作用范围大**的变量
3. **内置变量**：bash命令中自带的一些参数变量类型

### [#](https://www.jtxyh.top/blogs/2020/102-Shell脚本.html#本地变量)本地变量

#### [#](https://www.jtxyh.top/blogs/2020/102-Shell脚本.html#普通变量)普通变量

1. `变量名=变量值`：变量值必须是一个整体，中间没有特殊字符
2. `变量名='变量值'`：我看到的内容，我就输出什么内容
3. `变量名="变量值"`：如果变量值范围内，有可以解析的变量A，那么首先解析变量A，将A的结果和其他内容**组合成一个整体**，重新赋值给变量B

> 建议：**数字不加引号，其他默认加双引号**

#### [#](https://www.jtxyh.top/blogs/2020/102-Shell脚本.html#命令变量)命令变量

执行`或者$()范围内的命令，将命令执行后的结果，赋值给新的变量名A

1. **变量名=`命令`**
2. **变量名=$(命令)**

### [#](https://www.jtxyh.top/blogs/2020/102-Shell脚本.html#全局变量)全局变量

查看全局变量：`env`

定义全局变量：`export 变量=值`

查看变量：`$变量名`，`"变量名"`，`${变量名}`，`"${变量名}"`

取消变量：`unset 变量名`

### [#](https://www.jtxyh.top/blogs/2020/102-Shell脚本.html#内置变量)内置变量

#### [#](https://www.jtxyh.top/blogs/2020/102-Shell脚本.html#脚本文件)脚本文件

- `$0`：获取当前执行的shell脚本文件名
- `$n`：获取当前执行的shell脚本的第n个参数值，**n为数字**，当n为0时表示脚本的文件名，如果n大于9就要用大括号括起来`${10}`
- `$#`：获取当前shell命令行中参数的总个数
- `$?`：获取执行上一个指令的返回值，**0为成功，非0为失败**

#### [#](https://www.jtxyh.top/blogs/2020/102-Shell脚本.html#精确截取)精确截取

格式：`${变量名:起始位置:截取长度}`

```shell
# 从第1个字符开始，截取5个字符
${file:0:5}

# 从第6个字符开始，截取5个字符
${file:5:5}

# 从倒数第6个字符开始，截取之后的3个字符
${file:0-6:3}
```

复制代码

#### [#](https://www.jtxyh.top/blogs/2020/102-Shell脚本.html#默认值)默认值

`${变量名:-默认值}`：如果变量有内容，就输出变量的内容，没有则输出默认值

`${变量名+默认值}`：无论变量是否有内容，都输出默认值

## [#](https://www.jtxyh.top/blogs/2020/102-Shell脚本.html#表达式)表达式

使用格式：`[ 表达式 ]`，左右两侧必须有空格，表达式条件成立则返回`0`，不成立返回`1`

### [#](https://www.jtxyh.top/blogs/2020/102-Shell脚本.html#逻辑表达式)逻辑表达式

```
&&`：如果命令1执行成功则`执行`命令2，否则命令2`不执行
||`：如果命令1执行成功则命令2`不执行`，否则命令2`执行
# 1 = 1 之前必须有空格
[ 1 = 1 ] && echo "前面执行成功就执行这个"

[ 1 = 2 ] || echo "前面执行失败就执行这个"
```

复制代码

### [#](https://www.jtxyh.top/blogs/2020/102-Shell脚本.html#文件表达式)文件表达式

`-f`：判断输入的内容是否是一个文件

```shell
[ -f wenjian.sh ] && echo "是一个文件"
[ -f wenjian.ssdah ] || echo "不是一个文件"
```

复制代码

`-d`：判断输入的内容是否是一个目录

```shell
[ -d wenjian.ssdh ] || echo "不是一个目录"
[ -d wenjian ] && echo "是一个目录"
```

复制代码

`-x`：判断输入内容是否可执行

```shell
[ -x age.sh ] || echo "文件没有执行权限"
[ -x test.sh ] && echo "文件有执行权限"
```

复制代码

### [#](https://www.jtxyh.top/blogs/2020/102-Shell脚本.html#数值操作符)数值操作符

- `-eq`：相等
- `-gt`：大于
- `-lt`：小于
- `-ne`：不等于
- `==`：字符串比较

```shell
[ 1 -eq 1 ] && echo "1等于1"
[ 1 -ne 1 ] && echo "1不等于2"
[ 1 -gt 0 ] && echo "1大于0"
[ 1 -lt 2 ] && echo "1小于2"
[ a == a ] && echo "a等于a"
```

复制代码

### [#](https://www.jtxyh.top/blogs/2020/102-Shell脚本.html#计算表达式)计算表达式

使用：`$(( 计算表达式 ))`或者`let 计算表达式`，`$(( 计算表达式 ))`中只能用`+ - * /和()`运算符，并且只能用做整数运算

[![shell计算表达式使用](https://gitee.com/jtxyh/blogImg/raw/master/shell%E8%AE%A1%E7%AE%97%E8%A1%A8%E8%BE%BE%E5%BC%8F%E4%BD%BF%E7%94%A8.png)](https://gitee.com/jtxyh/blogImg/raw/master/shell计算表达式使用.png)

### [#](https://www.jtxyh.top/blogs/2020/102-Shell脚本.html#数组操作)数组操作

在Shell中，用括号来表示数组，数组元素用**空格**符合分割

#### [#](https://www.jtxyh.top/blogs/2020/102-Shell脚本.html#定义)定义

```shell
array_name=(v1 v2 v3)

# 或者
array_name=(
    v1
    v2
    v3
)

# 或者
array_name[0]=v1
array_name[1]=v2
array_name[2]=v3
```

复制代码

#### [#](https://www.jtxyh.top/blogs/2020/102-Shell脚本.html#查找)查找

```
${array_name[index]}
# 索引查找
array_name=(v1 v2 v3)

echo ${array_name[0}
echo ${array_name[@}
echo ${array_name[*}
```

复制代码

[![数组查找](https://gitee.com/jtxyh/blogImg/raw/master/20210112135248.png)](https://gitee.com/jtxyh/blogImg/raw/master/20210112135248.png)

#### [#](https://www.jtxyh.top/blogs/2020/102-Shell脚本.html#修改)修改

```
array_name[index]=值
array_name[0]=666
```

复制代码

#### [#](https://www.jtxyh.top/blogs/2020/102-Shell脚本.html#删除)删除

删除单个元素 `unset array_name[index]` 删除整个数组 `unset array_name`

## [#](https://www.jtxyh.top/blogs/2020/102-Shell脚本.html#常见符号)常见符号

### [#](https://www.jtxyh.top/blogs/2020/102-Shell脚本.html#重定向)重定向

`>符号`：表示将符号左侧的内容，以**覆盖**的方式输入到右侧文件中

`>>符号`：表示将符号左侧的内容，以**追加**的方式输入到右侧文件的末尾行中

```shell
echo "file.txt" > file.txt
echo "file.txt" >> file.txt
```

复制代码

### [#](https://www.jtxyh.top/blogs/2020/102-Shell脚本.html#管道符)管道符

`|`：`命令1 | 命令2`，管道符左侧命令1执行后的结果，**传递给**管道符右侧的命令2使用

## [#](https://www.jtxyh.top/blogs/2020/102-Shell脚本.html#流程控制语句)流程控制语句

### [#](https://www.jtxyh.top/blogs/2020/102-Shell脚本.html#if)if

```shell
if [ 条件 ]
then 
    指令1
elif [ 条件2 ]
then
    指令2
else
    指令3
fi

#!/bin/bash
# 多 if 语句的使用场景
if [ "$1" == "start" ]
then
    echo "服务启动中..."
elif [ "$1" == "stop" ]
then
    echo "服务关闭中..."
elif [ "$1" == "restart" ]
then
    echo "服务重启中..."
else
    echo "$0 脚本的使用方式： $0 [ start | stop | restart ]"
fi
```

复制代码

### [#](https://www.jtxyh.top/blogs/2020/102-Shell脚本.html#case)case

```shell
case 变量名 in
    值1)
        指令1
        ;;
    值2)
        指令2
        ;;
    *)
        都不匹配
        ;;
esac

#!/bin/bash
# case 语句使用场景
case "$1" in
    "start")
        echo "服务启动中..."
        ;;
    "stop")
        echo "服务关闭中..."
        ;;
    "restart")
        echo "服务重启中..."
        ;;
    *)
        echo "$0 脚本的使用方式： $0 [ start | stop | restart ]"
        ;;
esac
```

复制代码

### [#](https://www.jtxyh.top/blogs/2020/102-Shell脚本.html#for)for

```shell
for 值 in 列表
do
    执行语句
done
```

复制代码

### [#](https://www.jtxyh.top/blogs/2020/102-Shell脚本.html#while)while

```shell
while 条件
do
    执行语句
done
```

复制代码

条件的类型：`命令、[[ 字符串表达式 ]]、(( 数字表达式 ))`

### [#](https://www.jtxyh.top/blogs/2020/102-Shell脚本.html#until)until

```shell
until 条件
do
    执行语句
done
```

复制代码

条件的类型：`命令、[[ 字符串表达式 ]]、(( 数字表达式 ))`

### [#](https://www.jtxyh.top/blogs/2020/102-Shell脚本.html#循环退出)循环退出

- `break`： 跳出所有循环
- `break n`： 跳出第n个循环(由内向外)
- `continue`： 跳出当前循环
- `exit`： 退出程序

## [#](https://www.jtxyh.top/blogs/2020/102-Shell脚本.html#函数)函数

### [#](https://www.jtxyh.top/blogs/2020/102-Shell脚本.html#定义函数)定义函数

```shell
# 普通函数
函数名() {
    函数体
}

# 传参函数
函数名() {
    函数体 $n
}
```

复制代码

### [#](https://www.jtxyh.top/blogs/2020/102-Shell脚本.html#调用函数)调用函数

```shell
# 普通函数
函数名

# 传参函数
函数名 参数
```

复制代码

## [#](https://www.jtxyh.top/blogs/2020/102-Shell脚本.html#常用命令)常用命令

### [#](https://www.jtxyh.top/blogs/2020/102-Shell脚本.html#grep)grep

`grep [参数] [关键字] <文件名>`：文本搜索命令

参数：`-c`只输出匹配行的计数，`-n`显示匹配行及好号，`-v`显示不包含匹配文本的所有行

### [#](https://www.jtxyh.top/blogs/2020/102-Shell脚本.html#find)find

`find [路径] [参数] [关键字] [动作]`：查找命令 参数：`-name`按照文件名查找文件，`-user`按照文件属主查找文件，`-group`按照文件所属组来查找文件，`-type`查找某一类型的文件