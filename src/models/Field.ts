import FieldState from '../types/FieldState';

class Field {
  constructor(
        public x: number,
        public y: number,
        private borderingMines: number | null = null,
        private state: FieldState = FieldState.HIDDEN,
  ) {}

  setOrigin(x: number, y:number): void {
    this.x = x;
    this.y = y;
  }

  getFieldData(): Field {
    return { ...this };
  }

  setBorderingMines(amount: number): void {
    this.borderingMines = amount;
  }

  getBorderingMines(): number | null {
    return this.borderingMines;
  }

  uncoverField(): void {
    this.state = FieldState.OPENED;
  }

  getState(): FieldState {
    return this.state;
  }

  flagField(): void {
    this.state = FieldState.FLAGGED;
  }
}

export default Field;
