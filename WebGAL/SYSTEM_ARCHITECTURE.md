# Interrogation Tracking System Architecture

## System Flow Diagram

```
┌─────────────────────────────────────────────────────────────────┐
│                        GAME START                                │
│                  (All variables = undefined)                     │
└─────────────────────────────────┬───────────────────────────────┘
                                  │
                                  ▼
                    ┌─────────────────────────┐
                    │    Interrogation Hub    │
                    │   (hub_ai.txt or        │
                    │    hub_story.txt)       │
                    └───────┬─────────────────┘
                            │
            ┌───────────────┼───────────────┐
            │               │               │
            ▼               ▼               ▼
     ┌──────────┐    ┌──────────┐    ┌──────────┐
     │  Harper  │    │  Marcus  │    │  Roman   │
     │Interrogate│    │Interrogate│    │Interrogate│
     └─────┬────┘    └─────┬────┘    └─────┬────┘
           │               │               │
           ▼               ▼               ▼
    setVar:harper   setVar:marcus   setVar:roman
    _interrogated   _interrogated   _interrogated
        =true           =true           =true
           │               │               │
           └───────────────┼───────────────┘
                          │
                          ▼
              ┌───────────────────────┐
              │ Player Chooses        │
              │ "Make Your Accusation"│
              └───────────┬───────────┘
                          │
                          ▼
        ┌─────────────────────────────────────┐
        │  accusation_and_endings_[mode].txt  │
        │                                     │
        │  Evaluates all 8 combinations:     │
        │  000, 001, 010, 011, 100, 101,    │
        │  110, 111                          │
        └───────────┬─────────────────────────┘
                    │
        ┌───────────┴────────────┐
        │  callScene with -when  │
        │  condition matching    │
        │  current state         │
        └───────────┬────────────┘
                    │
                    ▼
        ┌───────────────────────┐
        │  accusation_menu_XXX  │
        │  (appropriate menu)   │
        └───────────┬───────────┘
                    │
                    ▼
        ┌───────────────────────┐
        │  Dynamic choose menu  │
        │  with only available  │
        │  accusation options   │
        └───────────────────────┘
```

---

## State Transition Matrix

```
Initial State: [0, 0, 0] (No interrogations)
                    ↓
            ┌───────┼───────┐
            │       │       │
    [1,0,0] │  [0,1,0]  [0,0,1]
  (Harper)  │ (Marcus)  (Roman)
            │       │       │
        ┌───┴───┬───┴───┬───┴───┐
        │       │       │       │
    [1,1,0] [1,0,1] [0,1,1]    │
        │       │       │       │
        └───┬───┴───┬───┴───────┘
            │       │
            ▼       ▼
        [1,1,1] - ALL INTERROGATED
        (Unlocks "Accuse the Mob")
```

---

## Conditional Logic Tree

```
accusation_and_endings_[mode].txt
│
├─ IF harper==false && marcus==false && roman==false
│  └─> accusation_menu_000.txt (No options)
│
├─ IF harper==false && marcus==false && roman==true
│  └─> accusation_menu_001.txt (Roman only)
│
├─ IF harper==false && marcus==true && roman==false
│  └─> accusation_menu_010.txt (Marcus only)
│
├─ IF harper==false && marcus==true && roman==true
│  └─> accusation_menu_011.txt (Marcus + Roman)
│
├─ IF harper==true && marcus==false && roman==false
│  └─> accusation_menu_100.txt (Harper only)
│
├─ IF harper==true && marcus==false && roman==true
│  └─> accusation_menu_101.txt (Harper + Roman)
│
├─ IF harper==true && marcus==true && roman==false
│  └─> accusation_menu_110.txt (Harper + Marcus)
│
└─ IF harper==true && marcus==true && roman==true
   └─> accusation_menu_111.txt (ALL + Mob option) ★
```

---

## Menu Content Breakdown

### Base Options (Always Present)
```
- Insufficient Evidence (Cold Case)
- Return to Interrogations
```

### Variable Options (Conditionally Added)

| State | Harper | Marcus | Roman | Mob | Total Options |
|-------|--------|--------|-------|-----|---------------|
| 000   | ✗      | ✗      | ✗     | ✗   | 2 (base only) |
| 001   | ✗      | ✗      | ✓     | ✗   | 3             |
| 010   | ✗      | ✓      | ✗     | ✗   | 3             |
| 011   | ✗      | ✓      | ✓     | ✗   | 4             |
| 100   | ✓      | ✗      | ✗     | ✗   | 3             |
| 101   | ✓      | ✗      | ✓     | ✗   | 4             |
| 110   | ✓      | ✓      | ✗     | ✗   | 4             |
| 111   | ✓      | ✓      | ✓     | ✓   | 6 (maximum)   |

---

## Data Flow Architecture

