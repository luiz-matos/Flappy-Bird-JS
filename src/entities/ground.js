import { SCROLL_SPEED } from "../config.js"
import { SPRITES } from "../sprites.js"

const SPRITE = SPRITES.ground

// As duas metades do sprite do chão são iguais. Voltar a posição a cada
// meia largura cria rolagem infinita sem salto visível.
const LOOP_WIDTH = SPRITE.width / 2

export class Ground {
  constructor(canvasHeight) {
    this.x = 0
    this.y = canvasHeight - SPRITE.height
  }

  isTouchedBy(bird) {
    return bird.bottom > this.y
  }

  update() {
    this.x = (this.x - SCROLL_SPEED) % LOOP_WIDTH
  }

  draw(renderer) {
    renderer.drawSprite(SPRITE, this.x, this.y)
    renderer.drawSprite(SPRITE, this.x + SPRITE.width, this.y)
  }
}
