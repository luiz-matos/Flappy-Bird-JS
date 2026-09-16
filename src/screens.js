import { CRASH_FREEZE_MS, FALL_SOUND_DELAY_MS } from "./config.js"
import { playSound, sounds } from "./sounds.js"
import { drawGetReady, drawScore, drawScoreBoard } from "./ui.js"

// Cada tela responde a três eventos: update (lógica), draw (desenho)
// e handleInput (clique, toque ou tecla).

export class InitialScreen {
  constructor(game) {
    this.game = game
  }

  update() {
    this.game.advanceFrame()
    this.game.ground.update()
  }

  draw() {
    this.game.drawScene()
    drawGetReady(this.game.renderer)
  }

  handleInput() {
    this.game.startRound()
  }
}

export class PlayingScreen {
  constructor(game) {
    this.game = game
    this.hasCrashed = false
  }

  update() {
    if (this.hasCrashed) return

    const { bird, ground, pipes } = this.game
    this.game.advanceFrame()

    if (ground.isTouchedBy(bird)) {
      this.crash()
      return
    }

    bird.fall()
    ground.update()
    pipes.update(this.game.frameCount)

    if (pipes.collidesWith(bird)) {
      this.crash()
      return
    }

    this.scorePassedPipes()
  }

  scorePassedPipes() {
    const points = this.game.pipes.markPassedBy(this.game.bird)
    if (points === 0) return
    this.game.score += points
    playSound(sounds.point)
  }

  crash() {
    this.hasCrashed = true
    this.game.updateBestScore()
    playSound(sounds.hit)
    setTimeout(() => playSound(sounds.fall), FALL_SOUND_DELAY_MS)
    setTimeout(() => this.game.showGameOver(), CRASH_FREEZE_MS)
  }

  draw() {
    this.game.drawScene()
    drawScore(this.game.renderer, this.game.score)
  }

  handleInput() {
    if (this.hasCrashed) return
    this.game.bird.jump()
    playSound(sounds.jump)
  }
}

export class GameOverScreen {
  constructor(game) {
    this.game = game
  }

  update() {
    // A cena fica parada atrás do quadro de Game Over.
  }

  draw() {
    const { renderer, score, bestScore } = this.game
    this.game.drawScene()
    drawScoreBoard(renderer, score, bestScore)
  }

  handleInput() {
    this.game.showInitial()
  }
}
