# One Night, Four Friends - Project Setup Summary

## What Was Created

A complete, production-ready WebGAL development environment for your detective mystery visual novel.

## Project Location

```
/Users/jordantian/Documents/hacknation/webgal-game/
```

## Directory Structure

```
webgal-game/
├── setup.sh                          # ONE-COMMAND SETUP SCRIPT
├── launch.sh                         # Quick launch script
├── package.json                      # NPM scripts and metadata
├── game.json                         # Game metadata and character info
├── .env.example                      # Environment configuration template
├── .gitignore                        # Git ignore rules
│
├── README.md                         # Project overview
├── QUICKSTART.md                     # Detailed setup guide
├── TROUBLESHOOTING.md                # Common issues and solutions
├── PROJECT_SUMMARY.md                # This file
│
├── game/                             # GAME CONTENT DIRECTORY
│   ├── scene/                        # Dialogue scripts (.txt)
│   │   ├── start.txt                 # Entry point (auto-generated)
│   │   ├── briefing.txt              # (to be copied)
│   │   ├── interrogation_hub.txt     # (to be copied)
│   │   ├── harper_interrogation.txt  # (to be copied)
│   │   ├── evidence_board.txt        # (to be copied)
│   │   └── accusation_and_endings.txt# (to be copied)
│   │
│   ├── background/                   # Background images (SVG placeholders)
│   │   └── [12 backgrounds will be generated]
│   │
│   ├── figure/                       # Character sprites (SVG placeholders)
│   │   └── [23 character sprites will be generated]
│   │
│   ├── bgm/                          # Background music (empty for now)
│   ├── vocal/                        # Voice acting (empty for now)
│   └── video/                        # Videos (empty for now)
│
├── scripts/                          # DEVELOPMENT TOOLS
│   ├── generate_placeholders.py     # Asset generator (Python)
│   ├── copy_scripts.sh              # Script synchronization
│   ├── update_assets.sh             # Asset regeneration
│   └── test_game.sh                 # Integration testing
│
├── assets/                           # Additional project assets
│
└── WebGAL/                          # Game engine (cloned during setup)
    └── [Will be cloned from GitHub]
```

## Generated Scripts

### 1. setup.sh (Main Setup Script)
**Purpose:** One-command installation and configuration

**What it does:**
- Validates prerequisites (Node.js, Python, Git)
- Clones WebGAL engine from GitHub
- Installs all NPM dependencies
- Generates placeholder assets
- Copies game scripts from source directory
- Creates symbolic links for WebGAL integration
- Creates launch script
- Runs in 2-5 minutes

**Usage:**
```bash
cd /Users/jordantian/Documents/hacknation/webgal-game
./setup.sh
```

### 2. launch.sh (Quick Launch)
**Purpose:** Start development server with one command

**Usage:**
```bash
./launch.sh
```
Opens game at http://localhost:5173

### 3. scripts/generate_placeholders.py (Asset Generator)
**Purpose:** Creates SVG placeholder assets

**Generates:**
- **12 Background Images:**
  - police_station_night.png
  - evidence_board.png
  - lake_house_exterior_storm.png
  - interrogation_room.png
  - police_station_hallway.png
  - interrogation_room_dawn.png
  - black.png
  - courtroom.png
  - cliff_overlook_day.png
  - lake_house_day.png
  - airport.png
  - police_station_day.png

- **23 Character Sprites:**
  - **Harper (10 emotions):** neutral, worried, guarded, defensive, vulnerable, bitter, cold, anxious, tired, broken
  - **Marcus (7 emotions):** neutral, defensive, angry, bitter, controlled, resigned, nervous
  - **Rowan (6 emotions):** neutral, controlled, sharp, cold, calculating, tense, calm

**Features:**
- SVG-based with gradients and styling
- Color-coded by character (Harper=Red, Marcus=Blue, Rowan=Green)
- Labeled with character name and emotion
- Watermarked as "PLACEHOLDER"
- Compatible with WebGAL

**Usage:**
```bash
python3 scripts/generate_placeholders.py
# Or
npm run generate-assets
```

