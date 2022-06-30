const marketABI = [
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "previousOwner",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "newOwner",
				"type": "address"
			}
		],
		"name": "OwnershipTransferred",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "price",
				"type": "uint256"
			},
			{
				"internalType": "address",
				"name": "contractAddr",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			}
		],
		"name": "addListing",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "contractAddr",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			}
		],
		"name": "cancelListing",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "contractAddr",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			}
		],
		"name": "getIsListing",
		"outputs": [
			{
				"internalType": "bool",
				"name": "isListing",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "contractAddr",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			}
		],
		"name": "getOwner",
		"outputs": [
			{
				"internalType": "address",
				"name": "owner",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "contractAddr",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "prevIndex",
				"type": "uint256"
			}
		],
		"name": "getPrevOwner",
		"outputs": [
			{
				"internalType": "address",
				"name": "prevOwner",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "contractAddr",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			}
		],
		"name": "getPrice",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "price",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "contractAddr",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			}
		],
		"name": "getSeller",
		"outputs": [
			{
				"internalType": "address",
				"name": "seller",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "listings",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "price",
				"type": "uint256"
			},
			{
				"internalType": "address",
				"name": "seller",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "owner",
				"type": "address"
			},
			{
				"internalType": "bool",
				"name": "isListing",
				"type": "bool"
			},
			{
				"internalType": "uint256",
				"name": "ownerCount",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "owner",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "contractAddr",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			},
			{
				"internalType": "address",
				"name": "referer",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "metaverseFee",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "previousOwnerFee",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "referalFee",
				"type": "uint256"
			}
		],
		"name": "purchase",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "contractAddr",
				"type": "address"
			},
			{
				"internalType": "uint256[]",
				"name": "tokenId",
				"type": "uint256[]"
			},
			{
				"internalType": "address",
				"name": "referer",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "metaverseFee",
				"type": "uint256"
			},
			{
				"internalType": "uint256[]",
				"name": "previousOwnerFee",
				"type": "uint256[]"
			},
			{
				"internalType": "uint256",
				"name": "referalFee",
				"type": "uint256"
			}
		],
		"name": "purchaseBatch",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "contractAddr",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "coinAddr",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			},
			{
				"internalType": "address",
				"name": "referer",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "metaverseFee",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "previousOwnerFee",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "referalFee",
				"type": "uint256"
			}
		],
		"name": "purchaseERC20",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "contractAddr",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "coinAddr",
				"type": "address"
			},
			{
				"internalType": "uint256[]",
				"name": "tokenId",
				"type": "uint256[]"
			},
			{
				"internalType": "address",
				"name": "referer",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "metaverseFee",
				"type": "uint256"
			},
			{
				"internalType": "uint256[]",
				"name": "previousOwnerFee",
				"type": "uint256[]"
			},
			{
				"internalType": "uint256",
				"name": "referalFee",
				"type": "uint256"
			}
		],
		"name": "purchaseERC20Batch",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "renounceOwnership",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "newOwner",
				"type": "address"
			}
		],
		"name": "transferOwnership",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	}
];
module.exports = marketABI;