### 变量数据类型及检测: 基本 + 引用

- String
- Boolean
- Number
- Null
- undefined
- Symbol
- BigInt
- Object

### 运算符: 算术 + 条件 + 逻辑 + 位 + 短路, 隐式转换等
- /
- %
- ^
- &
- += -= \*= /= %=
- \>
- <
- \>=
- <=
- =
- ==
- ===
- &&
- ||
- \*\*
- ? :
- ?.
- ??
- 100_000
- for
- for in
- for of
- if
- while
- switch
- cash
- brank
- return
- instanceof
- typeof

### 原型链

> 原型的主要作用 节省内存不用在每个实例对象上进行创建而是通过 **proto** 往上查找

每个构建函数都拥有一个 prototype 属性
每个实例对象都拥有一个 **proto** 属性指向 构建函数的 prototype 属性

所以原型链就很好解释了，实例对象可以通过 **proto** 找到构建函数的原型 那么原型也是一个实例对象也拥有 **proto** 属性 就这样一层一层往上找，直到为 null 因为 Object 的 **prototype** 指向 null

构造函数、原型和实例的关系：每个构造函数都有一个原型对象，原型对象都包含一个指向构造函数的指针，而实例都包含一个指向原型对象的内部指针。那么假如我们让原型对象等于另一个类型的实例，结果会怎样？显然，此时的原型对象将包含一个指向另一个原型的指针，相应地，另一个原型中也包含着一个指向另一个构造函数的指针。假如另一个原型又是另一个类型的实例，那么上述关系依然成立。如此层层递进，就构成了实例与原型的链条。这就是所谓的原型链的基本概念。-- 《JavaScript 高级指南》

### 闭包

保存函数内部状态
函数外可以获取到函数内的值

### 深拷贝与浅拷贝

深拷贝拷贝内存
浅拷贝拷贝指针

### JS 执行机制

从上往下执行 -> 
首先变量提升 -> 
其次函数提升 -> 
同步代码 -> 
宏任务 -> 
微任务

### ES6

1. let 定义一个局部变量、const 定义一个常量 不能更改器地址、let const 不存在变量提升
2. ...展开符
3. Set 类集合类
4. Map 哈希对象
5. Symbol 唯一值
6. 箭头函数 this 指向上层作用域 普通函数 this 指向调用者
7. Promise 包含 reject、resolve、all 这些方法 then、catch、finally 方法
8. Class 类
9. 严格模式
10. Proxy
11. for of
12. Reflect 顶级对象
13. async await
14. import export
15. try、catch、finally
16. 变量解构
等等...

### 数组的操作方法

1. indexOf 从头查找数组
2. lastindexOf 从尾部查找数组
3. map 处理数组
4. filter 找出符合条件的元素
5. some 返回一个布尔值 找到一个就返回
6. every 全部为 true 返回 true
7. forEach 遍历数组
8. find 查找数组
9. findIndex 查找目标值在数组中的索引
10. from 创建数组
11. flot 拉平二维数组
12. push 往数组后面放入一个元素并返回
13. pop 删除并返回数组最后一个元素
14. shift 往数组前面放入一个元素并返回
15. unshift 删除并返回数组的第一个元素
16. concat 合并数组
17. join 根据 xx 将数组切割成字符串
18. sort 排序
19. splice 将数组中的某个索引值替换或删除
20. reverse 数组翻转
21. fill 重复生成 （如果是复杂数据类型将指向同一片内存地址）
22. reduce 计算函数

### 对象的操作方法

1. Object.keys() 获取对象所有键名组成的数组
2. Object.values() 获取对象值所组成的数组
3. Object.assign() 合并对象 注意: 这是浅拷贝
4. Object.create(proto,[propertiesObject(就是 defineProperties 的参数属性)](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperties)) 创建一个新对象，使用现有对象来提供新对象的 **proto**
5. Object.entries() 返回 [[key,value]] 
6. Object.freeze() 返回一个不可操作的对象
7. Object.values()

### 函数的操作方法

自执行函数 (() => {})()
.call 改变 this 指向
.apply
.bind 改变 this 指向 并返回一个新函数
手写 call 函数
new Function

