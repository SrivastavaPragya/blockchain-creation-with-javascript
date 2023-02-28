const Block = require("./block");// importing block
const cryptoHash = require("./crypto-hash");

class Blockchain {
  constructor() {
    this.chain = [Block.genesis()];// array named this.chain
  }
// adding blocks in the blockchain
  addBlock({ data }) {
    const newBlock = Block.mineBlock({
      prevBlock: this.chain[this.chain.length - 1],// storing prevoius block
      data,
    });
    this.chain.push(newBlock);
  }

// this function helps to check which chain is longest chain
  replaceChain(chain) {
    if (chain.length <= this.chain.length) { // chain.length jo miner bhej rha hai ...and this.chain jo hmare pass pahelai se hai
      console.error("The incoming chain is not longer");
      return;
    }
    // checking whether the incoming chain is vlid chain or not
    if (!Blockchain.isValidChain(chain)) {
      console.error("The incoming chain is not valid");
      return;
    }
    this.chain = chain;// aani wli chain ko current chain mai add krlenge
  }
// checking whether the blockchain is valid or not
  static isValidChain(chain) {
    if (JSON.stringify(chain[0]) !== JSON.stringify(Block.genesis())) {
      return false;
    }
    for (let i = 1; i < chain.length; i++) {
      const { timestamp, prevHash, hash, nonce, difficulty, data } = chain[i];
      const lastDifficulty = chain[i - 1].difficulty;
      const realLastHash = chain[i - 1].hash;

      if (prevHash !== realLastHash) return false;
// validated hash is the hash acquired by calculating the hash
      const validatedHash = cryptoHash(
        timestamp,
        prevHash,
        nonce,
        difficulty,
        data
      );
      if (hash !== validatedHash) return false;
      if (Math.abs(lastDifficulty - difficulty) > 1) return false;
    }
    return true;
  }
}

// const blockchain = new Blockchain();
// blockchain.addBlock({ data: "Block1" });
// blockchain.addBlock({ data: "Block2" });
// const result = Blockchain.isValidChain(blockchain.chain);
// console.log(blockchain.chain);
// console.log(result);
// //console.log(blockchain);
module.exports = Blockchain;