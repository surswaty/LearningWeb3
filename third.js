// Calling the smart Contract function, Changing the state

var Tx = require('ethereumjs-tx');
const Web3 = require('web3');
const rpcURL = 'https://ropsten.infura.io/v3/2a1843363e5149a9b5291c3583a9b063';
var web3 = new Web3(rpcURL);

var account1 = '0xCC587311c4190d3c32D230cFa3FF4809B2703656';

var privateKey1 = '17AF5CC802641CAECB1C85C1DBC3DB85913C561F4F12ACBD014475FF5DB776DD';

//var privateKey1 = process.env.PRIVATE_KEY_1;
//var privateKey2 = process.env.PRIVATE_KEY_2;

var privateKey1Buffer = Buffer.from(privateKey1, 'hex');

contractAddress = '0x87c537fdA2102014e2130aa7cD1D28FacF5EA15d';
var contractAbi = [
	{
		"inputs": [],
		"name": "printNum",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "num",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "printStr",
		"outputs": [
			{
				"internalType": "string",
				"name": "str",
				"type": "string"
			}
		],
		"stateMutability": "pure",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "num",
				"type": "uint256"
			}
		],
		"name": "setNum",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	}
];
var contract = new web3.eth.Contract(contractAbi, contractAddress)

var data = contract.methods.setNum(130).encodeABI();

web3.eth.getTransactionCount(account1, (err, txCount)=> {

    const txObject = {
        nonce:    web3.utils.toHex(txCount),
        to:       contractAddress,
        gasLimit: web3.utils.toHex(800000),
        gasPrice: web3.utils.toHex(web3.utils.toWei('10', 'gwei')),
        data: data
    }

const tx = new Tx.Transaction(txObject, {chain: 'ropsten'});
tx.sign(privateKey1Buffer);

var  serializedTx = tx.serialize();
var raw = '0x' + serializedTx.toString('hex');

web3.eth.sendSignedTransaction(raw, (err, txHash) => {
    console.log('err: ', err);
    console.log('txHash: ', txHash);
    });
});


