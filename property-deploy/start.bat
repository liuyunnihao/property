@echo off
chcp 65001 >nul
echo ==========================================
echo   物业管理系统 - Windows 启动脚本
echo ==========================================
echo.

cd /d "%~dp0"

echo [1/3] 检查 Node.js...
node -v >nul 2>&1
if errorlevel 1 (
    echo [错误] 未安装 Node.js，请先安装 Node.js v18+
    pause
    exit /b 1
)
echo       Node.js 已安装

echo.
echo [2/3] 安装后端依赖...
cd server
call npm install --production
if errorlevel 1 (
    echo [错误] 依赖安装失败
    pause
    exit /b 1
)
cd ..
echo       依赖安装完成

echo.
echo [3/3] 启动服务...
pm2 start ecosystem.config.js
pm2 save

echo.
echo ==========================================
echo   启动完成！
echo ==========================================
echo.
echo 后端服务: http://localhost:3000
echo.
echo 请确保 Nginx 已配置并启动
echo 前端访问: http://localhost/
echo 后台登录: http://localhost/#/pages/admin/login/index
echo 账号: admin / admin123
echo.
pause
