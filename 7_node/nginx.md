#### 前言

> 最近不是心血来潮，想玩一下后台服务，从 nodejs 开始，当然这些都不重要，因为这都不是我写这篇文章的目的，我写这篇文章主要是想记录我第一次配置 nginx 辛酸。太难了 QAQ...

第一步下载 nginx

```sh
sudo apt-get install nginx

cd /etc/nginx/conf.d
```

```sh
# copy 别人的配置
upstream ice {
        server 127.0.0.1:3000;

}
server {
        listen 80;
        server_name ice.qjnubk.club;
        location / {
        # 后端的Web服务器可以通过X-Forwarded-For获取用户真实IP
        proxy_next_upstream error timeout invalid_header http_500 http_502 http_503 http_504;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header Host $http_host;
        proxy_set_header X_Nginx_Proxy true;
        proxy_pass http://ice;
        proxy_redirect off;
        }
}

```

<!-- ![image-20220331212159682](C:\Users\86155\AppData\Roaming\Typora\typora-user-images\image-20220331212159682.png) -->

我们的 nginx 配置也可以在这文件下进行配置

当然我们还有终极大招就是在线配置网站 [nginx 配置](https://www.digitalocean.com/community/tools/nginx?domains.0.server.domain=liujunwei.club&domains.0.server.wwwSubdomain=true&domains.0.https.https=false&domains.0.php.php=false&domains.0.reverseProxy.reverseProxy=true&domains.0.routing.root=false&domains.0.logging.accessLog=true&global.app.lang=zhCN)

接下来就是我的一路踩坑

如果 nginx 访问不了请做以下检查

1. 检查 server_name proxy_pass 是否正确
2. 检查 阿里云安全组是否开启 80 端口
3. 查看 nginx 是否启动 netstat -tlnp （我就是被这个害了一天时间）

nginx 常用命令

**1.停止 Nginx 服务的四种方法**

- 从容停止服务
  这种方法较 stop 相比就比较温和一些了，需要进程完成当前工作后再停止。

```sh
nginx -s quit
```

- 立即停止服务
  这种方法比较强硬，无论进程是否在工作，都直接停止进程。

```sh
nginx -s stop
```

- systemctl 停止

```sh
systemctl属于Linux命令
systemctl stop nginx.service
```

- killall 方法杀死进程
  直接杀死进程，在上面无效的情况下使用，态度强硬，简单粗暴！

```sh
killall nginx
```

**2.启动 Nginx**

- nginx 直接启动

```sh
nginx
```

- systemctl 命令启动

```sh
systemctl start nginx.service
```

**3.查看启动后记录**

```sh
ps aux | grep nginx
```

**4.重启 Nginx 服务**

```sh
systemctl restart nginx.service
```

**5.重新载入配置文件**

当有系统配置文件有修改，用此命令，建议不要停止再重启，以防报错！

```sh
nginx -s reload
```

**6.查看端口号**

```sh
netstat -tlnp
```
