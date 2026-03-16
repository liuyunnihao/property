# 物业管理系统 - 云服务器部署指南

## 一、服务器要求

- 操作系统：Ubuntu 20.04+ / CentOS 7+
- 内存：至少 1GB
- Node.js：v18+
- 已安装：Nginx、PM2

## 二、本地打包

在项目根目录执行：

```bash
# 安装依赖
pnpm install

# 构建生产版本
pnpm build
```

构建完成后，以下目录需要上传到服务器：
- `dist-web/` - 前端静态文件
- `server/dist/` - 后端编译文件
- `server/package.json` - 后端依赖配置
- `ecosystem.config.js` - PM2 配置

## 三、服务器目录结构

```
/var/www/property/
├── web/           # 前端静态文件 (dist-web 内容)
├── server/        # 后端服务
│   ├── dist/
│   └── package.json
└── logs/          # 日志目录
```

## 四、部署步骤

### 1. 上传文件到服务器

```bash
# 在本地执行，替换 your-server-ip
scp -r dist-web/* root@your-server-ip:/var/www/property/web/
scp -r server/dist root@your-server-ip:/var/www/property/server/
scp server/package.json root@your-server-ip:/var/www/property/server/
scp ecosystem.config.js root@your-server-ip:/var/www/property/
```

### 2. 服务器安装依赖

```bash
ssh root@your-server-ip

cd /var/www/property/server
npm install --production
```

### 3. Nginx 配置

创建配置文件 `/etc/nginx/sites-available/property`:

```nginx
server {
    listen 80;
    server_name your-domain.com;  # 替换为你的域名或 IP

    # 前端静态文件
    location / {
        root /var/www/property/web;
        index index.html;
        try_files $uri $uri/ /index.html;
    }

    # API 代理到后端
    location /api {
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    }
}
```

启用配置：
```bash
ln -s /etc/nginx/sites-available/property /etc/nginx/sites-enabled/
nginx -t
systemctl reload nginx
```

### 4. PM2 启动后端

```bash
cd /var/www/property
pm2 start ecosystem.config.js
pm2 save
pm2 startup
```

## 五、常用命令

```bash
# 查看服务状态
pm2 status

# 查看日志
pm2 logs property-server

# 重启服务
pm2 restart property-server

# 重新加载 Nginx
systemctl reload nginx
```

## 六、访问地址

部署完成后，通过以下地址访问：

| 页面 | 地址 |
|------|------|
| 业主端首页 | `http://your-domain.com/` |
| 后台登录页 | `http://your-domain.com/#/pages/admin/login/index` |
| 后台账号 | `admin` / `admin123` |

## 七、HTTPS 配置（推荐）

使用 Let's Encrypt 免费证书：

```bash
# 安装 certbot
apt install certbot python3-certbot-nginx

# 申请证书
certbot --nginx -d your-domain.com

# 自动续期
certbot renew --dry-run
```

## 八、防火墙设置

```bash
# 开放 HTTP 和 HTTPS
ufw allow 80
ufw allow 443
ufw enable
```
