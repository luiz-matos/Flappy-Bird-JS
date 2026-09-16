import { drawBackground } from "./entities/background.js"
import { Bird } from "./entities/bird.js"
import { Ground } from "./entities/ground.js"
import { Pipes } from "./entities/pipes.js"
import { GameOverScreen, InitialScreen, PlayingScreen } from "./screens.js"
import { loadBestScore, saveBestScore } from "./storage.js"

export class Game {
  constructor(renderer) {
    this.renderer = renderer
    this.ground = new Ground(renderer.height)
    this.bestScore = loadBestScore()
    this.frameCount = 0
    this.showInitial()
  }

  showInitial() {
    this.resetRound()
    this.screen = new InitialScreen(this)
  }

  startRound() {
    this.screen = new PlayingScreen(this)
  }

  showGameOver() {
    this.screen = new GameOverScreen(this)
  }

  resetRound() {
    this.bird = new Bird()
    this.pipes = new Pipes(this.renderer.width)
    this.score = 0
  }

  advanceFrame() {
    this.frameCount++
    this.bird.animate(this.frameCount)
  }

  updateBestScore() {
    if (this.score <= this.bestScore) return
    this.bestScore = this.score
    saveBestScore(this.bestScore)
  }

  update() {
    this.screen.update()
  }

  draw() {
    this.screen.draw()
  }

  handleInput() {
    this.screen.handleInput()
  }

  drawScene() {
    drawBackground(this.renderer)
    this.pipes.draw(this.renderer)
    this.ground.draw(this.renderer)
    this.bird.draw(this.renderer)
  }
}
