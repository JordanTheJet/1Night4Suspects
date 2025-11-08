#!/usr/bin/env python3
"""
Placeholder Asset Generator for WebGAL Game
Generates SVG-based placeholder images for backgrounds and character sprites.
"""

import os
import sys
from pathlib import Path

# Asset definitions based on WebGAL script analysis
BACKGROUNDS = {
    'police_station_night.png': {'color': '#1a2332', 'label': 'POLICE STATION\nNIGHT'},
    'evidence_board.png': {'color': '#3d2817', 'label': 'EVIDENCE BOARD'},
    'lake_house_exterior_storm.png': {'color': '#1f2937', 'label': 'LAKE HOUSE\nSTORMY NIGHT'},
    'interrogation_room.png': {'color': '#2d3748', 'label': 'INTERROGATION\nROOM'},
    'police_station_hallway.png': {'color': '#374151', 'label': 'POLICE STATION\nHALLWAY'},
    'interrogation_room_dawn.png': {'color': '#4b5563', 'label': 'INTERROGATION ROOM\nDAWN'},
    'black.png': {'color': '#000000', 'label': ''},
    'courtroom.png': {'color': '#8b4513', 'label': 'COURTROOM'},
    'cliff_overlook_day.png': {'color': '#4a90e2', 'label': 'CLIFF OVERLOOK\nDAY'},
    'lake_house_day.png': {'color': '#6b8e23', 'label': 'LAKE HOUSE\nDAY'},
    'airport.png': {'color': '#708090', 'label': 'AIRPORT'},
    'police_station_day.png': {'color': '#5f6b7a', 'label': 'POLICE STATION\nDAY'},
}

CHARACTERS = {
    # Harper Lin - The Ex-Lover
    'harper_neutral.png': {'color': '#c41e3a', 'name': 'HARPER', 'emotion': 'Neutral'},
    'harper_worried.png': {'color': '#c41e3a', 'name': 'HARPER', 'emotion': 'Worried'},
    'harper_guarded.png': {'color': '#c41e3a', 'name': 'HARPER', 'emotion': 'Guarded'},
    'harper_defensive.png': {'color': '#c41e3a', 'name': 'HARPER', 'emotion': 'Defensive'},
    'harper_vulnerable.png': {'color': '#c41e3a', 'name': 'HARPER', 'emotion': 'Vulnerable'},
    'harper_bitter.png': {'color': '#c41e3a', 'name': 'HARPER', 'emotion': 'Bitter'},
    'harper_cold.png': {'color': '#c41e3a', 'name': 'HARPER', 'emotion': 'Cold'},
    'harper_anxious.png': {'color': '#c41e3a', 'name': 'HARPER', 'emotion': 'Anxious'},
    'harper_tired.png': {'color': '#c41e3a', 'name': 'HARPER', 'emotion': 'Tired'},
    'harper_broken.png': {'color': '#c41e3a', 'name': 'HARPER', 'emotion': 'Broken'},

    # Marcus Hale - The Betrayed Friend
    'marcus_neutral.png': {'color': '#1e40af', 'name': 'MARCUS', 'emotion': 'Neutral'},
    'marcus_defensive.png': {'color': '#1e40af', 'name': 'MARCUS', 'emotion': 'Defensive'},
    'marcus_angry.png': {'color': '#1e40af', 'name': 'MARCUS', 'emotion': 'Angry'},
    'marcus_bitter.png': {'color': '#1e40af', 'name': 'MARCUS', 'emotion': 'Bitter'},
    'marcus_controlled.png': {'color': '#1e40af', 'name': 'MARCUS', 'emotion': 'Controlled'},
    'marcus_resigned.png': {'color': '#1e40af', 'name': 'MARCUS', 'emotion': 'Resigned'},
    'marcus_nervous.png': {'color': '#1e40af', 'name': 'MARCUS', 'emotion': 'Nervous'},

    # Rowan Adler - The Host
    'rowan_neutral.png': {'color': '#15803d', 'name': 'ROWAN', 'emotion': 'Neutral'},
    'rowan_controlled.png': {'color': '#15803d', 'name': 'ROWAN', 'emotion': 'Controlled'},
    'rowan_sharp.png': {'color': '#15803d', 'name': 'ROWAN', 'emotion': 'Sharp'},
    'rowan_cold.png': {'color': '#15803d', 'name': 'ROWAN', 'emotion': 'Cold'},
    'rowan_calculating.png': {'color': '#15803d', 'name': 'ROWAN', 'emotion': 'Calculating'},
    'rowan_tense.png': {'color': '#15803d', 'name': 'ROWAN', 'emotion': 'Tense'},
    'rowan_calm.png': {'color': '#15803d', 'name': 'ROWAN', 'emotion': 'Calm'},
}

