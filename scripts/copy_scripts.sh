#!/bin/bash
# Script to copy updated game scripts from output directory

set -e

RED='\033[0;31m'
GREEN='\033[0;32m'
BLUE='\033[0;34m'
NC='\033[0m'

PROJECT_ROOT="$( cd "$( dirname "${BASH_SOURCE[0]}" )/.." && pwd )"
SCRIPTS_SOURCE="/Users/jordantian/Documents/hacknation/output/one_night_four_friends/scripts"
GAME_SCENE_DIR="$PROJECT_ROOT/game/scene"
WEBGAL_PUBLIC="$PROJECT_ROOT/WebGAL/packages/webgal/public/game/scene"

echo -e "${BLUE}Copying game scripts...${NC}"

if [ ! -d "$SCRIPTS_SOURCE" ]; then
    echo -e "${RED}✗ Source directory not found: $SCRIPTS_SOURCE${NC}"
    exit 1
fi

# Copy to game directory
echo "Copying to: $GAME_SCENE_DIR"
cp -v "$SCRIPTS_SOURCE"/*.txt "$GAME_SCENE_DIR/" 2>/dev/null || {
    echo -e "${RED}✗ No .txt files found in source${NC}"
    exit 1
}

# Copy to WebGAL public directory if it exists
if [ -d "$WEBGAL_PUBLIC" ]; then
    echo "Copying to: $WEBGAL_PUBLIC"
    cp -v "$SCRIPTS_SOURCE"/*.txt "$WEBGAL_PUBLIC/" 2>/dev/null
fi

echo -e "${GREEN}✓ Scripts copied successfully${NC}"
echo "Files copied:"
ls -1 "$GAME_SCENE_DIR"/*.txt | xargs -n1 basename
