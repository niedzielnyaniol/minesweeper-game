import React from 'react';
import Props from './Field.types';
import classes from './Field.module.css';
import classNames from '../../utils/classNames';

const Field = ({
  field,
  onClick,
}: Props): JSX.Element => {
  const borderingMines = field.getBorderingMines();
  const { x, y } = field.getOrigins();

  const handleClick = (): void => {
    const { x, y } = field.getOrigins();

    onClick(x, y);
  };

  return (
    // eslint-disable-next-line
    <button
      type="button"
      onClick={handleClick}
      data-x={x}
      data-y={y}
      className={
        classNames([
          classes.field,
          field.isMine() && classes.mine,
          field.isUncovered() && classes.uncovered,
        ])
      }
    >
      {borderingMines && borderingMines > 0 ? borderingMines : null}
    </button>
  );
};

export default Field;
