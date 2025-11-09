# Missing Game Assets

This is a list of assets that need to be created or found for the "One Night, Four Friends" game.

## Background Images Needed

### Missing Files (Currently causing 404 errors):
1. **police_station_dawn.png** - Dawn breaking at police station (for ending scene)
2. **title_screen.png** - Main title screen with game logo
3. **lake_house.png** - Lake house during day (for cold case ending) *(Note: lake_house_day.png exists, might be same)*

### Existing Files (Already present):
- ✅ interrogation_room.png
- ✅ police_station_hallway.png
- ✅ police_station_night.png (EXISTS!)
- ✅ evidence_board.png
- ✅ lake_house_exterior_storm.png
- ✅ lake_house_day.png
- ✅ cliff_overlook_day.png
- ✅ airport.png
- ✅ black.png
- ✅ courtroom.png

## Asset Specifications

### 1. police_station_dawn.png ⚠️ MISSING
**Scene**: End of game, dawn breaking
**Mood**: Somber, tired, case concluded
**Elements**:
- Police station exterior or interior
- First light of dawn through windows
- Warm orange/pink dawn light
- Tired, end-of-shift atmosphere
**Size**: 1920x1080 recommended
**QUICK FIX**: Copy `police_station_day.png` and rename

### 2. title_screen.png ⚠️ MISSING
**Scene**: Main menu background
**Mood**: Dark, mysterious, noir thriller
**Elements**:
- "ONE NIGHT, FOUR FRIENDS" title space
- Storm/fog atmosphere
- Lake house silhouette or dock in distance
- Moody blue/gray color palette
**Size**: 1920x1080 recommended
**QUICK FIX**: Use `black.png` or `lake_house_exterior_storm.png`

### 3. lake_house.png ⚠️ MISSING (maybe)
**Scene**: Lake house during daytime (for cold case ending)
**Note**: `lake_house_day.png` already exists - might just need to rename or update scene file
**QUICK FIX**: Copy `lake_house_day.png` to `lake_house.png`

## Quick Fixes to Make Game Work NOW

Run these commands to create placeholder assets:

```bash
cd /Users/jordantian/Documents/hacknation/webgal-game/WebGAL/packages/webgal/public/game/background/

# Create police_station_dawn.png from existing file
cp police_station_day.png police_station_dawn.png

# Create title_screen.png from storm scene
cp lake_house_exterior_storm.png title_screen.png

# Create lake_house.png from day version
cp lake_house_day.png lake_house.png
```

## How to Add Assets

Place PNG files in:
```
/Users/jordantian/Documents/hacknation/webgal-game/WebGAL/packages/webgal/public/game/background/
```

## AI Art Generation Prompts (if using Midjourney/DALL-E)

### police_station_dawn.png:
"Police station building exterior at dawn, first light breaking through storm clouds, tired atmosphere, cinematic noir style, warm orange dawn light, empty parking lot, realistic, muted colors, 16:9 aspect ratio"

### title_screen.png:
"Dark mysterious title screen background, stormy lake house at night, fog rolling over water, dock in foreground, moody blue and gray colors, noir thriller atmosphere, cinematic, dramatic lighting, 16:9 aspect ratio"

## Notes

- WebGAL supports PNG, JPG, and WebP formats
- SVG versions exist for some backgrounds but PNG is primary
- Recommended resolution: 1920x1080 for modern displays
- Keep file sizes reasonable (<2MB per image) for web performance

## Status

- **Total Missing**: 3 files
- **Quick Fix Available**: Yes, all can be copied from existing files
- **Blocking Gameplay**: Yes, causes 404 errors
- **Priority**: HIGH - Fix before demo
