// Calling the smart contract function, Does't change the state

const Web3 = require('web3');
const rpcURL = 'https://ropsten.infura.io/v3/2a1843363e5149a9b5291c3583a9b063';
const web3 = new Web3(rpcURL);
const abi = [
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
const address = '0x9699D069135794EC910f0dB0c448839C2FF16613';
const contract = new web3.eth.Contract(abi, address);

contract.methods.printNum().call((err, result) => {
    console.log(result)
});

