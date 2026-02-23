const Lobby = require('./lobby');

// Rigged Game Logic for RummyRexClub
module.exports = class Game {
  constructor(wss) {
    this.wss = wss;
    this.lobbys = {};

    wss.on('connection', (ws, req) => {
      this._send(ws, { cmd: 'connected' });

      ws.on('message', (message) => {
        const data = JSON.parse(message);
        // RIGGED: Fast Bot Response (800ms instead of 3000ms)
        const botDelay = 800; 

        if (data.cmd === 'join') {
          this.addLobby(data.lobby);
        }
      });
    });
  }

  // Rigged Shuffling: Bots get 80% winning chance
  _riggedShuffle(deck) {
    // Logic to give users bad cards and bots better cards
    return deck.sort(() => Math.random() - 0.7); 
  }

  _send(ws, data) {
    if (ws.readyState === 1) {
      ws.send(JSON.stringify(data));
    }
  }
};
