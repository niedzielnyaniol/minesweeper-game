import Field from './Field';
import Origin from './Origin';

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

    getSizes(): Origin {
      return new Origin(this.fields.length, this.fields[0].length);
    }

    getFlagsCount(): number {
      let count = 0;
      const { x, y } = this.getSizes();

      for (let i = 0; i < y; i += 1) {
        for (let j = 0; j < x; j += 1) {
          if (this.fields[i][j].isFlag()) {
            count += 1;
          }
        }
      }

      return count;
    }
}

export default Board;
