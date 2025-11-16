# Interrogation UI Redesign - Documentation

## Overview

The interrogation UI has been redesigned to create a more dramatic, cinematic layout for detective/suspect confrontations. The new layout features large character portraits on the left and right sides with centered dialogue text between them.

## Visual Layout

```
┌─────────────────────────────────────────────┐
│                                             │
│  [LARGE         [CENTERED        [LARGE    │
│   DETECTIVE      DIALOGUE         SUSPECT]  │
│   PORTRAIT]      TEXT BOX]        PORTRAIT] │
│   (LEFT 40%)                      (RIGHT 40%)│
│                                             │
└─────────────────────────────────────────────┘
```

## Key Features

1. **Larger Character Portraits**: Characters now take up 40% of screen width each (responsive on smaller screens)
2. **Side-by-Side Positioning**: Detective on left, suspect on right
3. **Centered Dialogue**: Text box positioned in center between characters
4. **Cinematic Effects**: Drop shadows on characters for depth
5. **Responsive Design**: Adapts to different screen sizes
6. **Automatic Detection**: Activates when both left and right figures are present

## Files Modified

### 1. `/packages/webgal/src/Stage/FigureContainer/figureContainer.module.scss`

**Changes:**
- Modified `.figContainerLeft` and `.figContainerRight` to use 40% width
- Set `object-fit: contain` and proper `object-position` for each side
- Added drop-shadow filters for dramatic effect (left shadow on left figure, right shadow on right figure)
- Added responsive breakpoints:
  - 1024px: Reduces to 35% width
  - 768px: Reduces to 30% width

**Code Example:**
```scss
.figContainerLeft {
  justify-content: left;
  width: 40%;
  left: 0;
  right: auto;

  .figurePic {
    max-width: 100%;
    height: 100%;
    object-fit: contain;
    object-position: left bottom;
    filter: drop-shadow(5px 0 10px rgba(0, 0, 0, 0.3));
  }
}
```

### 2. `/packages/webgal/src/Stage/TextBox/textbox.module.scss`

**Changes:**
- Added `.TextBox_main_interrogation` class for centered dialogue layout
- Positions text box between 25% and 75% horizontally
- Sets bottom position to 15% for visual balance
- Hides mini-avatar container in interrogation mode
- Centers character name display
- Added box-shadow for depth
- Responsive breakpoints:
  - 1024px: Adjusts to 20%-80% width, smaller padding
  - 768px: Adjusts to 15%-85% width, smaller font size

**Code Example:**
```scss
.TextBox_main_interrogation {
  left: 25%;
  right: 25%;
  width: auto;
  max-width: 50%;
  min-width: 40%;
  padding: 2em 3em 2em 3em;
  border-radius: 20px;
  text-align: center;
  align-items: center;
  bottom: 15%;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4);
}
```

### 3. `/packages/webgal/src/Stage/TextBox/IMSSTextbox.tsx`

**Changes:**
- Added Redux imports to access stage state
- Implemented automatic interrogation mode detection
- Conditionally applies `.TextBox_main_interrogation` class when both left and right figures are present

**Detection Logic:**
```typescript
// Detect interrogation mode: when both left and right figures are active
const stageState = useSelector((state: RootState) => state.stage);
const isInterrogationMode = stageState.figNameLeft !== '' && stageState.figNameRight !== '';
```

## How to Use in Scene Scripts

### Triggering Interrogation Mode

The interrogation layout is **automatically activated** when you have characters displayed on BOTH left and right positions simultaneously.

### Example Scene Script

```webgal
// Set up interrogation scene
label:interrogation_scene;
  bg:interrogation_room.png;

  // Display detective on LEFT and suspect on RIGHT
  show:detective_neutral.png -position=left;
  show:harper_neutral.png -position=right;

  // Dialogue will now be centered between them
  detective "Ms. Lin, where were you at 9 PM last night?";

  harper:harper_worried.png "I... I was in my room.";

  detective:detective_suspicious.png "Are you sure about that?";
```

### Important Usage Notes

1. **Both Positions Required**: You MUST use both `-position=left` and `-position=right` for interrogation mode
2. **Order Matters**: Set up both figures before starting dialogue for best effect
3. **Character Changes**: You can change expressions using the `character:newimage.png` syntax
4. **Clearing Layout**: Use `hide` commands or change to center position to exit interrogation mode

### Clearing Interrogation Mode

```webgal
// Exit interrogation mode
hide:detective_neutral.png;
hide:harper_neutral.png;

// Or switch to single character
show:character.png -position=center;
```

