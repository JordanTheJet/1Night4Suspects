#!/bin/bash

# LLM Integration Setup Script
# Sets up environment for AI-powered interrogations

echo "================================================"
echo "  WebGAL LLM Integration Setup"
echo "================================================"
echo ""

# Check if .env exists
if [ -f .env ]; then
    echo "✓ .env file already exists"

    # Check if API key is configured
    if grep -q "VITE_ANTHROPIC_API_KEY=sk-" .env; then
        echo "✓ API key appears to be configured"
        echo ""
        echo "Setup complete! Run 'npm run dev' to start."
    else
        echo "⚠ API key not configured in .env"
        echo ""
        echo "Please edit .env and add your Anthropic API key:"
        echo "  VITE_ANTHROPIC_API_KEY=sk-ant-api03-..."
        echo ""
        echo "Get your key from: https://console.anthropic.com/"
    fi
else
    echo "Creating .env from template..."
    cp .env.example .env
    echo "✓ .env file created"
    echo ""
    echo "⚠ Please edit .env and add your Anthropic API key:"
    echo "  VITE_ANTHROPIC_API_KEY=sk-ant-api03-..."
    echo ""
    echo "Get your key from: https://console.anthropic.com/"
    echo ""
    echo "After adding your key, run 'npm run dev' to start."
fi

echo ""
echo "================================================"
echo ""
echo "Quick Start:"
echo "  1. Add API key to .env file"
echo "  2. npm run dev"
echo "  3. Select 'Harper Lin (AI Mode)' in game"
echo ""
echo "Documentation: See LLM_INTEGRATION.md"
echo "================================================"
