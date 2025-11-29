#!/bin/bash

echo "🧪 Running tests..."

# Test backend
echo "Testing backend..."
cd backend && npm test --if-present
cd ..

# Test dashboard
echo "Testing dashboard..."
cd dashboard && npm test --if-present
cd ..

# Test portfolio
echo "Testing portfolio..."
cd portfolio && npm test --if-present
cd ..

echo "✅ All tests complete!"
