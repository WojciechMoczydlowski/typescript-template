import { GameStatus } from "./gameStatus";
import { Identifier } from "./identifier";

export class Board {
  private board: (Identifier | null)[][];

  constructor(size: number) {
    this.board = Array.from({ length: size }, () => {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      return Array(size).fill(null);
    });
  }

  getBoard() {
    return this.board;
  }

  isMoveAvailable(row: number, col: number): boolean {
    return this.board[row][col] === null;
  }

  placeMark(row: number, col: number, identifier: Identifier): void {
    this.board[row][col] = identifier;
  }

  checkBoardStatus(): GameStatus {}
}
