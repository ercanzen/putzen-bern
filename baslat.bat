@echo off
cd /d "%~dp0"
start http://127.0.0.1:3001
npm run dev -- --host 0.0.0.0 --port 3001
pause
