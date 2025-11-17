# Interrogation Tracking System Implementation

## Overview
This implementation adds a sophisticated interrogation tracking system that prevents players from accusing suspects they haven't interviewed yet, and unlocks special accusation options only after all suspects have been interrogated.

## Key Features Implemented

### 1. Interrogation Tracking Variables
Three boolean variables track which suspects have been interrogated:
- `harper_interrogated` - Set to `true` after Harper interrogation completes
- `marcus_interrogated` - Set to `true` after Marcus interrogation completes  
- `roman_interrogated` - Set to `true` after Roman interrogation completes

### 2. Dynamic Accusation Menus
The system creates 8 different accusation menu variations (one for each possible combination of interrogated suspects):
- **000**: No suspects interrogated - Only Cold Case and Return options
- **001**: Only Roman interrogated - Shows Roman accusation option
- **010**: Only Marcus interrogated - Shows Marcus accusation option
- **011**: Marcus & Roman interrogated - Shows both accusation options
- **100**: Only Harper interrogated - Shows Harper accusation option
- **101**: Harper & Roman interrogated - Shows both accusation options
- **110**: Harper & Marcus interrogated - Shows both accusation options
- **111**: All three interrogated - Shows all options including "Accuse the Mob"

### 3. Special "Accuse the Mob" Option
The "Accuse the Mob" option only appears after ALL THREE suspects have been interrogated, as requested.

## Files Modified

### Interrogation Scene Files (Added tracking variables)
All interrogation scenes now set a tracking variable when completed:

**AI Mode:**
- `/packages/webgal/public/game/scene/harper_llm_demo.txt` - Added `setVar:harper_interrogated=true;`
- `/packages/webgal/public/game/scene/marcus_llm_demo.txt` - Added `setVar:marcus_interrogated=true;`
- `/packages/webgal/public/game/scene/roman_llm_demo.txt` - Added `setVar:roman_interrogated=true;`

**Story Mode:**
- `/packages/webgal/public/game/scene/harper_intro.txt` - Added `setVar:harper_interrogated=true;`
- `/packages/webgal/public/game/scene/marcus_intro.txt` - Added `setVar:marcus_interrogated=true;`
- `/packages/webgal/public/game/scene/roman_intro.txt` - Added `setVar:roman_interrogated=true;`

### Accusation Controller Files (Conditional routing)
**AI Mode:**
- `/packages/webgal/public/game/scene/accusation_and_endings_ai.txt` - Routes to appropriate menu based on interrogation status

**Story Mode:**
- `/packages/webgal/public/game/scene/accusation_and_endings_story.txt` - Routes to appropriate menu based on interrogation status

## Files Created

### AI Mode Accusation Menus
- `/packages/webgal/public/game/scene/accusation_menu_000_ai.txt` - No interrogations
- `/packages/webgal/public/game/scene/accusation_menu_001_ai.txt` - Roman only
- `/packages/webgal/public/game/scene/accusation_menu_010_ai.txt` - Marcus only
- `/packages/webgal/public/game/scene/accusation_menu_011_ai.txt` - Marcus & Roman
- `/packages/webgal/public/game/scene/accusation_menu_100_ai.txt` - Harper only
- `/packages/webgal/public/game/scene/accusation_menu_101_ai.txt` - Harper & Roman
- `/packages/webgal/public/game/scene/accusation_menu_110_ai.txt` - Harper & Marcus
- `/packages/webgal/public/game/scene/accusation_menu_111_ai.txt` - All three (includes "Accuse the Mob")

### Story Mode Accusation Menus
- `/packages/webgal/public/game/scene/accusation_menu_000_story.txt` - No interrogations
- `/packages/webgal/public/game/scene/accusation_menu_001_story.txt` - Roman only
- `/packages/webgal/public/game/scene/accusation_menu_010_story.txt` - Marcus only
- `/packages/webgal/public/game/scene/accusation_menu_011_story.txt` - Marcus & Roman
- `/packages/webgal/public/game/scene/accusation_menu_100_story.txt` - Harper only
- `/packages/webgal/public/game/scene/accusation_menu_101_story.txt` - Harper & Roman
- `/packages/webgal/public/game/scene/accusation_menu_110_story.txt` - Harper & Marcus
- `/packages/webgal/public/game/scene/accusation_menu_111_story.txt` - All three (includes "Accuse the Mob")

