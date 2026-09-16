import { BIRD, PIPES, SCROLL_SPEED } from "../config.js"
import { SPRITES } from "../sprites.js"

const PIPE_WIDTH = SPRITES.pipeTop.width

export class Pipes {
  constructor(spawnX) {
    this.spawnX = spawnX
    this.pairs = []
  }

  update(frameCount) {
    if (frameCount % PIPES.spawnInterval === 0) this.spawn()
    this.pairs.forEach((pair) => {
      pair.x -= SCROLL_SPEED
    })
    this.pairs = this.pairs.filter((pair) => pair.x > -PIPE_WIDTH)
  }

  spawn() {
    const gapOffset = Math.floor(Math.random() * PIPES.gapTopRange)
    const gapTop = PIPES.maxGapTop - gapOffset
    this.pairs.push({
      x: this.spawnX,
      gapTop,
      gapBottom: gapTop + PIPES.gapSize,
      passed: false,
    })
  }

  collidesWith(bird) {
    return this.pairs.some((pair) => pairCollidesWith(pair, bird))
  }

  // Marca os pares que o pássaro acabou de ultrapassar e devolve quantos são.
  markPassedBy(bird) {
    const newlyPassed = this.pairs.filter(
      (pair) => !pair.passed && pair.x + PIPE_WIDTH < bird.x
    )
    newlyPassed.forEach((pair) => {
      pair.passed = true
    })
    return newlyPassed.length
  }

  draw(renderer) {
    this.pairs.forEach((pair) => {
      const topPipeY = pair.gapTop - SPRITES.pipeTop.height
      renderer.drawSprite(SPRITES.pipeTop, pair.x, topPipeY)
      renderer.drawSprite(SPRITES.pipeBottom, pair.x, pair.gapBottom)
    })
  }
}

function pairCollidesWith(pair, bird) {
  return isAlignedWithPair(pair, bird) && isOutsideGap(pair, bird)
}

// A frente do pássaro tem uma folga pequena, e a saída do cano uma folga
// maior, para não punir quem já está passando.
function isAlignedWithPair(pair, bird) {
  const birdFront = bird.x + bird.width - BIRD.frontHitboxTolerance
  const pipeBack = pair.x + PIPE_WIDTH - PIPES.exitTolerance
  return birdFront >= pair.x && bird.x <= pipeBack
}

function isOutsideGap(pair, bird) {
  return bird.y < pair.gapTop || bird.bottom > pair.gapBottom
}
