/**
 * Master Timeline - Canonical sequence of events for the night of disappearance
 * All character interrogations reference this single source of truth
 */

/**
 * Get the master timeline of events
 */
export function getMasterTimeline(): string {
  return `# MASTER TIMELINE - NIGHT OF DISAPPEARANCE

**7:00 PM - ARRIVAL**
- All guests arrive at lake house: Harper Lin, Marcus Hale, Elias Moore
- Roman Adler (host) greets everyone
- Reunion atmosphere initially positive but tense undertones

**7:00-9:30 PM - DINNER**
- Roman prepares and serves elaborate dinner
- Conversation starts pleasant, discussing "old times"
- Tension rises when business topics come up
- Marcus becomes visibly uncomfortable when Elias's success mentioned
- Roman tries to keep conversation neutral

**9:30 PM - TENSIONS ESCALATE**
- Roman mentions "the old days" and past business dealings
- Marcus snaps about Elias's "creative accounting"
- Elias becomes defensive about StreamMetrics sale
- Atmosphere becomes hostile

**9:45 PM - DISPERSAL**
- Roman excuses himself to "check on dessert"
- Marcus angrily leaves table, heads to his guest room
- Harper claims she went to her room (this is a LIE - she actually stayed downstairs)
- Elias remains in living area briefly

**10:03 PM - CAMERA SYSTEM DISABLED**
- Roman manually disables security camera system
- (Roman later lies this was storm damage at 10:45 PM)
- From this point forward, no video evidence exists

**11:00 PM - FIRST DOCK CONFRONTATION**
- Marcus hears voices outside, looks out window
- Sees Elias standing on the dock alone
- Marcus goes outside to confront Elias

**11:03 PM - MARCUS-ELIAS PHYSICAL ALTERCATION**
- Marcus confronts Elias on dock about blackmail demand
- Argument becomes physical
- Marcus grabs Elias's jacket, shoves him against railing
- Elias shoves back, loses balance, grabs railing to steady himself
- Elias's hand scrapes across rusty bolt on railing - starts bleeding
- This creates the blood evidence found on dock railing
- Marcus's phone accidentally records 2 minutes of confrontation
- Elias tells Marcus to "get lost before my ride arrives"
- Marcus storms off back toward house

**11:15 PM - HARPER-ELIAS MEETING**
- Harper meets Elias at dock as previously planned
- They discuss final details of insurance fraud scheme
- Harper sees Elias's bleeding hand (from earlier Marcus confrontation)
- Harper helps Elias stage disappearance scene:
  - Drops Elias's shoe on dock steps
  - Incorporates existing blood on railing into staging narrative
  - Leaves lipstick-stained wineglass by fireplace
  - Creates appearance of struggle/hasty departure

**11:40 PM - ELIAS DEPARTS BY BOAT**
- Elias gets in motorboat at dock
- Harper watches him leave across the lake
- Plan: Elias will get his car that's waiting on far shore
- Harper is supposed to receive confirmation code "Crimson" (never arrives)

**11:40 PM - MARCUS FOLLOWS**
- Marcus sees Elias's car start moving on road
- Marcus gets in his own car, follows Elias
- Drives toward cliff overlook

**Midnight - OVERLOOK CONFRONTATION**
- Marcus catches up to Elias at cliff overlook parking area
- Another heated argument
- Elias repeats blackmail demand: $500,000
- Elias tells Marcus: "Get out of here before my ride shows up"

**12:15 AM - MYSTERY CAR ARRIVES**
- Marcus sees headlights approaching
- Unknown vehicle arriving at overlook
- Marcus doesn't see who it is (stays hidden)
- Marcus decides to leave rather than be seen

**12:30 AM - MARCUS RETURNS**
- Marcus returns to lake house
- Parks car, goes to his room
- Takes second Lorazepam pill, tries to calm down
- Cannot sleep due to adrenaline and medication

**12:45 AM - ROMAN'S EVIDENCE DISCOVERY**
- Roman goes outside (monitoring situation)
- Finds items on dock that Elias left behind:
  - Burner phone with texts about "2 AM pickup at overlook"
  - Insurance policy documents
  - Fraud scheme details
- Roman realizes the full scope of what's happening

**12:45-1:30 AM - ROMAN DESTROYS EVIDENCE**
- Roman takes evidence to boathouse
- Burns insurance documents in boathouse fireplace
- Burns his wrist while destroying papers (evidence of this action)
- Hides burner phone behind loose boards in boathouse
- Returns to house

**2:15 AM - "DISCOVERY" OF DISAPPEARANCE**
- Harper (who knows Elias is gone) pretends to discover he's missing
- Harper bangs on doors, wakes everyone up
- "Elias is gone! He's not in his room!"
- Harper, Marcus, and Roman search house and grounds
- Find Elias's shoe on dock steps (planted by Harper)
- Notice blood on dock railing (real evidence from Marcus fight)

**2:30 AM - POLICE CALLED**
- Roman calls police to report Elias missing
- All three suspects give initial statements
- Police arrive and begin investigation

**3:12 AM - CURRENT TIME**
- Detective begins formal interrogations
- Three suspects in separate rooms
- Storm has not let up
- Each suspect has secrets to hide`;
}

/**
 * Get a specific time period from the timeline (for character-specific context)
 */
export function getTimelineSegment(startTime: string, endTime: string): string {
  const timeline = getMasterTimeline();
  // This is a simple implementation - could be enhanced to parse and filter
  return timeline;
}
