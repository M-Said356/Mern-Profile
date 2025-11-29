Write-Host "🚀 Deploying MERN Portfolio..." -ForegroundColor Green

# Build projects
& .\scripts\build.ps1

# Deploy using docker-compose
Write-Host "🐳 Starting Docker containers..." -ForegroundColor Cyan
Set-Location .devops
docker-compose up -d --build
Set-Location ..

Write-Host "✅ Deployment complete!" -ForegroundColor Green
Write-Host "Backend: http://localhost:4000" -ForegroundColor Yellow
Write-Host "Dashboard: http://localhost:3001" -ForegroundColor Yellow
Write-Host "Portfolio: http://localhost:3000" -ForegroundColor Yellow
