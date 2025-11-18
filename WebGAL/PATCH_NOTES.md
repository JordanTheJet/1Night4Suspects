# ONE NIGHT FOUR FRIENDS - Patch Notes

A detective noir visual novel with AI-powered interrogations. Track your investigation through a tense night at the precinct.

---

## Version 0.7.0 - "Captain Sullivan" Update (November 17, 2025)

### 🆕 New Features
- **AI-Powered Captain Consultation System**
  - Added Captain Frank Sullivan as an AI mentor character
  - Dynamic consultation mode where players can ask strategic questions
  - Captain provides investigation guidance based on evidence and experience
  - 11 emotion sprites for Captain (serious, stern, disappointed, jovial, etc.)
  - Distinct music track (suspicious.mp3) for consultation vs interrogation

### 🔧 Critical Story Fixes
- **Blood Type Consistency**: Fixed O+ vs AB+ discrepancy across all files
- **Timeline Logic**: Corrected 11:03-11:15 PM sequence to be physically possible
  - Added 11:05 PM: Marcus returns to house
  - Clarified Elias waits at dock alone until Harper arrives at 11:15 PM
- **Character Knowledge**: Limited Roman's unrealistic omniscient knowledge
  - Burner phone was unlocked (explains how he accessed it)
  - No longer knows Harper's exact financial split details
- **Character Voice Differentiation**: Each suspect now has distinct speech patterns
  - Harper: Anxious, rambling, uses filler words ("I mean...", "you know")
  - Marcus: Bitter, clipped responses, sarcastic
  - Roman: Precise, formal, banker vocabulary
- **Enhanced Character Motivation**: Significantly deepened Harper's emotional stakes
  - Increased debt from $180K to $290K
  - Gallery is her deceased mother's legacy
  - Added time pressure: 2 weeks until eviction
  - Was suicidal before Elias's offer

### 🎨 Visual Updates
- Added 11 Captain Sullivan character sprites
- Updated Captain Sullivan briefing scene with proper sprite references
- Fixed sprite file format (.png → .webp) across all Captain scenes

### 🎵 Audio
- Dynamic music system: Suspects use interrogation.mp3, Captain uses suspicious.mp3
- Ensures proper atmosphere for different conversation types

### 🔄 Technical
- Updated type system to include 'captain' as SuspectId
- Enhanced interrogation controller with Captain routing
- Added Captain animation mapping to LLM interrogation UI
- Improved character prompt structure with speech pattern sections

---

## Version 0.6.0 - "Timeline & Insurance" Update (November 17, 2025)

### 🔧 Major Story Restructuring
- **Realistic Insurance Fraud Scheme**
  - Changed from generic life insurance to key person insurance
  - Policy from StreamMetrics startup days (5 years ago)
  - Primary beneficiary: Marcus Hale (100%)
  - Secondary beneficiary: Harper Lin (100%)
  - Slayer rule mechanic: If Marcus suspected, Harper gets 100%
  - Reduced mob debt to $1.2M (mathematically sound)

### 📅 Timeline Improvements
- Moved 911 call from 2:15 AM to 1:15 AM (more realistic)
- Added detailed police response timeline:
  - 1:25 AM: First patrol arrives
  - 1:30-2:30 AM: Crime scene processing
  - 2:45 AM: Suspects processed
  - 3:12 AM: Detective Hyde arrives (game start)
- Fast rural response explained for realism

### 🎭 Character Updates
- **Captain Frank Sullivan** introduced (replaces generic briefing)
  - Irish-American working-class cop archetype
  - Opening briefing scene
  - Progressive evidence delivery scenes
  - Optional consultation scene
- **Detective Kyle Hyde** named as player character
- Maintained all existing character names (Harper, Marcus, Roman, Elias)

### 📝 Scene Files
- Created captain_sullivan_briefing.txt
- Created evidence_update_1.txt and evidence_update_2.txt
- Created captain_consultation.txt (story mode)
- Updated hub menus to include Captain consultation option

---

## Version 0.5.0 - "React 18 & Stability" Update (November 17, 2025)

### ⚙️ Technical Overhaul
- **Complete React 18 Migration**
  - Migrated from ReactDOM.render to createRoot API
  - Fixed all unmounting crashes and memory leaks
  - Proper cleanup of background processes
  - Eliminated "removeChild" errors

### 🔧 System Improvements
- **Unlimited Conversation History**
  - Removed 5-turn history limit
  - Claude's 200K token window supports full interrogations
  - Better context retention for complex questioning
