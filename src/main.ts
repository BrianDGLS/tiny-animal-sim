import { canvasHeight, canvasWidth, fg } from "./canvas";
import { Sheep } from "./sheep";
import { xy } from "./xy";

const sheep = new Sheep(xy(canvasWidth / 2, canvasHeight / 2));

function coinToss(): boolean {
  return Math.random() > 0.5;
}

setInterval(function () {
  sheep.velocity = coinToss()
    ? xy(coinToss() ? sheep.walkingSpeed : -sheep.walkingSpeed, 0)
    : xy(0, coinToss() ? sheep.walkingSpeed : -sheep.walkingSpeed);
}, 3000);

window.addEventListener("load", function () {
  (function main(delta: number) {
    requestAnimationFrame(main);

    fg.clearRect(0, 0, canvasWidth, canvasHeight);

    sheep.update(delta);
    sheep.render(fg, delta);
  })(0);
});
