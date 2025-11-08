# One Night, Four Friends - Quick Start Guide

A WebGAL detective mystery visual novel where you interrogate suspects to solve a missing person case.

## Prerequisites

Before you begin, ensure you have:

- **Node.js 18+** - [Download here](https://nodejs.org/)
- **Python 3.7+** - Usually pre-installed on macOS
- **Git** - Usually pre-installed on macOS

Verify your installations:
```bash
node -v    # Should show v18.x.x or higher
python3 --version
git --version
```

## Installation (One Command!)

```bash
cd /Users/jordantian/Documents/hacknation/webgal-game
./setup.sh
```

That's it! The script will:
1. Clone WebGAL engine from GitHub
2. Install all dependencies
3. Generate placeholder assets
4. Copy your game scripts
5. Set up the development environment

**Estimated time:** 2-5 minutes (depending on internet speed)

## Running Your Game

After setup completes, launch the game:

```bash
./launch.sh
```

Or manually:
```bash
cd WebGAL/packages/webgal
npm run dev
```

Your game will open at: **http://localhost:5173**

Press `Ctrl+C` in the terminal to stop the server.

## Development Workflow

### Making Changes to Dialogue

1. Edit scripts in `/Users/jordantian/Documents/hacknation/output/one_night_four_friends/scripts/`
2. Copy updated scripts:
   ```bash
   npm run copy-scripts
   ```
3. Refresh your browser - changes appear immediately!

### Updating Assets

Regenerate placeholder assets:
```bash
npm run update-assets
```

Or use the script directly:
```bash
python3 scripts/generate_placeholders.py
```

### Testing Your Game

Run integration tests to validate everything works:
```bash
npm test
```

This checks:
- All scene files exist
- No syntax errors
- All labels are defined
- All referenced assets exist

## Project Structure

```
webgal-game/
├── setup.sh              # One-command setup script
├── launch.sh             # Quick launch script
├── package.json          # NPM scripts
├── game.json             # Game metadata
│
├── game/                 # Your game content
│   ├── scene/            # Dialogue scripts (.txt files)
│   ├── background/       # Background images
│   ├── figure/           # Character sprites
│   ├── bgm/              # Background music
│   ├── vocal/            # Voice files
│   └── video/            # Video files
│
├── scripts/              # Development tools
│   ├── generate_placeholders.py
│   ├── copy_scripts.sh
│   ├── update_assets.sh
│   └── test_game.sh
│
└── WebGAL/               # Game engine (cloned from GitHub)
```

## Available NPM Scripts

```bash
npm run dev            # Start development server
npm run build          # Build for production
npm run preview        # Preview production build
npm run copy-scripts   # Copy scripts from output directory
npm run update-assets  # Regenerate placeholder assets
npm run test           # Run integration tests
npm run launch         # Quick launch (same as ./launch.sh)
```

## Adding Real Assets

The setup generates **SVG placeholder assets**. To add real artwork:

### Character Sprites
Replace files in `game/figure/`:
- `harper_neutral.png`, `harper_worried.png`, etc.
- `marcus_neutral.png`, `marcus_defensive.png`, etc.
- `rowan_neutral.png`, `rowan_controlled.png`, etc.

**Recommended size:** 960x1080px PNG with transparency

### Backgrounds
Replace files in `game/background/`:
- `police_station_night.png`
- `interrogation_room.png`
- `lake_house_exterior_storm.png`
- etc.

**Recommended size:** 1920x1080px PNG

### Music & Audio
Add files to:
- `game/bgm/` - Background music (.ogg, .mp3)
- `game/vocal/` - Voice acting (.ogg, .mp3)
- `game/se/` - Sound effects (.ogg, .mp3)

## Scene File Format

WebGAL scripts use a simple text format:

```
// This is a comment

label_name:
  bg:background_image.png;
  show:character_sprite.png -position=right;
  playmusic:music.ogg -volume=0.5 -loop;

  narrator "Narration text appears here.";
  character:character_sprite.png "Character dialogue.";

  menu:
    "Choice 1" -> label_choice1
    "Choice 2" -> label_choice2

label_choice1:
  // Story continues...
  jump:another_label;
```

**Key commands:**
- `bg:` - Set background
- `show:` - Show character sprite
- `playmusic:` - Play background music
- `menu:` - Player choice
- `jump:` - Jump to another scene/label
- `narrator` - Narration text
- `character:sprite.png` - Character dialogue

## Troubleshooting

### Port Already in Use
If port 5173 is busy:
```bash
# Kill existing process
lsof -ti:5173 | xargs kill -9

# Or change port in WebGAL config
```

### Scripts Not Loading
1. Check file path: `/Users/jordantian/Documents/hacknation/output/one_night_four_friends/scripts/`
2. Verify .txt files exist
3. Run `npm run copy-scripts` again

### Assets Not Showing
1. Regenerate: `npm run update-assets`
2. Check browser console (F12) for errors
3. Verify file names match exactly (case-sensitive!)

### WebGAL Won't Start
1. Verify Node.js version: `node -v` (need 18+)
2. Reinstall dependencies:
   ```bash
   cd WebGAL/packages/webgal
   rm -rf node_modules package-lock.json
   npm install --legacy-peer-deps
   ```
3. Re-run setup: `./setup.sh`

## Game Features

- **5 Unique Endings** based on your investigation choices
- **Dynamic Stress & Trust System** - Character reactions change based on your approach
- **Evidence Presentation** - Use clues to confront suspects
- **Branching Interrogations** - Multiple paths through each character's story
- **Time Pressure** - Limited interrogation time affects available options

## Characters

- **Harper Lin (31)** - The Ex-Lover (Red sprites)
- **Marcus Hale (33)** - The Betrayed Friend (Blue sprites)
- **Rowan Adler (32)** - The Host (Green sprites)
- **Elias Moore (32)** - The Missing Victim

## Next Steps

1. **Play through the game** to test all paths
2. **Replace placeholder assets** with real artwork
3. **Add background music** for atmosphere
4. **Customize game.json** with your credits
5. **Build for production**: `npm run build`

## Building for Production

When ready to share your game:

```bash
npm run build
```

Output will be in `WebGAL/packages/webgal/dist/`

You can:
- Upload to itch.io
- Host on GitHub Pages
- Share as a downloadable zip
- Deploy to any web server

## Resources

- **WebGAL Documentation:** [Official Docs](https://docs.openwebgal.com/)
- **WebGAL GitHub:** [Repository](https://github.com/MakinoharaShoko/WebGAL)
- **This Game's Source:** Check `game/scene/*.txt` for script examples

## Credits

- **Game Engine:** WebGAL by MakinoharaShoko
- **Story & Scripts:** AI-Generated
- **Placeholder Assets:** Auto-generated SVG

## Getting Help

If something doesn't work:
1. Run `npm test` to diagnose issues
2. Check the troubleshooting section above
3. Verify prerequisites are installed correctly
4. Review WebGAL documentation for engine-specific issues

## Development Tips

- **Hot Reload:** Changes to scripts reload automatically in dev mode
- **Browser DevTools:** Press F12 to see console errors
- **Scene Testing:** Jump to specific scenes by editing `start.txt`
- **Save System:** WebGAL has built-in save/load functionality
- **Responsive Design:** Game works on mobile and desktop

Enjoy your mystery! 🔍
