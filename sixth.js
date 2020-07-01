// Some cool functions of web3

const Web3 = require('web3');
const { fromAscii } = require('web3-utils');
const web3 = new Web3('https://ropsten.infura.io/v3/2a1843363e5149a9b5291c3583a9b063');

//web3.eth.getBlockNumber().then(console.log);
//web3.eth.getBlock('latest').then(console.log);

web3.eth.getBlockNumber().then((latest) => {
    for(let i = 0; i < 10; i++){
        web3.eth.getBlock(latest - i).then(console.log);
    }
});

// get transaction from specific block
//const hash = '0x66b3fd79a49dafe44507763e9b6739aa0810de2c15590ac22b5e2f0a3f502073';
//web3.eth.getTransactionFromBlock(hash, 2).then(console.log);