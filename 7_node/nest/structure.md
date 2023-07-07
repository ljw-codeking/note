## Nest 笔记

> 没事学一学后台》想要扎实的学好一门技术，那是是要做到想的到，写的出，说的透，记笔记吧，好记性不如烂笔头
>
> ![img](https://img-blog.csdnimg.cn/2020011414381332.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2x4eTg2OTcxODA2OQ==,size_16,color_FFFFFF,t_70)

### Nest 介绍

Nest.js 是一个后台 Node 框架，可以说是跟 spring 相差无几，它对 express 的 http 做了一层封装，解决了架构问题。它提供了 express 里面没有的 MVC、IOC、AOP 架构特性，使得代码容易维护、扩展

![Nest.js 的 AOP 架构的好处，你感受到了么？](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/8ba5dd3d01fa4674a343f26cc8a98e69~tplv-k3u1fbpfcp-zoom-crop-mark:1304:1304:1304:734.awebp?)

### MVC、IOC、AOP

请求 → Controller → Service → Repository

MVC 架构：

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/9911c44a21d949e6824122c41a0d6bbe~tplv-k3u1fbpfcp-zoom-in-crop-mark:1304:0:0:0.awebp?)

Nest 提供了 @Controller 装饰器声明 Controller

而 Service 会用 @Injecttable 装饰器声明

通过 @Controller、@Injectable 装饰器声明的 class 会被 Nest.js 扫描，创建对应的对象并加到一个容器里，这些所有的对象会根据构造器里声明的依赖自动注入，也就是 DI（dependency inject），这种思想叫做 IOC（Inverse Of Control）。

**IOC 的架构的好处是不需要动手创建对象和根据 ----------------- 抄的暂时不理解**

#### AOC

此外，Nest.js 还提供了 AOP （Aspect Oriented Programming）的能力，也就是面向切面编程的能力：

一个请求过来，可能会经过 Controller（控制器）、Service（服务）、Repository（数据库访问） 的逻辑：

![img](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/98095ad993dd484b9c4059e386cc0fb0~tplv-k3u1fbpfcp-zoom-in-crop-mark:1304:0:0:0.awebp?)

请求链路的逻辑拦截叫做 AOP 对于前端来将就是生命周期，那个阶段该拦截做哪些事情

**AOP 的好处是可以把一些通用逻辑分离到切面中，保持业务逻辑的存粹性，这样切面逻辑可以复用，还可以动态的增删**

其实 Express 的中间件的洋葱模型也是一种 AOP 的实现，因为你可以透明的在外面包一层，加入一些逻辑，内层感知不到。

而 Nestjs 中实现 AOP 的方式更多，一共有五种，包括 Middleware、Guard、Pipe、Interceptor、ExceptionFilter

#### 中间件 Middleware

```javascript
// 全局中间件
app.user(logger);

// 路由中间件
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    // forRoutes({ path: 'ab*cd', method: RequestMethod.ALL });
    consumer.apply(LoggerMiddleware).forRoutes("*"); // 注入
  }
}

// 中间件 洋葱模型
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    console.log("Request...");
    next();
    console.log("Request...2");
  }
}
```

#### Guard

Gurard 是路由守卫的意思，可以用于在调用某个 Controller 之前判断权限，返回 true 或者 false 来决定是否放行

```javascript
// 定义守卫
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    return false;
  }
}


// 全局守卫 app.module.ts
import { APP_GUARD } from '@nestjs/core'
providers: [
    {
        provider：APP_GUARD，
       	useClass: guard
    }
]

// 控制器守卫 以及 路由守卫
@Controller('user')
@UseGuards(guard)
export class UserController {
	@Get()
    @UseGuards(guard)
    index() {return 'xxx'}
}

// 执行顺序   全局 → 控制器 → 路由

// 有时候有些路由我们可能不需要对其进行校验  这个时候就需要用到我们的 反射器 了
import { Reflector } from '@nestjs/core';
constructor(private readonly reflector: Reflector) {}
@SetMetadata('roles', ['admin'])
const roles = this.reflector.get<string[]>('roles', context.getHandler());
```

Guard 可以抽离路由的访问控制逻辑，但是不能对请求、响应做修改、这种逻辑可以使用 interceptor；

#### Interceptor

拦截器可以在目标 Controller 方法前后加入一些逻辑处理

```javascript
@Injectable()
export class RequestInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    console.log("Before...");

    const now = Date.now();
    return next
      .handle()
      .pipe(tap(() => console.log(`After... ${Date.now() - now}ms`)));
  }
}
```

除了路由的控制权限 目标 Controller 之前之后的处理这些都是通用逻辑外，对参数处理也是一个通用的逻辑，所以 Nest 也抽离出了对应的切片面，也就是 Pipe

#### Pipe

这个没什么可说的就是对参数进行处理

#### ExceptionFilter

> 全局错误拦截

ExceptionFiter 可以对抛出的异常做处理，返回对应的响应
