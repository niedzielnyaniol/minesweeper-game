import React from 'react';
import Props from './Stats.types';
import Digits from '../../../Digits';
import EmojiButton from '../../../EmojiButton';
import classes from './Stats.module.css';

const Stats = ({
  minesLeft,
  time,
  restartGame = () => {},
}: Props): JSX.Element => (
  <div className={classes.secondFrame}>
    <div className={classes.thirdFrame}>
      <div className={classes.content}>
        <Digits>{String(minesLeft).padStart(3, '0')}</Digits>
        <EmojiButton onClick={restartGame} />
        <Digits>{String(time).padStart(3, '0')}</Digits>
      </div>
    </div>
  </div>
);

export default Stats;
