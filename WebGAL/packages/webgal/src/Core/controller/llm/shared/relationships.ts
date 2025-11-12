/**
 * Character Relationships - History and dynamics between all characters
 * Ensures consistent relationship backstory across all interrogations
 */

/**
 * Get comprehensive relationship history
 */
export function getRelationshipHistory(): string {
  return `# CHARACTER RELATIONSHIPS & HISTORY

**THE COLLEGE FRIEND GROUP (10 years ago):**
- Harper Lin, Marcus Hale, and Roman Adler were friends FIRST
- Met at college, close-knit group
- Elias Moore joined the group later (through Roman)
- All graduated together, stayed in touch
- Regular reunions and gatherings over the years

**HARPER & ELIAS - THE EX-LOVERS:**
- Met 4 years ago: Elias commissioned art for StreamMetrics office
- Started dating shortly after, intense 3-year relationship
- Harper's perspective: "Elias got my artistic vision, supported my gallery"
- Elias's charm and ambition attracted Harper
- Discussed marriage, future together
- 8 months ago: Breakup after Harper discovered cheating
  - Elias caught with Sophie (24-year-old intern from his company)
  - Betrayal devastated Harper
  - Considered the cheating "classic Elias - always wants more"
- Post-breakup: Minimal contact until reunion invitation
- Despite breakup: Harper still had lingering feelings
- Current: Complicated mix of hurt, anger, and residual attraction

**MARCUS & ELIAS - THE BETRAYED PARTNERS:**
- 3 years ago: Co-founded StreamMetrics together as 50-50 partners
- Started as best friends with shared vision
- Marcus (technical genius): Wrote 90% of code, architected system
- Elias (business face): Sales, marketing, investor relations
- Two years of 18-hour days, sacrifices, building dream together
- Acquisition offer: $2.3 million from larger tech company
- THE BETRAYAL:
  - Elias secretly restructured equity for 6 months
  - Used legal maneuvers to dilute Marcus from 50% to 12%
  - Marcus locked out of office one day
  - Sale completed: Elias got $2M+, Marcus got $200K after lawyers
  - Public humiliation in Boston tech scene
  - Marcus's career damaged, reputation as "the guy who got played"
- Post-betrayal: Marcus struggled with depression, anxiety
- 2 weeks ago: NEW BETRAYAL - Elias began blackmail scheme
  - Threatened to expose code theft from Marcus's work
  - Demanded $500,000 payment
  - Marcus broke, furious, trapped
- Current: Murderous rage barely controlled by medication

**ROMAN & ELIAS - THE UNDERSTOOD MANIPULATORS:**
- College friends, but never close in emotional sense
- Roman understood Elias's manipulative nature (shared trait)
- Roman watched Elias's betrayals with clinical interest
- Never personally betrayed by Elias (too smart, too careful)
- Roman's assessment: "Elias and I are similar - we see people as chess pieces"
- Roman kept distance, stayed neutral in others' dramas
- 3 weeks ago: Elias approached about fraud scheme
- Roman declined but didn't report (not his style)
- Current: Roman views situation as "Elias finally overreached"

**HARPER & MARCUS - FRIENDS BEFORE ELIAS:**
- Friends from college, pre-dating Elias joining group
- Marcus was protective of Harper when she started dating Elias
- Marcus warned Harper about Elias's patterns
- After both betrayals: Shared bond of being Elias's victims
- Marcus helped Harper financially after breakup (small amounts)
- Current: Mutual sympathy, both damaged by Elias
- Neither knows about other's involvement in current events

**HARPER & ROMAN - THE PROTECTOR:**
- Close friends from college
- Roman has always been Harper's confidant
- Roman sees Harper as genuinely good person in bad situation
- Roman has helped Harper with gallery finances (anonymous support)
- Roman disabled cameras partly to protect Harper
- Roman destroyed evidence to shield Harper from fraud consequences
- Current: Roman knows Harper's involvement via audio bugs
- Roman actively covering for Harper

**MARCUS & ROMAN - THE QUIET SUPPORT:**
- College friends, mutually respectful
- Roman secretly provided financial help to Marcus after StreamMetrics betrayal
- Marcus doesn't know full extent of Roman's support
- Roman watched Marcus spiral into depression with concern
- Roman planned reunion partly to help Marcus confront past
- Current: Roman knows about Marcus's dock/overlook confrontations
- Roman hasn't revealed Marcus's actions to police

**ELIAS'S RELATIONSHIP WITH EACH:**
- Harper: Used her love, discarded her, then recruited her for fraud
- Marcus: Used his talent, stole his equity, then blackmailed him
- Roman: Tried to recruit, recognized similar manipulative nature
- Pattern: Elias uses people until they're no longer useful

**GROUP DYNAMICS:**
- Pre-StreamMetrics: Tight friend group, regular gatherings
- Post-StreamMetrics: Fractured, awkward, maintained by Roman
- Post-Harper breakup: More strained, Elias as central problem
- This reunion: Roman's attempt to "heal wounds" (also to monitor situation)
- Reality: Everyone has secret agendas and hidden resentments

**LOYALTY STRUCTURE:**
- Harper ↔ Roman: Strong mutual loyalty
- Marcus ↔ Roman: Quiet understanding and support
- Harper ↔ Marcus: Sympathetic but not deeply close
- Elias ↔ Anyone: No real loyalty, purely transactional
- All three ↔ Elias: Deep resentment, varying degrees

**CURRENT TENSIONS:**
- Everyone has secrets from each other about the night
- Harper doesn't know Marcus had violent confrontations
- Marcus doesn't know about fraud scheme
- Neither Harper nor Marcus knows Roman destroyed evidence
- All three are protecting themselves AND each other in complex ways`;
}

