# Post-Production -- Editing, Color Grading, Sound Design, and Export

## The Post-Production Pipeline

Post-production transforms raw footage into finished content. It is where the story is truly constructed -- production captures the raw materials; post-production assembles them into a coherent, engaging, optimized experience. The post-production pipeline follows a strict sequence: editing first, then color, then audio, then graphics, then export. Deviating from this sequence creates rework.

```
Ingest & Organize --> Assembly Cut --> Rough Cut --> Fine Cut -->
Picture Lock --> Color Grading --> Sound Design --> Graphics/Titles -->
Quality Control --> Export --> Platform Optimization
```

---

## 1. Ingest and Organization

### Media Management Protocol

Poor media management is the silent killer of post-production efficiency. Before editing begins, footage must be organized systematically.

**Folder Structure:**

```
Project_Name/
  01_Footage/
    A-Cam/
    B-Cam/
    B-Roll/
    Screen_Capture/
  02_Audio/
    Sync_Audio/
    Music/
    SFX/
    Voiceover/
  03_Graphics/
    Titles/
    Lower_Thirds/
    Logos/
    Animations/
  04_Project_Files/
    [NLE project files]
  05_Exports/
    Drafts/
    Finals/
  06_Assets/
    Thumbnails/
    Descriptions/
    Transcripts/
```

**File Naming Convention:**
`[Project]_[Date]_[Camera]_[Scene]_[Take].[ext]`
Example: `ProductLaunch_20240115_ACam_Interview_T03.mp4`

### Backup Protocol

The 3-2-1 backup rule is mandatory for professional production:
- **3** copies of all footage
- **2** different storage media types (SSD + cloud, or SSD + spinning disk)
- **1** copy offsite (cloud storage or physically separate location)

Footage that exists in only one location does not exist. Hard drives fail. This is not a risk; it is an inevitability on a long enough timeline.

### Proxy Workflow

For 4K and higher resolution footage, editing with proxy files dramatically improves NLE performance:
1. Generate proxy files (1080p or 720p, low bitrate) from source footage
2. Edit using proxies (smooth timeline performance)
3. Relink to original full-resolution media before final export
4. All major NLEs (Premiere Pro, DaVinci Resolve, Final Cut Pro) support native proxy workflows

---

## 2. The Editing Process

### Assembly Cut

The first pass arranges all footage in narrative sequence with minimal editing decisions. The goal is to see the complete story in rough form.

**Assembly cut process:**
1. Lay down all A-roll in script order
2. Trim obvious dead space (long pauses, false starts, technical issues)
3. Add chapter markers or timeline markers at major section breaks
4. Do not add B-roll, music, graphics, or effects at this stage
5. Watch the assembly straight through and note pacing observations

**Assembly cut evaluation:**
- Is the narrative structure clear?
- Are all required content sections present?
- What is the total duration? How far from target length?
- Where are the obvious weak points (repetitive, unclear, low energy)?

### Rough Cut

The rough cut refines pacing, removes unnecessary content, and begins integrating B-roll.

**Rough cut process:**
1. Tighten every section: remove verbal filler, repeated points, tangents
2. Insert B-roll to cover edits, illustrate points, and vary the visual
3. Establish pacing rhythm: vary shot duration to maintain visual interest
4. Add temporary music (for pacing reference, not final selection)
5. Verify the hook: Does the first 30 seconds compel continued viewing?

**The Editing Hierarchy of Decisions:**

| Priority | Decision | Rationale |
|----------|----------|-----------|
| 1 | Story/narrative structure | If the story doesn't work, nothing else matters |
| 2 | Pacing and rhythm | Controls attention and emotional engagement |
| 3 | Performance selection (best takes) | Authenticity and energy drive connection |
| 4 | B-roll integration | Visual variety and illustration |
| 5 | Music and sound | Emotional reinforcement |
| 6 | Color and visual treatment | Aesthetic polish |
| 7 | Graphics and titles | Information design |

### Fine Cut

The fine cut polishes every edit point, optimizes pacing, and prepares for picture lock.

