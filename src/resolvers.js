const data = require('./data')

const resolvers = {
    nfts() {
        return data.nfts;
    },
    findNFT: ({ id }) => {
        const nft = data.nfts.find((nft) => nft.id == id);
        return nft;
    },
    addNFT: ({ id, owner, isListing }) => {
        nfts.push({
            id,
            owner,
            isListing
        })

        return nfts;
    },
    updateNFT: ({ id, owner, isListing }) => {
        const nft = data.nfts.find((nft) => nft.id == id);

        if (!nft) {
            throw new Error(`nft with id ${id} does not exist.`);
        }

        if (owner) {
            nft.owner = owner;
        }

        if (isListing) {
            nft.isListing = isListing;
        }

        return user;
    },
    deleteNFT: ({ id }) => {
        const index = data.nfts.findIndex((nft) => nft.id == id);

        if (index === -1) {
            throw new Error(`nft with id ${id} does not exist.`);
        }

        const deletedNFT = data.nfts.splice(index, 1);

        return deletedNFT[0];
    }
};

module.exports = resolvers;