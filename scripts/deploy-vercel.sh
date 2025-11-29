#!/bin/bash

echo "🚀 Deploying MERN Portfolio to Vercel..."
echo ""

# Check if Vercel CLI is installed
if ! command -v vercel &> /dev/null; then
    echo "❌ Vercel CLI not found. Installing..."
    npm install -g vercel
fi

VERCEL_VERSION=$(vercel --version)
echo "✅ Vercel CLI version: $VERCEL_VERSION"
echo ""

# Login to Vercel
echo "🔐 Logging in to Vercel..."
echo "Please follow the browser prompts to authenticate."
vercel login

echo ""
echo "📦 Choose what to deploy:"
echo "1. Portfolio (Frontend)"
echo "2. Dashboard (Admin Panel)"
echo "3. Backend (API)"
echo "4. All (Deploy everything)"
echo ""

read -p "Enter your choice (1-4): " choice

case $choice in
    1)
        echo ""
        echo "🎨 Deploying Portfolio..."
        cd portfolio
        vercel --prod
        cd ..
        ;;
    2)
        echo ""
        echo "🎛️ Deploying Dashboard..."
        cd dashboard
        vercel --prod
        cd ..
        ;;
    3)
        echo ""
        echo "🔌 Deploying Backend..."
        echo "⚠️  Note: Vercel has limitations for backend deployments."
        echo "Consider using Railway or Render for better backend support."
        echo ""
        read -p "Continue with Vercel backend deployment? (y/n): " confirm
        if [ "$confirm" = "y" ]; then
            vercel --prod
        fi
        ;;
    4)
        echo ""
        echo "🚀 Deploying all applications..."
        
        echo ""
        echo "1/3 - Deploying Portfolio..."
        cd portfolio
        vercel --prod
        cd ..
        
        echo ""
        echo "2/3 - Deploying Dashboard..."
        cd dashboard
        vercel --prod
        cd ..
        
        echo ""
        echo "3/3 - Deploying Backend..."
        echo "⚠️  Note: Consider Railway or Render for backend."
        vercel --prod
        ;;
    *)
        echo "❌ Invalid choice. Exiting..."
        exit 1
        ;;
esac

echo ""
echo "✅ Deployment complete!"
echo ""
echo "📝 Next steps:"
echo "1. Configure environment variables in Vercel Dashboard"
echo "2. Test your deployed applications"
echo "3. Set up custom domains (optional)"
echo ""
echo "📖 For detailed instructions, see DEPLOYMENT_GUIDE.md"
