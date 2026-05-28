# Matrix V2 Priority Backlog

Review date: 2026-05-24
Code review sync: 2026-05-26

Basis:
- `Matrix Portfolio Ideas.txt`
- current live implementation
- remaining idea-level work only

Purpose:
- capture the not-yet-done Matrix ideas
- sort them from easiest to hardest
- give us a practical build order for V2

## Priority Order

### 1. Blue Pill subtle glitch / deja vu - COMPLETE

Feasibility: easiest

Idea:
- make Blue Pill feel slightly unstable
- trigger a small duplicate flicker on a paragraph, image, or line of copy
- optional small black-cat style icon flash

Why easy:
- mostly CSS + small client timing logic
- no backend needed
- low architectural risk

Good V2 outcome:
- one tasteful illusion-break moment in blue mode

### 2. There Is No Spoon text warp - COMPLETE

Feasibility: very easy

Idea:
- make one specific sentence bend/warp away from cursor on hover

Why easy:
- local DOM/CSS transform effect
- no backend
- small surface area

Good V2 outcome:
- one memorable fourth-wall microinteraction

### 3. White Rabbit hidden anchor - COMPLETE

Feasibility: easy

Idea:
- add a small hidden rabbit icon or subtle visual cue
- clicking it jumps to skills or another deep section

Why easy:
- simple UI addition
- no backend
- low regression risk

Good V2 outcome:
- first real easter egg in the portfolio

### 4. Knock, Knock, Neo autonomous terminal intro - COMPLETE

Feasibility: easy to medium

Idea:
- add a self-typing mini-terminal section with:
  - `Wake up, Recruiter...`
  - `The Matrix has you.`
  - `Follow the white rabbit.`

Why medium:
- typing effect logic and placement decisions
- still mostly frontend only

Good V2 outcome:
- stronger red-pill narrative between hero and skills

### 5. Phone booth exit polish - COMPLETE

Feasibility: easy to medium

Idea:
- make the red-to-blue mode toggle feel like a hardline exit
- optional dial-tone sound and zoom effect

Why medium:
- mostly motion/audio work
- can be layered onto existing toggle flow

Good V2 outcome:
- more cinematic blue-return transition

### 6. Aggressive Neo-dodge parallax / ghost trail - COMPLETE

Feasibility: medium

Idea:
- upgrade current tilt into faster dodge-like motion
- add ghost-trail or layered motion blur feel on hover

Why medium:
- interaction tuning matters
- easy to overdo and hurt readability

Good V2 outcome:
- more distinctive hover behavior on hero or project cards

### 7. Red project cards: richer "Mainframe Penetrations" styling - COMPLETE

Feasibility: medium

Idea:
- push red projects deeper into extracted-mainframe visual language
- possible additions:
  - amber accents
  - system requirement / exploit tags
  - stronger classified dossier styling

Why medium:
- UI redesign work, but localized
- no backend required

Good V2 outcome:
- red mode projects feel less like themed cards and more like machine logs

### 8. Residual Self-Image skill section - COMPLETE

Feasibility: medium

Idea:
- replace plain skills presentation with a mapped visual node system
- hover different regions to highlight strengths

Why medium:
- requires custom layout and interaction design
- frontend only, but more bespoke

Good V2 outcome:
- memorable skills section with Matrix narrative

### 9. Oracle's Kitchen interactive skills mutation - COMPLETE

Feasibility: medium to hard

Idea:
- clicking a skill changes part of the environment or wraps layout differently
- include quote:
  - `You've already made the choice. You're just here to understand why you made it.`

Why harder:
- needs careful state handling
- UI mutations can easily feel gimmicky if not scoped well

Good V2 outcome:
- skill clicks actually alter the site experience

### 10. Liquid mirror transition - COMPLETE

Feasibility: hard

Idea:
- replace or supplement part of the pill transition with chrome/liquid ripple distortion

Why hard:
- likely needs canvas/WebGL/shader work
- must coexist cleanly with current Construct transition

Good V2 outcome:
- premium cinematic mode-switch effect

### 11. Keymaker hidden project unlock - COMPLETE

Feasibility: hard

Idea:
- hide one advanced project behind a secret:
  - query param
  - key sequence
  - hidden artifact elsewhere on site

Why hard:
- requires discovery design, hidden-state logic, and special project treatment
- needs restraint so it does not damage recruiter usability

Good V2 outcome:
- one strong hacker-mode secret without harming default UX

### 12. Audio-reactive environmental layer - COMPLETE

Feasibility: hard

Idea:
- low ambient green-rain hum
- hover key-strike or hiss
- EMP reset with sound + flash + animation mute

Why hard:
- audio UX is fragile
- needs mute policy, autoplay safety, and tasteful defaults

Good V2 outcome:
- subtle atmosphere boost without annoying users

### 13. Public traffic dashboard / Mainframe Traffic Monitor - COMPLETE

Feasibility: hard

Idea:
- build a recruiter-facing analytics page
- use pageviews data with Matrix naming and charts

Why hard:
- frontend charts + backend event capture + storage + privacy review
- current `Pageview` model exists, but product surface is not built

Good V2 outcome:
- strong proof of full-stack and observability skills

### 14. Interactive live visitor log / Operator console - COMPLETE

Feasibility: hard

Idea:
- append anonymized visit events in a terminal feed
- examples:
  - page navigations
  - pill switches
  - repo link clicks

Why hard:
- needs tracking pipeline
- best when paired with analytics work

Good V2 outcome:
- animated real-time activity layer for dashboard or red mode

### 15. Architect's Room analytics wall - COMPLETE

Feasibility: very hard

Idea:
- create a monitor-wall page with many panels around a central focal point
- optionally include webcam permission flow

Why very hard:
- large frontend concept
- webcam permission UX
- heavy performance/design burden

Good V2 outcome:
- standout experimental showcase page

### 16. Matrix webcam filter / cascading-face monitor - COMPLETE

Feasibility: very hard

Idea:
- request webcam access
- transform live feed into Matrix-style visual output

Why very hard:
- real-time video processing
- performance, permissions, device compatibility

Good V2 outcome:
- impressive experimental demo, but very optional

### 17. Bullet-time 3D freeze section - COMPLETE

Feasibility: hardest

Idea:
- scroll freeze
- 3D asset
- camera swing
- slowed rain
- resume motion after sequence completes

Why hardest:
- GSAP/Three.js style orchestration
- biggest complexity/performance cost
- easiest feature to overbuild

Good V2 outcome:
- flagship cinematic moment if ever prioritized

## Recommended Build Sequence

If we want fast wins first, best order is:

1. Blue Pill subtle glitch / deja vu
2. There Is No Spoon text warp
3. White Rabbit hidden anchor
4. Knock, Knock, Neo terminal intro
5. Red project card styling upgrade
6. Residual Self-Image skills section
7. Keymaker hidden unlock
8. Traffic dashboard

## Best ROI Features

If the goal is maximum impact for reasonable effort, the strongest V2 candidates are:

1. Blue Pill subtle glitch / deja vu
2. Knock, Knock, Neo terminal intro
3. Red project card styling upgrade
4. Residual Self-Image skills section
5. Traffic dashboard

## Features To Treat As Optional Showcase Work

These are cool, but should come after the portfolio remains stable and recruiter-friendly:

- Liquid mirror transition
- Audio-reactive environment
- Architect's Room
- Webcam matrix filter
- Bullet-time 3D freeze
