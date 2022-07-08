const Eth = require('ethjs');
const Web3 = require('web3');
const eth = new Eth(new Eth.HttpProvider('https://rpc-testnet.bitkubchain.io'));
var web3 = new Web3(Web3.givenProvider || 'https://rpc-testnet.bitkubchain.io');
const marketAddr = require('./marketAddr')
const nftAddr = require('./nftAddr')
const marketABI = require('./marketABI')
const nftABI = require('./nftABI')
const data = require('./data')
var mongo = require('mongodb').MongoClient;
var url = "mongodb+srv://NosPS:asdf1234@cluster0.sbdpuic.mongodb.net/?retryWrites=true&w=majority";

async function init() {
    const token = eth.contract(nftABI).at(nftAddr);
    const market = eth.contract(marketABI).at(marketAddr);
    var _owner;
    var _isListing;
    var _price;
    var _uri;
    var nftLogs;
    var nftContract = new web3.eth.Contract(nftABI, nftAddr);
    var marketContract = new web3.eth.Contract(marketABI, marketAddr);

    mongo.connect(url, { useUnifiedTopology: true }, async (err, result) => {
        if (err) throw err;

        console.log("Data connected.");

        var selectDB = result.db("Land");

        // nftContract.getPastEvents('Transfer', {
        //     fromBlock: '4352970',
        //     toBlock: 'latest'
        // }, function (error, events) { console.log(events); })
        //     .then(async function (events) {
        //         nftLogs = events;
        //         console.log(nftLogs);

        //         for (let i = 0; i < nftLogs.length; i++) {
        //             await eth.getTransactionByHash(nftLogs[i].transactionHash).then(async (result) => {
        //                 let arr = result.value.toArray();
        //                 let hex = web3.utils.bytesToHex(arr);
        //                 let str = web3.utils.hexToNumberString(hex);
        //                 let price = web3.utils.fromWei(str);
        //                 let timestamp = (await web3.eth.getBlock(nftLogs[i].blockNumber)).timestamp

        //                 if (nftLogs[i].event === 'Transfer') {
        //                     let text = JSON.stringify(nftLogs[i].returnValues);
        //                     let obj = JSON.parse(text)
        //                     console.log("Transaction Hash : " + nftLogs[i].transactionHash);
        //                     console.log("Block Number : " + nftLogs[i].blockNumber);
        //                     console.log("From : " + obj.from);
        //                     console.log("To : " + obj.to);
        //                     console.log("Token ID : " + obj.tokenId);
        //                     console.log("Price : " + price)
        //                     console.log("Timestamp : " + timestamp);

        //                     AddLogs(selectDB, nftLogs[i].blockNumber, nftLogs[i].transactionHash, obj.tokenId, obj.from, obj.to, price, timestamp);
        //                 }
        //                 console.log(i);
        //             })
        //         }
        //     });

        // for (let i = 1208; i <= 1357; i++) {
        //     var _id;

        //     if (i < 10) {
        //         _id = "0406000" + i;
        //     }
        //     else if (i > 9 && i < 100) {
        //         _id = "040600" + i
        //     }
        //     else if (i > 99 && i < 1000) {
        //         _id = "04060" + i
        //     }
        //     else if (i > 999 && i < 10000) {
        //         _id = "0406" + i
        //     }

        //     await token.ownerOf(_id).then((owner) => {
        //         _owner = owner[0].toString();
        //     });
        //     await nftContract.methods.uri(_id).call().then((uri) => {
        //         _uri = uri;
        //     });
        //     await market.getIsListing(nftAddr, _id).then((isListing) => {
        //         _isListing = isListing[0];
        //     });
        //     await marketContract.methods.getPrice(nftAddr, _id).call().then((price) => {
        //         _price = price;
        //     });

        //     AddNfts(selectDB, _id, _owner, _uri, _price, _isListing);

        //     console.log(_id);
        // }

        NFTs(selectDB);
        Logs(selectDB);
    });

    var AddNfts = async (db, id, owner, uri, price, isListing) => {
        var newData = {
            tokenId: id,
            owner: owner,
            uri: uri,
            price: price,
            isListing: isListing
        }

        var query = {
            tokenId: id
        }
        await db.collection("nfts").find(query).toArray(async (err, result) => {
            if (err) {
                console.log(err);
            }
            else {
                if (result.length > 0) {
                    console.log(result.length);
                    console.log(result);
                }
                else {
                    await db.collection("nfts").insertOne(newData, (err, result) => {
                        if (err) {
                            console.log(err);
                        }
                        else {
                            console.log(result);
                        }
                    })
                }
            }
        })
    }

    var AddLogs = async (db, block, hash, tokenId, from, to, price, timestamp) => {
        var newData = {
            blockNumber: block,
            transactionHash: hash,
            tokenId: tokenId,
            from: from,
            to: to,
            price: price,
            timestamp: timestamp
        }

        var query = {
            blockNumber: block,
            tokenId: tokenId
        }
        await db.collection("logs").find(query).toArray(async (err, result) => {
            if (err) {
                console.log(err);
            }
            else {
                if (result.length > 0) {
                    console.log(result.length);
                    console.log(result);
                }
                else {
                    await db.collection("logs").insertOne(newData, (err, result) => {
                        if (err) {
                            console.log(err);
                        }
                        else {
                            console.log(result);
                        }
                    })
                }
            }
        })
    }

    var NFTs = async (db) => {
        db.collection("nfts").find().toArray(async (err, result) => {
            data.nfts = result;
            console.log(data.nfts);
        })
    }

    var Logs = async (db) => {
        db.collection("logs").find().toArray(async (err, result) => {
            data.logs = result;
            console.log(data.logs);
        })
    }
}

function DBUpdateNFT(tokenId, owner, uri, price, isListing) {
    mongo.connect(url, { useUnifiedTopology: true }, (err, result) => {
        if (err) throw err;

        console.log("Data connected.");

        var selectDB = result.db("Land");

        var updateData = {
            $set: {
                tokenId: tokenId,
                owner: owner,
                uri: uri,
                price: price,
                isListing: isListing
            }
        }

        var query = {
            tokenId: tokenId
        }

        selectDB.collection("nfts").find(query).toArray(async (err, result) => {
            if (err) {
                console.log(err);
            }
            else {
                if (result.length == 0) {
                    console.log("No nfts data.");
                }
                else {
                    selectDB.collection("nfts").updateOne(query, updateData, (err, result) => {
                        if (err) {
                            console.log(err);
                        }
                        else {
                            console.log(result);
                        }
                    })
                }
            }
        })
    });
}

function DBAddLOG(blockNumber, transactionHash, tokenId, from, to, price, timestamp) {
    mongo.connect(url, { useUnifiedTopology: true }, (err, result) => {
        if (err) throw err;

        console.log("Data connected.");

        var selectDB = result.db("Land");

        var newData = {
            blockNumber: blockNumber,
            transactionHash: transactionHash,
            tokenId: tokenId,
            from: from,
            to: to,
            price: price,
            timestamp: timestamp
        }

        var query = {
            blockNumber: blockNumber
        }
        selectDB.collection("logs").find(query).toArray(async (err, result) => {
            if (err) {
                console.log(err);
            }
            else {
                if (result.length > 0) {
                    console.log(result.length);
                    console.log(result);
                }
                else {
                    selectDB.collection("logs").insertOne(newData, (err, result) => {
                        if (err) {
                            console.log(err);
                        }
                        else {
                            console.log(result);
                        }
                    })
                }
            }
        })
    });
}

module.exports = {
    init,
    DBUpdateNFT,
    DBAddLOG
};