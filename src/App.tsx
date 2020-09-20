import React, { useEffect, useState } from 'react';
import classes from './App.module.css';
import GameManager from './models/GameManager';
import GameTypes from './types/GameType';
import BoardComponent from './components/Board';
import Field from './models/Field';

const gameManager = new GameManager();

function App(): JSX.Element {
  const [fields, setFields] = useState<Field[][]>();
  const [time, setTime] = useState<number>(0);

  useEffect(() => {
    gameManager.setUpdateViewCallback(setFields);
    gameManager.startGame(GameTypes.MEDIUM);

    const interval = setInterval(() => {
      setTime((prevTime) => prevTime + 1);
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  const handleFieldClick = (x: number, y: number) => {
    gameManager.handleFieldClick(x, y);
  };

  const handleFieldRightClick = (x: number, y: number) => {
    gameManager.handleFieldRightClick(x, y);
  };

  return (
    <div className={classes.center}>
      {
        fields ? (
          <BoardComponent
            minesLeft={gameManager.getMinesLeft()}
            fields={fields}
            onFieldClick={handleFieldClick}
            onFieldRightClick={handleFieldRightClick}
            time={time}
          />
        ) : 'start new game...'
      }
    </div>
  );
}

export default App;
