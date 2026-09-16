const TEXT_FILL_COLOR = "#ffffff"
const TEXT_OUTLINE_COLOR = "#412937"
const TEXT_OUTLINE_RATIO = 1 / 5

export function loadImage(src) {
  return new Promise((resolve, reject) => {
    const image = new Image()
    image.onload = () => resolve(image)
    image.onerror = () => reject(new Error(`Falha ao carregar ${src}`))
    image.src = src
  })
}

export class Renderer {
  constructor(canvas, spriteSheet) {
    this.context = canvas.getContext("2d")
    this.width = canvas.width
    this.height = canvas.height
    this.spriteSheet = spriteSheet
  }

  fillCanvas(color) {
    this.context.fillStyle = color
    this.context.fillRect(0, 0, this.width, this.height)
  }

  drawSprite(sprite, x, y) {
    this.context.drawImage(
      this.spriteSheet,
      sprite.x,
      sprite.y,
      sprite.width,
      sprite.height,
      x,
      y,
      sprite.width,
      sprite.height
    )
  }

  drawText(text, x, y, { align, size }) {
    const context = this.context
    context.font = `bold ${size}px sans-serif`
    context.textAlign = align
    context.lineJoin = "round"
    context.lineWidth = size * TEXT_OUTLINE_RATIO
    context.strokeStyle = TEXT_OUTLINE_COLOR
    context.fillStyle = TEXT_FILL_COLOR
    context.strokeText(text, x, y)
    context.fillText(text, x, y)
  }
}
