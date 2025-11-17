/**
 * Fraud Scheme Details - The insurance fraud conspiracy
 * Single source of truth for the $2M insurance fraud plot
 */

/**
 * Get comprehensive details about the insurance fraud scheme
 */
export function getFraudSchemeDetails(): string {
  return `# THE INSURANCE FRAUD SCHEME

**THE POLICY:**
- Amount: $2,000,000
- Type: Key person life insurance (business policy from StreamMetrics startup days)
- Taken out: 5 years ago when Elias and Marcus were 50/50 partners
- Company: Major national insurer (legitimate business insurance)
- Beneficiaries:
  - PRIMARY: Marcus Hale (100%) - as business partner for buyout purposes
  - SECONDARY: Harper Lin (100%) - as Elias's partner at the time
- NOTE: This was legitimate key person insurance. Never updated after company sale.
- SLAYER RULE: If Marcus kills Elias, he's disqualified and Harper (secondary) gets 100%

**THE PLAN (Elias's Original Scheme):**
1. Stage a disappearance during the reunion weekend
2. Leave evidence suggesting Marcus killed him (or at minimum, foul play)
3. Marcus becomes prime suspect, gets disqualified by slayer rule
4. Harper (secondary beneficiary) receives 100% payout = $2,000,000
5. Harper gives Elias $1,300,000 per their private agreement
6. Harper keeps $700,000 (saves her gallery + cushion)
7. Elias uses $1,300,000 to pay $1,200,000 mob debt, keeps $100,000 to restart
8. After 6-12 months hiding, Elias resurfaces in South America with new identity

**ELIAS'S MOTIVATION:**
- Tech company failures left him actually broke despite appearances
- $1,200,000 in gambling debts to the Castellano crime family (escalated with interest)
- Owes millions to investors from failed ventures
- Facing potential legal action for misrepresentation
- Mob gave ultimatum: "midnight pickup" or they come for him
- Desperate escape plan: fake death, frame Marcus, collect insurance via Harper, pay debt

**WHO KNEW WHAT:**

**Harper Lin - ACTIVE PARTICIPANT:**
- Approached by Elias: 3 weeks before reunion
- Offered: $700,000 (she keeps after giving him $1.3M from $2M payout)
- The key person insurance revelation:
  - Elias showed her the old StreamMetrics policy
  - Primary beneficiary: Marcus (would be disqualified by slayer rule if suspected)
  - Secondary beneficiary: Harper (gets 100% if Marcus can't collect)
  - Policy never updated after company sale 3 years ago
- Her role:
  - Help stage the disappearance scene to implicate Marcus
  - Act as "discoverer" of disappearance
  - Collect insurance payout as secondary beneficiary
  - Give Elias $1,300,000, keep $700,000
  - Meet Elias in South America after 6-12 months
- Why she agreed:
  - Gallery in debt ($180,000), weeks from bankruptcy
  - $700,000 would save gallery and provide financial security
  - Still had feelings for Elias despite betrayal
  - Saw Marcus as having "stolen" her chance at happiness with Elias
  - Desperate for financial salvation
- What she did:
  - Met Elias at dock 11:15 PM
  - Helped stage scene: shoe drop, wineglass placement, blood smearing
  - Planted subtle evidence to point toward Marcus
  - Watched Elias leave in boat
  - Waited for confirmation code "Crimson" (never received it)
  - "Discovered" disappearance at 2:15 AM as planned
- What she knows:
  - Full plan details including framing Marcus
  - The slayer rule mechanism
  - Elias's mob debt situation
  - Should have received "Crimson" code confirming safety
  - Something went wrong (no code, no contact)

**Roman Adler - KNEW BUT DECLINED:**
- Approached by Elias: 3 weeks before reunion
- Told about the full plan: key person insurance, framing Marcus, Harper's involvement
- NOT offered money - Elias wanted Roman's strategic mind and "fixer" reputation
- His role would have been:
  - Help orchestrate evidence to implicate Marcus
  - Disable security cameras at key moments
  - Provide alibi coordination
  - Use his analytical skills to ensure plan success
- His response:
  - Declined participation (too much risk, morally wrong)
  - Told Elias this would destroy everyone, including Marcus
  - Warned framing an innocent man is unforgivable
  - Did NOT report it to authorities (loyalty to old friendship)
- What he actually did:
  - Disabled cameras anyway (10:03 PM) - to protect Harper when he realized she was involved
  - Placed audio bugs in house to monitor situation (wanted to know what was happening)
  - Found and destroyed insurance documents (12:45 AM) - protecting Harper from fraud charges
  - Hid burner phone in boathouse - evidence of mob involvement
  - Covering up to protect Harper and prevent Marcus from being wrongly convicted
- What he knows:
  - Complete scheme details: key person insurance, slayer rule, framing plan
  - Harper's full involvement (overheard on bugs)
  - Marcus's confrontations and innocence (overheard on bugs)
  - Elias's mob debt and "midnight pickup"
  - The insurance fraud documents before he burned them

**Marcus Hale - UNKNOWING TARGET:**
- Was NOT approached about the fraud scheme
- Does NOT know he's the primary beneficiary on old key person insurance
- Has NO IDEA he's being framed for Elias's fake death/disappearance
- Does NOT know about Harper's involvement in staging the scene
- BUT: Elias was blackmailing Marcus separately
  - Threat: Expose code theft that would destroy Marcus's career
  - Demand: $500,000 payment
  - Timeline: Two weeks before reunion, Elias demanded money
  - Marcus's situation: Broke, cannot pay, furious about new betrayal
- Marcus's actions were about blackmail, NOT insurance fraud
- His confrontations (11:03 PM dock, midnight overlook) were about blackmail anger
- His presence at the dock/overlook makes him look guilty (exactly as Elias planned)
- He has no knowledge of the staged disappearance plan or that he's the patsy

**THE UNKNOWN THIRD PARTY:**
- Burner phone texts: "midnight pickup at the overlook" from unknown number
- Marcus saw: Mystery car arriving at overlook at 12:15 AM (15 minutes late)
- Identity: The mob/debt collectors finding Elias
- This is who actually killed Elias - they came for him at the cliff
- Marcus left just before they arrived (around 12:10-12:15 AM)
- Elias was desperate and waiting for them, hoping to negotiate
- They killed him instead

**WHAT WENT WRONG:**
- Harper never received "Crimson" confirmation code
- Mystery car showed up at overlook (unplanned?)
- Elias's car found running but Elias gone
- Blood on railing was real (Marcus fight) not just staged
- Documents and phone left at dock (sloppy, or Elias fleeing?)
- Something happened that prevented Elias from following through

**CURRENT MYSTERY:**
Is Elias:
- A) Hiding as planned but something disrupted communication?
- B) Actually dead from accident or violence?
- C) Taken/killed by the unknown third party?
- D) Double-crossed his own plan for some reason?
- E) Successfully escaped but abandoned Harper?`;
}

