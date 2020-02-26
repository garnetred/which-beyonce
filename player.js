class Player {
  constructor(playerStats) {
    this.name = playerStats.name;
    this.wins = playerStats.wins || [];
  }

  saveWin(time) {
    this.wins.push(time);
    this.wins.sort((a, b) => a - b);
  }
}