**Fine cut process:**
1. Review every edit point: Is the cut clean? Is the transition motivated?
2. Audio smoothing: Apply crossfades at every edit point to eliminate pops and clicks
3. Pacing evaluation: Play through the timeline and mark any moment where attention dips
4. Retention optimization: Ensure a visual change or re-engagement occurs every 60-90 seconds
5. Remove any remaining content that doesn't serve the video's objective
6. Verify total duration against target length

**The "Kill Your Darlings" Principle:**
If a section is beautifully produced but doesn't serve the video's objective, remove it. Post-production is the discipline of serving the viewer, not the creator's ego. Every second must earn its place.

### Picture Lock

Picture lock is the point of no return for editorial decisions. After picture lock:
- No further changes to timing, sequence, or content
- Color grading, sound design, and graphics proceed based on locked timing
- Changes after picture lock require re-doing downstream work (expensive)

**Picture lock requires sign-off from the stakeholder or decision-maker.** Never proceed past picture lock without explicit approval.

---

## 3. Editing Techniques

### Cut Types and When to Use Them

**Hard Cut (Straight Cut):**
The most common transition. Shot A ends, Shot B begins. Clean, efficient, invisible when executed at the right moment. Use for: almost everything.

**J-Cut:**
Audio from the next shot begins before the visual transition. Creates anticipation and smooth flow. Use for: scene transitions, interview-to-B-roll transitions, building momentum.

**L-Cut:**
Audio from the current shot continues over the visual of the next shot. Creates continuity and connection. Use for: sustaining emotion across a visual change, interview continuity.

**Jump Cut:**
Cut between two moments of the same shot, creating a visible discontinuity. Use for: YouTube/vlog style pacing, showing time passage, energetic editing. Avoid for: narrative, corporate, or cinematic content (unless intentional).

**Cutaway:**
Cut to a different subject or detail shot, then return. Use for: covering edits, illustrating narration, adding visual interest, masking discontinuity.

**Match Cut:**
Visual or conceptual similarity bridges two different scenes. Use for: creative transitions, thematic connections, elegant scene changes.

**Cross-Dissolve:**
Gradual blend from one shot to another. Use sparingly for: time passage, dream/memory sequences. Overuse reads as amateur.

**Smash Cut:**
Abrupt cut from a quiet/calm moment to a loud/intense moment (or vice versa). Use for: comedy, dramatic contrast, pattern interrupt.

### Pacing Techniques

**Montage:** A sequence of short shots compressed in time, often set to music. Communicates progress, passage of time, or accumulation of events. Shot duration: 1-3 seconds each.

**Slow Burn:** Extended shots with minimal cutting. Builds tension, allows emotional absorption, creates intimacy. Appropriate for documentary, testimonial climax moments, and emotional storytelling.

**Rhythmic Cutting:** Editing to a musical beat or internal rhythm. Creates energy, cohesion, and satisfying visual experience. Common in product videos, sizzle reels, and music-driven content.

**Acceleration:** Progressively shortening shot duration throughout a sequence. Builds energy and momentum toward a climax. The final shots in the sequence should be the shortest.

### B-Roll Integration Strategy

**Motivated B-Roll:** Every B-roll shot should illustrate, support, or expand on what the narrator is saying at that moment. Unmotivated B-roll (random pretty shots) distracts rather than enhances.

**B-Roll Timing:**
- Insert B-roll at the moment the narration references the visual subject
- Hold B-roll for 2-5 seconds (shorter for detail, longer for establishing)
- Return to A-roll (talking head) for important emphasis points and emotional moments
- Avoid staying on B-roll for more than 10-15 seconds without returning to A-roll

**B-Roll as Pacing Tool:**
- B-roll cuts increase perceived pacing without increasing narration speed
- Alternating between A-roll and B-roll every 10-20 seconds maintains visual interest
- B-roll allows editing out verbal mistakes without visible jump cuts

---

## 4. Color Grading

### Color Correction vs. Color Grading

**Color Correction (Technical):**
The first step. Normalizes footage to accurate, consistent representation:
1. Set black and white points (exposure normalization)
2. Correct white balance (remove color casts)
3. Match shots (ensure consistent exposure and color across all footage)
4. Fix any technical color issues (green tints from fluorescent lights, etc.)