```javascript
/**
 * 移花接木
 * 将传递过来的对象接收
 * 在对象上挂载一个函数
 * 调用函数将结果return出去
 * */
Function.prototype.myCall = function (ctx) {
  ctx = ctx || window;
  if (typeof this !== "function") return;
  if (typeof ctx !== "object") return; // 可能有点问题后期改
  ctx.fn = this;
  const arg = [...arguments].slice(1);
  const result = ctx.fn(...arg);
  delete ctx.fn;
  return result;
};

/**
 * apply 差不多，换了一种传参方是
 * */
Function.prototype.myApply = function (ctx) {
  ctx = ctx || window;
};

Function.prototype.myBind = function (ctx) {
  const that = this;
  const arg = [...arguments].slice(1);
  return function F() {
    return that.apply(ctx, arg);
  };
};
```

### 手写 Promise

```javascript
/* 
思路
then、catch 是订阅
resolve、reject 是发布
*/
// throw 抛错是reject状态
// 阻断执行
// then 可以接收2个函数，一个成功，一个失败
// 链式调用
// then 发布时是微任务
/*     
  Promise 目前的问题
  1. return 出的新Promise状态为padding，如果后面还有链式操作的话无法进行订阅
*/
class MyPromise {
  PADDING = 'padding';
  FULFILLED = 'fulfilled';
  REJECTED = 'rejected';
  status = this.PADDING; // padding: 初始化状态 fulfilled: 操作成功 rejected：操作失败
  resultValue = '';
  onFulfilledCbs = [];
  onRejectedCbs = []  constructor(fn) {
    if (!fn || typeof fn !== 'function') throw new Errow('MyPromise resolver undefined is not a function')
    try {
      fn(this.resolve.bind(this), this.reject.bind(this))
    } catch (err) {
      this.reject(err)
    }
  }
}
MyPromise.prototype.resolve = function (val) {
  // 进行阻断执行
  if (this.status !== this.PADDING) return  
    this.resultValue = val
    this.status = this.FULFILLED
    while (this.onFulfilledCbs.length) {
      this.onFulfilledCbs.shift()(val)
    }
  }  
  MyPromise.prototype.reject = function (val) {
    if (this.status !== this.PADDING) return  
    this.resultValue = val
    this.status = this.REJECTED
    while (this.onRejectedCbs.length) {
      this.onRejectedCbs.shift()(val)
    }
  }  
  MyPromise.prototype.then = function (onFulfilled, onRejected) {
      var thenPromise = new MyPromise((resolve, reject) => {
        const resolvePromise = cb => {
          try {
            const x = cb(this.resultValue)
            if (x === thenPromise) {
              // 不能返回自身哦
              throw new Error('不能返回自身。。。')
            }
            if (x instanceof MyPromise) {
              // 如果返回值是Promise
              // 如果返回值是promise对象，返回值为成功，新promise就是成功
              // 如果返回值是promise对象，返回值为失败，新promise就是失败
              // 谁知道返回的promise是失败成功？只有then知道
              x.then(resolve, reject)
            } else {
              // 非Promise就直接成功
              resolve(x)
            }
          } catch (err) {
            // 处理报错
            reject(err)
            throw new Error(err)
          }
        }

        if (this.status === this.FULFILLED) {
          onFulfilled(this.resultValue)
        } else if (this.status === this.REJECTED) {
          onRejected && onRejected(this.resultValue)
        } else if (this.status === this.PADDING) {
          onFulfilled && this.onFulfilledCbs.push(resolvePromise.bind(this, onFulfilled))
          onRejected && this.onRejectedCbs.push(resolvePromise.bind(this, onRejected))
        }

      })

      return thenPromise
    }

    MyPromise.prototype.catch = function (onRejected) {
      if (this.status === this.REJECTED) {
        onRejected(this.resultValue)
      } else if (this.status === this.PADDING) {
        this.onRejectedCbs.push(onRejected)
      }
      return this
    }

    console.log(1)
    new MyPromise((resolve, reject) => { throw ('123') }).then((res) => { return res * 2 }).catch((err) => { console.log(err) })
```
