# Harper Emotional States System - Implementation Guide

## Overview

The Harper interrogation system now supports **8 primary emotional state animations** with **30+ fallback mappings** for LLM-generated emotional states. This ensures the character animation system is robust and handles any emotional state Claude might generate during interrogation.

## Changes Made

### 1. Expanded Animation Mapping (`index.tsx`)

**Location**: `/WebGAL/packages/webgal/src/Core/gameScripts/llmInterrogate/index.tsx` (lines 215-299)

#### Primary Animation States (8 total)
These are the core emotional states mapped directly to animation files:

| Emotional State | Animation File | Use Case |
|----------------|----------------|----------|
| `calm` | Harper_Calm.webp | Composed, collected, in control |
| `nervous` | Harper_nervous.webp | Anxious, uncertain, under pressure |
| `defensive` | Harper_defensive.webp | Guarded, evasive, protecting self |
| `angry` | Harper_Angry.webp | Hostile, aggressive, confrontational |
| `breaking` | Harper_breaking.webp | Emotional breakdown, close to confession |
| `surprised` | Harper_surprised.webp | Shocked, caught off-guard |
| `agreeing` | Harper_Agreeing.webp | Cooperative, compliant, accepting |
| `lookingdown` | Harper_lookingDown.webp | Withdrawn, ashamed, avoiding eye contact |

#### Fallback Mappings (30+ states)

The system includes intelligent fallbacks for common emotional states Claude might generate:

**Confusion & Uncertainty:**
- `confused` → Harper_surprised.webp
- `uncertain`, `unsure` → Harper_nervous.webp

**Worry & Fear:**
- `worried`, `scared`, `frightened` → Harper_nervous.webp
- `panicked`, `terrified` → Harper_breaking.webp

**Cooperation:**
- `cooperative`, `agreeable`, `compliant`, `accepting` → Harper_Agreeing.webp

**Hostility:**
- `hostile`, `aggressive`, `defiant` → Harper_Angry.webp
- `resistant` → Harper_defensive.webp

**Emotional Breakdown:**
- `crying`, `tearful`, `emotional`, `overwhelmed` → Harper_breaking.webp

**Evasion:**
- `evasive`, `guarded`, `closed off` → Harper_defensive.webp
- `withdrawn` → Harper_lookingDown.webp

**Shock:**
- `shocked`, `startled`, `stunned`, `disbelief` → Harper_surprised.webp

**Composure:**
- `composed`, `collected`, `controlled`, `stoic` → Harper_Calm.webp

#### Default Fallback

If Claude generates an unknown emotional state not in the mappings, the system defaults to `Harper_nervous.webp` (the most versatile intermediate state) and logs a console warning for debugging.

### 2. Case Sensitivity Handling

The system now:
- Normalizes all emotional states to lowercase with `.toLowerCase().trim()`
- Handles variations like `Calm`, `NERVOUS`, `Angry` correctly
- Fixes the critical bug where code used `Harper_angry.webp` but the file is `Harper_Angry.webp`

### 3. Updated System Prompt (`harperPrompt.ts`)

**Location**: `/WebGAL/packages/webgal/src/Core/controller/llm/harperPrompt.ts`

Added explicit guidance to Claude about available emotional states:

```
4. **Choose appropriate emotional states** from these available animations:
   - **Primary states**: calm, nervous, defensive, angry, breaking, surprised, agreeing, lookingDown
   - **Also supported**: confused, worried, panicked, scared, cooperative, hostile, crying, tearful,
                         evasive, guarded, shocked, composed
   - Use specific emotions that match Harper's current mental state based on stress/trust levels
```

The prompt now explicitly lists all supported states and reminds Claude to use them in the STATE field of the response format.

## Testing

A comprehensive test suite was created (`test-emotional-states.js`) that verifies:

1. ✅ All 8 primary animations map correctly
2. ✅ Case variations (Calm, NERVOUS, Angry) normalize properly
3. ✅ All fallback mappings work as expected
4. ✅ Unknown states fall back to nervous animation
5. ✅ All animation files are referenced in the mappings

**Test Results**: 24/24 tests passed ✅

## File Structure