**Color Grading (Creative):**
The second step. Applies a creative look to establish mood and visual identity:
1. Apply primary grade (overall color shift, contrast enhancement)
2. Apply secondary grade (targeted adjustments to specific colors or regions)
3. Add stylistic elements (teal-and-orange, desaturated, high-contrast, etc.)
4. Ensure the grade serves the content's emotional tone

### Color Grading by Content Type

| Content Type | Grading Approach | Characteristics |
|-------------|-----------------|-----------------|
| Corporate/Professional | Neutral, clean, slightly warm | Accurate skin tones, moderate contrast, clean whites |
| YouTube/Creator | Warm, vibrant, punchy | Slightly elevated saturation, warm highlights, rich shadows |
| Cinematic/Narrative | Filmic, controlled, atmospheric | Teal-and-orange, crushed blacks, controlled highlight rolloff |
| Product | Clean, accurate, high contrast | True-to-life product colors, white backgrounds pop, detail preserved |
| Documentary | Natural, desaturated, gritty | Lower saturation, slightly cooled, authentic feel |
| Short-form/Social | High contrast, vibrant, eye-catching | Elevated saturation, strong contrast, attention-grabbing |

### LUT Workflow

LUTs (Look-Up Tables) provide a starting point for color grading but should not be the entire grade:
1. Apply correction LUT (technical: converts log footage to Rec.709 display space)
2. Apply creative LUT (aesthetic: provides a base look)
3. Adjust intensity (LUTs at 100% are usually too strong; 50-80% is typical)
4. Refine with manual adjustments (exposure, saturation, individual color channels)

**Warning:** Never apply a creative LUT without manual adjustment. LUTs are designed generically and need per-shot tuning.

### Skin Tone Protection

Skin tones are the most critical element in color grading. Audiences are highly sensitive to unnatural skin tones because human visual processing has evolved to assess facial color (health, emotion, sincerity).

**Skin tone principles:**
- Use vectorscope: skin tones should fall along the "skin tone line" (roughly between yellow and red)
- Apply color grading to everything except skin using qualifier/mask tools
- Slightly warm skin tones read as healthy; slightly cool reads as unwell
- Oversaturated skin tones read as sunburned; desaturated reads as lifeless

---

## 5. Sound Design and Audio Post-Production

### Audio Post-Production Pipeline

```
Sync Audio --> Noise Reduction --> Dialogue Edit --> EQ -->
Compression --> Music Bed --> Sound Effects --> Mixing -->
Loudness Normalization --> Final Check
```

### Dialogue Processing Chain

1. **Noise Reduction:** Remove consistent background noise (HVAC, hiss, hum) using spectral noise reduction (iZotope RX, DaVinci Resolve Fairlight, Adobe Audition). Apply subtly -- over-processing creates robotic artifacts.

2. **De-essing:** Reduce sibilance (harsh "S" and "T" sounds) using a de-esser plugin. Target frequency: 4-8kHz typically. Reduce by 3-6dB on affected consonants.

3. **Equalization (EQ):**
   - High-pass filter at 80-100Hz (removes rumble and low-frequency noise)
   - Reduce muddy frequencies (200-400Hz) by 2-3dB if voice sounds boxy
   - Add presence (2-5kHz) by 1-3dB for clarity and intelligibility
   - Add air (8-12kHz) by 1-2dB for openness (subtle)
   - EQ is corrective, not creative -- subtle adjustments only

4. **Compression:** Reduces dynamic range (difference between loudest and quietest moments):
   - Ratio: 2:1 to 4:1 for dialogue
   - Threshold: Set so compressor engages on louder passages
   - Attack: 5-15ms (fast enough to catch peaks, slow enough to preserve transients)
   - Release: 50-150ms (natural sounding)
   - Gain reduction: 3-6dB on peaks

5. **Limiting:** Catches any remaining peaks that exceed the target ceiling. Set ceiling to -1dB to prevent clipping.

### Music Selection and Integration

