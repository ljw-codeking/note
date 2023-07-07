<!-- > TypxxeScript 是 JavaScript的超集  超集就是任何JavaScript的语法在TypeScript都支持

const a: type = 'xxx'  type是定义类型

interface 定义类型
interface Person {
name: string;
age: number;
}
const person: Person = {
name: 'zs',
age: 18
}

普通类型
string number boolean underfind null symbol  void
对象类型 
string [] 数组里面都是string类型
class Person
const calssObj : Person = new Person()  // 赋值必须是这个类

typeOf 推断这个变量的类型
const p = { a: 13, name: 'jake' }
typeOf p 
{
a: number,
b: string
}

never 表示函数永远执行不完


TypeScript class的基本属性定义
public 公用的 类外类内皆可调用
provide 私有的  只能在当前类内使用继承都不可以
protected  类外不能调用 继承可以调用
static 静态属性 直接挂载在类上 不需要实例化就可调用
xx readonly 只读属性不能更改


abstract class xxx {  }  // 定义一个抽象类  继承抽象类必须包含抽象方法


泛型
// 泛型调用时传入什么类型他就是什么类型   
// T 可以 extends 于其他类型表示  这个泛型中必须包括这个类型  或者这个字段
function fn<T>( params: T ) {}
fn<string>()

交叉类型 & 类似于继承功能

泛型中我们怎么让值继承与接口的键值呢
const p = { name: 'xx', age: 'xx' }
function fn<T extends keyOf p>(a: T)
此时 fn 第一个实参必须要传入 p 中的 key

TS 文件类型区分
.ts 代码实现文件 可以被编译成js代码 然后执行  
.d.ts 类型定义文件 不会生成js代码为js提供类型信息 不可出现可执行代码 -->