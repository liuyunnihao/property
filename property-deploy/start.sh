#!/bin/bash

echo "启动物业管理系统..."

# 进入后端目录并安装依赖
cd server
npm install --production

# 返回根目录
cd ..

# 使用 PM2 启动
pm2 start ecosystem.config.js

echo "服务已启动!"
echo "请确保 Nginx 已正确配置"
