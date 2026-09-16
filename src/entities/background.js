import { SPRITES } from "../sprites.js"

const SKY_COLOR = "#70c5ce"
const SPRITE = SPRITES.background

export function drawBackground(renderer) {
  const y = renderer.height - SPRITE.height
  renderer.fillCanvas(SKY_COLOR)
  renderer.drawSprite(SPRITE, 0, y)
  renderer.drawSprite(SPRITE, SPRITE.width, y)
}
