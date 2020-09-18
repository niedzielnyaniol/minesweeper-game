import React from 'react';
import Props from './Field.types';
import classes from './Field.module.css';
import classNames from '../../utils/classNames';

const Field = ({
  x,
  y,
  isMine,
  hasFlag,
  isUncovered,
  borderingMinesAmount,
  onClick,
  onRightClick,
}: Props): JSX.Element => {
  const handleClick = (): void => {
    onClick(x, y);
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleContextMenu = (e: any) => {
    e.preventDefault();
    onRightClick(x, y);
  };

  return (
    // eslint-disable-next-line
    <button
      type="button"
      onClick={handleClick}
      onContextMenu={handleContextMenu}
      className={
        classNames([
          classes.field,
          isUncovered && classes.uncovered,
          isUncovered && isMine && classes.mine,
          !isUncovered && hasFlag && classes.flag,
          borderingMinesAmount > 0 && classes[`number${borderingMinesAmount}`],
        ])
      }
    >
      {isUncovered && !isMine && borderingMinesAmount > 0 ? borderingMinesAmount : null}
    </button>
  );
};

export default Field;
