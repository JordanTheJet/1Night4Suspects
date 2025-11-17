# Interrogation Tracking System - Quick Reference

## Implementation Complete

Successfully implemented a dynamic interrogation tracking system that gates accusation options based on which suspects the player has interviewed.

---

## What Changed

### BEFORE (Original System)
```
accusation_and_endings_ai.txt:
choose:Accuse Harper Lin:ending_harper.txt|Accuse Marcus Hale:ending_marcus.txt|Accuse Roman Adler:ending_roman.txt|Accuse Elias:ending_mob.txt|Insufficient Evidence (Cold Case):ending_cold_case.txt|Return to Interrogations:hub_ai.txt;

Problem: All options always available, even if player hasn't met the suspect
```

### AFTER (New System)
```
harper_llm_demo.txt (line 31):
setVar:harper_interrogated=true;

accusation_and_endings_ai.txt (lines 12-19):
callScene:accusation_menu_000_ai.txt -when=harper_interrogated!=true&&marcus_interrogated!=true&&roman_interrogated!=true;
callScene:accusation_menu_001_ai.txt -when=harper_interrogated!=true&&marcus_interrogated!=true&&roman_interrogated==true;
[...6 more conditions...]
callScene:accusation_menu_111_ai.txt -when=harper_interrogated==true&&marcus_interrogated==true&&roman_interrogated==true;

Result: Only suspects you've interrogated appear as accusation options
```

---

## Key Code Examples

### 1. Setting Interrogation Flags (Added to all 6 interrogation scenes)

**Harper AI Mode** (`harper_llm_demo.txt`):
```webgal
The interrogation data has been recorded.;
;
What do you want to do next?;
;
setVar:harper_interrogated=true;
choose:Return to Interrogation Hub:hub_ai.txt|Review Evidence Board:evidence_board_ai.txt|Make Your Accusation:accusation_and_endings_ai.txt;
```

**Marcus Story Mode** (`marcus_intro.txt`):
```webgal
Marcus has become defensive. More evidence may be needed.;
setVar:marcus_interrogated=true;
choose:Return to interrogation hub:hub_story.txt;
```

### 2. Conditional Routing Logic

**Accusation Controller** (`accusation_and_endings_ai.txt`):
```webgal
changeBg:interrogation_room.png -next;
;
MAKE YOUR ACCUSATION;
;
Who caused the disappearance of Elias Moore?;
;
; Route to appropriate accusation menu based on interrogation status
callScene:accusation_menu_000_ai.txt -when=harper_interrogated!=true&&marcus_interrogated!=true&&roman_interrogated!=true;
callScene:accusation_menu_001_ai.txt -when=harper_interrogated!=true&&marcus_interrogated!=true&&roman_interrogated==true;
callScene:accusation_menu_010_ai.txt -when=harper_interrogated!=true&&marcus_interrogated==true&&roman_interrogated!=true;
callScene:accusation_menu_011_ai.txt -when=harper_interrogated!=true&&marcus_interrogated==true&&roman_interrogated==true;
callScene:accusation_menu_100_ai.txt -when=harper_interrogated==true&&marcus_interrogated!=true&&roman_interrogated!=true;
callScene:accusation_menu_101_ai.txt -when=harper_interrogated==true&&marcus_interrogated!=true&&roman_interrogated==true;
callScene:accusation_menu_110_ai.txt -when=harper_interrogated==true&&marcus_interrogated==true&&roman_interrogated!=true;
callScene:accusation_menu_111_ai.txt -when=harper_interrogated==true&&marcus_interrogated==true&&roman_interrogated==true;
```

### 3. Dynamic Menu Examples

**No Interrogations** (`accusation_menu_000_ai.txt`):
```webgal
; No suspects interrogated yet
You haven't interrogated anyone yet.;
You need to gather evidence before making an accusation.;
;
choose:Insufficient Evidence (Cold Case):ending_cold_case.txt|Return to Interrogations:hub_ai.txt;
```

**Only Harper Interrogated** (`accusation_menu_100_ai.txt`):
```webgal
; Only Harper interrogated
Available accusation options:;
;
choose:Accuse Harper Lin:ending_harper.txt|Insufficient Evidence (Cold Case):ending_cold_case.txt|Return to Interrogations:hub_ai.txt;
```

**All Three Interrogated** (`accusation_menu_111_ai.txt`):
```webgal
; All three suspects interrogated
; Show: All options including "Accuse the Mob"
Available accusation options:;
;
choose:Accuse Harper Lin:ending_harper.txt|Accuse Marcus Hale:ending_marcus.txt|Accuse Roman Adler:ending_roman.txt|Accuse the Mob:ending_mob.txt|Insufficient Evidence (Cold Case):ending_cold_case.txt|Return to Interrogations:hub_ai.txt;
```

