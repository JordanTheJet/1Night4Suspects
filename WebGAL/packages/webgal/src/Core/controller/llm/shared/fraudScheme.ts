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
- Type: Life insurance on Elias Moore
- Taken out: 6 months before reunion/disappearance
- Company: Major national insurer (no red flags on application)
- Beneficiaries breakdown:
  - Harper Lin: 40% ($800,000)
  - Marcus Hale: 30% ($600,000)
  - Roman Adler: 30% ($600,000)
- NOTE: Marcus and Roman were listed WITHOUT their knowledge or consent

**THE PLAN (Elias's Original Scheme):**
1. Stage a disappearance during the reunion weekend
2. Leave evidence suggesting accident/foul play
3. Hide for 6 months while investigation proceeds
4. Insurance pays out to beneficiaries after body not found
5. Beneficiaries split money according to their agreed cuts
6. After 6 months + payout, Elias resurfaces in South America
7. All participants join him or receive their share remotely

**ELIAS'S MOTIVATION:**
- Tech company failures left him actually broke despite appearances
- $180,000 in gambling debts to dangerous people
- Owes millions to investors from failed ventures
- Facing potential legal action for misrepresentation
- Desperate escape plan: fake death, collect insurance, start over

**WHO KNEW WHAT:**

**Harper Lin - ACTIVE PARTICIPANT:**
- Approached by Elias: 3 weeks before reunion
- Offered: 40% cut = $800,000
- Her role:
  - Help stage the disappearance scene (dock, shoe, glass, blood)
  - Act as "discoverer" of disappearance
  - Collect insurance payout
  - Meet Elias in 6 months to split money
- Why she agreed:
  - Gallery in debt ($180,000), weeks from bankruptcy
  - Still had feelings for Elias despite betrayal
  - Saw it as victimless crime (insurance company)
  - Desperate for financial salvation
- What she did:
  - Met Elias at dock 11:15 PM
  - Helped stage scene: shoe drop, wineglass placement, blood smearing
  - Watched Elias leave in boat
  - Waited for confirmation code "Crimson" (never received it)
  - "Discovered" disappearance at 2:15 AM as planned
- What she knows:
  - Full plan details
  - Elias supposed to be hiding
  - Should have received "Crimson" code confirming safety
  - Something went wrong (no code, no contact)

**Roman Adler - KNEW BUT DECLINED:**
- Approached by Elias: 3 weeks before reunion
- Offered: $400,000 to help coordinate
- His role would have been:
  - Disable security cameras
  - Provide alibi for Elias
  - Help with logistics
  - Use his "fixer" skills
- His response:
  - Declined participation (too much risk to family name)
  - Told Elias he was making a terrible mistake
  - Warned about consequences
  - Did NOT report it to authorities
- What he actually did:
  - Disabled cameras anyway (10:03 PM) - to protect Harper, not help Elias
  - Placed audio bugs in house to monitor situation
  - Found and destroyed insurance documents (12:45 AM)
  - Hid burner phone in boathouse
  - Covering up to protect Harper and family reputation
- What he knows:
  - Complete scheme details from Elias's proposal
  - Harper's involvement (overheard on bugs)
  - Marcus's confrontations (overheard on bugs)
  - Evidence of fraud (documents he destroyed)
  - Unknown third party (saw texts on burner phone)

**Marcus Hale - NOT INVOLVED:**
- Was NOT approached about the fraud scheme
- Was NOT told he was listed as beneficiary
- Does NOT know about the insurance plan
- BUT: Elias was blackmailing Marcus separately
  - Threat: Expose code theft that would destroy Marcus's career
  - Demand: $500,000 payment
  - Timeline: Two weeks before reunion, Elias demanded money
  - Marcus's situation: Broke, cannot pay, furious about new betrayal
- Marcus's actions were about blackmail, NOT insurance fraud
- His confrontations (11:03 PM dock, midnight overlook) were about blackmail
- He has no knowledge of the staged disappearance plan

**THE UNKNOWN THIRD PARTY:**
- Burner phone texts: "2 AM pickup at the overlook" from unknown number
- Marcus saw: Mystery car arriving at overlook after midnight
- Identity: Unknown (not Harper, not Marcus, not Roman)
- Possible explanations:
  - Someone helping Elias escape (accomplice)
  - The gambling debt collectors finding Elias
  - Another betrayed party seeking revenge
  - Someone else Elias owed money to
- This person/people represent wild card in the situation

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
    harper: `You are an ACTIVE PARTICIPANT in the insurance fraud scheme. Elias approached you 3 weeks ago with the $2M plan. You agreed to help stage the disappearance in exchange for 40% ($800K) to save your gallery. You know the full plan and helped execute it the night of the reunion. You're waiting for confirmation code "Crimson" that never came.`,

    marcus: `You have NO KNOWLEDGE of the insurance fraud scheme. You don't know about the $2M policy, don't know you're listed as a beneficiary, and had nothing to do with staging the disappearance. Your confrontations with Elias were about his SEPARATE blackmail scheme demanding $500K. The fraud plan is a complete surprise to you if revealed.`,

    roman: `You KNOW THE FULL DETAILS of the fraud scheme. Elias approached you 3 weeks ago offering $400K to help. You DECLINED participation but didn't report it. You disabled cameras to protect Harper (you overheard her involvement via audio bugs). You found and destroyed insurance documents at 12:45 AM to cover up the scheme and protect your friends.`,
  };

  return knowledgeMap[character] || 'Character not found';
}

/**
 * Get fraud scheme timeline
 */
export function getFraudTimeline(): string {
  return `**Fraud Scheme Timeline:**
- 6 months ago: Policy taken out on Elias
- 3 weeks ago: Elias approaches Roman (declined)
- 3 weeks ago: Elias approaches Harper (agreed)
- Night of reunion: Execution of disappearance
- 11:15 PM: Harper helps stage scene
- 11:40 PM: Elias departs by boat
- Expected: "Crimson" code to Harper (never sent)
- Next 6 months: Hiding period
- After payout: Reunion in South America`;
}
