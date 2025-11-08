# WebGAL Custom Commands Reference
## One Night, Four Friends - Technical Documentation

This document outlines all custom commands used in "One Night, Four Friends" and explains which are native WebGAL commands versus which require custom implementation.

---

## Table of Contents
1. [Native WebGAL Commands](#native-webgal-commands)
2. [Custom Game Commands](#custom-game-commands)
3. [Implementation Notes](#implementation-notes)
4. [WebGAL Syntax Conventions](#webgal-syntax-conventions)

---

## Native WebGAL Commands

These commands are built into the WebGAL engine and work without modification:

### Scene Control
```
bg:filename.png;
// Changes the background image
// Example: bg:interrogation_room.png;

playmusic:filename.ogg -volume=0.5 -loop;
// Plays background music with volume control and loop option
// Example: playmusic:interrogation_tense.ogg -volume=0.5 -loop;

stopmusic;
// Stops currently playing music

show:character.png -position=right;
// Displays a character sprite at specified position
// Positions: left, center, right
// Example: show:marcus_nervous.png -position=right;

hide:character.png;
// Hides a character sprite

wait:milliseconds;
// Pauses execution for specified time
// Example: wait:1000; (waits 1 second)
```

### Dialogue
```
speaker "Dialogue text here";
// Basic dialogue line
// Example: detective "Tell me what happened.";

narrator "Text for narrative descriptions";
// Narrator text (no character name shown)

speaker:expression.png "Dialogue with expression change";
// Changes character expression while speaking
// Example: marcus:marcus_angry.png "I didn't do it!";
```

### Flow Control
```
label:label_name;
// Creates a jump destination
// Example: label:marcus_intro;

jump:label_name;
// Jumps to specified label
// Example: jump:interrogation_hub;

menu:
  "Choice 1" -> label_destination_1
  "Choice 2" -> label_destination_2
  "Choice 3" -> label_destination_3
// Creates choice menu with branch destinations
```

### Variables (Native)
```
setVar:variable_name=value;
// Sets a variable
// Example: setVar:turns_remaining=12;

conditionCheck:variable_comparison;
// Checks a condition (if true, continues; if false, skips to next label)
// Example: conditionCheck:harper_stress>50;
```

---

## Custom Game Commands

These commands are **NOT** native to WebGAL and require custom implementation through WebGAL's plugin system or JavaScript integration:

### Stat Modification
```
modifyStat:suspect_stat +/-value;
// Modifies suspect statistics (stress, trust, lies)
// Examples:
modifyStat:harper_stress +10;
modifyStat:marcus_trust -5;
modifyStat:rowan_lies +1;

// Implementation: Custom function that updates game variables
// Updates UI stat displays in real-time
```

### Evidence System
```
showEvidence:evidence_id;
// Displays evidence overlay with details
// Example: showEvidence:boot_prints;

unlockEvidence:evidence_id;
// Makes evidence available for discovery
// Example: unlockEvidence:tranquilizer_bottle;

checkEvidence:evidence_id;
// Conditional check for evidence possession
// Example: checkEvidence:unsent_texts;

// Implementation: Evidence object management system
// Stores evidence state in variables like has_boot_prints=true
```

### Dialogue Tree Management
```
unlockDialogue:dialogue_id;
// Unlocks a dialogue tree for later use
// Example: unlockDialogue:marcus_dock_confrontation;

// Implementation: Sets boolean flags like marcus_dock_confrontation_unlocked=true
```

### Time Management
```
consumeTime:turns;
// Advances game timer by specified turns
// Example: consumeTime:2; (consumes 40 minutes)

// Implementation:
// - Decrements turns_remaining variable
// - Updates current_time display
// - Checks for game over condition (dawn arrival)
```

### Stat Checking
```
checkStat:condition;
// Conditional check for stat thresholds
// Examples:
checkStat:marcus_stress>60;
checkStat:harper_trust>=50;

// Implementation: Evaluates stat variables against conditions
```

### Flag Management
```
setFlag:flag_name;
// Sets a story flag (boolean true)
// Example: setFlag:harper_confession_obtained;

checkFlag:flag_name;
// Checks if flag is set
// Example: checkFlag:insurance_fraud_revealed;

// Implementation: Boolean variable management
```

### UI Elements
```
showTimerOverlay:show/hide;
// Displays/hides the countdown timer UI element
// Example: showTimerOverlay:show;

showStatOverlay:all/suspect_name;
// Shows suspect stat cards
// Example: showStatOverlay:all;

// Implementation: Custom UI overlay components
```

---

## Implementation Notes

### Required Custom Systems

#### 1. Stat Management System
```javascript
// Pseudocode for stat system
class SuspectStats {
  constructor(name, initialStress, initialTrust, initialLies) {
    this.name = name;
    this.stress = initialStress;
    this.trust = initialTrust;
    this.lies = initialLies;
  }

  modifyStat(statName, delta) {
    this[statName] = Math.max(0, Math.min(100, this[statName] + delta));
    this.updateUI();
  }
}
```

#### 2. Evidence System
```javascript
// Evidence management
const evidence = {
  boot_prints: {
    discovered: true,
    name: "Boot Prints at Overlook",
    description: "Size 11 Merrell boots matching Marcus's"
  },
  tranquilizer_bottle: {
    discovered: false,
    name: "Tranquilizer Bottle",
    description: "Lorazepam prescription in Marcus's bag"
  }
  // ... more evidence
};

function unlockEvidence(evidenceId) {
  evidence[evidenceId].discovered = true;
  notifyPlayer(`New Evidence: ${evidence[evidenceId].name}`);
}
```

#### 3. Time System
```javascript
// Time management
let currentTime = 192; // 3:12 AM in minutes since midnight
let turnsRemaining = 12;

function consumeTime(turns) {
  turnsRemaining -= turns;
  currentTime += (turns * 20); // Each turn = 20 minutes

  if (turnsRemaining <= 0) {
    jumpTo('dawn_arrives');
  }

  updateTimerDisplay();
}
```

### Integration with WebGAL

WebGAL allows custom commands through:

1. **Custom Scripts**: Extend WebGAL's script parser
2. **Plugin System**: Create plugins for game-specific logic
3. **React Components**: Add custom UI overlays
4. **Event Listeners**: Hook into dialogue events

Example integration:
```javascript
// Register custom command handler
WebGAL.registerCommand('modifyStat', (args) => {
  const [stat, delta] = args.split(' ');
  const [suspect, statName] = stat.split('_');

  suspectStats[suspect][statName] += parseInt(delta);
  updateStatDisplay(suspect);
});
```

---

## WebGAL Syntax Conventions

### Best Practices

#### 1. Label Naming
```
// Use descriptive, hierarchical names
label:marcus_intro;           // Initial interrogation
label:marcus_dock_confrontation; // Deep dive scene
label:marcus_betrayal_story;  // Specific story beat

// Avoid generic names
label:scene_1; // BAD
label:dialogue_02; // BAD
```

#### 2. Choice Menus
```
// Good structure
menu:
  "Neutral approach" -> path_neutral
  "Aggressive questioning" -> path_aggressive
  "Show empathy" -> path_empathetic

// Each path should have clear consequences
```

#### 3. Conditional Flow
```
// Check conditions before branching
conditionCheck:has_evidence:boot_prints AND marcus_stress>60;
jump:marcus_breaks_down;

// Otherwise continue to alternative path
jump:marcus_stays_defensive;
```

#### 4. File Organization
```
// Separate scripts by function
start.txt              // Entry point
briefing.txt           // Case introduction
interrogation_hub.txt  // Main game loop
harper_interrogation.txt // Character-specific dialogue
marcus_interrogation.txt
rowan_interrogation.txt
evidence_board.txt     // Evidence review
accusation_and_endings.txt // Conclusion
```

---

## Command Quick Reference

| Command | Type | Purpose |
|---------|------|---------|
| `bg:` | Native | Change background |
| `playmusic:` | Native | Play audio |
| `show:` | Native | Display sprite |
| `narrator` | Native | Narration text |
| `menu:` | Native | Create choices |
| `label:` | Native | Jump point |
| `jump:` | Native | Go to label |
| `setVar:` | Native | Set variable |
| `modifyStat:` | **Custom** | Modify suspect stats |
| `showEvidence:` | **Custom** | Display evidence |
| `unlockEvidence:` | **Custom** | Make evidence available |
| `consumeTime:` | **Custom** | Advance timer |
| `checkEvidence:` | **Custom** | Check evidence ownership |
| `unlockDialogue:` | **Custom** | Enable dialogue tree |

---

## Testing Custom Commands

### Development Checklist

- [ ] All `modifyStat` commands update UI in real-time
- [ ] Evidence unlocks trigger notifications
- [ ] Time consumption updates clock display
- [ ] Stat thresholds properly gate dialogue trees
- [ ] Conditional checks work correctly (AND/OR logic)
- [ ] Evidence presentation shows proper overlays
- [ ] All labels referenced in `jump:` commands exist
- [ ] Menu choices lead to valid destinations
- [ ] Variables are initialized before use
- [ ] No syntax errors in command formatting

### Common Errors

```
// WRONG: Missing semicolon
modifyStat:harper_stress +10

// CORRECT:
modifyStat:harper_stress +10;

// WRONG: Invalid stat name
modifyStat:harper_angry +5;

// CORRECT: Use defined stats (stress, trust, lies)
modifyStat:harper_stress +5;

// WRONG: Evidence ID doesn't match case JSON
showEvidence:marcus_boots;

// CORRECT: Use exact ID from case JSON
showEvidence:boot_prints;
```

---

## Future Enhancements

Potential custom commands for expanded features:

```
playVoiceover:filename.ogg;
// Character voice acting

showFlashback:scene_id;
// Visual flashback sequences

applyFilter:sepia/blur/darken;
// Visual effects for atmosphere

vibrate:pattern;
// Mobile haptic feedback on tension moments

autoSave:checkpoint_name;
// Automatic save points

achievementUnlock:achievement_id;
// Achievement system integration
```

---

## Additional Resources

- **WebGAL Documentation**: https://docs.webgal.org
- **WebGAL GitHub**: https://github.com/MakinoharaShoko/WebGAL
- **Plugin Development**: See `/webgal-game/plugins/` directory
- **Custom Commands**: See `/webgal-game/src/commands/` directory

---

**Document Version**: 1.0
**Last Updated**: 2025-11-08
**Game**: One Night, Four Friends MVP
**Author**: 1Night4Suspects Development Team
