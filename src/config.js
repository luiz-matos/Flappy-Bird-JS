export const FRAME_DURATION_MS = 1000 / 60
export const MAX_FRAME_TIME_MS = 250

export const SCROLL_SPEED = 2
export const SOUND_VOLUME = 0.2

export const CRASH_FREEZE_MS = 500
export const FALL_SOUND_DELAY_MS = 300

export const BIRD = {
  x: 10,
  startY: 50,
  gravity: 0.3,
  jumpSpeed: -5,
  framesPerWingFlap: 10,
  frontHitboxTolerance: 5,
}

export const PIPES = {
  spawnInterval: 100,
  gapSize: 90,
  maxGapTop: 250,
  gapTopRange: 200,
  exitTolerance: 4 * SCROLL_SPEED,
}

export const MEDALS = [
  { name: "platinum", minScore: 20 },
  { name: "gold", minScore: 15 },
  { name: "silver", minScore: 10 },
  { name: "bronze", minScore: 5 },
]
