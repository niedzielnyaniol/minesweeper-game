import Field from './Field';

class Board {
    private fields: Field[][];

    constructor(x: number, y:number) {
      this.fields = new Array<Field[]>(y);

      for (let i = 0; i < y; i += 1) {
        this.fields[i] = new Array<Field>(x);

        for (let j = 0; j < x; j += 1) {
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

    setField(field: Field, origin?: { x: number, y: number}): void {
      const { x, y } = origin || field.getOrigins();

      this.fields[y][x] = field;
    }

    getSizes(): { x: number, y: number } {
      return {
        y: this.fields.length,
        x: this.fields[0].length,
      };
    }

    map(callback: (field: Field) => Field): void {
      const { x, y } = this.getSizes();

      for (let i = 0; i < y; i += 1) {
        for (let j = 0; j < x; j += 1) {
          const field = this.getField(x, y);

          this.setField(callback(field));
        }
      }
    }
}

export default Board;