**Music serves three functions in video:**
1. **Emotional reinforcement:** Amplifying the emotional tone of the content
2. **Pacing establishment:** Setting or reinforcing the energy and tempo
3. **Transition bridging:** Smoothing transitions between sections

**Music integration rules:**
- Music should be felt, not heard. If the viewer notices the music, it's too prominent.
- Dialogue clarity is paramount. Music ducks (reduces volume) under all speech.
- Music changes should align with content transitions (new section = new music or energy shift)
- Volume levels: Music bed under dialogue at -20 to -30dB below dialogue. Music-only sections at -10 to -15dB below dialogue levels.
- Fade in/out: 1-3 second fades for smooth transitions. Never hard-start music under speech.

### Sound Effects

Selective sound effects enhance professionalism and engagement:
- **Whoosh:** Subtle transition sound for section changes, text animations
- **Click/Pop:** UI element appearance, bullet point reveals
- **Ambient:** Room tone, outdoor atmosphere, crowd murmur (for immersion)
- **Emphasis:** Short stinger or hit for key revelations or important points

**Sound effect volume:** Typically -20 to -30dB below dialogue. Effects should enhance, not compete.

---

## 6. Graphics and Titles

### Title Design Principles

**Readability:** Typography must be readable at the smallest intended display size (mobile phone). Minimum text size: 5% of frame height. Sans-serif fonts are more readable at small sizes.

**Duration:** Text on screen long enough to be read twice at normal pace. Formula: word count / 3 = minimum seconds on screen.

**Position:** Respect platform safe zones. YouTube end screens occupy the bottom 20%. TikTok/Reels UI elements overlay top and bottom 15%. Critical text should be in the center 70% of the frame.

### Lower Thirds

- Appear within 3 seconds of a new speaker's first appearance
- Display for 5-8 seconds
- Include name and title/role
- Positioned in the lower third of frame (hence the name), offset to the side where the subject is not
- Animate on and off smoothly (0.3-0.5 second transitions)
- Consistent style across all lower thirds in a production

### On-Screen Text and Callouts

- Use text to reinforce key points (not replace narration)
- Animate text to appear synchronized with the narrator's speech
- Limit to 5-7 words per text element
- High contrast against background (white text with drop shadow on dark backgrounds)
- Remove text before adding new text (avoid visual clutter)

---

## 7. Export Settings

### Platform-Specific Export Specifications

| Platform | Resolution | Frame Rate | Codec | Bit Rate | Container |
|----------|-----------|-----------|-------|----------|-----------|
| YouTube | 3840x2160 (4K) or 1920x1080 | 24/30fps | H.264 or H.265 | 35-68 Mbps (4K) / 16 Mbps (1080p) | MP4 |
| TikTok | 1080x1920 (vertical) | 30fps | H.264 | 10-20 Mbps | MP4 |
| Instagram Reels | 1080x1920 (vertical) | 30fps | H.264 | 10-20 Mbps | MP4 |
| YouTube Shorts | 1080x1920 (vertical) | 30fps | H.264 | 10-20 Mbps | MP4 |
| LinkedIn | 1920x1080 | 30fps | H.264 | 10-20 Mbps | MP4 |
| Twitter/X | 1920x1080 or 1080x1920 | 30fps | H.264 | 10-15 Mbps | MP4 |

### Audio Export Specifications

- Sample rate: 48kHz (video standard)
- Bit depth: 16-bit minimum, 24-bit preferred
- Loudness target: -14 LUFS (YouTube, most platforms)
- True peak: -1dBTP maximum

### Quality Control Before Export

- [ ] Watch the entire video from start to finish without interruption
- [ ] Check all text for spelling and grammatical errors
- [ ] Verify all links, URLs, and CTAs are correct
- [ ] Confirm audio levels are consistent throughout
- [ ] Check color consistency across all shots
- [ ] Verify end screen elements are properly positioned and timed
- [ ] Confirm captions/subtitles are synchronized and accurate
- [ ] Test playback on a phone screen (smallest target display)
- [ ] Verify aspect ratio is correct for target platform

---

**Post-production is where content becomes a product. Systematic process, quality standards, and attention to detail are what separate professional output from amateur attempts.**
