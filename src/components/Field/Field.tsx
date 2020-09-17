import React from 'react';
import Props from './Field.types';
import classes from './Field.module.css';
import classNames from '../../utils/classNames';

const Field = ({
  borderingMinesAmount,
  isMine,
  isUncovered,
  x,
  y,
  onClick,
}: Props): JSX.Element => {
  const handleClick = (): void => {
    onClick(x, y);
  };

  return (
    // eslint-disable-next-line
    <button
      type="button"
      onClick={handleClick}
      className={
        classNames([
          classes.field,
          isUncovered && classes.uncovered,
          isUncovered && isMine && classes.mine,
        ])
      }
    >
      {isUncovered && borderingMinesAmount > 0 ? borderingMinesAmount : null}
    </button>
  );
};

export default Field;
