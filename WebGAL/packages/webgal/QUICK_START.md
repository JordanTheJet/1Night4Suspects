# LLM Integration - Quick Start

## 30-Second Setup

```bash
# 1. Setup API key
./setup-llm.sh
# Edit .env and add: VITE_ANTHROPIC_API_KEY=sk-ant-xxx

# 2. Start
npm run dev

# 3. Play
# Select "Harper Lin (AI Mode)" in game
```

---

## Files You Need to Know

### If something breaks:
```
src/Core/gameScripts/llmInterrogate/index.tsx  # Main component
src/Core/controller/llm/interrogationController.ts  # LLM logic
.env  # Your API key goes here
```

### Scene entry point:
```
public/game/scene/harper_llm_demo.txt  # Demo scene
public/game/scene/start.txt  # Menu with AI option
```

---

## Testing Checklist

```
[ ] npm run build  # Should succeed
[ ] npm run dev    # Should start server
[ ] Game loads     # No console errors
[ ] AI mode option appears in menu
[ ] Clicking AI mode shows intro
[ ] LLM interface loads
[ ] Suggestions appear
[ ] Clicking suggestions works
[ ] Custom input works
[ ] Stats update
[ ] End interrogation returns to game
```

---

## Common Issues

**"API Key not configured"**
```bash
# Check .env file exists
ls .env

# Check it has VITE_ANTHROPIC_API_KEY
cat .env

# Restart dev server after adding key
```

**Build fails**
```bash
# Rebuild parser
cd packages/parser && npm run build && cd ../../webgal

# Clear cache
rm -rf node_modules/.vite

# Rebuild webgal
npm run build
```

**UI not showing**
```bash
# Check console for errors
# Verify chooseContainer div exists in DOM
# Check React component mounted
```

---

## Demo Flow

1. **Show Static Mode** (30 sec)
   - Select "Harper Lin (Static Mode)"
   - Show pre-scripted dialogue
   - Point out fixed choices

2. **Show AI Mode** (2 min)
   - Return to menu
   - Select "Harper Lin (AI Mode)"
   - Read intro
   - **Highlight:** "Smart Suggestions"

3. **Interact** (3 min)
   - Click first suggestion
   - Show response + new suggestions
   - **Highlight:** "Questions evolve with context"
   - **Highlight:** "Stats update in real-time"
   - Try custom question
   - **Highlight:** "Can ask anything"

4. **Wrap Up** (30 sec)
   - End interrogation
   - Return to game
   - **Highlight:** "Seamless integration"

---

## Key Talking Points

- **Cost**: ~$0.0004 per question (extremely cheap)
- **Speed**: 1-2 second responses
- **Model**: Claude Haiku 4.5 (fast & smart)
- **UX**: Button-based, not chat (less intimidating)
- **Context**: AI remembers full conversation
- **Stats**: Real-time feedback on interrogation tactics

---

## Architecture in 3 Lines

1. WebGAL scene calls `llmInterrogate:Harper Lin`
2. React component shows UI with suggestion buttons
3. Clicking buttons → Claude API → New suggestions

---

## What Makes This Cool

✨ **It's a detective AI partner**, not just a chatbot
✨ **Suggests questions** rather than requiring them
✨ **Lowers barrier** to AI interaction (buttons > typing)
✨ **Context-aware** suggestions evolve naturally
✨ **Cost-efficient** enough for production use
✨ **Clean integration** into existing game engine

---

## If You Have 5 Minutes

Read: `LLM_INTEGRATION.md` (comprehensive guide)

## If You Have 1 Minute

Read: `IMPLEMENTATION_SUMMARY.md` (architecture + decisions)

## If You Have 10 Seconds

Read this file!

---

**Status:** ✅ Ready to demo
**Setup time:** ~2 minutes (add API key + start server)
**Wow factor:** 🚀 High

Good luck with the hackathon! 🎉
