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
                row.map((field, fieldIndex) => (
                  // eslint-disable-next-line react/no-array-index-key
                  <Field key={`field-${fieldIndex}-${field.getState()}`} field={field} onClick={onFieldClick} />
                ))
            }
          </div>
        ))
    }
  </div>
);

export default Board;
