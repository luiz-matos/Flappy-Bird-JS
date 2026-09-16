import { MEDALS } from "./config.js"
import { SPRITES } from "./sprites.js"

const MESSAGE_Y = 50
const SCORE_Y = 60
const SCORE_FONT_SIZE = 36
const BOARD_FONT_SIZE = 20

// Posições dentro do sprite de Game Over, medidas no sprites.png.
const BOARD_LAYOUT = {
  medal: { x: 26, y: 86 },
  score: { x: 203, y: 94 },
  bestScore: { x: 203, y: 136 },
}

export function drawScore(renderer, score) {
  renderer.drawText(score, renderer.width / 2, SCORE_Y, {
    align: "center",
    size: SCORE_FONT_SIZE,
  })
}

export function drawGetReady(renderer) {
  const sprite = SPRITES.getReady
  renderer.drawSprite(sprite, centeredX(renderer, sprite), MESSAGE_Y)
}

export function drawScoreBoard(renderer, score, bestScore) {
  const sprite = SPRITES.gameOver
  const boardX = centeredX(renderer, sprite)
  const boardY = MESSAGE_Y
  const onBoard = (offset) => [boardX + offset.x, boardY + offset.y]

  renderer.drawSprite(sprite, boardX, boardY)

  const medal = findMedal(score)
  if (medal) {
    const medalSprite = SPRITES.medals[medal.name]
    renderer.drawSprite(medalSprite, ...onBoard(BOARD_LAYOUT.medal))
  }

  const textStyle = { align: "right", size: BOARD_FONT_SIZE }
  renderer.drawText(score, ...onBoard(BOARD_LAYOUT.score), textStyle)
  renderer.drawText(bestScore, ...onBoard(BOARD_LAYOUT.bestScore), textStyle)
}

// MEDALS está em ordem decrescente: a primeira faixa alcançada é a maior.
export function findMedal(score) {
  return MEDALS.find((medal) => score >= medal.minScore)
}

function centeredX(renderer, sprite) {
  return renderer.width / 2 - sprite.width / 2
}
