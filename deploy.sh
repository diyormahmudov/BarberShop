#!/bin/bash

# Deployment script for BarberFull project to server 89.108.71.89

SERVER="root@89.108.71.89"
REMOTE_PATH="/var/www/barber"
LOCAL_PATH="/Users/a111/Desktop/BarberFull"

echo "Starting deployment to $SERVER:$REMOTE_PATH..."

# Build locally first
echo "Building backend locally..."
cd $LOCAL_PATH/Backend
npm ci --legacy-peer-deps
npm run build

echo "Building frontend locally (static export)..."
cd $LOCAL_PATH/Frontend/nextjs-frontend
npm ci --legacy-peer-deps
npm run build

# Create remote directory structure
ssh $SERVER "mkdir -p $REMOTE_PATH/Backend $REMOTE_PATH/Frontend"

# Copy backend files with dist and node_modules
echo "Copying backend files..."
rsync -avz --exclude '.git' \
  $LOCAL_PATH/Backend/ $SERVER:$REMOTE_PATH/Backend/

# Copy frontend out directory (static export)
echo "Copying frontend static files..."
ssh $SERVER "rm -rf $REMOTE_PATH/Frontend/out"
rsync -avz $LOCAL_PATH/Frontend/nextjs-frontend/out/ $SERVER:$REMOTE_PATH/Frontend/out/

# Stop existing backend process
echo "Stopping existing backend..."
ssh $SERVER "pkill -f 'node dist/src/main' || true"

# Start backend with pm2
echo "Starting backend with pm2..."
ssh $SERVER "cd $REMOTE_PATH/Backend && npx pm2 delete barber-backend || true"
ssh $SERVER "cd $REMOTE_PATH/Backend && npx pm2 start ecosystem.config.js"
ssh $SERVER "npx pm2 save"

# Setup nginx for frontend
echo "Setting up nginx for frontend..."
ssh $SERVER "apt-get update -qq && apt-get install -y nginx"
ssh $SERVER "rm -rf /var/www/html && ln -sf $REMOTE_PATH/Frontend/out /var/www/html"
ssh $SERVER "systemctl restart nginx"

echo "Deployment completed!"
echo "Frontend: http://89.108.71.89"
echo "Backend: http://89.108.71.89:3001"
