import { GameEssentials } from '../types/GameType';
import Board from './Board';
import Field from './Field';
import Origin from './Origin';
import Randomizer from './Randomizer';

type UpdateView = (board: Field[][]) => void;

class GameManager {
    private board: Board = new Board(0, 0);
    private minesAmount = 0;
    private updateViewCallback: UpdateView = () => {};
    private hasMines = false;
    private lastGameType: GameEssentials | null = null;
    private freezeGame = false;

    private resetGame() {
      this.hasMines = false;
      this.freezeGame = false;
    }

    private gameOver(): void {
      this.freezeGame = true;

      /* eslint-disable no-alert */
      // eslint-disable-next-line no-restricted-globals
      const answer = confirm('Game over, wanna play again?');
      /* eslint-enable no-alert */

      if (answer) {
        this.resetGame();

        if (this.lastGameType) {
          this.startGame(this.lastGameType);
        }
      }
    }

    private revealFields(field: Field): void {
      field.uncoverField();

      if (field.getBorderingMines() === 0) {
        const { x, y } = field.getOrigin();

        for (let i = x - 1; i <= x + 1; i += 1) {
          for (let j = y - 1; j <= y + 1; j += 1) {
            if (this.isValidOrigins(i, j)) {
              const neighbour = this.board.getField(i, j);

              if (!neighbour.isMine() && !neighbour.isUncovered() && !neighbour.isFlag()) {
                this.revealFields(neighbour);
              }
            }
          }
        }
      }
    }

    private incrementAdjacentMinesNumberInNeighbours(field: Field): void {
      const { x, y } = field.getOrigin();

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

    private randomizeMines(excludedOrigins: Origin) {
      let counter = 0;
      const { x, y } = this.board.getSizes();

      while (counter < this.minesAmount) {
        const origins = new Origin(
          Randomizer.getRandomNumber({ to: x }),
          Randomizer.getRandomNumber({ to: y }),
        );
        const field = this.board.getField(origins.x, origins.y);

        if (!field.isMine() && !origins.isEqual(excludedOrigins)) {
          field.convertToMine();
          this.incrementAdjacentMinesNumberInNeighbours(field);
          counter += 1;
        }
      }
    }

    handleFieldClick(x: number, y:number): void {
      if (this.freezeGame) {
        return undefined;
      }

      if (!this.hasMines) {
        this.randomizeMines(new Origin(x, y));
        this.hasMines = true;
      }

      const field = this.board.getField(x, y);

      if (field.isMine()) {
        field.uncoverField();
        this.updateView();

        return this.gameOver();
      }

      this.revealFields(field);

      this.updateView();

      return undefined;
    }

    handleFieldRightClick(x: number, y: number): void {
      const field = this.board.getField(x, y);

      if (!field.isUncovered()) {
        field.toggleFlag();
        this.updateView();
      }
    }

    startGame(gameType: GameEssentials): void {
      if (!this.updateViewCallback) {
        throw new Error('GameManager: define updateViewCallback before game start!');
      }

      this.lastGameType = gameType;
      this.minesAmount = gameType.minesAmount;
      this.board = new Board(gameType.sizeX, gameType.sizeY);
      this.updateView();
    }

    setUpdateViewCallback(updateViewCallback: UpdateView): void {
      this.updateViewCallback = updateViewCallback;
    }

    getMinesLeft(): number {
      return this.minesAmount - this.board.getFlagsCount();
    }
}

export default GameManager;
