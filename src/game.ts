import { Board } from "./board";
import { GameStatus } from "./gameStatus";
import { Identifier } from "./identifier";
import { Move } from "./move";
import { Player } from "./player";

interface IGame {
  makeMove(move: Move): void;
  getGameStatus(): GameStatus;
  getBoard(): (Identifier | null)[][];
  getCurrentPlayer(): Player;
}

export class Game implements IGame {
  private board: Board;
  private players: Player[];
  private currentPlayerIndex: number;

  constructor(boardSize: number) {
    this.board = new Board(boardSize);
    this.players = [new Player(Identifier.O), new Player(Identifier.X)];
    this.currentPlayerIndex = 0;
  }

  makeMove(move: Move) {
    const moveIdentifier = move.getIdentifier();
    const moveRow = move.getRow();
    const moveCol = move.getCol();

    // check if game is over

    if (moveIdentifier !== this.getCurrentPlayer().getIdentifier()) {
      new Error("It's not your turn!");
    }

    if (!this.board.isMoveAvailable(moveRow, moveCol)) {
      new Error("Invalid move! This position is already occupied.");
    }

    this.board.placeMark(moveRow, moveCol, moveIdentifier);
    this.changePlayer();
  }

  private changePlayer(): void {
    this.currentPlayerIndex =
      (this.currentPlayerIndex + 1) % this.players.length;
  }

  getGameStatus(): GameStatus {
    return GameStatus.Running;
  }

  getBoard(): (Identifier | null)[][] {
    return this.board.getBoard();
  }

  getCurrentPlayer(): Player {
    return this.players[this.currentPlayerIndex];
  }
}
