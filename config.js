const MINE_RATE = 1000; //1s = 1000ms....use to set the dificulty dynamically
const INITIAL_DIFFICULTY = 2;
// creating object
const GENESIS_DATA = {
  timestamp: 1,
  prevHash: "0x000",
  hash: "0x123",
  difficulty: INITIAL_DIFFICULTY,
  nonce: 0,
  data: [],
};
module.exports = { GENESIS_DATA, MINE_RATE };