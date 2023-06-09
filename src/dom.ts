function $id(id: string) {
  return document.getElementById(id);
}

export const $stage = document.querySelector(".stage") as HTMLDivElement;
if (!$stage) {
  throw Error("Could not find stage.");
}

export const $tilesImage = $id("tiles") as HTMLImageElement;
if (!$tilesImage) {
  throw Error("Could not load tiles image.");
}

export const $animalsImage = $id("animals") as HTMLImageElement;
if (!$animalsImage) {
  throw Error("Could not load animals image.");
}

export const $backgroundCanvas = $id("background") as HTMLCanvasElement;
if (!$backgroundCanvas) {
  throw Error("Background canvas not found.");
}

export const $foregroundCanvas = $id("foreground") as HTMLCanvasElement;
if (!$foregroundCanvas) {
  throw Error("Foreground canvas not found.");
}
