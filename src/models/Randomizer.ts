class Randomizer {
  static getRandomNumber(to:number, from = 0): number {
    return Math.floor(Math.random() * to) + from;
  }
}

export default Randomizer;
