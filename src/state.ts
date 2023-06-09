import { Ctx } from "./canvas";

export abstract class State {
  public abstract exit(): void;
  public abstract enter(): void;
  public abstract render(ctx: Ctx, delta: number): void;
  public abstract update(delta: number): State | void;
}