def generate_background_svg(filename, color, label, width=1920, height=1080):
    """Generate a background placeholder SVG."""
    svg = f'''<?xml version="1.0" encoding="UTF-8"?>
<svg width="{width}" height="{height}" xmlns="http://www.w3.org/2000/svg">
  <!-- Background gradient -->
  <defs>
    <linearGradient id="bg-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:{color};stop-opacity:1" />
      <stop offset="100%" style="stop-color:{adjust_brightness(color, -0.3)};stop-opacity:1" />
    </linearGradient>
    <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
      <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(255,255,255,0.05)" stroke-width="1"/>
    </pattern>
  </defs>

  <!-- Background -->
  <rect width="{width}" height="{height}" fill="url(#bg-gradient)"/>
  <rect width="{width}" height="{height}" fill="url(#grid)"/>

  <!-- Frame border -->
  <rect x="20" y="20" width="{width-40}" height="{height-40}"
        fill="none" stroke="rgba(255,255,255,0.1)" stroke-width="2"/>

  <!-- Label -->
  <text x="{width/2}" y="{height/2}"
        font-family="Arial, sans-serif"
        font-size="72"
        font-weight="bold"
        fill="rgba(255,255,255,0.3)"
        text-anchor="middle"
        dominant-baseline="middle">{label}</text>

  <!-- Watermark -->
  <text x="{width-20}" y="{height-20}"
        font-family="Arial, sans-serif"
        font-size="16"
        fill="rgba(255,255,255,0.2)"
        text-anchor="end">PLACEHOLDER</text>
</svg>'''
    return svg

def generate_character_svg(filename, color, name, emotion, width=960, height=1080):
    """Generate a character sprite placeholder SVG."""
    svg = f'''<?xml version="1.0" encoding="UTF-8"?>
<svg width="{width}" height="{height}" xmlns="http://www.w3.org/2000/svg">
  <!-- Transparent background -->
  <rect width="{width}" height="{height}" fill="rgba(0,0,0,0)"/>

  <!-- Character silhouette -->
  <defs>
    <linearGradient id="char-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" style="stop-color:{color};stop-opacity:0.9" />
      <stop offset="100%" style="stop-color:{adjust_brightness(color, -0.4)};stop-opacity:0.9" />
    </linearGradient>
  </defs>

  <!-- Body (simplified humanoid shape) -->
  <ellipse cx="{width/2}" cy="250" rx="120" ry="160" fill="url(#char-gradient)" opacity="0.8"/>
  <rect x="{width/2-80}" y="380" width="160" height="500" rx="40" fill="url(#char-gradient)" opacity="0.8"/>

  <!-- Border for definition -->
  <ellipse cx="{width/2}" cy="250" rx="120" ry="160" fill="none" stroke="rgba(255,255,255,0.3)" stroke-width="3"/>
  <rect x="{width/2-80}" y="380" width="160" height="500" rx="40" fill="none" stroke="rgba(255,255,255,0.3)" stroke-width="3"/>

  <!-- Name label -->
  <text x="{width/2}" y="950"
        font-family="Arial, sans-serif"
        font-size="48"
        font-weight="bold"
        fill="{color}"
        text-anchor="middle">{name}</text>

  <!-- Emotion label -->
  <text x="{width/2}" y="1000"
        font-family="Arial, sans-serif"
        font-size="32"
        fill="rgba(255,255,255,0.6)"
        text-anchor="middle">({emotion})</text>

  <!-- Watermark -->
  <text x="{width-20}" y="{height-20}"
        font-family="Arial, sans-serif"
        font-size="16"
        fill="rgba(255,255,255,0.3)"
        text-anchor="end">PLACEHOLDER</text>
</svg>'''
    return svg

