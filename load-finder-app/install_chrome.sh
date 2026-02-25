#!/bin/bash
# Install Chrome and dependencies for Render.com (optimized for 512MB RAM)

echo "Installing Chrome and dependencies..."

# Update package list
apt-get update

# Install ONLY essential dependencies
apt-get install -y --no-install-recommends \
    wget \
    gnupg \
    ca-certificates \
    fonts-liberation \
    libasound2 \
    libatk-bridge2.0-0 \
    libatk1.0-0 \
    libatspi2.0-0 \
    libcups2 \
    libdbus-1-3 \
    libdrm2 \
    libgbm1 \
    libgtk-3-0 \
    libnspr4 \
    libnss3 \
    libwayland-client0 \
    libxcomposite1 \
    libxdamage1 \
    libxfixes3 \
    libxkbcommon0 \
    libxrandr2 \
    xdg-utils

# Download and install Chrome
wget -q https://dl.google.com/linux/direct/google-chrome-stable_current_amd64.deb
apt-get install -y --no-install-recommends ./google-chrome-stable_current_amd64.deb
rm google-chrome-stable_current_amd64.deb

# Clean up to save space
apt-get clean
rm -rf /var/lib/apt/lists/*

echo "Chrome installed successfully!"
google-chrome --version
