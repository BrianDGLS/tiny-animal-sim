export class XY {
  constructor(public x = 0, public y = 0) {}

  public isZero(): boolean {
    return this.x === 0 && this.y === 0;
  }
}

export function xy(x = 0, y = 0): XY {
  return new XY(x, y);
}
