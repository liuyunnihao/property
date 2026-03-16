#!/bin/bash

# 物业管理系统 - 一键部署打包脚本
# 使用方法: ./deploy-pack.sh

set -e

echo "=========================================="
echo "  物业管理系统 - 部署打包"
echo "=========================================="

# 创建临时目录
PACK_DIR="property-deploy"
rm -rf $PACK_DIR
mkdir -p $PACK_DIR/web
mkdir -p $PACK_DIR/server
mkdir -p $PACK_DIR/logs

echo ""
echo "1. 复制前端文件..."
cp -r dist-web/* $PACK_DIR/web/
echo "   ✓ 前端文件已复制"

echo ""
echo "2. 复制后端文件..."
cp -r server/dist $PACK_DIR/server/
cp server/package.json $PACK_DIR/server/
cp server/package-lock.json $PACK_DIR/server/ 2>/dev/null || true
echo "   ✓ 后端文件已复制"

echo ""
echo "3. 复制配置文件..."
cp ecosystem.config.js $PACK_DIR/
cp DEPLOY.md $PACK_DIR/
echo "   ✓ 配置文件已复制"

echo ""
echo "4. 创建启动脚本..."
cat > $PACK_DIR/start.sh << 'EOF'
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
EOF

chmod +x $PACK_DIR/start.sh
echo "   ✓ 启动脚本已创建"

echo ""
echo "5. 打包..."
tar -czvf property-deploy.tar.gz $PACK_DIR
echo "   ✓ 打包完成"

echo ""
echo "=========================================="
echo "  打包完成!"
echo "=========================================="
echo ""
echo "部署包: property-deploy.tar.gz"
echo "文件大小: $(du -h property-deploy.tar.gz | cut -f1)"
echo ""
echo "部署步骤:"
echo "1. 上传 property-deploy.tar.gz 到服务器"
echo "2. 解压: tar -xzvf property-deploy.tar.gz"
echo "3. 进入目录: cd property-deploy"
echo "4. 运行: ./start.sh"
echo ""
echo "详细说明请查看 DEPLOY.md"
echo ""
