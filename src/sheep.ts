import {
  Animal,
  AnimalAnimation,
  AnimalState,
  animalSpriteSheet,
} from "./animal";
import { Ctx, canvasHeight, canvasWidth } from "./canvas";
import { Directions } from "./directions";
import { xy } from "./xy";

export class SheepIdleState extends AnimalState {
  public render(ctx: Ctx, delta: number): void {
    const sheep = this.animal;

    switch (this.animal.facing) {
      case Directions.NORTH:
        animalSpriteSheet.drawFrame(ctx, sheep.pos, xy(0, 23));
        break;
      case Directions.SOUTH:
        animalSpriteSheet.drawFrame(ctx, sheep.pos, xy(0, 22));
        break;
      case Directions.EAST:
        animalSpriteSheet.drawFrame(ctx, sheep.pos, xy(0, 21));
        break;
      case Directions.WEST:
        animalSpriteSheet.drawFrame(ctx, sheep.pos, xy(0, 21), xy(-1, 1));
        break;
    }
  }

  public update(delta: number): AnimalState | void {
    const sheep = this.animal;

    if (sheep.velocity.x === sheep.walkingSpeed) {
      return new SheepWalkingWestState(sheep);
    }

    if (sheep.velocity.x === -sheep.walkingSpeed) {
      return new SheepWalkingEastState(sheep);
    }

    if (sheep.velocity.y === sheep.walkingSpeed) {
      return new SheepWalkingSouthState(sheep);
    }

    if (sheep.velocity.y === -sheep.walkingSpeed) {
      return new SheepWalkingNorthState(sheep);
    }
  }
}

export class SheepWalkingState extends AnimalState {
  public animation = new AnimalAnimation(animalSpriteSheet, xy(0, 21), 250);

  public render(ctx: Ctx, delta: number): void {
    this.animation.play(ctx, delta, this.animal.pos);
  }

  public update(delta: number): AnimalState | void {
    const sheep = this.animal;

    sheep.pos.x += sheep.velocity.x;
    sheep.pos.y += sheep.velocity.y;

    if (sheep.velocity.isZero()) {
      return new SheepIdleState(sheep);
    }
  }
}

export class SheepWalkingWestState extends SheepWalkingState {
  public enter(): void {
    this.animal.facing = Directions.WEST;
    this.animal.velocity = xy(-this.animal.walkingSpeed, 0);
  }

  public render(ctx: Ctx, delta: number): void {
    this.animation.play(ctx, delta, this.animal.pos, xy(-1, 1));
  }

  public update(delta: number): AnimalState | void {
    const sheep = this.animal;

    if (sheep.pos.x - sheep.size / 2 < 0) {
      return new SheepWalkingEastState(sheep);
    }

    if (sheep.velocity.x != -sheep.walkingSpeed) {
      return new SheepIdleState(sheep);
    }

    return super.update(delta);
  }
}

export class SheepWalkingEastState extends SheepWalkingState {
  public enter(): void {
    this.animal.facing = Directions.EAST;
    this.animal.velocity = xy(this.animal.walkingSpeed, 0);
  }

  public update(delta: number): AnimalState | void {
    const sheep = this.animal;

    if (sheep.pos.x + sheep.size / 2 > canvasWidth) {
      return new SheepWalkingWestState(sheep);
    }

    if (sheep.velocity.x != sheep.walkingSpeed) {
      return new SheepIdleState(sheep);
    }

    return super.update(delta);
  }
}

export class SheepWalkingNorthState extends SheepWalkingState {
  public animation = new AnimalAnimation(animalSpriteSheet, xy(0, 23), 250);

  public enter(): void {
    this.animal.facing = Directions.NORTH;
    this.animal.velocity = xy(0, -this.animal.walkingSpeed);
  }

  public update(delta: number): AnimalState | void {
    const sheep = this.animal;

    if (sheep.pos.y - sheep.size / 2 < 0) {
      return new SheepWalkingSouthState(sheep);
    }

    if (sheep.velocity.y != -sheep.walkingSpeed) {
      return new SheepIdleState(sheep);
    }

    return super.update(delta);
  }
}

export class SheepWalkingSouthState extends SheepWalkingState {
  public animation = new AnimalAnimation(animalSpriteSheet, xy(0, 22), 250);

  public enter(): void {
    this.animal.facing = Directions.SOUTH;
    this.animal.velocity = xy(0, this.animal.walkingSpeed);
  }

  public update(delta: number): AnimalState | void {
    const sheep = this.animal;

    if (sheep.pos.y + sheep.size / 2 > canvasHeight) {
      return new SheepWalkingNorthState(sheep);
    }

    if (sheep.velocity.y != sheep.walkingSpeed) {
      return new SheepIdleState(sheep);
    }

    return super.update(delta);
  }
}

export class Sheep extends Animal {
  public activeState = new SheepIdleState(this);
}
