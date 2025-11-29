Write-Host "🚀 Deploying MERN Portfolio to Vercel..." -ForegroundColor Green
Write-Host ""

# Check if Vercel CLI is installed
$vercelVersion = vercel --version 2>$null
if (-not $vercelVersion) {
    Write-Host "❌ Vercel CLI not found. Installing..." -ForegroundColor Red
    npm install -g vercel
}

Write-Host "✅ Vercel CLI version: $vercelVersion" -ForegroundColor Green
Write-Host ""

# Login to Vercel
Write-Host "🔐 Logging in to Vercel..." -ForegroundColor Cyan
Write-Host "Please follow the browser prompts to authenticate." -ForegroundColor Yellow
vercel login

Write-Host ""
Write-Host "📦 Choose what to deploy:" -ForegroundColor Cyan
Write-Host "1. Portfolio (Frontend)" -ForegroundColor White
Write-Host "2. Dashboard (Admin Panel)" -ForegroundColor White
Write-Host "3. Backend (API)" -ForegroundColor White
Write-Host "4. All (Deploy everything)" -ForegroundColor White
Write-Host ""

$choice = Read-Host "Enter your choice (1-4)"

switch ($choice) {
    "1" {
        Write-Host ""
        Write-Host "🎨 Deploying Portfolio..." -ForegroundColor Green
        Set-Location portfolio
        vercel --prod
        Set-Location ..
    }
    "2" {
        Write-Host ""
        Write-Host "🎛️ Deploying Dashboard..." -ForegroundColor Green
        Set-Location dashboard
        vercel --prod
        Set-Location ..
    }
    "3" {
        Write-Host ""
        Write-Host "🔌 Deploying Backend..." -ForegroundColor Green
        Write-Host "⚠️  Note: Vercel has limitations for backend deployments." -ForegroundColor Yellow
        Write-Host "Consider using Railway or Render for better backend support." -ForegroundColor Yellow
        Write-Host ""
        $confirm = Read-Host "Continue with Vercel backend deployment? (y/n)"
        if ($confirm -eq "y") {
            vercel --prod
        }
    }
    "4" {
        Write-Host ""
        Write-Host "🚀 Deploying all applications..." -ForegroundColor Green
        
        Write-Host ""
        Write-Host "1/3 - Deploying Portfolio..." -ForegroundColor Cyan
        Set-Location portfolio
        vercel --prod
        Set-Location ..
        
        Write-Host ""
        Write-Host "2/3 - Deploying Dashboard..." -ForegroundColor Cyan
        Set-Location dashboard
        vercel --prod
        Set-Location ..
        
        Write-Host ""
        Write-Host "3/3 - Deploying Backend..." -ForegroundColor Cyan
        Write-Host "⚠️  Note: Consider Railway or Render for backend." -ForegroundColor Yellow
        vercel --prod
    }
    default {
        Write-Host "❌ Invalid choice. Exiting..." -ForegroundColor Red
        exit 1
    }
}

Write-Host ""
Write-Host "✅ Deployment complete!" -ForegroundColor Green
Write-Host ""
Write-Host "📝 Next steps:" -ForegroundColor Yellow
Write-Host "1. Configure environment variables in Vercel Dashboard"
Write-Host "2. Test your deployed applications"
Write-Host "3. Set up custom domains (optional)"
Write-Host ""
Write-Host "For detailed instructions, see DEPLOYMENT_GUIDE.md" -ForegroundColor Cyan
