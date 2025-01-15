import { Identifier } from "./identifier";

export class Player {
  private identifier: Identifier;

  constructor(identifier: Identifier) {
    this.identifier = identifier;
  }

  getIdentifier() {
    return this.identifier;
  }
}
