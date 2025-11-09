# Harper Emotional States - Quick Reference

## Before vs After

### BEFORE (5 states, 3 animations unused)
```
calm      → Harper_Calm.webp
nervous   → Harper_nervous.webp
defensive → Harper_lookingDown.webp  ❌ Wrong semantic mapping
angry     → Harper_angry.webp        ❌ BROKEN - wrong case!
breaking  → Harper_breaking.webp

❌ Harper_surprised.webp - NOT MAPPED
❌ Harper_Agreeing.webp - NOT MAPPED
❌ Harper_defensive.webp - NOT MAPPED
❌ "confused" → BROKEN IMAGE
```

### AFTER (8 primary + 30+ fallbacks, all working)
```
PRIMARY STATES (8):
calm        → Harper_Calm.webp
nervous     → Harper_nervous.webp
defensive   → Harper_defensive.webp    ✅ Fixed mapping
angry       → Harper_Angry.webp        ✅ Fixed case!
breaking    → Harper_breaking.webp
surprised   → Harper_surprised.webp    ✅ Now mapped
agreeing    → Harper_Agreeing.webp     ✅ Now mapped
lookingdown → Harper_lookingDown.webp  ✅ Now mapped

INTELLIGENT FALLBACKS (30+):
confused    → Harper_surprised.webp    ✅ No more broken images!
worried     → Harper_nervous.webp
panicked    → Harper_breaking.webp
scared      → Harper_nervous.webp
cooperative → Harper_Agreeing.webp
hostile     → Harper_Angry.webp
crying      → Harper_breaking.webp
evasive     → Harper_defensive.webp
shocked     → Harper_surprised.webp
composed    → Harper_Calm.webp
... and 20+ more!

UNKNOWN STATES:
anything else → Harper_nervous.webp (safe fallback) + console warning
```

## Real-World Example

**Scenario:** Claude generates emotional state "panicked" during interrogation

### Before:
```
STATE: panicked
❌ Not in animation map
❌ Code tries to load: /game/figure/undefined
❌ Browser shows broken image icon
❌ Player sees empty space where Harper should be
❌ Immersion broken
```

### After:
```
STATE: panicked
1. Normalize: "panicked" → lowercase
2. Check primary map: not found
3. Check fallback map: panicked → Harper_breaking.webp ✅
4. Load: /game/figure/Harper_breaking.webp
5. Display Harper's breaking animation (emotionally overwhelmed)
✅ Perfect match for "panicked" emotional state
✅ No errors, seamless experience
```

## Developer Usage

### Adding a New Emotional State

**Option 1: Use existing state**
Just tell Claude to use it in the prompt - it already works!

**Option 2: Add new fallback mapping**
Edit `index.tsx` line ~233-281:
```typescript
const fallbackMap: Record<string, string> = {
  // ... existing mappings ...
  'your-new-state': 'Harper_appropriate-animation.webp',
};
```

**Option 3: Add new animation file**
1. Add `Harper_NewState.webp` to `/public/game/figure/`
2. Add to primary map in `index.tsx`:
```typescript
const primaryAnimationMap: Record<string, string> = {
  // ... existing mappings ...
  'newstate': 'Harper_NewState.webp',
};
```
3. Update system prompt in `harperPrompt.ts` to tell Claude about it

## Testing Your Changes

```bash
# Run the test suite
node test-emotional-states.js

# Build the project
npm run build

# Check for TypeScript errors
# (Build will fail if there are type errors)
```

## Common Patterns

### Stress-Based State Selection (for LLM prompt)
```
Low Stress (0-30):   calm, composed, collected
Medium (30-60):      nervous, uncertain, evasive
High (60-80):        defensive, worried, panicked
Breaking (80-100):   breaking, crying, overwhelmed
```

### Trust-Based State Selection
```
Low Trust (0-30):    defensive, evasive, hostile
Medium (30-60):      nervous, guarded, uncertain
High (60-100):       agreeing, cooperative, accepting
```

### Response to Evidence
```
Caught in lie:       shocked, panicked, defensive
Confronted:          angry, defiant, hostile
Sympathetic:         breaking, crying, cooperative
```

## Files Changed
- ✅ `src/Core/gameScripts/llmInterrogate/index.tsx` (animation mapping)
- ✅ `src/Core/controller/llm/harperPrompt.ts` (LLM guidance)

## Files Created
- ✅ `test-emotional-states.js` (test suite)
- ✅ `EMOTIONAL_STATES_GUIDE.md` (full documentation)
- ✅ `CHANGES_SUMMARY.md` (detailed changes)
- ✅ `QUICK_REFERENCE.md` (this file)

---
**Quick tip:** When in doubt, the system defaults to `nervous` - the most versatile intermediate state!
