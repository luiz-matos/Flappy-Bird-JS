const ACTION_KEYS = ["Space", "ArrowUp", "KeyW"]
const PRIMARY_BUTTON = 0

export function listenForInput(onAction) {
  window.addEventListener("pointerdown", (event) => {
    if (event.button === PRIMARY_BUTTON) onAction()
  })

  window.addEventListener("keydown", (event) => {
    if (!ACTION_KEYS.includes(event.code) || event.repeat) return
    event.preventDefault()
    onAction()
  })
}
