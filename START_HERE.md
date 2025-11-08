# START HERE - One Night, Four Friends

Welcome! Your complete WebGAL development environment is ready.

## Run ONE Command to Get Started

```bash
cd /Users/jordantian/Documents/hacknation/webgal-game
./setup.sh
```

This single command will:
- Clone WebGAL engine from GitHub
- Install all dependencies
- Generate placeholder assets (backgrounds + character sprites)
- Copy your game scripts
- Set up everything for development

**Time required:** 2-5 minutes

## Then Launch Your Game

```bash
./launch.sh
```

Open your browser to: **http://localhost:5173**

Press `Ctrl+C` in terminal to stop.

## What You Get

A fully playable detective mystery visual novel with:
- 5 complete interrogation scenes
- 23 character sprite variations
- 12 background images
- Multiple branching paths
- 5+ different endings
- Dynamic stress/trust mechanics
- Evidence presentation system

## Quick Reference

| Command | What It Does |
|---------|-------------|
| `./setup.sh` | One-time setup (run first) |
| `./launch.sh` | Start the game |
| `npm run copy-scripts` | Update dialogue scripts |
| `npm run update-assets` | Regenerate placeholders |
| `npm test` | Validate everything works |
| `npm run build` | Build for production |

## Project Structure

```
webgal-game/
├── setup.sh              ← RUN THIS FIRST
├── launch.sh             ← Then this
├── game/                 ← Your game content
│   ├── scene/            ← Dialogue scripts
│   ├── background/       ← Background images
│   └── figure/           ← Character sprites
└── scripts/              ← Development tools
```

## Documentation

- **[SETUP_GUIDE.md](SETUP_GUIDE.md)** - Visual walkthrough (recommended!)
- **[QUICKSTART.md](QUICKSTART.md)** - Detailed development guide
- **[COMMANDS.txt](COMMANDS.txt)** - Quick command reference
- **[TROUBLESHOOTING.md](TROUBLESHOOTING.md)** - If something goes wrong
- **[PROJECT_SUMMARY.md](PROJECT_SUMMARY.md)** - Complete features list

## Prerequisites

Make sure you have:
- Node.js 18+ ([download](https://nodejs.org/))
- Python 3.7+ (usually pre-installed on macOS)
- Git (usually pre-installed on macOS)

Verify:
```bash
node -v      # Should be v18.x.x or higher
python3 --version
git --version
```

## Next Steps

1. Run `./setup.sh` (2-5 minutes)
2. Run `./launch.sh` (10 seconds)
3. Open http://localhost:5173 in your browser
4. Play through the game with placeholder assets
5. Replace placeholders with real artwork when ready
6. Build for production with `npm run build`

## Need Help?

- Something not working? → **TROUBLESHOOTING.md**
- How do I...? → **QUICKSTART.md**
- Visual guide → **SETUP_GUIDE.md**
- Command reference → **COMMANDS.txt**

## Ready?

```bash
cd /Users/jordantian/Documents/hacknation/webgal-game
./setup.sh
```

Your playable game is 2 minutes away!
