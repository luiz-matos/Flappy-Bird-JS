import { BIRD } from "../config.js"
import { SPRITES } from "../sprites.js"

export class Bird {
  constructor() {
    this.x = BIRD.x
    this.y = BIRD.startY
    this.width = SPRITES.birdFrames[0].width
    this.height = SPRITES.birdFrames[0].height
    this.speed = 0
    this.wingFrame = 0
  }

  get bottom() {
    return this.y + this.height
  }

  animate(frameCount) {
    if (frameCount % BIRD.framesPerWingFlap !== 0) return
    this.wingFrame = (this.wingFrame + 1) % SPRITES.birdFrames.length
  }

  fall() {
    if (this.y < 0) {
      this.y = 0
      this.speed = 0
      return
    }
    this.speed += BIRD.gravity
    this.y += this.speed
  }

  jump() {
    this.speed = BIRD.jumpSpeed
  }

  draw(renderer) {
    renderer.drawSprite(SPRITES.birdFrames[this.wingFrame], this.x, this.y)
  }
}