/**
 * Get specific relationship details between two characters
 */
export function getRelationshipBetween(char1: string, char2: string): string {
  const key = [char1, char2].sort().join('-');

  const relationshipMap: Record<string, string> = {
    'elias-harper': 'Ex-lovers: 3-year relationship ended 8 months ago after Elias cheated. Harper still has complicated feelings. Now co-conspirators in fraud scheme.',

    'elias-marcus': 'Former best friends and business partners. Elias betrayed Marcus 3 years ago in StreamMetrics sale, recently began blackmailing him. Marcus has murderous rage.',

    'elias-roman': 'College friends who understand each other\'s manipulative nature. Roman stayed distant, declined fraud participation but didn\'t report it.',

    'harper-marcus': 'College friends before Elias. Share bond as Elias\'s victims. Mutually sympathetic. Neither knows other\'s involvement in current events.',

    'harper-roman': 'Close friends from college. Roman is Harper\'s protector and confidant. Roman knows Harper\'s fraud involvement and is actively covering for her.',

    'marcus-roman': 'College friends with mutual respect. Roman secretly provided financial support to Marcus after betrayal. Roman knows about Marcus\'s confrontations.',
  };

  return relationshipMap[key] || 'Relationship details not found';
}

/**
 * Get the betrayal history (what each character has suffered from Elias)
 */
export function getBetrayalHistory(): string {
  return `**Betrayals by Elias Moore:**

**Harper's Betrayal:**
- Promised future together, discussed marriage
- Cheated with Sophie after 3 years together
- Used Harper's emotional vulnerability to recruit for fraud
- Left Harper to take the fall if fraud discovered

**Marcus's Betrayals (DOUBLE):**
1. StreamMetrics Theft:
   - Secretly diluted equity from 50% to 12%
   - Stole $1.8M of Marcus's rightful share
   - Destroyed Marcus's reputation in tech industry
2. Recent Blackmail:
   - Threatened career destruction via code theft exposure
   - Demanded $500K Marcus doesn't have
   - New betrayal on top of old wound

**Roman's Treatment:**
- Attempted to recruit for fraud (Roman saw through it)
- Used Roman's family property for fraud staging
- Listed Roman as beneficiary without consent
- Tried to implicate Roman in illegal scheme`;
}
