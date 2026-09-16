import { FRAME_DURATION_MS, MAX_FRAME_TIME_MS } from "./config.js"

// Passo fixo: a lógica roda 60 vezes por segundo em qualquer monitor,
// e o desenho acompanha a taxa de atualização da tela.
export function startLoop(game) {
  let lastTime = null
  let accumulatedTime = 0

  function frame(time) {
    if (lastTime !== null) {
      accumulatedTime += Math.min(time - lastTime, MAX_FRAME_TIME_MS)
    }
    lastTime = time

    // Arredondar evita alternar 0 e 2 atualizações por quadro
    // quando o intervalo entre quadros varia um pouco.
    const steps = Math.round(accumulatedTime / FRAME_DURATION_MS)
    for (let i = 0; i < steps; i++) game.update()
    accumulatedTime -= steps * FRAME_DURATION_MS

    game.draw()
    requestAnimationFrame(frame)
  }

  requestAnimationFrame(frame)
}
