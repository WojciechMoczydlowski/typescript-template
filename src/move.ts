import { Identifier } from "./identifier";

export class Move {
  private identifier: Identifier;
  private row: number;
  private col: number;

  constructor(identifier: Identifier, row: number, col: number) {
    this.identifier = identifier;
    this.row;
  }

  getIdentifier() {
    return this.identifier;
  }

  getRow() {
    return this.row;
  }

  getCol() {
    return this.col;
  }
}
