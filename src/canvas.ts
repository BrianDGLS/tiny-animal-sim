import { $backgroundCanvas, $foregroundCanvas, $stage } from "./dom";

export type Ctx = CanvasRenderingContext2D;
function ctx($canvas: HTMLCanvasElement): Ctx {
  return $canvas.getContext("2d") as Ctx;
}

export const canvasWidth = 600;
export const canvasHeight = 600;

$stage.style.width = `${canvasWidth}px`;
$stage.style.height = `${canvasHeight}px`;

$backgroundCanvas.width = canvasWidth;
$backgroundCanvas.height = canvasHeight;

$foregroundCanvas.width = canvasWidth;
$foregroundCanvas.height = canvasHeight;

export const fg = ctx($foregroundCanvas);
export const bg = ctx($backgroundCanvas);
