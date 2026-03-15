#!/bin/bash
# nxtED AI Deployment Script
# Usage: bash deploy.sh

set -e

echo "Deploying nxtED AI..."
cd /var/www/nxted

echo "Installing dependencies..."
npm ci --production=false

echo "Running database migrations..."
npx prisma migrate deploy
npx prisma generate

echo "Building application..."
npm run build

echo "Restarting PM2 process..."
pm2 restart nxted

echo "Deployment complete!"
pm2 logs nxted --lines 5
