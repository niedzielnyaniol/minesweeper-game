import React from 'react';
import classes from './Board.module.css';
import Field from '../Field';
import Props from './Board.types';
import Stats from './components/Stats';

const Board = ({
  fields,
  onFieldClick,
  onFieldRightClick,
  minesLeft,
  time,
}: Props): JSX.Element => (
  <div className={classes.thirdFrame}>
    <Stats minesLeft={minesLeft} time={time} />
    <div className={classes.secondFrame}>
      <div className={classes.firstFrame}>
        {
          fields.map((row, index) => (
            // eslint-disable-next-line react/no-array-index-key
            <div key={`row-${index}`} className={classes.row}>
              {
                  row.map((field, fieldIndex) => {
                    const { x, y } = field.getOrigin();
                    const isUncovered = field.isUncovered();
                    const isMine = field.isMine();
                    const borderingMinesAmount = field.getBorderingMines();
                    const hasFlag = field.isFlag();

                    return (
                      <Field
                        // eslint-disable-next-line react/no-array-index-key
                        key={`field-${fieldIndex}-${field.getState()}`}
                        onClick={onFieldClick}
                        onRightClick={onFieldRightClick}
                        isUncovered={isUncovered}
                        isMine={isMine}
                        borderingMinesAmount={borderingMinesAmount}
                        hasFlag={hasFlag}
                        x={x}
                        y={y}
                      />
                    );
                  })
              }
            </div>
          ))
        }
      </div>
    </div>
  </div>
);

export default Board;
