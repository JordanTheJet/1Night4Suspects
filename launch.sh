#!/bin/bash
# Quick launch script for One Night, Four Friends

PROJECT_ROOT="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
WEBGAL_DIR="$PROJECT_ROOT/WebGAL/packages/webgal"

echo "Starting WebGAL development server..."
echo "Game will be available at: http://localhost:5173"
echo ""
echo "Press Ctrl+C to stop the server"
echo ""

cd "$WEBGAL_DIR"
npm run dev