```
┌─────────────────────────────────────────────────────────┐
│                  INTERROGATION LAYER                     │
├─────────────────────────────────────────────────────────┤
│  harper_intro.txt        →  setVar:harper_interrogated  │
│  harper_llm_demo.txt     →  setVar:harper_interrogated  │
│  marcus_intro.txt        →  setVar:marcus_interrogated  │
│  marcus_llm_demo.txt     →  setVar:marcus_interrogated  │
│  roman_intro.txt         →  setVar:roman_interrogated   │
│  roman_llm_demo.txt      →  setVar:roman_interrogated   │
└─────────────────────────────────────────────────────────┘
                          ↓
                     [Variables Set]
                          ↓
┌─────────────────────────────────────────────────────────┐
│                   ROUTING LAYER                          │
├─────────────────────────────────────────────────────────┤
│  accusation_and_endings_ai.txt                          │
│  accusation_and_endings_story.txt                       │
│                                                          │
│  Evaluates: harper && marcus && roman                   │
│  Routes to: accusation_menu_[binary].txt                │
└─────────────────────────────────────────────────────────┘
                          ↓
                    [Menu Selected]
                          ↓
┌─────────────────────────────────────────────────────────┐
│                  PRESENTATION LAYER                      │
├─────────────────────────────────────────────────────────┤
│  accusation_menu_000_[mode].txt                         │
│  accusation_menu_001_[mode].txt                         │
│  ... (8 menu files per mode)                            │
│  accusation_menu_111_[mode].txt                         │
│                                                          │
│  Displays: Dynamic choose statement                     │
└─────────────────────────────────────────────────────────┘
                          ↓
                    [Player Choice]
                          ↓
┌─────────────────────────────────────────────────────────┐
│                     ENDING LAYER                         │
├─────────────────────────────────────────────────────────┤
│  ending_harper.txt                                      │
│  ending_marcus.txt                                      │
│  ending_roman.txt                                       │
│  ending_mob.txt                                         │
│  ending_cold_case.txt                                   │
└─────────────────────────────────────────────────────────┘
```

---

## Variable State Management

### Lifecycle
```
1. Game Start      → Variables undefined (falsy)
2. Interrogation   → Variable set to true
3. Navigation      → Variables persist
4. Accusation Menu → Variables evaluated
5. Game Reset      → Variables cleared
```

### Persistence Rules
- Variables persist across scene changes
- Variables persist when returning to hub
- Variables persist when visiting accusation screen multiple times
- Variables reset only on new game start

### Truth Table
```
Undefined → Treated as false
true      → Treated as true
false     → Treated as false (not used in this implementation)
```

---

## Integration Points

### Hub Integration
```
hub_ai.txt / hub_story.txt
│
├─> Interrogate Harper → harper_[intro|llm_demo].txt
├─> Interrogate Marcus → marcus_[intro|llm_demo].txt
├─> Interrogate Roman → roman_[intro|llm_demo].txt
└─> Make Accusation → accusation_and_endings_[mode].txt
```

### Interrogation Exit Points
All interrogation scenes exit to:
- Return to Interrogation Hub
- (AI mode only) Review Evidence Board
- (AI mode only) Make Your Accusation

### Accusation Exit Points
All accusation menus provide:
- Accuse [Suspect] → ending_[suspect].txt
- Cold Case → ending_cold_case.txt
- Return to Interrogations → hub_[mode].txt

---

## Error Handling & Failsafes

### No Match Scenario
If somehow no conditions match (should be impossible):
- WebGAL will not execute any callScene
- Player remains on accusation_and_endings screen
- Mitigation: All 8 possible states are covered

### Missing Variable Scenario
If variable is undefined:
- Treated as false/falsy by WebGAL
- Routes to appropriate low-state menu
- No crashes or errors

### Invalid Menu Reference
If menu file doesn't exist:
- WebGAL will show error or skip
- Mitigation: All menu files created and validated

### Always-Available Options
Even in worst case:
- "Cold Case" option always present
- "Return to Interrogations" always present
- Player never trapped in dead-end

---

## Performance Characteristics

### Computational Complexity
- **Time Complexity**: O(1) - Single condition evaluation
- **Space Complexity**: O(1) - Three boolean variables
- **Scene Loading**: Linear based on player path

### Memory Usage
- 3 boolean variables
- No arrays or complex data structures
- Minimal memory footprint

### Scalability
To add a 4th suspect:
- Add 1 new variable
- Create 8 new menu files (2^4 - 8 = 8 new states)
- Update routing logic with 16 total conditions
- Formula: 2^n menu files for n suspects

---

## File Naming Convention

### Pattern
```
accusation_menu_[binary]_[mode].txt

Where:
  [binary] = 3-digit binary (000-111)
             Position 1: Harper (1=interrogated, 0=not)
             Position 2: Marcus (1=interrogated, 0=not)
             Position 3: Roman (1=interrogated, 0=not)
  [mode]   = ai | story
```

### Examples
```
accusation_menu_000_ai.txt    → No interrogations, AI mode
accusation_menu_111_story.txt → All interrogated, Story mode
accusation_menu_101_ai.txt    → Harper + Roman, AI mode
```

---

## Maintenance & Extension Guide

### Adding a New Suspect
1. Create interrogation scene file
2. Add `setVar:suspect_interrogated=true;` at end
3. Calculate new menu count: 2^(n+1)
4. Create new menu files for all states
5. Update routing logic with new conditions
6. Add suspect to hub menu
7. Create ending file

### Modifying Conditions
1. Edit accusation_and_endings_[mode].txt
2. Update condition logic in callScene statements
3. Test all paths thoroughly
4. Update documentation

### Debugging Tips
- Add debug dialogue showing variable states
- Use comments to track which menu is loading
- Test each binary state individually
- Verify variable naming consistency

---

**Architecture Version**: 1.0  
**Last Updated**: 2025-11-16  
**Status**: Production Ready
