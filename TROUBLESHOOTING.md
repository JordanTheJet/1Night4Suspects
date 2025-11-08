# Troubleshooting Guide

Common issues and solutions for One Night, Four Friends WebGAL setup.

## Installation Issues

### "Node.js is not installed"
**Problem:** Node.js not found or version too old

**Solution:**
```bash
# Install via Homebrew (recommended for macOS)
brew install node@18

# Or download from https://nodejs.org/
# Verify installation
node -v  # Should show v18.x.x or higher
```

### "npm install failed"
**Problem:** Dependency installation errors

**Solution:**
```bash
# Clear npm cache
npm cache clean --force

# Try with legacy peer deps flag
cd WebGAL/packages/webgal
npm install --legacy-peer-deps

# If still failing, try different Node version
nvm install 18
nvm use 18
npm install --legacy-peer-deps
```

### "Python 3 is not installed"
**Problem:** Python not found

**Solution:**
```bash
# Check if python3 is available
python3 --version

# Install via Homebrew (macOS)
brew install python3

# Or download from https://www.python.org/
```

## Runtime Issues

### "Port 5173 is already in use"
**Problem:** Another process is using the dev server port

**Solution:**
```bash
# Find and kill the process
lsof -ti:5173 | xargs kill -9

# Or use a different port
cd WebGAL/packages/webgal
PORT=5174 npm run dev
```

### "Cannot find module" errors
**Problem:** Dependencies not properly installed

**Solution:**
```bash
# Reinstall WebGAL dependencies
cd WebGAL/packages/webgal
rm -rf node_modules package-lock.json
npm install --legacy-peer-deps

# If issues persist, re-run setup
cd /Users/jordantian/Documents/hacknation/webgal-game
./setup.sh
```

### Game doesn't load / blank screen
**Problem:** Assets or scripts not properly linked

**Solution:**
```bash
# Verify game files are in the right place
ls -la game/scene/
ls -la WebGAL/packages/webgal/public/game/scene/

# Re-copy scripts
npm run copy-scripts

# Regenerate assets
npm run update-assets

# Check browser console (F12) for errors
```

## Script Issues

### "No .txt files found"
**Problem:** Source scripts not found

**Solution:**
```bash
# Verify source path exists
ls -la /Users/jordantian/Documents/hacknation/output/one_night_four_friends/scripts/

# If path is different, update scripts/copy_scripts.sh
# Edit SCRIPTS_SOURCE variable to match your path

# Then copy manually
cp /path/to/your/scripts/*.txt game/scene/
```

### "Jump to undefined label"
**Problem:** Scene references a label that doesn't exist

**Solution:**
1. Run tests to identify missing labels:
   ```bash
   npm test
   ```
2. Check the scene files for typos in label names
3. Ensure all referenced scenes exist in `game/scene/`

### Scripts not updating in browser
**Problem:** Changes don't appear after editing

**Solution:**
1. Hard refresh browser: `Cmd+Shift+R` (Mac) or `Ctrl+Shift+R` (Windows)
2. Clear browser cache
3. Re-copy scripts: `npm run copy-scripts`
4. Restart dev server: Stop with `Ctrl+C`, then `./launch.sh`

## Asset Issues

### Images not showing
**Problem:** Asset files missing or wrong path

**Solution:**
```bash
# Regenerate all placeholder assets
npm run update-assets

# Verify assets exist
ls -la game/background/
ls -la game/figure/

# Check file names match exactly (case-sensitive!)
# In scripts: "harper_neutral.png"
# File must be: "harper_neutral.png" (exact match)
```

### SVG files not displaying
**Problem:** WebGAL may not support SVG in some versions

**Solution:**
1. Install ImageMagick: `brew install imagemagick`
2. Convert SVG to PNG:
   ```bash
   cd game/background
   for f in *.svg; do convert "$f" "${f%.svg}.png"; done

   cd ../figure
   for f in *.svg; do convert "$f" "${f%.svg}.png"; done
   ```

### Custom assets not loading
**Problem:** Added your own images but they don't appear

**Solution:**
1. Check file format (WebGAL supports PNG, JPG, SVG)
2. Verify file names match script references exactly
3. Check file sizes aren't too large (>5MB may be slow)
4. Ensure files are in correct directories:
   - Backgrounds → `game/background/`
   - Characters → `game/figure/`
   - Music → `game/bgm/`

