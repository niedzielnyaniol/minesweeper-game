import React from 'react';
import Props from './EmojiButton.types';
import classes from './EmojiButton.module.css';

const EmojiButton = ({
  state = 'game',
  onClick,
}: Props): JSX.Element => (
  <button onClick={onClick} type="button" className={classes.wrapper}>
    <div className={classes.emoji}>
      {state === 'game' && '🙂'}
      {state === 'loss' && '😢'}
      {state === 'win' && '😎'}
    </div>
  </button>
);

export default EmojiButton;