## How It Works

### Flow Diagram
```
Player completes interrogation
    ↓
setVar sets interrogation flag to true
    ↓
Player navigates to accusation screen
    ↓
accusation_and_endings_[mode].txt evaluates all combinations
    ↓
callScene routes to appropriate menu (000-111)
    ↓
Menu displays only available accusation options
```

### Conditional Logic
The system uses WebGAL's conditional `callScene` with the `-when` parameter:

```
callScene:accusation_menu_111_ai.txt -when=harper_interrogated==true&&marcus_interrogated==true&&roman_interrogated==true;
```

This creates 8 branches covering all possible interrogation states (2³ = 8 combinations).

### Variable Persistence
WebGAL automatically persists these variables throughout the game session, so once a suspect is interrogated, their accusation option remains available even if the player returns to interrogate others.

## Player Experience

### Before Any Interrogations
- Player sees message: "You haven't interrogated anyone yet. You need to gather evidence before making an accusation."
- Only options: Cold Case | Return to Interrogations

### After Partial Interrogations
- Player can only accuse suspects they've actually talked to
- Encourages thorough investigation
- Prevents premature accusations

### After All Three Interrogations
- All individual suspect accusation options available
- Special "Accuse the Mob" option unlocks
- Full range of endings accessible
- Always retains Cold Case and Return options

## Technical Implementation Notes

### WebGAL Conditional Syntax
The implementation uses WebGAL's conditional operators:
- `==` for equality checks
- `!=` for inequality checks  
- `&&` for logical AND operations

### Boolean Variable Convention
Variables are set to the literal value `true`:
```
setVar:harper_interrogated=true;
```

And checked using boolean comparison:
```
-when=harper_interrogated==true
-when=harper_interrogated!=true
```

### Scene Organization
Each menu file is self-contained and includes:
1. Comment header explaining which suspects are interrogated
2. Optional narrative text
3. Dynamic choose statement with appropriate options

## Testing Recommendations

### Test Cases
1. **No interrogations**: Verify only Cold Case and Return appear
2. **Single interrogations**: Test each suspect individually
3. **Pair interrogations**: Test all 3 combinations of 2 suspects
4. **All interrogations**: Verify "Accuse the Mob" appears
5. **Order independence**: Interrogate in different orders to verify consistency
6. **Hub returns**: Return to hub and re-enter accusation screen

### Expected Behaviors
- Variables persist across scene transitions
- Accusation options never decrease (only increase as more suspects are interrogated)
- "Accuse the Mob" ONLY appears when all three are interrogated
- Cold Case and Return options always available
- No crashes or undefined scene references

## Future Enhancements

Potential improvements for consideration:
1. **Visual indicators**: Show which suspects have been interrogated in the hub
2. **Completion tracking**: Display "X/3 suspects interrogated"
3. **Clue requirements**: Require specific evidence discovery before accusations
4. **Multiple interrogation rounds**: Allow re-interrogating suspects with new evidence
5. **Confidence meter**: Track how strong the case is against each suspect
6. **Accusation warnings**: Warn player if they're about to accuse without sufficient evidence

## Troubleshooting

### If accusation options don't appear:
1. Verify the interrogation scene completed fully (reached the `setVar` line)
2. Check that variable names match exactly (case-sensitive)
3. Ensure the interrogation scene doesn't have early exits or errors

### If "Accuse the Mob" appears too early:
1. Check the conditional logic in accusation_and_endings_[mode].txt
2. Verify all three variables are required in the condition
3. Confirm no duplicate or conflicting callScene statements

### If variables reset:
1. WebGAL variables should persist during a session
2. Starting a new game will reset all variables
3. Ensure the game isn't inadvertently restarting

## Implementation Quality

This implementation follows WebGAL best practices:
- Clear variable naming conventions
- Comprehensive comment documentation
- Logical file organization
- Fail-safe design (always provides Cold Case/Return options)
- Scalable architecture (easy to add new suspects or conditions)
- No hardcoded magic numbers or unclear logic
- Separation of concerns (routing vs. menu display)

---

**Implementation Date**: 2025-11-16  
**WebGAL Version**: Compatible with standard WebGAL variable system  
**Total Files Modified**: 6  
**Total Files Created**: 16
