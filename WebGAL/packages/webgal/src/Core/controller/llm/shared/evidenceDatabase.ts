/**
 * Evidence Database - All physical evidence with consistent descriptions
 * Ensures all characters reference the same evidence correctly
 */

/**
 * Get comprehensive database of all physical evidence
 */
export function getEvidenceDatabase(): string {
  return `# PHYSICAL EVIDENCE

**1. BLOOD ON DOCK RAILING**
- Location: Dock railing, approximately 4 feet from water end
- Source: Elias Moore's blood (Type O+)
- How it got there: During 11:03 PM confrontation with Marcus
  - Marcus shoved Elias against railing
  - Elias grabbed railing to steady himself
  - His hand scraped across rusty bolt, causing bleeding
- Additional context: Harper saw this blood at 11:15 PM and incorporated it into staging narrative
- Significance: Proves physical altercation occurred; blood is real, not staged

**2. ELIAS'S SHOE**
- Description: Single left loafer, size 10, expensive Italian leather
- Location found: Dock steps, partially in water
- How it got there: Dropped by Elias at 11:15 PM as part of staging with Harper
- Found by: Harper and Roman at 2:15 AM during "search"
- Significance: Staged evidence to suggest struggle or hasty departure
- Truth: Deliberately placed, but Elias really was at dock

**3. LIPSTICK-STAINED WINEGLASS**
- Description: Broken wineglass with Harper's signature lipstick shade (deep red)
- Location found: Floor near fireplace in living room
- How it got there: Left by Harper at 11:15-11:40 PM during staging
- Significance: Suggests Harper was present during incident, possible struggle
- Truth: Staged by Harper, but she really was involved in events

**4. BOOT PRINTS AT OVERLOOK**
- Description: Merrell hiking boots, size 11, distinct tread pattern
- Location: Cliff overlook parking area and approach path
- Owner: Marcus Hale (confirmed match to his boots)
- When made: Midnight - 12:15 AM when Marcus followed Elias
- Weather: Prints made in mud from earlier rain
- Significance: Places Marcus at secondary scene, contradicts his alibi
- Truth: Real evidence of Marcus's presence

**5. PHONE RECORDING**
- Device: Marcus Hale's smartphone
- Content: 2 minutes of audio from dock confrontation at 11:03 PM
- How recorded: Phone was in Marcus's jacket pocket, accidentally started recording
- Contents captured:
  - Marcus and Elias arguing about money
  - Sounds of physical struggle (shoving, grabbing)
  - Elias: "Get your hands off me!"
  - Marcus: "You're going to pay for what you did!"
  - Sound of someone hitting the railing
- Current location: Marcus's phone (he's unaware recording exists)
- Significance: Direct evidence of Marcus-Elias confrontation and violence

**6. BURNER PHONE**
- Description: Cheap prepaid flip phone
- Owner: Elias Moore (used for fraud communications)
- Found by: Roman Adler at dock, 12:45 AM
- Contents: Text messages about "2 AM pickup at the overlook" from unknown number
- Current location: Hidden by Roman behind loose boards in boathouse
- Significance: Evidence of fraud plan, reveals unknown third party involvement
- Truth: Real evidence Roman is concealing

**7. INSURANCE DOCUMENTS**
- Description: $2 million life insurance policy paperwork, fraud plan details
- Found by: Roman Adler at dock, 12:45 AM
- Contents: Policy details, beneficiary breakdown, timeline for faking death
- Current status: DESTROYED - burned by Roman in boathouse fireplace 12:45-1:30 AM
- Evidence of destruction: Roman's wrist burn from the burning, ashes remain in boathouse
- Significance: Would have proven fraud scheme; destruction is obstruction of justice

**8. DISABLED CAMERA SYSTEM**
- What: Security camera system covering dock, driveway, and common areas
- Normal status: Always operational, cloud backup
- Actual status: Manually disabled at 10:03 PM by Roman
- Roman's cover story: "Storm knocked out power at 10:45 PM, cameras went offline"
- Truth: Deliberate disabling before any events occurred
- Significance: No video evidence exists of anything after 10:03 PM
- Technical evidence: System logs would show manual shutdown vs. power loss

**9. ROMAN'S WRIST BURN**
- Description: Second-degree burn on Roman's left wrist
- How received: Burning insurance documents in boathouse fireplace (12:45-1:30 AM)
- Roman's cover story: "Burned it on the stove while cooking dinner prep"
- Significance: Physical evidence of Roman destroying evidence
- Medical: Fresh burn, roughly 3-4 hours old at time of interrogation

**10. CAR EVIDENCE**
- Marcus's car: Mud on tires matching overlook soil, odometer shows 4.2 extra miles
- Elias's car: Found running at overlook parking area by police, keys still in ignition
- Distance: Lake house to overlook is 2.1 miles each way
- Significance: Confirms Marcus followed Elias, confirms Elias reached overlook

**11. BROKEN WINEGLASS FRAGMENTS**
- Location: Additional fragments found on dock near boathouse
- Matching: Same wine type as glass by fireplace
- Significance: Someone cleaned up broken glass from dock and missed these pieces
- Suggests: Original incident may have started near dock, not fireplace

**12. TRANQUILIZER PILLS**
- Owner: Marcus Hale (prescribed Lorazepam)
- Status: Pill count shows 3 pills missing (more than prescribed dosage)
- Marcus's claim: Only took one pill at bedtime
- Actual: Took two pills after overlook confrontation
- Significance: Marcus was more agitated than he claims; possible impaired judgment`;
}

/**
 * Get specific evidence item details
 */
export function getEvidenceItem(evidenceId: string): string {
  const evidenceMap: Record<string, string> = {
    blood_on_railing: `Blood on dock railing - Elias Moore's blood (Type O+), created at 11:03 PM during physical altercation with Marcus when Elias's hand scraped rusty bolt. Later seen by Harper at 11:15 PM and incorporated into her staging narrative.`,

    elias_shoe: `Elias's shoe - Single left loafer found on dock steps. Deliberately dropped by Elias at 11:15 PM as part of staged disappearance with Harper. Found during 2:15 AM "search."`,

    lipstick_wineglass: `Lipstick-stained wineglass - Broken glass with Harper's lipstick shade, left by fireplace. Staged by Harper between 11:15-11:40 PM to suggest her presence and possible struggle.`,

    boot_prints: `Boot prints at overlook - Size 11 Merrell boots belonging to Marcus Hale. Made in mud between midnight-12:15 AM when Marcus followed Elias to confrontation at cliff overlook.`,

    phone_recording: `Phone recording - Marcus's phone accidentally recorded 2 minutes of 11:03 PM dock confrontation with Elias. Contains sounds of arguing, physical struggle, and threats. Marcus unaware it exists.`,

    burner_phone: `Burner phone - Prepaid phone owned by Elias, found by Roman at 12:45 AM on dock. Contains texts about "2 AM pickup at overlook" from unknown number. Currently hidden by Roman in boathouse.`,

    insurance_documents: `Insurance documents - $2 million policy paperwork and fraud plan details found by Roman at dock, 12:45 AM. Destroyed by Roman in boathouse fireplace. Only ashes remain.`,

    disabled_cameras: `Disabled camera system - Security cameras manually shut down by Roman at 10:03 PM, before any events. Roman claims storm damage at 10:45 PM. System logs would reveal manual shutdown.`,

    wrist_burn: `Roman's wrist burn - Second-degree burn on left wrist from burning insurance documents in boathouse fireplace (12:45-1:30 AM). Roman claims stove burn from cooking.`,
  };

  return evidenceMap[evidenceId] || 'Evidence not found in database';
}
