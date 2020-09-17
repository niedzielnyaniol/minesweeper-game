import { GameEssentials } from '../types/GameType';
import Board from './Board';

class GameManager {
    private board: Board | undefined;
    private sizeX: number;
    private sizeY: number;
    private minesAmount: number;
    private updateViewCallback: (board: Board) => void;

    constructor(
      gameType: GameEssentials,
      updateViewCallback: (board: Board) => void,
    ) {
      this.sizeX = gameType.sizeX;
      this.sizeY = gameType.sizeY;
      this.minesAmount = gameType.minesAmount;
      this.updateViewCallback = updateViewCallback;
    }

    startGame(): void {
      this.board = new Board(this.sizeX, this.sizeY);
    }

    updateView(): void {
      if (this.board) {
        this.updateViewCallback(this.board);
      }
    }

    getMinesAmount(): number {
      return this.minesAmount;
    }
}

export default GameManager;