### 4. scripts/copy_scripts.sh (Script Sync)
**Purpose:** Copy updated dialogue scripts from source

**Source:** `/Users/jordantian/Documents/hacknation/output/one_night_four_friends/scripts/`

**Destination:** `game/scene/` and `WebGAL/packages/webgal/public/game/scene/`

**Usage:**
```bash
bash scripts/copy_scripts.sh
# Or
npm run copy-scripts
```

### 5. scripts/update_assets.sh (Asset Update)
**Purpose:** Regenerate and sync placeholder assets

**Usage:**
```bash
bash scripts/update_assets.sh
# Or
npm run update-assets
```

### 6. scripts/test_game.sh (Integration Testing)
**Purpose:** Validate game files before running

**Checks:**
1. Scene files exist and are valid
2. start.txt entry point exists
3. Basic syntax validation (quotes, labels)
4. All referenced assets exist
5. All jump labels are defined
6. WebGAL installation is complete

**Usage:**
```bash
bash scripts/test_game.sh
# Or
npm test
```

**Output Example:**
```
[1/6] Checking scene files...
✓ Found 5 scene file(s)

[2/6] Checking entry point...
✓ start.txt exists

[3/6] Validating scene syntax...
✓ Basic syntax validation complete

[4/6] Checking asset references...
✓ All referenced assets exist

[5/6] Validating label references...
✓ All jump labels are defined

[6/6] Checking WebGAL installation...
✓ WebGAL installation found

========================================
  Test Summary
========================================
✓ All tests passed!
```

## Configuration Files

