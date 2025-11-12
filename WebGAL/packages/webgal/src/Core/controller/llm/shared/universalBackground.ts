/**
 * Universal Background - Shared facts across all character interrogations
 * This ensures all suspects reference the same victim, location, and basic facts
 */

/**
 * Get comprehensive background about Elias Moore (the victim)
 */
export function getEliasBackground(): string {
  return `# THE VICTIM: ELIAS MOORE

**Age:** 32
**Occupation:** Tech Entrepreneur / Startup Founder

**Background:**
- Founded StreamMetrics 3 years ago with Marcus Hale as 50-50 partners
- Sold StreamMetrics for $2.3 million - Elias got majority, Marcus got $200K
- Dated Harper Lin for 3 years, broke up 8 months ago after cheating incident
- Part of college friend group with Harper, Marcus, and Roman

**Public Image:**
- Appears successful: drives Tesla, owns downtown condo
- Charismatic, ambitious, well-connected in tech scene
- Known for "vision" and ability to close deals

**Financial Reality:**
- Actually broke - tech investments failed after StreamMetrics
- Owes investors millions from failed ventures
- Has $180,000 in gambling debts to dangerous people
- Desperate financial situation despite appearances

**Life Insurance:**
- $2 million policy taken out 6 months before disappearance
- Beneficiaries: Harper Lin (40%), Marcus Hale (30%), Roman Adler (30%)
- Roman's name added without his knowledge or consent

**Personality Traits:**
- Charming and persuasive
- Manipulative - history of betraying close friends
- Risk-taker who gets in over his head
- Capable of elaborate deception when desperate`;
}

/**
 * Get details about the lake house location
 */
export function getLocationDetails(): string {
  return `# THE LOCATION

**Property:** Adler Family Lake House
- Owner: Roman Adler's family (old money, generations-owned)
- Private lake house with dock and boathouse
- Multiple guest rooms, main living area with fireplace
- Study/office, full kitchen, wraparound deck
- Security camera system (normally operational)

**Dock Area:**
- Wooden dock extending into lake
- Boat moored at dock (small motorboat)
- Dock steps leading down to water level
- Rusty bolt on railing (relevant to evidence)
- Boathouse structure nearby

**Nearby Locations:**
- Cliff overlook: ~2 miles away by car
- Accessible road winds through woods to overlook
- Overlook has parking area, view of valley

**Access:**
- Private road leading to property
- Dense woods surround the house
- Isolated - no neighbors within sight
- Nearest town: 15 minutes drive`;
}

/**
 * Get complete universal background context for system prompts
 */
export function getUniversalBackground(): string {
  return `${getEliasBackground()}

${getLocationDetails()}`;
}
