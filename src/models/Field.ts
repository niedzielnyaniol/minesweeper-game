import FieldStates from '../types/FieldState';
import FieldTypes from '../types/FieldTypes';
import Origin from './Origin';

class Field {
  constructor(
      private x: number,
      private y: number,
      private borderingMines: number = 0,
      private state: FieldStates = FieldStates.HIDDEN,
      private type: FieldTypes = FieldTypes.NORMAL,
  ) {}

  getOrigin(): Origin {
    return new Origin(this.x, this.y);
  }

  setBorderingMines(amount: number): void {
    this.borderingMines = amount;
  }

  getBorderingMines(): number {
    return this.borderingMines;
  }

  uncoverField(): void {
    this.state = FieldStates.OPENED;
  }

  getState(): FieldStates {
    return this.state;
  }

  flagField(): void {
    this.state = FieldStates.FLAGGED;
  }

  convertToMine(): void {
    this.type = FieldTypes.MINE;
  }

  isMine(): boolean {
    return this.type === FieldTypes.MINE;
  }

  isUncovered(): boolean {
    return this.state === FieldStates.OPENED;
  }
}

export default Field;
