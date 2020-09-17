import React from 'react';
import Field from '../Field';
import Props from './Board.types';

const Board = ({
  fields,
  onFieldClick,
}: Props): JSX.Element => (
  <div>
    {
        fields.map((row, index) => (
          // eslint-disable-next-line react/no-array-index-key
          <div key={`row-${index}`} style={{ display: 'flex' }}>
            {
                row.map((field, fieldIndex) => {
                  const { x, y } = field.getOrigin();
                  const isUncovered = field.isUncovered();
                  const isMine = field.isMine();
                  const borderingMinesAmount = field.getBorderingMines();

                  return (
                    <Field
                      // eslint-disable-next-line react/no-array-index-key
                      key={`field-${fieldIndex}-${field.getState()}`}
                      onClick={onFieldClick}
                      isUncovered={isUncovered}
                      isMine={isMine}
                      borderingMinesAmount={borderingMinesAmount}
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
);

export default Board;
