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

echo "Copying static assets for standalone mode..."
cp -r public .next/standalone/public
mkdir -p .next/standalone/.next
cp -r .next/static .next/standalone/.next/static
cp .env .next/standalone/.env

echo "Restarting PM2 process..."
pm2 restart nxted-ai

echo "Deployment complete!"
pm2 logs nxted-ai --lines 5
