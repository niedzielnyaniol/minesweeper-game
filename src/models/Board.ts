import Field from './Field';

class Board {
    private fields: Field[][];

    constructor(x: number, y:number) {
      this.fields = new Array<Field[]>(y);

      for (let i = 0; i < y; i += 1) {
        for (let j = 0; j < x; j += 1) {
          this.fields[i] = new Array<Field>(x);
          this.fields[i][j] = new Field(j, i);
        }
      }
    }

    getFields(): Field[][] {
      return this.fields;
    }

    getField(x: number, y: number): Field {
      return this.fields[y][x];
    }

    setField(field: Field, x :number = field.x, y:number = field.y): void {
      this.fields[y][x] = field;
    }
}

export default Board;