def adjust_brightness(hex_color, factor):
    """Adjust the brightness of a hex color."""
    # Remove '#' if present
    hex_color = hex_color.lstrip('#')

    # Convert to RGB
    r = int(hex_color[0:2], 16)
    g = int(hex_color[2:4], 16)
    b = int(hex_color[4:6], 16)

    # Adjust brightness
    r = max(0, min(255, int(r + (255 - r) * factor if factor > 0 else r * (1 + factor))))
    g = max(0, min(255, int(g + (255 - g) * factor if factor > 0 else g * (1 + factor))))
    b = max(0, min(255, int(b + (255 - b) * factor if factor > 0 else b * (1 + factor))))

    return f'#{r:02x}{g:02x}{b:02x}'

def save_svg_as_png(svg_content, output_path):
    """Save SVG content as a PNG file. Falls back to SVG if conversion fails."""
    try:
        # Try to use cairosvg if available
        import cairosvg
        cairosvg.svg2png(bytestring=svg_content.encode('utf-8'), write_to=output_path)
        return True
    except ImportError:
        # Fallback: save as SVG with .png extension (WebGAL might handle it)
        with open(output_path, 'w', encoding='utf-8') as f:
            f.write(svg_content)
        return False

def main():
    # Get the project root directory
    script_dir = Path(__file__).parent
    project_root = script_dir.parent

    background_dir = project_root / 'game' / 'background'
    figure_dir = project_root / 'game' / 'figure'

    # Create directories if they don't exist
    background_dir.mkdir(parents=True, exist_ok=True)
    figure_dir.mkdir(parents=True, exist_ok=True)

    print("Generating placeholder assets...")
    print(f"Background directory: {background_dir}")
    print(f"Figure directory: {figure_dir}")
    print()

    # Generate backgrounds
    print("Generating backgrounds:")
    for filename, props in BACKGROUNDS.items():
        svg_content = generate_background_svg(filename, props['color'], props['label'])
        output_path = background_dir / filename

        # Save as SVG (WebGAL supports SVG)
        svg_path = output_path.with_suffix('.svg')
        with open(svg_path, 'w', encoding='utf-8') as f:
            f.write(svg_content)

        # Also save a copy with .png extension for compatibility
        with open(output_path, 'w', encoding='utf-8') as f:
            f.write(svg_content)

        print(f"  ✓ {filename}")

    # Generate character sprites
    print("\nGenerating character sprites:")
    for filename, props in CHARACTERS.items():
        svg_content = generate_character_svg(
            filename,
            props['color'],
            props['name'],
            props['emotion']
        )
        output_path = figure_dir / filename

        # Save as SVG
        svg_path = output_path.with_suffix('.svg')
        with open(svg_path, 'w', encoding='utf-8') as f:
            f.write(svg_content)

        # Also save a copy with .png extension for compatibility
        with open(output_path, 'w', encoding='utf-8') as f:
            f.write(svg_content)

        print(f"  ✓ {filename} ({props['name']} - {props['emotion']})")

    print(f"\n✓ Generated {len(BACKGROUNDS)} backgrounds and {len(CHARACTERS)} character sprites")
    print("\nNote: Assets are saved as SVG files with .png extensions for WebGAL compatibility.")
    print("For production, replace these with actual PNG artwork.")

if __name__ == '__main__':
    main()
