import { GameEssentials } from '../types/GameType';
import Board from './Board';
import Field from './Field';
import Randomizer from './Randomizer';

type UpdateView = (board: Field[][]) => void;

function gameOver(): void {
  // eslint-disable-next-line no-alert
  alert('Game over');
}

class GameManager {
    private board: Board = new Board(0, 0);
    private minesAmount = 0;
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    private updateViewCallback: UpdateView = () => {};

    startGame(gameType: GameEssentials): void {
      if (!this.updateViewCallback) {
        throw new Error('GameManager: define updateViewCallback before game start!');
      }

      this.minesAmount = gameType.minesAmount;
      this.board = new Board(gameType.sizeX, gameType.sizeY);
      this.randomizeMines();
      this.updateView();
    }

    setUpdateViewCallback(updateViewCallback: UpdateView): void {
      this.updateViewCallback = updateViewCallback;
    }

    private revealFields(field: Field): void {
      field.uncoverField();

      if (field.getBorderingMines() === 0) {
        const { x, y } = field.getOrigins();

        for (let i = x - 1; i <= x + 1; i += 1) {
          for (let j = y - 1; j <= y + 1; j += 1) {
            if (this.isValidOrigins(i, j)) {
              const neighbour = this.board.getField(i, j);

              if (!neighbour.isMine() && !neighbour.isUncovered()) {
                this.revealFields(neighbour);
              }
            }
          }
        }
      }
    }

    handleFieldClick(x: number, y:number): void {
      const field = this.board.getField(x, y);

      if (field.isMine()) {
        return gameOver();
      }

      this.revealFields(field);

      this.updateView();

      return undefined;
    }

    private incrementAdjacentMinesNumberInNeighbours(field: Field): void {
      const { x, y } = field.getOrigins();

      for (let i = x - 1; i <= x + 1; i += 1) {
        for (let j = y - 1; j <= y + 1; j += 1) {
          if (this.isValidOrigins(i, j)) {
            const neighbour = this.board.getField(i, j);

            if (!neighbour.isMine()) {
              neighbour.setBorderingMines(neighbour.getBorderingMines() + 1);
            }
          }
        }
      }
    }

    private isValidOrigins(x: number, y: number): boolean {
      const borders = this.board.getSizes();

      return x >= 0 && x < borders.x && y >= 0 && y < borders.y;
    }

    private updateView(): void {
      if (this.board && this.updateViewCallback) {
        return this.updateViewCallback([...this.board.getFields()]);
      }

      if (!this.board) {
        throw new Error('GameManager: there is no board!');
      }

      if (!this.updateViewCallback) {
        throw new Error('GameManager: there is no updateViewCallback!');
      }

      return undefined;
    }

    private randomizeMines() {
      let counter = 0;
      const { x, y } = this.board.getSizes();

      while (counter < this.minesAmount) {
        const origins = {
          x: Randomizer.getRandomNumber(x),
          y: Randomizer.getRandomNumber(y),
        };

        const field = this.board.getField(origins.x, origins.y);

        if (!field.isMine()) {
          field.convertToMine();
          this.incrementAdjacentMinesNumberInNeighbours(field);
          counter += 1;
        }
      }
    }
}

export default GameManager;