- **Interrogation Tracking**
  - Removed old evidence board system
  - Implemented per-suspect state management
  - Better stat persistence across interrogations

### 🎯 UI/UX
- Improved intro scenes with better pacing
- Fixed stat change animations
- Enhanced loading states during AI responses
- Better error handling for API failures

---

## Version 0.4.0 - "Background System" Update (November 12-16, 2025)

### 🎭 Character System
- **Universal Background System**
  - Shared victim information across all interrogations
  - Master timeline accessible to all characters
  - Evidence database integration
  - Relationship history tracking
- Character renaming (internal refactoring)

### 🎵 Audio System
- Added BGM to all game sections:
  - Title screen music
  - Investigation hub music
  - Interrogation room ambiance
  - Ending scene music
- Volume controls and fade transitions

### 🔧 Bug Fixes
- Fixed narrative inconsistencies
- Resolved React unmounting crashes
- Fixed stat animation glitches
- Improved text display formatting

---

## Version 0.3.0 - "Full Interrogation Suite" Update (November 9, 2025)

### 🤖 AI Integration
- **All Suspects Interrogatable**
  - Harper Lin AI interrogation (emotional, anxious)
  - Marcus Hale AI interrogation (bitter, defensive)
  - Roman Adler AI interrogation (calculated, controlled)
- Each character has unique personality and knowledge
- Dynamic emotional states based on conversation

### 🎨 Character Animations
- Added complete sprite sets for all characters
- Emotional state visualization during interrogations
- Smooth transitions between character expressions
- Optimized sprite loading

### 📖 Expanded Story
- **Multiple Ending Paths**:
  - Accuse Harper (fraud conspiracy revealed)
  - Accuse Marcus (wrongful accusation)
  - Accuse Roman (protector's dilemma)
  - Accuse Unknown/Mob (cold case)
  - Insufficient evidence (failure state)
- Each ending has unique narrative consequences
- Evidence-based accusation system

### 🎨 Visual Polish
- Custom title screen PNG
- Improved interrogation room UI
- Better stat display (stress, trust, lies, contradictions)
- Loading indicators during AI responses

---

## Version 0.2.0 - "Smart Suggestions" Update (November 8-9, 2025)

### 🤖 AI Interrogation Foundation
- **LLM-Powered Interrogation System**
  - Claude AI integration for dynamic dialogue
  - Context-aware responses based on evidence
  - Stat tracking (stress, trust, lies, contradictions)
- **Smart Suggestions System**
  - AI-generated follow-up questions
  - Strategic guidance for interrogation tactics
  - Evidence presentation recommendations

### 🎯 Game Mechanics
- Real-time stat changes during interrogation
- Evidence presentation system
- Character state persistence
- Conversation history tracking

---

## Version 0.1.0 - Initial Release (November 8, 2025)

### 🎮 Core Game
- **Base Visual Novel Engine**
  - WebGAL integration
  - Scene scripting system
  - Basic dialogue system
- **Story Foundation**
  - Detective noir setting
  - Missing person mystery at lake house reunion
  - Three suspects in custody
  - 4-hour investigation window (3 AM - 7 AM)

### 📖 Initial Story
- Elias Moore disappearance
- Harper Lin (ex-lover)
- Marcus Hale (betrayed partner)
- Roman Adler (mysterious host)
- Blood on dock, cryptic evidence

### 🎨 Basic UI
- Text display system
- Choice menu system
- Background and character sprite support
- Basic audio system

---

## Upcoming Features (Roadmap)

### Planned for Future Updates
- 🎯 Evidence Update 3: Phone recording and burner phone delivery
- 🎵 Additional music tracks for different endings
- 🎨 More character expressions and animations
- 📊 Investigation summary screen
- 🏆 Achievement system
- 💾 Save/load system improvements
- 🌐 Multi-language support

---

## Credits

**Game Engine**: WebGAL
**AI Integration**: Claude 3.5 Haiku (Anthropic)
**Development**: Built with Claude Code
**Repository**: https://github.com/JordanTheJet/1Night4Suspects

---

## Technical Notes

### System Requirements
- Modern web browser (Chrome, Firefox, Safari, Edge)
- Internet connection for AI-powered interrogations
- Anthropic API key (for AI features)

### Known Issues
- None currently reported

### Performance
- Average interrogation: ~100 tokens per turn
- System prompt: ~6500 tokens
- Claude Haiku context window: 200K tokens
- Estimated capacity: 1000+ conversation turns per interrogation

---

*Last Updated: November 17, 2025*
*Current Version: 0.7.0*
