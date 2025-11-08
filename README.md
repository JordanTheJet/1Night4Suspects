# One Night, Four Friends - WebGAL Edition

A detective mystery visual novel where you interrogate three suspects to solve a missing person case. Built with WebGAL.

## Quick Start

```bash
# Setup (one command - takes 2-5 minutes)
./setup.sh

# Launch the game
./launch.sh
```

Open your browser to **http://localhost:5173**

## What's Included

- Complete WebGAL development environment
- 5 interrogation scene scripts with branching paths
- Placeholder assets (backgrounds and character sprites)
- Automated testing and validation tools
- Development workflow scripts

## Game Synopsis

**3:12 AM. The storm hasn't let up.**

Three soaked suspects sit in separate rooms. One friend is missing. You have until dawn to find the truth.

**Victim:** Elias Moore, 32 - Charming entrepreneur, last seen at 11 PM on the dock

**Suspects:**
- Harper Lin (31) - The Ex-Lover
- Marcus Hale (33) - The Betrayed Friend
- Rowan Adler (32) - The Host

**Your Mission:** Interrogate the suspects, gather evidence, and discover what happened to Elias Moore.

## Features

- 5 unique endings based on investigation choices
- Dynamic stress and trust mechanics
- Evidence-based deduction system
- Multiple interrogation paths for each suspect
- 45-60 minutes of gameplay

## Project Structure

```
webgal-game/
├── setup.sh                  # One-command setup
├── launch.sh                 # Quick launch
├── game/                     # Game content
│   ├── scene/                # Dialogue scripts
│   ├── background/           # Background images
│   └── figure/               # Character sprites
├── scripts/                  # Development tools
└── WebGAL/                   # Game engine
```

## Development Commands

```bash
npm run dev            # Start dev server
npm run build          # Build for production
npm run test           # Validate game files
npm run copy-scripts   # Update scripts from source
npm run update-assets  # Regenerate placeholders
```

## Documentation

- **[QUICKSTART.md](QUICKSTART.md)** - Detailed setup and development guide
- **[game.json](game.json)** - Game metadata and character info

## Technical Requirements

- Node.js 18+
- Python 3.7+
- macOS, Linux, or Windows with bash

## Asset Status

Currently using **SVG placeholder assets**. For production:
- Replace backgrounds in `game/background/`
- Replace character sprites in `game/figure/`
- Add music to `game/bgm/`

**Placeholder assets include:**
- 12 backgrounds (interrogation rooms, locations)
- 23 character sprites (3 characters × multiple emotions)

## Credits

- **Engine:** [WebGAL](https://github.com/MakinoharaShoko/WebGAL) by MakinoharaShoko
- **Story Generation:** AI-powered case structure
- **Development:** Automated setup and tooling

## License

Game content: Your choice
WebGAL Engine: MIT License

## Contributing

This is a generated project template. To customize:
1. Edit scripts in `game/scene/`
2. Replace placeholder assets
3. Modify `game.json` metadata
4. Build and deploy: `npm run build`

## Support

For WebGAL engine issues, see [official documentation](https://docs.openwebgal.com/)

For this project setup, check [QUICKSTART.md](QUICKSTART.md)

---

**Ready to solve the mystery?** Run `./setup.sh` to begin.
