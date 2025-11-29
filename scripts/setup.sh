#!/bin/bash

echo "🚀 Setting up MERN Portfolio Project..."

# Install backend dependencies
echo "📦 Installing backend dependencies..."
cd backend && npm install
cd ..

# Install dashboard dependencies
echo "📦 Installing dashboard dependencies..."
cd dashboard && npm install
cd ..

# Install portfolio dependencies
echo "📦 Installing portfolio dependencies..."
cd portfolio && npm install
cd ..

echo "✅ Setup complete! All dependencies installed."
echo ""
echo "Next steps:"
echo "1. Configure environment variables in backend/.env"
echo "2. Run 'npm run dev' in each folder to start development servers"
