import { Ctx } from "./canvas";
import { xy } from "./xy";

export class SpriteSheet {
  constructor(
    public img: HTMLImageElement,
    public columns: number,
    public rows: number
  ) {}

  public getFrameWidth(): number {
    return this.img.width / this.columns;
  }

  public getFrameHeight(): number {
    return this.img.height / this.rows;
  }

  public drawFrame(
    ctx: Ctx,
    pos = xy(),
    offset = xy(),
    scale = xy(1, 1),
    rotation = 0
  ): void {
    ctx.save();
    ctx.translate(pos.x, pos.y);
    ctx.scale(scale.x, scale.y);
    ctx.rotate(rotation);

    const w = this.getFrameWidth();
    const h = this.getFrameHeight();
    ctx.drawImage(
      this.img,
      offset.x * w,
      offset.y * h,
      w,
      h,
      -w / 2,
      -h / 2,
      w,
      h
    );
    ctx.restore();
  }
}
