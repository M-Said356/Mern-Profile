Write-Host "🚀 Setting up MERN Portfolio Project..." -ForegroundColor Green

# Install backend dependencies
Write-Host "📦 Installing backend dependencies..." -ForegroundColor Cyan
Set-Location backend
npm install
Set-Location ..

# Install dashboard dependencies
Write-Host "📦 Installing dashboard dependencies..." -ForegroundColor Cyan
Set-Location dashboard
npm install
Set-Location ..

# Install portfolio dependencies
Write-Host "📦 Installing portfolio dependencies..." -ForegroundColor Cyan
Set-Location portfolio
npm install
Set-Location ..

Write-Host "✅ Setup complete! All dependencies installed." -ForegroundColor Green
Write-Host ""
Write-Host "Next steps:" -ForegroundColor Yellow
Write-Host "1. Configure environment variables in backend/.env"
Write-Host "2. Run 'npm run dev' in each folder to start development servers"
