#!/usr/bin/env node
// NOTE: You can remove the first line if you don't plan to release an
// executable package. E.g. code that can be used as cli like prettier or eslint

import { Game } from "./game";
import { GameStatus } from "./gameStatus";
import { returnHelloWorld } from "./hello";
import { Identifier } from "./identifier";
import { Move } from "./move";

const main = () => {
  const boardSize = 3;
  const game = new Game(boardSize);

  game.makeMove(new Move(Identifier.O, 0, 1));
  game.makeMove(new Move(Identifier.X, 2, 1));
  game.makeMove(new Move(Identifier.O, 1, 1));

  if (game.getGameStatus() !== GameStatus.Running) {
    console.log(game.getGameStatus());
  }
};

main();
