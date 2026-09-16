import { Game } from "./game.js"
import { listenForInput } from "./input.js"
import { startLoop } from "./loop.js"
import { loadImage, Renderer } from "./renderer.js"

const canvas = document.querySelector("#game-canvas")
const spriteSheet = await loadImage("sprites.png")
const game = new Game(new Renderer(canvas, spriteSheet))

listenForInput(() => game.handleInput())
startLoop(game)
