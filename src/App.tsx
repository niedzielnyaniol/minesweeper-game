import React, { useEffect, useState } from 'react';
import './App.css';
import GameManager from './models/GameManager';
import GameTypes from './types/GameType';
import BoardComponent from './components/Board';
import Field from './models/Field';

const gameManager = new GameManager();

function App(): JSX.Element {
  const [fields, setFields] = useState<Field[][]>();

  useEffect(() => {
    gameManager.setUpdateViewCallback(setFields);
    gameManager.startGame(GameTypes.EASY);
  }, []);

  const handleFieldClick = (x: number, y: number) => {
    gameManager.handleFieldClick(x, y);
  };

  return (
    <div>
      {
        fields ? (
          <BoardComponent fields={fields} onFieldClick={handleFieldClick} />
        ) : 'start new game...'
      }
    </div>
  );
}

export default App;
