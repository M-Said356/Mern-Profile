#!/bin/bash

echo "🏗️  Building all projects..."

# Build dashboard
echo "📦 Building dashboard..."
cd dashboard && npm run build
cd ..

# Build portfolio
echo "📦 Building portfolio..."
cd portfolio && npm run build
cd ..

echo "✅ Build complete!"
