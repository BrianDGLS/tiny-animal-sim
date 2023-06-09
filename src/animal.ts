import { Ctx } from "./canvas";
import { Directions } from "./directions";
import { $animalsImage } from "./dom";
import { SpriteSheet } from "./sprite";
import { State } from "./state";
import { XY, xy } from "./xy";

export const animalSpriteSheet = new SpriteSheet($animalsImage, 16, 30);

export class AnimalAnimation {
  public frames = 4;
  public currentFrame = 0;
  public frameStart: undefined | number;

  constructor(
    public spriteSheet: SpriteSheet,
    public offset = xy(),
    public durationInMilliseconds = 500
  ) {}

  public play(
    ctx: Ctx,
    delta: number,
    pos: XY,
    scale?: XY,
    rotation?: number
  ): void {
    if (this.frameStart === undefined) {
      this.frameStart = delta;
    }

    const elapsed = delta - this.frameStart;
    if (elapsed >= this.durationInMilliseconds) {
      this.frameStart = delta;
      this.currentFrame++;
    }

    if (this.currentFrame >= this.frames) {
      this.currentFrame = 0;
    }

    const offset = xy(this.currentFrame, this.offset.y);
    this.spriteSheet.drawFrame(ctx, pos, offset, scale, rotation);
  }
}

export class AnimalState extends State {
  constructor(public animal: Animal) {
    super();
  }

  public exit(): void {}
  public enter(): void {}
  public render(ctx: Ctx, delta: number): void {}
  public update(delta: number): AnimalState | void {}
}

export class AnimalIdleState extends AnimalState {
  public update(delta: number): AnimalState | void {
    if (!this.animal.velocity.isZero()) {
      return new AnimalMovingState(this.animal);
    }
  }
}

export class AnimalMovingState extends AnimalState {
  public update(delta: number): AnimalState | void {
    if (this.animal.velocity.isZero()) {
      return new AnimalIdleState(this.animal);
    }
  }
}

export class Animal {
  public size = 16;
  public velocity = xy();
  public walkingSpeed = 1;
  public facing: Directions = Directions.SOUTH;
  public activeState = new AnimalIdleState(this);

  constructor(public pos = xy()) {}

  public changeState(newState: AnimalState): void {
    this.activeState.exit();
    this.activeState = newState;
    this.activeState.enter();
  }

  public render(ctx: Ctx, delta: number): void {
    this.activeState.render(ctx, delta);
  }

  public update(delta: number): void {
    const newState = this.activeState.update(delta);
    if (newState) {
      this.changeState(newState);
    }
  }
}
