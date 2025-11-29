Write-Host "🧪 Running tests..." -ForegroundColor Green

# Test backend
Write-Host "Testing backend..." -ForegroundColor Cyan
Set-Location backend
npm test --if-present
Set-Location ..

# Test dashboard
Write-Host "Testing dashboard..." -ForegroundColor Cyan
Set-Location dashboard
npm test --if-present
Set-Location ..

# Test portfolio
Write-Host "Testing portfolio..." -ForegroundColor Cyan
Set-Location portfolio
npm test --if-present
Set-Location ..

Write-Host "✅ All tests complete!" -ForegroundColor Green
