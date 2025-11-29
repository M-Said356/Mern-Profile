Write-Host "🏗️  Building all projects..." -ForegroundColor Green

# Build dashboard
Write-Host "📦 Building dashboard..." -ForegroundColor Cyan
Set-Location dashboard
npm run build
Set-Location ..

# Build portfolio
Write-Host "📦 Building portfolio..." -ForegroundColor Cyan
Set-Location portfolio
npm run build
Set-Location ..

Write-Host "✅ Build complete!" -ForegroundColor Green
