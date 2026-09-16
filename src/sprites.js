// Recortes do sprites.png: posição (x, y) e tamanho de cada imagem.
export const SPRITES = {
  birdFrames: [
    { x: 0, y: 0, width: 34, height: 25 },
    { x: 0, y: 26, width: 34, height: 25 },
    { x: 0, y: 52, width: 34, height: 25 },
  ],
  background: { x: 390, y: 0, width: 276, height: 204 },
  ground: { x: 0, y: 610, width: 224, height: 112 },
  pipeTop: { x: 52, y: 169, width: 52, height: 400 },
  pipeBottom: { x: 0, y: 169, width: 52, height: 400 },
  getReady: { x: 134, y: 0, width: 174, height: 152 },
  gameOver: { x: 134, y: 153, width: 226, height: 200 },
  medals: {
    platinum: { x: 0, y: 78, width: 44, height: 44 },
    gold: { x: 0, y: 124, width: 44, height: 44 },
    silver: { x: 48, y: 78, width: 44, height: 44 },
    bronze: { x: 48, y: 124, width: 44, height: 44 },
  },
}
