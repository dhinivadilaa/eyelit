#!/bin/bash

# Setup script for production deployment
echo "🚀 Setting up EyeLit for production..."

# Generate application key
echo "🔑 Generating application key..."
php artisan key:generate

# Run database migrations
echo "🗄️ Running database migrations..."
php artisan migrate --force

# Seed database (optional)
echo "🌱 Seeding database..."
php artisan db:seed --force

# Clear and cache config
echo "⚡ Caching configuration..."
php artisan config:cache
php artisan route:cache
php artisan view:cache

# Set storage permissions
echo "📁 Setting storage permissions..."
chmod -R 755 storage
chmod -R 755 bootstrap/cache

# Create symbolic link for storage
php artisan storage:link

echo "✅ Setup completed successfully!"
echo "🎉 Your EyeLit application is ready for production!"