## Build Issues

### Build fails
**Problem:** `npm run build` produces errors

**Solution:**
```bash
# Clean previous builds
cd WebGAL/packages/webgal
rm -rf dist/

# Rebuild
npm run build

# If TypeScript errors, update dependencies
npm update
npm run build
```

### Build succeeds but game doesn't work
**Problem:** Production build has issues

**Solution:**
1. Test with dev server first: `npm run dev`
2. Check browser console for errors
3. Verify all assets are included in build:
   ```bash
   ls -la WebGAL/packages/webgal/dist/
   ```
4. Test preview: `npm run preview`

## WebGAL-Specific Issues

### Game starts but immediately crashes
**Problem:** Syntax error in scene files

**Solution:**
1. Run validation: `npm test`
2. Check for common errors:
   - Missing semicolons after commands
   - Unclosed quotes in dialogue
   - Invalid command syntax
3. Review WebGAL documentation: https://docs.openwebgal.com/

### Save system not working
**Problem:** Can't save/load game progress

**Solution:**
- WebGAL uses browser localStorage
- Check browser privacy settings (localStorage must be enabled)
- Try in incognito mode to test if extensions are interfering

### Audio not playing
**Problem:** Music/sound effects don't work

**Solution:**
1. Check file format (WebGAL prefers .ogg, also supports .mp3)
2. Verify file paths in scripts match actual files
3. Check browser console for audio loading errors
4. Some browsers require user interaction before playing audio

## Performance Issues

### Game runs slowly
**Problem:** Poor performance or lag

**Solution:**
1. Optimize images:
   - Reduce resolution if >1920x1080
   - Compress PNGs: `pngquant *.png --ext .png --force`
   - Use JPG for backgrounds without transparency
2. Limit concurrent animations
3. Test in different browsers (Chrome usually fastest)

### Dev server slow to start
**Problem:** `npm run dev` takes too long

**Solution:**
```bash
# Clear Vite cache
cd WebGAL/packages/webgal
rm -rf node_modules/.vite

# Restart dev server
npm run dev
```

## macOS-Specific Issues

### "Permission denied" errors
**Problem:** Scripts can't execute

**Solution:**
```bash
# Make scripts executable
chmod +x setup.sh launch.sh
chmod +x scripts/*.sh scripts/*.py

# Run setup again
./setup.sh
```

### Gatekeeper blocking execution
**Problem:** macOS security prevents running scripts

**Solution:**
```bash
# Remove quarantine attribute
xattr -dr com.apple.quarantine setup.sh launch.sh

# Or allow in System Preferences:
# Security & Privacy → Allow apps downloaded from: App Store and identified developers
```

## Getting More Help

If you're still stuck:

1. **Check the logs:**
   ```bash
   # Browser console (F12)
   # Terminal output when running npm run dev
   ```

2. **Run full diagnostics:**
   ```bash
   npm test
   ```

3. **Verify installation:**
   ```bash
   # Check all prerequisites
   node -v
   python3 --version
   git --version

   # Verify project structure
   ls -la game/scene/
   ls -la WebGAL/packages/webgal/
   ```

4. **Clean reinstall:**
   ```bash
   # Backup your game content
   cp -r game game_backup

   # Remove WebGAL
   rm -rf WebGAL

   # Re-run setup
   ./setup.sh
   ```

5. **WebGAL community:**
   - Official Docs: https://docs.openwebgal.com/
   - GitHub Issues: https://github.com/MakinoharaShoko/WebGAL/issues
   - Discord: Check WebGAL repository for invite link

## Reporting Issues

When reporting issues, include:
- Error message (full text)
- Output of `npm test`
- Node.js version: `node -v`
- Operating system version
- Steps to reproduce the issue

## Common Error Messages

### "Cannot resolve module '@/xxx'"
**Fix:** WebGAL internal issue, usually fixed with `npm install --legacy-peer-deps`

### "Unexpected token" in console
**Fix:** JavaScript syntax error in WebGAL or game scripts - check browser console for file name

### "404 Not Found" for assets
**Fix:** File path mismatch - verify file names match exactly (case-sensitive)

### "localStorage is not defined"
**Fix:** Browser privacy settings - enable localStorage in browser settings

---

Still having issues? Create an issue with your error details and we'll help troubleshoot!
