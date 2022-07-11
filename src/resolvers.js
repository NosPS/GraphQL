const data = require('./data')
const database = require('./database')

const resolvers = {
    nfts() {
        return data.nfts;
    },
    findNFT: ({ tokenId }) => {
        const nft = data.nfts.find((nft) => nft.tokenId == tokenId);
        return nft;
    },
    addNFT: ({ tokenId, owner, uri, price, isListing }) => {
        data.nfts.push({
            tokenId,
            owner,
            uri,
            price,
            isListing
        })

        return data.nfts;
    },
    updateNFT: ({ tokenId, owner, uri, price, isListing }) => {
        const nft = data.nfts.find((nft) => nft.tokenId == tokenId);

        if (!nft) {
            throw new Error(`nft with id ${tokenId} does not exist.`);
        }

        if (owner) {
            nft.owner = owner;
        }

        if (uri) {
            nft.uri = uri;
        }

        if (price) {
            nft.price = price;
        }

        if (isListing !== null) {
            nft.isListing = isListing;
        }

        database.DBUpdateNFT(tokenId, owner, uri, price, isListing);

        return nft;
    },
    deleteNFT: ({ tokenId }) => {
        const index = data.nfts.findIndex((nft) => nft.tokenId == tokenId);

        if (index === -1) {
            throw new Error(`nft with id ${tokenId} does not exist.`);
        }

        const deletedNFT = data.nfts.splice(index, 1);

        return deletedNFT[0];
    },
    logs() {
        return data.logs;
    },
    findLOG: ({ tokenId }) => {
        const log = data.logs.filter((log) => log.tokenId == tokenId);
        return log;
    },
    addLOG: ({ blockNumber, transactionHash, tokenId, from, to, price, timestamp }) => {
        data.logs.push({
            blockNumber,
            transactionHash,
            tokenId,
            from,
            to,
            price,
            timestamp
        })

        database.DBAddLOG(blockNumber, transactionHash, tokenId, from, to, price, timestamp);

        return data.logs;
    },
    updateLOG: ({ blockNumber, transactionHash, tokenId, from, to, price, timestamp }) => {
        const log = data.logs.find((log) => log.transactionHash == transactionHash);

        if (!log) {
            throw new Error(`transaction with hash ${transactionHash} does not exist.`);
        }

        if (blockNumber) {
            log.blockNumber = blockNumber;
        }

        if (transactionHash) {
            log.transactionHash = transactionHash;
        }

        if (tokenId) {
            log.tokenId = tokenId;
        }

        if (from) {
            log.from = from;
        }

        if (to) {
            log.to = to;
        }

        if (price) {
            log.price = price;
        }

        if (timestamp) {
            log.timestamp = timestamp;
        }

        return log;
    },
    deleteLOG: ({ transactionHash }) => {
        const index = data.logs.findIndex((log) => log.transactionHash == transactionHash);

        if (index === -1) {
            throw new Error(`transaction with hash ${transactionHash} does not exist.`);
        }

        const deletedLOG = data.logs.splice(index, 1);

        return deletedLOG[0];
    }
};

module.exports = resolvers;