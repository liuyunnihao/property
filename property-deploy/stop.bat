@echo off
chcp 65001 >nul
echo 停止所有服务...
pm2 stop all
pm2 save
echo 服务已停止
pause
