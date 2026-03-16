# 外网访问配置指南

由于服务器网络环境限制，需要在你的本地电脑上配置内网穿透。

## 方案一：使用 ngrok（推荐）

### 步骤 1：注册 ngrok 账号
访问 https://ngrok.com 注册免费账号，获取 authtoken

### 步骤 2：下载并安装 ngrok
```bash
# Mac
brew install ngrok

# Windows
# 下载 https://ngrok.com/download

# Linux
wget https://bin.equinox.io/c/bNyj1mQVY4c/ngrok-v3-stable-linux-amd64.tgz
tar -xvzf ngrok-v3-stable-linux-amd64.tgz
```

### 步骤 3：配置 authtoken
```bash
ngrok config add-authtoken <你的authtoken>
```

### 步骤 4：启动隧道

**方式 A - 端口转发（需要在服务器运行）**
```bash
# 先 SSH 到服务器，然后运行
ngrok http 5000  # 前端
ngrok http 3000  # 后端
```

**方式 B - 本地转发**
```bash
# 在本地电脑运行，通过 SSH 隧道转发
ssh -L 5000:localhost:5000 -L 3000:localhost:3000 user@服务器IP
ngrok http 5000
```

---

## 方案二：使用 Cloudflare Tunnel（免费，稳定）

### 步骤 1：安装 cloudflared
```bash
# Mac
brew install cloudflare/cloudflare/cloudflared

# Windows
# 下载 https://developers.cloudflare.com/cloudflare-one/connections/connect-networks/downloads/

# Linux
wget https://github.com/cloudflare/cloudflared/releases/latest/download/cloudflared-linux-amd64
chmod +x cloudflared
```

### 步骤 2：启动快速隧道（无需注册）
```bash
# 前端隧道
cloudflared tunnel --url http://localhost:5000

# 后端隧道（另一个终端）
cloudflared tunnel --url http://localhost:3000
```

终端会显示类似：
```
Your quick Tunnel has been created! Visit it at:
https://xxx-xxx-xxx.trycloudflare.com
```

---

## 方案三：使用 localtunnel（免费，简单）

### 步骤 1：安装
```bash
npm install -g localtunnel
```

### 步骤 2：启动
```bash
# 前端
lt --port 5000

# 后端
lt --port 3000
```

---

## 方案四：使用 SSH 端口转发（最简单）

如果你有公网服务器或 VPS：

```bash
# 在服务器上运行
ssh -R 5000:localhost:5000 -R 3000:localhost:3000 user@你的公网服务器IP
```

---

## 推荐方案

| 方案 | 优点 | 缺点 | 推荐场景 |
|------|------|------|----------|
| **ngrok** | 稳定、功能全 | 免费版有限制 | 正式开发测试 |
| **Cloudflare** | 免费、快速、稳定 | 需要安装客户端 | 长期使用 |
| **localtunnel** | 最简单 | 不够稳定 | 临时测试 |

## 访问地址

配置成功后，你将获得外网访问地址：

- **前端**：`https://xxx.ngrok.io` 或 `https://xxx.trycloudflare.com`
- **后端**：`https://xxx.ngrok.io/api/*`

## 注意事项

1. 免费的内网穿透服务可能有带宽限制
2. 每次重启隧道，URL 可能会变化
3. 如需固定域名，可以使用 ngrok 付费版或 Cloudflare Tunnel 配置自定义域名
