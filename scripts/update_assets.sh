#!/bin/bash
# Script to regenerate placeholder assets and copy to WebGAL

set -e

GREEN='\033[0;32m'
BLUE='\033[0;34m'
NC='\033[0m'

PROJECT_ROOT="$( cd "$( dirname "${BASH_SOURCE[0]}" )/.." && pwd )"
WEBGAL_PUBLIC="$PROJECT_ROOT/WebGAL/packages/webgal/public/game"

echo -e "${BLUE}Regenerating placeholder assets...${NC}"

# Generate placeholders
cd "$PROJECT_ROOT"
python3 scripts/generate_placeholders.py

# Copy to WebGAL if directory exists
if [ -d "$WEBGAL_PUBLIC" ]; then
    echo -e "${BLUE}Copying assets to WebGAL...${NC}"
    cp -R "$PROJECT_ROOT/game/background" "$WEBGAL_PUBLIC/"
    cp -R "$PROJECT_ROOT/game/figure" "$WEBGAL_PUBLIC/"
    echo -e "${GREEN}✓ Assets copied to WebGAL${NC}"
fi

echo -e "${GREEN}✓ Assets updated successfully${NC}"