### package.json
NPM scripts for development workflow:
- `npm run dev` - Start dev server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run copy-scripts` - Sync scripts
- `npm run update-assets` - Regenerate assets
- `npm run generate-assets` - Generate placeholders
- `npm run test` - Run validation tests
- `npm run launch` - Quick launch

### game.json
Game metadata:
- Title, subtitle, description
- Author and version info
- Character profiles
- Genre and tags
- Features list
- Setting details
- Credits

### .env.example
Environment variables template:
- Server port configuration
- Path configurations
- Development settings

### .gitignore
Excludes from version control:
- node_modules/
- Build outputs
- Environment files
- OS-specific files
- IDE files

## Documentation

### README.md
- Quick start instructions
- Game synopsis
- Project structure overview
- Basic commands
- Credit information

### QUICKSTART.md (Comprehensive Guide)
- Prerequisites checklist
- Installation instructions
- Development workflow
- Scene file format reference
- Asset management
- Troubleshooting basics
- Building for production

### TROUBLESHOOTING.md (Detailed Troubleshooting)
- Installation issues
- Runtime problems
- Script errors
- Asset issues
- Build problems
- WebGAL-specific issues
- Performance optimization
- Platform-specific solutions

### PROJECT_SUMMARY.md (This File)
Complete overview of the project setup.

## Asset Specifications

### Background Images
- **Format:** PNG (SVG placeholders generated)
- **Size:** 1920x1080px
- **Location:** `game/background/`
- **Count:** 12 images

### Character Sprites
- **Format:** PNG (SVG placeholders generated)
- **Size:** 960x1080px with transparency
- **Location:** `game/figure/`
- **Count:** 23 sprites (3 characters × multiple emotions)

### Audio (Not Generated)
- **Music:** `game/bgm/` (.ogg or .mp3)
- **Voice:** `game/vocal/` (.ogg or .mp3)
- **Sound FX:** `game/se/` (.ogg or .mp3)

## Game Scripts (To Be Copied)

Source: `/Users/jordantian/Documents/hacknation/output/one_night_four_friends/scripts/`

**Files:**
1. **briefing.txt** (1.5 KB) - Case briefing scene
2. **interrogation_hub.txt** (661 B) - Navigation hub
3. **harper_interrogation.txt** (11.6 KB) - Harper's interrogation
4. **evidence_board.txt** (2.7 KB) - Evidence review
5. **accusation_and_endings.txt** (7.7 KB) - Final accusation and endings

**Total:** ~24 KB of dialogue scripts

## How to Get Started

### Step 1: Run Setup (2-5 minutes)
```bash
cd /Users/jordantian/Documents/hacknation/webgal-game
./setup.sh
```

This will:
- Clone WebGAL
- Install dependencies
- Generate assets
- Copy scripts
- Create launch script

### Step 2: Launch Game
```bash
./launch.sh
```

Game opens at: http://localhost:5173

### Step 3: Test Everything
```bash
npm test
```

Validates all files and references.

### Step 4: Develop
- Edit scripts in source directory
- Run `npm run copy-scripts` to sync
- Refresh browser to see changes

### Step 5: Replace Placeholders (When Ready)
- Add real artwork to `game/background/` and `game/figure/`
- Add music to `game/bgm/`
- Keep same filenames as placeholders

### Step 6: Build for Production
```bash
npm run build
```

Output in: `WebGAL/packages/webgal/dist/`

## Technical Stack

- **Game Engine:** WebGAL (Vite + React)
- **Scripting:** WebGAL script format (.txt files)
- **Assets:** SVG (generated) → PNG (production)
- **Build Tool:** Vite
- **Package Manager:** NPM
- **Runtime:** Node.js 18+
- **Python:** 3.7+ (for asset generation)

## Game Features

### Gameplay
- Detective investigation mechanics
- Multiple interrogation paths
- Evidence presentation system
- Time management (interrogations consume time)
- Stat tracking (stress, trust, lies)

### Endings
1. **Correct Accusation + High Trust** - Best ending
2. **Correct Accusation + Low Trust** - Good ending
3. **Wrong Accusation (Harper)** - Bad ending
4. **Wrong Accusation (Marcus)** - Bad ending
5. **Wrong Accusation (Rowan)** - Bad ending
6. **No Accusation** - Failure ending

### Mechanics
- **Trust System:** Affects dialogue options and character responses
- **Stress System:** Characters become defensive when stressed
- **Lie Detection:** Narrator hints when characters are lying
- **Evidence System:** Present evidence to confront suspects

## Production Checklist

Before releasing your game:

- [ ] Run full playthrough testing
- [ ] Replace all placeholder assets with production artwork
- [ ] Add background music and sound effects
- [ ] Test all 5+ endings
- [ ] Verify all dialogue for typos
- [ ] Add voice acting (optional)
- [ ] Update game.json with final credits
- [ ] Test build: `npm run build`
- [ ] Test production preview: `npm run preview`
- [ ] Create game trailer/screenshots
- [ ] Write game description for distribution
- [ ] Choose distribution platform (itch.io, Steam, etc.)

## File Sizes (Estimated)

- **Scripts:** ~24 KB (text)
- **Placeholder Assets:** ~500 KB (SVG)
- **WebGAL Engine:** ~50 MB (with dependencies)
- **Production Build:** ~5-20 MB (depends on final assets)

## Development Timeline

- **Setup:** 2-5 minutes (one command)
- **Asset Replacement:** 2-4 hours (if creating custom art)
- **Music Addition:** 1-2 hours
- **Testing:** 2-3 hours (full playthroughs)
- **Build & Deploy:** 30 minutes

**Total MVP to Production:** 6-10 hours (excluding asset creation)

## Next Steps

1. **Immediate:** Run `./setup.sh`
2. **Today:** Test game with placeholders
3. **This Week:** Replace key assets (character portraits)
4. **This Month:** Complete production assets and release

## Support Resources

- **This Project:** See QUICKSTART.md and TROUBLESHOOTING.md
- **WebGAL Engine:** https://docs.openwebgal.com/
- **WebGAL GitHub:** https://github.com/MakinoharaShoko/WebGAL
- **WebGAL Community:** Check repository for Discord invite

## License

- **Your Game Content:** Your choice
- **WebGAL Engine:** MIT License
- **Setup Scripts:** MIT License (free to use/modify)

## Credits

- **Game Concept:** One Night, Four Friends
- **Story Generation:** AI-powered case structure
- **Setup Automation:** Custom scripts
- **WebGAL Engine:** MakinoharaShoko and contributors

---

**Ready to start?**

```bash
cd /Users/jordantian/Documents/hacknation/webgal-game
./setup.sh
```

See you in 2 minutes with a playable game!
