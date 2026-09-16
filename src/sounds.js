import { SOUND_VOLUME } from "./config.js"

function createSound(path) {
  const sound = new Audio(path)
  sound.volume = SOUND_VOLUME
  return sound
}

export const sounds = {
  jump: createSound("audios/jump.wav"),
  point: createSound("audios/point.wav"),
  hit: createSound("audios/hit.wav"),
  fall: createSound("audios/fall.wav"),
}

export function playSound(sound) {
  sound.currentTime = 0
  // O navegador pode bloquear o áudio; nesse caso o jogo segue sem som.
  sound.play().catch(() => {})
}