```
WebGAL/packages/webgal/
├── public/game/figure/              # Source animation files
│   ├── Harper_Agreeing.webp         # Capital A
│   ├── Harper_Angry.webp            # Capital A
│   ├── Harper_breaking.webp
│   ├── Harper_Calm.webp
│   ├── Harper_defensive.webp
│   ├── Harper_lookingDown.webp
│   ├── Harper_nervous.webp
│   └── Harper_surprised.webp
│
├── src/Core/gameScripts/llmInterrogate/
│   ├── index.tsx                    # Animation mapping logic
│   └── llmInterrogate.module.scss
│
└── src/Core/controller/llm/
    ├── harperPrompt.ts              # System prompt with state guidance
    └── interrogationController.ts
```

## Benefits

### For Developers:
1. **Robust Error Handling**: No more broken image icons from unknown emotional states
2. **Maintainable**: Single source of truth for animation mappings with clear comments
3. **Debuggable**: Console warnings when unknown states are used
4. **Extensible**: Easy to add new animations or fallback mappings

### For LLM Integration:
1. **Flexible**: Claude can use nuanced emotional states (confused, panicked, etc.)
2. **Guided**: System prompt provides clear state options to reduce errors
3. **Forgiving**: Fallback system handles variations and unknowns gracefully

### For Players:
1. **More Expressive**: 8 distinct animations create richer character portrayal
2. **Natural Flow**: Appropriate emotional responses to interrogation tactics
3. **No Breaks**: System always displays a valid animation, maintaining immersion

## Usage Example

When Claude responds during interrogation:

```
RESPONSE: [panicked] "I... I don't know anything! Why are you asking me this?"
SUGGESTIONS: "Tell me about the dock" | "Where were you at 11 PM?"
STATE: panicked
```

The system will:
1. Parse `STATE: panicked`
2. Normalize to lowercase: `"panicked"`
3. Check primary map: Not found
4. Check fallback map: `panicked` → `Harper_breaking.webp` ✅
5. Display the breaking animation showing Harper's emotional distress

## Troubleshooting

### Issue: Animation not displaying
- **Check**: Browser console for the warning message showing which state was used
- **Verify**: The animation file exists in `public/game/figure/`
- **Solution**: Add the state to either primary or fallback maps

### Issue: Wrong animation displayed
- **Check**: The fallback mapping for that emotional state
- **Solution**: Update the mapping in `getHarperAnimation()` function

### Issue: LLM using unexpected states
- **Check**: The system prompt guidance in `harperPrompt.ts`
- **Solution**: Add common states to the prompt's state list

## Future Enhancements

Potential improvements to consider:

1. **Dynamic Blending**: Interpolate between animations for smoother transitions
2. **Micro-Expressions**: Add quick facial expression overlays (eye twitches, lip quivers)
3. **Context-Aware**: Select animations based on conversation history, not just current state
4. **Animation Sequences**: Chain multiple animations (nervous → breaking → crying)
5. **Custom State Creation**: Allow game developers to define new emotional states via config

## Code References

**Animation Mapping Function:**
```typescript
// Location: src/Core/gameScripts/llmInterrogate/index.tsx:216-299
const getHarperAnimation = (state: typeof emotionalState): string => {
  const normalizedState = state.toLowerCase().trim();

  // Primary mappings...
  // Fallback mappings...
  // Default fallback...
}
```

**System Prompt Guidance:**
```typescript
// Location: src/Core/controller/llm/harperPrompt.ts:134-137
4. **Choose appropriate emotional states** from these available animations:
   - **Primary states**: calm, nervous, defensive, angry, breaking, surprised, agreeing, lookingDown
   - **Also supported**: confused, worried, panicked, scared, cooperative, hostile, crying, tearful...
```

## Technical Notes

- **Type Safety**: Emotional state is typed as `string` (previously union type) for flexibility
- **Performance**: Map lookups are O(1) - no performance concerns
- **Build Size**: No impact - only code changes, no new assets
- **Compatibility**: Fully backward compatible with existing interrogation sessions

---

**Implementation Date**: November 2025
**Testing Status**: All tests passing ✅
**Build Status**: Production build successful ✅
**Ready for Production**: Yes ✅
