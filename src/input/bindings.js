export const playerBindings = {
  moveLeft:  { keys: ["KeyA", "ArrowLeft"], type: "held" },
  moveRight: { keys: ["KeyD", "ArrowRight"], type: "held" },
  jump:      { keys: ["Space"], type: "pressed" },
};

export const sceneBindings = {
  pause:     { keys: ["Enter", "Escape"], type: "pressed" },
};

export const menuBindings = {
  select: { keys: ["Space", "Enter"], type: "pressed" },
  cancel: { keys: ["Escape"], type: "pressed" },
  up:     { keys: ["KeyW"], type: "pressed" },
  down:   { keys: ["KeyS"], type: "pressed" },
};
