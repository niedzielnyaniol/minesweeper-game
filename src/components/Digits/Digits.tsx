import React from 'react';
import Props from './Digits.type';
import Number from './components/Number';
import classes from './Digits.module.css';

const Digits = ({ children }: Props): JSX.Element => {
  const numbers = String(children).split('').map((el) => parseInt(el, 10));

  return (
    <div className={classes.wrapper}>
      { numbers.map((el) => (
        <div className={classes['number-wrapper']}>
          <Number>{el}</Number>
        </div>
      )) }
    </div>
  );
};

export default Digits;
