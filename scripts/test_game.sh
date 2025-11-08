#!/bin/bash
# Integration testing script for WebGAL game
# Validates scene files, syntax, and asset references

set -e

RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

PROJECT_ROOT="$( cd "$( dirname "${BASH_SOURCE[0]}" )/.." && pwd )"
GAME_DIR="$PROJECT_ROOT/game"
SCENE_DIR="$GAME_DIR/scene"
BACKGROUND_DIR="$GAME_DIR/background"
FIGURE_DIR="$GAME_DIR/figure"

ERRORS=0
WARNINGS=0

echo -e "${BLUE}========================================${NC}"
echo -e "${BLUE}  WebGAL Game Testing${NC}"
echo -e "${BLUE}========================================${NC}"
echo ""

# Test 1: Check if scene directory exists and has files
echo -e "${YELLOW}[1/6]${NC} Checking scene files..."

if [ ! -d "$SCENE_DIR" ]; then
    echo -e "${RED}✗ Scene directory not found: $SCENE_DIR${NC}"
    ERRORS=$((ERRORS + 1))
else
    SCENE_COUNT=$(find "$SCENE_DIR" -name "*.txt" | wc -l | tr -d ' ')
    if [ "$SCENE_COUNT" -eq 0 ]; then
        echo -e "${RED}✗ No scene files (.txt) found${NC}"
        ERRORS=$((ERRORS + 1))
    else
        echo -e "${GREEN}✓ Found $SCENE_COUNT scene file(s)${NC}"
        echo "  Scene files:"
        ls -1 "$SCENE_DIR"/*.txt 2>/dev/null | xargs -n1 basename | sed 's/^/    - /'
    fi
fi
echo ""

# Test 2: Check for start.txt entry point
echo -e "${YELLOW}[2/6]${NC} Checking entry point..."

if [ ! -f "$SCENE_DIR/start.txt" ]; then
    echo -e "${YELLOW}⚠ start.txt not found (WebGAL may not load properly)${NC}"
    WARNINGS=$((WARNINGS + 1))
else
    echo -e "${GREEN}✓ start.txt exists${NC}"
fi
echo ""

# Test 3: Validate scene syntax (basic checks)
echo -e "${YELLOW}[3/6]${NC} Validating scene syntax..."

if [ -d "$SCENE_DIR" ]; then
    for scene_file in "$SCENE_DIR"/*.txt; do
        if [ -f "$scene_file" ]; then
            filename=$(basename "$scene_file")

            # Check for unclosed quotes
            if grep -nE '"[^"]*$|^[^"]*"[^"]*"[^"]*"[^"]*$' "$scene_file" > /dev/null 2>&1; then
                echo -e "${YELLOW}⚠ $filename: Potential unclosed quotes detected${NC}"
                WARNINGS=$((WARNINGS + 1))
            fi

            # Check for empty file
            if [ ! -s "$scene_file" ]; then
                echo -e "${RED}✗ $filename: File is empty${NC}"
                ERRORS=$((ERRORS + 1))
            fi

            # Check for basic label format (label:name;)
            if ! grep -q "^[a-zA-Z_][a-zA-Z0-9_]*:" "$scene_file" && ! grep -q "^label:" "$scene_file"; then
                echo -e "${YELLOW}⚠ $filename: No labels found (may be intentional)${NC}"
                WARNINGS=$((WARNINGS + 1))
            fi
        fi
    done
    echo -e "${GREEN}✓ Basic syntax validation complete${NC}"
fi
echo ""

# Test 4: Check asset references
echo -e "${YELLOW}[4/6]${NC} Checking asset references..."

MISSING_ASSETS=0

# Extract all background references
if [ -d "$SCENE_DIR" ]; then
    while IFS= read -r bg_asset; do
        if [ ! -f "$BACKGROUND_DIR/$bg_asset" ] && [ ! -f "$BACKGROUND_DIR/${bg_asset%.png}.svg" ]; then
            echo -e "${YELLOW}⚠ Missing background: $bg_asset${NC}"
            MISSING_ASSETS=$((MISSING_ASSETS + 1))
        fi
    done < <(grep -hE "bg:[a-zA-Z0-9_.-]+" "$SCENE_DIR"/*.txt 2>/dev/null | sed -E 's/.*bg:([a-zA-Z0-9_.-]+).*/\1/' | sort -u)

    # Extract all figure/character references
    while IFS= read -r fig_asset; do
        if [ ! -f "$FIGURE_DIR/$fig_asset" ] && [ ! -f "$FIGURE_DIR/${fig_asset%.png}.svg" ]; then
            echo -e "${YELLOW}⚠ Missing figure: $fig_asset${NC}"
            MISSING_ASSETS=$((MISSING_ASSETS + 1))
        fi
    done < <(grep -hE "show:[a-zA-Z0-9_.-]+" "$SCENE_DIR"/*.txt 2>/dev/null | sed -E 's/.*show:([a-zA-Z0-9_.-]+).*/\1/' | sort -u)
fi

if [ "$MISSING_ASSETS" -eq 0 ]; then
    echo -e "${GREEN}✓ All referenced assets exist${NC}"
else
    echo -e "${YELLOW}⚠ $MISSING_ASSETS asset(s) missing (placeholders may be needed)${NC}"
    WARNINGS=$((WARNINGS + MISSING_ASSETS))
fi
echo ""

# Test 5: Check for label references and validate jumps
echo -e "${YELLOW}[5/6]${NC} Validating label references..."

if [ -d "$SCENE_DIR" ]; then
    # Extract all labels defined
    DEFINED_LABELS=$(grep -hE "^[a-zA-Z_][a-zA-Z0-9_]*:|^label:[a-zA-Z_][a-zA-Z0-9_]*;" "$SCENE_DIR"/*.txt 2>/dev/null | sed -E 's/^label://; s/:.*//; s/;//' | sort -u)

    # Extract all jump references
    JUMP_REFS=$(grep -hE "jump:[a-zA-Z_][a-zA-Z0-9_]*" "$SCENE_DIR"/*.txt 2>/dev/null | sed -E 's/.*jump:([a-zA-Z_][a-zA-Z0-9_]*).*/\1/' | sort -u)

    MISSING_LABELS=0
    while IFS= read -r jump_label; do
        if ! echo "$DEFINED_LABELS" | grep -q "^${jump_label}$"; then
            echo -e "${YELLOW}⚠ Jump to undefined label: $jump_label${NC}"
            MISSING_LABELS=$((MISSING_LABELS + 1))
        fi
    done <<< "$JUMP_REFS"

    if [ "$MISSING_LABELS" -eq 0 ]; then
        echo -e "${GREEN}✓ All jump labels are defined${NC}"
    else
        echo -e "${YELLOW}⚠ $MISSING_LABELS undefined label(s) found${NC}"
        WARNINGS=$((WARNINGS + MISSING_LABELS))
    fi
fi
echo ""

# Test 6: Check WebGAL installation
echo -e "${YELLOW}[6/6]${NC} Checking WebGAL installation..."

if [ ! -d "$PROJECT_ROOT/WebGAL" ]; then
    echo -e "${RED}✗ WebGAL not installed${NC}"
    echo "  Run: ./setup.sh"
    ERRORS=$((ERRORS + 1))
elif [ ! -f "$PROJECT_ROOT/WebGAL/packages/webgal/package.json" ]; then
    echo -e "${RED}✗ WebGAL installation appears incomplete${NC}"
    echo "  Run: ./setup.sh"
    ERRORS=$((ERRORS + 1))
else
    echo -e "${GREEN}✓ WebGAL installation found${NC}"
fi
echo ""

# Summary
echo -e "${BLUE}========================================${NC}"
echo -e "${BLUE}  Test Summary${NC}"
echo -e "${BLUE}========================================${NC}"

if [ "$ERRORS" -eq 0 ] && [ "$WARNINGS" -eq 0 ]; then
    echo -e "${GREEN}✓ All tests passed!${NC}"
    echo ""
    echo "Your game is ready to launch:"
    echo -e "  ${BLUE}./launch.sh${NC}"
    exit 0
elif [ "$ERRORS" -eq 0 ]; then
    echo -e "${YELLOW}⚠ Tests passed with $WARNINGS warning(s)${NC}"
    echo ""
    echo "Your game should work, but you may want to address the warnings above."
    echo "To launch anyway:"
    echo -e "  ${BLUE}./launch.sh${NC}"
    exit 0
else
    echo -e "${RED}✗ Tests failed with $ERRORS error(s) and $WARNINGS warning(s)${NC}"
    echo ""
    echo "Please fix the errors above before launching the game."
    exit 1
fi
