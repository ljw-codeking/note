### vue2 指令

- v-model
- v-for
- v-bind
- v-on
- v-html
- v-text
- v-once
- v-show
- v-slot

### vue 生命周期

- beforeCreate
- created
- beforeMountd
- mounted
- beforeUpdate
- undate
- beforeDestroy
- destroy

### 实例的属性和方法

- nextTick -- 等待页面更新完毕执行 将函数推到任务队列的最后面
- foreUpdate -- 强制更新当前组件
- watch -- 监听 data 数据变化 可以通过 options 进行配置获得更强大的能力 immediate：立即执行 deep：进行深度监听
- computed -- get data 进行依赖收集 从而进行计算
- emit -- 向上传递事件
- mixins -- 代码混合 可以将一些功能性代码进行混合
- props -- 组件传递的变量定义
- emits -- 定义事件传递
- $attrs -- 接受props中未定义的值 3.0中$listeners 已经移除将其合并到该变量中

### 内置的组件

- transition -- 动画组件 可以根据 name 进行配置
- transition-group -- 帮助多个元素进行过度 注意：每个元素必须拥有唯一的 key 值
- keep-alive -- 缓存组件 保留组件状态 避免重复渲染 实例方法 max 最多缓存多少个 include 只有组件名匹配的才进行缓存 exclude 名字匹配不进行缓存
- teleport -- 传送 拥有 to 属性 传送至那个 html 模板处
- component -- 动态组件渲染 通过 is 属性对应组件名称来进行渲染

### 插槽

1. 普通插槽
2. 具名插槽
   通过 name 属性配对插槽名字
3. 作用域插槽
   将子组件的数据通过在 slot 标签自定义属性传递到作用域
   父组件接受通过 v-slot 接受

### 组件通信

1. 父子通信
   通过 props 单向数据流进行通信 如需改变单向数据流 可以使用.sync vue3 中已经移除 使用 v-model:xx 语法
   子组件通过 emit 向父组件传递事件进行通信
2. 多层通信
   借助 vuex、bus 事件流进行通信
3. 兄弟通信
   通过上级组件交替通讯
   vuex
   vue.observable 创建一个响应式数据
   eventbus 通信

深入 vue

1. vnode

### v-model 实现原理

v-model 从本意上来理解就是 input 和 value 的一个语法糖

### vue 响应式原理

vue 响应式原理通过 definePrototype 订阅 data 属性，每当 data 属性进行改变时进行发布

vue2、vue3 的主要区别

- 分离出了 Composition Api
- 更友好的拥抱 TS
- 更爽的写法

vue3
setup 模式
jsx 语法更加友好
应用创建方式
css module
底层使用 proxy 而不是 definePrototype
