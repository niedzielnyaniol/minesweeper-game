export type GameEssentials = {
    sizeX: number,
    sizeY: number,
    minesAmount: number
}

const GameTypes: { [key: string]: GameEssentials } = {
  EASY: { sizeX: 10, sizeY: 10, minesAmount: 20 },
  MEDIUM: { sizeX: 20, sizeY: 20, minesAmount: 30 },
};

export default GameTypes;
