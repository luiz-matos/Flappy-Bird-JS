const BEST_SCORE_KEY = "flappyBird.bestScore"

// Em modo privado ou com armazenamento bloqueado, o localStorage lança erro.
// Nesses casos o jogo continua e o recorde vale só enquanto a página
// estiver aberta.

export function loadBestScore() {
  try {
    return Number(localStorage.getItem(BEST_SCORE_KEY)) || 0
  } catch {
    return 0
  }
}

export function saveBestScore(score) {
  try {
    localStorage.setItem(BEST_SCORE_KEY, String(score))
  } catch {
    // Sem armazenamento: o recorde fica só em memória.
  }
}
