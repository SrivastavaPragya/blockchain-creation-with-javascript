const hexToBinary = require("hex-to-binary");
const { GENESIS_DATA, MINE_RATE } = require("./config");
const cryptoHash = require("./crypto-hash");
// creation of a block
class Block {
  constructor({ timestamp, prevHash, hash, data, nonce, difficulty }) {
    this.timestamp = timestamp;
    this.prevHash = prevHash;
    this.hash = hash;
    this.data = data;
    this.nonce = nonce;
    this.difficulty = difficulty;
  }
  // genesis block ko call krega
  static genesis() {
    return new this(GENESIS_DATA);
  }
  // mining function
  static mineBlock({ prevBlock, data }) {
    let hash, timestamp;
    const prevHash = prevBlock.hash;
    let { difficulty } = prevBlock;// taking difficulty by destructuring from the prevblock

    let nonce = 0;
    do {
      nonce++;
      timestamp = Date.now(); 
      difficulty = Block.adjustDifficulty({
        originalBlock: prevBlock,
        timestamp,
      });
      hash = cryptoHash(timestamp, prevHash, data, nonce, difficulty);
    } while (
      hexToBinary(hash).substring(0, difficulty) !== "0".repeat(difficulty)
    );

    // returning the block when difficulty matches the hash
    return new this({
      timestamp,
      prevHash,
      data,
      difficulty,
      nonce,
      hash,
    });
  }

  static adjustDifficulty({ originalBlock, timestamp }) {
    //originalblock is basically 
    const { difficulty } = originalBlock;
    if (difficulty < 1) return 1;
    const difference = timestamp - originalBlock.timestamp;
    if (difference > MINE_RATE) return difficulty - 1;
    return difficulty + 1;
  }
}
// creating block 1
const block1 = new Block({
  hash: "0xacb",
  timestamp: "2/09/22",
  prevHash: "0xc12",
  data: "hello",
});

// const genesisBlock = Block.genesis();
// console.log(genesisBlock);

// const result = Block.mineBlock({ prevBlock: block1, data: "block2" });
// console.log(result);
// //console.log(block1);
module.exports = Block;