/**
 * Get specific character's knowledge of fraud scheme
 */
export function getCharacterFraudKnowledge(character: 'harper' | 'marcus' | 'roman'): string {
  const knowledgeMap: Record<string, string> = {
    harper: `You are an ACTIVE PARTICIPANT in the insurance fraud scheme. Elias approached you 3 weeks ago showing you the old StreamMetrics key person insurance policy ($2M) where Marcus is primary beneficiary and you're secondary. The plan: stage his death, frame Marcus (disqualified by slayer rule), you collect 100% as secondary beneficiary ($2M), give Elias $1.3M for his mob debt, keep $700K to save your gallery. You helped stage the scene at 11:15 PM and are waiting for "Crimson" code that never came.`,

    marcus: `You have NO KNOWLEDGE of the insurance fraud scheme. You don't know about the old StreamMetrics key person insurance policy. You don't know you're the primary beneficiary. You have NO IDEA you're being framed as the killer so you'll be disqualified and Harper (secondary) gets the payout. Your confrontations with Elias were about his SEPARATE blackmail demanding $500K. You're being used as an unknowing patsy. The fraud plan is a complete shock if revealed.`,

    roman: `You KNOW THE FULL DETAILS of the fraud scheme. Elias told you 3 weeks ago about the plan: use old StreamMetrics key person insurance, frame Marcus as killer (slayer rule disqualifies him), Harper collects as secondary beneficiary, she gives Elias $1.3M for his $1.2M mob debt. You DECLINED to help and warned him framing Marcus was evil. You disabled cameras to protect Harper. You destroyed insurance documents at 12:45 AM to protect Harper from fraud charges and Marcus from false conviction.`,
  };

  return knowledgeMap[character] || 'Character not found';
}

/**
 * Get fraud scheme timeline
 */
export function getFraudTimeline(): string {
  return `**Fraud Scheme Timeline:**
- 5 years ago: Key person insurance policy taken out during StreamMetrics partnership
- 3 years ago: Elias sells company, screws Marcus, policy never updated
- 3 weeks ago: Elias realizes old policy still active (Marcus primary, Harper secondary)
- 3 weeks ago: Elias approaches Roman with framing plan (declined)
- 3 weeks ago: Elias approaches Harper with plan (agreed for $700K cut)
- Night of reunion: Execution of staged death/framing
- 11:15 PM: Harper helps stage scene to implicate Marcus
- 11:40 PM: Elias departs by boat
- Expected: "Crimson" code to Harper confirming he's safely hidden (never sent)
- Expected: Marcus becomes prime suspect, disqualified by slayer rule
- Expected: Harper collects $2M as secondary beneficiary
- Expected: 6-12 months hiding, then reunion in South America`;
}
