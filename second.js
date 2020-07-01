// Sending ether from one account to another, Change the state

var Tx = require('ethereumjs-tx');
const Web3 = require('web3');
const rpcURL = 'https://ropsten.infura.io/v3/2a1843363e5149a9b5291c3583a9b063';
var web3 = new Web3(rpcURL);

var account1 = '0xCC587311c4190d3c32D230cFa3FF4809B2703656';
var account2 = '0x59009764d4760C7Ea142e3eaf7119Cce7fBFAdcf';

var privateKey1 = '17AF5CC802641CAECB1C85C1DBC3DB85913C561F4F12ACBD014475FF5DB776DD';
var privateKey2 = 'ADA147412B82A24FED6B9FBFA6E0913F5723D54C42E65C1CE53CA898CBF9663D';

//var privateKey1 = process.env.PRIVATE_KEY_1;
//var privateKey2 = process.env.PRIVATE_KEY_2;

var privateKey1Buffer = Buffer.from(privateKey1, 'hex');
var privateKey2Buffer = Buffer.from(privateKey2, 'hex');

  web3.eth.getTransactionCount(account1, (err, txCount)=> {

    const txObject = {
        nonce:    web3.utils.toHex(txCount),
        to:       account2,
        value:    web3.utils.toHex(web3.utils.toWei('0.2624', 'ether')),
        gasLimit: web3.utils.toHex(21000),
        gasPrice: web3.utils.toHex(web3.utils.toWei('10', 'gwei'))
    }

const tx = new Tx.Transaction(txObject, {chain: 'ropsten'});
tx.sign(privateKey1Buffer);

var  serializedTx = tx.serialize();
var raw = '0x' + serializedTx.toString('hex');

web3.eth.sendSignedTransaction(raw, (err, txHash) => {
    console.log('txHash:', txHash)
    });

});