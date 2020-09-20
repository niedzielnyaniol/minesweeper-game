import React from 'react';
import Props from './Number.types';
import classes from './Number.module.css';
import classNames from '../../../../utils/classNames';

const isActive = (actualNumber: number, numbers: number[]): boolean => numbers
  .includes(actualNumber);

const Number = ({ children }: Props): JSX.Element => (
  <div className={classes.wrapper}>
    <div className={classNames([
      classes.top,
      isActive(children, [0, 2, 3, 5, 6, 7, 8, 9]) && classes.active,
    ])}
    />
    <div className={classes.row}>
      <div className={classNames([
        classes.left,
        isActive(children, [0, 4, 5, 6, 8, 9]) && classes.active,
      ])}
      />
      <div className={classNames([
        classes.right,
        isActive(children, [0, 1, 2, 3, 4, 7, 8, 9]) && classes.active,
      ])}
      />
    </div>
    <div className={classNames([
      classes.center,
      isActive(children, [2, 3, 4, 5, 6, 8, 9]) && classes.active,
    ])}
    />
    <div className={classes.row}>
      <div className={classNames([
        classes.left,
        isActive(children, [0, 2, 6, 8]) && classes.active,
      ])}
      />
      <div className={classNames([
        classes.right,
        isActive(children, [0, 1, 3, 4, 5, 6, 7, 8, 9]) && classes.active,
      ])}
      />
    </div>
    <div className={classNames([
      classes.bottom,
      isActive(children, [0, 2, 3, 5, 6, 8, 9]) && classes.active,
    ])}
    />
  </div>
);

export default Number;