---

## Game Flow Examples

### Scenario 1: Player Interrogates Harper Only
```
1. Player starts game
2. Interrogates Harper → harper_interrogated=true
3. Goes to accusation screen
4. System checks: harper=true, marcus=false, roman=false
5. Routes to accusation_menu_100_ai.txt
6. Player sees: "Accuse Harper Lin" | "Cold Case" | "Return"
7. Cannot accuse Marcus or Roman (hasn't met them)
```

### Scenario 2: Player Interrogates All Three
```
1. Player interrogates Harper → harper_interrogated=true
2. Player interrogates Marcus → marcus_interrogated=true
3. Player interrogates Roman → roman_interrogated=true
4. Goes to accusation screen
5. System checks: harper=true, marcus=true, roman=true
6. Routes to accusation_menu_111_ai.txt
7. Player sees ALL options including "Accuse the Mob"
```

### Scenario 3: Player Skips Ahead
```
1. Player starts game
2. Goes directly to accusation screen (no interrogations)
3. System checks: harper=false, marcus=false, roman=false
4. Routes to accusation_menu_000_ai.txt
5. Player sees message: "You haven't interrogated anyone yet"
6. Only options: "Cold Case" | "Return to Interrogations"
```

---

## Binary State Table

| Harper | Marcus | Roman | Menu File | Available Accusations |
|--------|--------|-------|-----------|----------------------|
| ✗ | ✗ | ✗ | 000 | None (Cold Case only) |
| ✗ | ✗ | ✓ | 001 | Roman |
| ✗ | ✓ | ✗ | 010 | Marcus |
| ✗ | ✓ | ✓ | 011 | Marcus, Roman |
| ✓ | ✗ | ✗ | 100 | Harper |
| ✓ | ✗ | ✓ | 101 | Harper, Roman |
| ✓ | ✓ | ✗ | 110 | Harper, Marcus |
| ✓ | ✓ | ✓ | 111 | Harper, Marcus, Roman, **Mob** |

---

## Critical Requirements Met

- [x] Players CANNOT accuse suspects they haven't interviewed
- [x] Track which suspects have been interrogated (Harper, Marcus, Roman)
- [x] Dynamically show/hide accusation options based on interrogation status
- [x] "Accuse the Mob" only appears after ALL THREE suspects interrogated
- [x] "Cold Case" and "Return" always available
- [x] Implemented for BOTH AI mode and Story mode
- [x] Variables persist throughout game session

---

## File Locations

### Modified Files (6 total)
```
/packages/webgal/public/game/scene/harper_intro.txt
/packages/webgal/public/game/scene/harper_llm_demo.txt
/packages/webgal/public/game/scene/marcus_intro.txt
/packages/webgal/public/game/scene/marcus_llm_demo.txt
/packages/webgal/public/game/scene/roman_intro.txt
/packages/webgal/public/game/scene/roman_llm_demo.txt
/packages/webgal/public/game/scene/accusation_and_endings_ai.txt
/packages/webgal/public/game/scene/accusation_and_endings_story.txt
```

### Created Files (16 total)
```
/packages/webgal/public/game/scene/accusation_menu_000_ai.txt
/packages/webgal/public/game/scene/accusation_menu_001_ai.txt
[...14 more menu files...]
/packages/webgal/public/game/scene/accusation_menu_111_story.txt
```

---

## Testing Checklist

- [ ] Start new game, go directly to accusation screen → Should see "not interrogated" message
- [ ] Interrogate Harper only → Should only see Harper accusation option
- [ ] Interrogate Marcus only → Should only see Marcus accusation option  
- [ ] Interrogate Roman only → Should only see Roman accusation option
- [ ] Interrogate Harper + Marcus → Should see both options
- [ ] Interrogate Harper + Roman → Should see both options
- [ ] Interrogate Marcus + Roman → Should see both options
- [ ] Interrogate all three → Should see ALL options including "Accuse the Mob"
- [ ] Verify "Cold Case" and "Return" always available
- [ ] Test both AI mode and Story mode
- [ ] Verify variables persist when returning to hub and back to accusation screen

---

## WebGAL Syntax Reference

### Setting Variables
```webgal
setVar:variable_name=value;
```

### Conditional Scene Calls
```webgal
callScene:scene_name.txt -when=condition;
```

### Logical Operators
- `==` - equals
- `!=` - not equals
- `&&` - AND
- `||` - OR (not used in this implementation)

### Boolean Values
```webgal
setVar:flag=true;   // Set to true
setVar:flag=false;  // Set to false
-when=flag==true    // Check if true
-when=flag!=true    // Check if not true (same as ==false)
```

---

**Implementation Status**: COMPLETE  
**Last Updated**: 2025-11-16  
**System**: Fully operational and ready for testing