## Technical Details

### Automatic Detection System

The system detects interrogation mode by checking if both `figNameLeft` and `figNameRight` in the stage state are non-empty strings:

```typescript
const isInterrogationMode = stageState.figNameLeft !== '' && stageState.figNameRight !== '';
```

### Z-Index Layering

- Background: z-index 1
- Background container: z-index 2
- Textbox: z-index 3
- Figures: z-index 4
- Pixi Container: z-index 5
- Textbox container: z-index 6

### Responsive Breakpoints

| Screen Width | Figure Width | Text Box Width | Text Size |
|--------------|--------------|----------------|-----------|
| > 1024px     | 40%          | 25%-75%        | 100%      |
| 768-1024px   | 35%          | 20%-80%        | 100%      |
| < 768px      | 30%          | 15%-85%        | 90%       |

## Visual Effects

### Character Shadows
- Left character: Shadow projects to the right (5px offset)
- Right character: Shadow projects to the left (-5px offset)
- Creates depth and separation between characters

### Text Box
- Enhanced shadow: `box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4)`
- Makes dialogue "float" between characters
- Improves readability

### Transitions
- Smooth transitions for position changes: `transition: left 0.33s, right 0.33s, width 0.33s`
- Maintains existing fade-in animations

## Compatibility

### Existing Scenes
- **Non-interrogation scenes remain unchanged**: Single character or center positions work normally
- **Backwards compatible**: All existing scene scripts continue to function
- **Opt-in system**: Only activates when specific conditions are met

### Browser Support
- Works with all modern browsers
- Responsive design tested on various screen sizes
- CSS Grid/Flexbox based for reliable layout

## Testing

### Dev Server
The changes are compatible with the development server:
```bash
cd /Users/jordantian/Documents/hacknation/webgal-game/WebGAL/packages/webgal
npm run dev
```

Server will start on `http://localhost:3001/` (or next available port)

### Test Scenarios

1. **Single Character (Center)**: Should display normally
2. **Left Only**: Should display normally
3. **Right Only**: Should display normally
4. **Left + Right**: Triggers interrogation mode
5. **Character Switching**: Should smoothly transition between modes

## Example Interrogation Scenes

### Scene 1: Harper Interrogation (Updated)

```webgal
label:harper_intro;
  stopmusic;
  playmusic:interrogation_tense.ogg -volume=0.5 -loop;
  bg:interrogation_room.png;

  // Set up interrogation layout
  show:detective_neutral.png -position=left;
  show:harper_neutral.png -position=right;

  detective "Ms. Lin, thank you for your cooperation. I know this has been a difficult night.";

  harper:harper_worried.png "I just... I can't believe this is happening. Elias is really missing?";

  detective:detective_firm.png "I need you to be completely honest with me. Can you do that?";
```

### Scene 2: Marcus Confrontation

```webgal
label:marcus_confrontation;
  bg:interrogation_room.png;

  show:detective_serious.png -position=left;
  show:marcus_defensive.png -position=right;

  detective "Your story doesn't add up, Marcus.";

  marcus:marcus_angry.png "Are you calling me a liar?";

  detective:detective_calm.png "I'm asking you to tell me the truth.";
```

## Future Enhancements (Potential)

1. **Custom Width Configuration**: Allow scene scripts to specify figure widths
2. **Animation Presets**: Add special entrance animations for interrogation scenes
3. **Lighting Effects**: Add spotlight effects on characters
4. **Position Variants**: Support for three-person interrogations
5. **Text Alignment Options**: Allow left/right alignment for specific dramatic effects

## Troubleshooting

### Issue: Interrogation mode not activating
**Solution**: Ensure both `-position=left` AND `-position=right` are used

### Issue: Characters too large/small
**Solution**: Check source image dimensions and aspect ratios

### Issue: Text box overlapping characters
**Solution**: Verify responsive breakpoints are loading correctly

### Issue: Layout breaks on mobile
**Solution**: Test with smallest breakpoint (< 768px) settings

## Credits

**Implementation Date**: November 2025
**Design Goal**: Create cinematic, dramatic confrontation scenes for detective game
**Compatibility**: WebGAL 4.5.16+

## Summary

The new interrogation UI provides a much more impactful visual presentation for detective/suspect confrontations. The automatic detection system ensures it only activates when appropriate, maintaining compatibility with existing scenes while providing a dramatic new layout option for interrogation sequences.
