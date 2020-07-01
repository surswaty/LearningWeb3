// Deploying smart contract

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

var data = '0x608060405234801561001057600080fd5b506101bb806100206000396000f3fe608060405234801561001057600080fd5b50600436106100415760003560e01c80634d1cbb6614610046578063cd16ecbf14610064578063d9d32b81146100aa575b600080fd5b61004e61012d565b6040518082815260200191505060405180910390f35b6100906004803603602081101561007a57600080fd5b8101908080359060200190929190505050610136565b604051808215151515815260200191505060405180910390f35b6100b2610148565b6040518080602001828103825283818151815260200191508051906020019080838360005b838110156100f25780820151818401526020810190506100d7565b50505050905090810190601f16801561011f5780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b60008054905090565b60008160008190555060019050919050565b60606040518060400160405280600b81526020017f48656c6c6f20776f726c6400000000000000000000000000000000000000000081525090509056fea264697066735822122001d12b8f8387874e44fd058725d47c7b57e27a6ce8c7e77eaa7b14a49b81073864736f6c634300060a0033';

  web3.eth.getTransactionCount(account1, (err, txCount)=> {

    const txObject = {
        nonce:    web3.utils.toHex(txCount),
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

