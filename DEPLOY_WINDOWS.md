# Windows Server 部署指南

## 一、准备工作

### 1. 远程连接服务器
1. 在本地电脑按 `Win + R`，输入 `mstsc`，回车
2. 输入服务器 IP：`120.55.2.164`
3. 输入用户名：`root`，密码：`liuyunchaoA2026!`

### 2. 下载必要软件

在服务器上打开浏览器下载：

| 软件 | 下载地址 |
|------|---------|
| Node.js v18+ | https://nodejs.org/zh-cn/download/ （选择 Windows 64位 .msi） |
| Nginx | http://nginx.org/en/download.html （选择 Stable version → nginx/Windows） |
| PM2 | 通过 npm 安装 |

---

## 二、安装步骤

### 步骤 1：安装 Node.js

1. 双击下载的 `node-v18.x.x-x64.msi`
2. 一路点击 Next 完成安装
3. 打开 PowerShell，验证安装：
   ```powershell
   node -v
   npm -v
   ```

### 步骤 2：安装 PM2

```powershell
npm install -g pm2
npm install -g pm2-windows-startup
pm2-startup install
```

### 步骤 3：创建项目目录

```powershell
mkdir C:\www\property
mkdir C:\www\property\web
mkdir C:\www\property\server
mkdir C:\www\property\logs
```

---

## 三、上传项目文件

### 方式 1：直接下载部署包

在服务器浏览器中，将 `property-deploy.tar.gz` 解压后上传到 `C:\www\property\`

### 方式 2：使用远程桌面复制

1. 远程桌面连接服务器
2. 在本地找到项目文件
3. 复制粘贴到服务器（远程桌面支持剪贴板共享）

### 需要上传的文件：

```
C:\www\property\
├── web\           # 前端静态文件（dist-web 目录内容）
│   ├── index.html
│   ├── js\
│   ├── css\
│   └── static\
├── server\        # 后端文件
│   ├── dist\
│   └── package.json
└── ecosystem.config.js
```

---

## 四、启动后端服务

```powershell
cd C:\www\property\server
npm install --production

# 启动服务
cd C:\www\property
pm2 start ecosystem.config.js

# 保存 PM2 进程列表
pm2 save
```

---

## 五、配置 Nginx

### 1. 解压 Nginx

将下载的 `nginx-x.x.x.zip` 解压到 `C:\nginx`

### 2. 修改配置文件

编辑 `C:\nginx\conf\nginx.conf`：

```nginx
worker_processes  1;

events {
    worker_connections  1024;
}

http {
    include       mime.types;
    default_type  application/octet-stream;
    sendfile        on;
    keepalive_timeout  65;

    server {
        listen       80;
        server_name  120.55.2.164;

        # 前端静态文件
        location / {
            root   C:/www/property/web;
            index  index.html;
            try_files $uri $uri/ /index.html;
        }

        # API 代理
        location /api {
            proxy_pass http://127.0.0.1:3000;
            proxy_http_version 1.1;
            proxy_set_header Upgrade $http_upgrade;
            proxy_set_header Connection 'upgrade';
            proxy_set_header Host $host;
            proxy_cache_bypass $http_upgrade;
            proxy_set_header X-Real-IP $remote_addr;
        }
    }
}
```

### 3. 启动 Nginx

```powershell
cd C:\nginx
start nginx
```

### 4. Nginx 常用命令

```powershell
# 检查配置
nginx -t

# 重新加载配置
nginx -s reload

# 停止
nginx -s stop
```

---

## 六、配置防火墙

### 打开 PowerShell（管理员）

```powershell
# 开放 80 端口（HTTP）
netsh advfirewall firewall add rule name="HTTP" dir=in action=allow protocol=TCP localport=80

# 开放 443 端口（HTTPS）
netsh advfirewall firewall add rule name="HTTPS" dir=in action=allow protocol=TCP localport=443

# 开放 3000 端口（后端调试用，生产环境可不开放）
netsh advfirewall firewall add rule name="Node.js" dir=in action=allow protocol=TCP localport=3000
```

---

## 七、设置开机自启

### 1. PM2 开机自启（已安装 pm2-windows-startup）

```powershell
pm2 save
pm2-startup install
```

### 2. Nginx 开机自启

**方式 A：使用任务计划程序**

1. 按 `Win + R`，输入 `taskschd.msc`
2. 创建基本任务
3. 名称：`Nginx Auto Start`
4. 触发器：`计算机启动时`
5. 操作：`启动程序`
6. 程序：`C:\nginx\nginx.exe`

**方式 B：创建启动脚本**

创建 `C:\www\start-all.bat`：

```batch
@echo off
cd C:\nginx
start nginx
cd C:\www\property
pm2 resurrect
```

---

## 八、访问地址

部署完成后，通过浏览器访问：

| 页面 | 地址 |
|------|------|
| 业主端首页 | `http://120.55.2.164/` |
| 后台登录页 | `http://120.55.2.164/#/pages/admin/login/index` |
| 登录账号 | `admin` / `admin123` |

---

## 九、常见问题

### Q1: 访问显示 502 Bad Gateway
- 检查后端服务是否启动：`pm2 list`
- 检查 3000 端口是否被占用：`netstat -ano | findstr 3000`

### Q2: 访问显示空白页
- 检查 Nginx 配置的文件路径是否正确
- 检查 `C:\www\property\web\index.html` 是否存在

### Q3: API 请求失败
- 检查防火墙是否开放端口
- 检查后端服务是否正常运行

---

## 十、快速部署命令汇总

```powershell
# 安装 Node.js 后执行
npm install -g pm2 pm2-windows-startup

# 创建目录
mkdir C:\www\property\web, C:\www\property\server, C:\www\property\logs

# 上传文件后执行
cd C:\www\property\server
npm install --production
cd C:\www\property
pm2 start ecosystem.config.js
pm2 save

# 启动 Nginx
cd C:\nginx
start nginx

# 配置防火墙
netsh advfirewall firewall add rule name="HTTP" dir=in action=allow protocol=TCP localport=80
```
