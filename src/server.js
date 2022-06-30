var express = require('express');
var { graphqlHTTP } = require('express-graphql');
var { buildSchema } = require('graphql');
const Eth = require('ethjs');
const eth = new Eth(new Eth.HttpProvider('https://rpc-testnet.bitkubchain.io'));
const marketAddr = require('./marketAddr')
const nftAddr = require('./nftAddr')
const marketABI = require('./marketABI')
const nftABI = require('./nftABI')

const init = async () => {
    const token = eth.contract(nftABI).at(nftAddr);
    const market = eth.contract(marketABI).at(marketAddr);
    var _owner;
    var _isListing;

    for (let i = 1; i <= 1357; i++) {
        var _id;

        if(i < 10) {
            _id = "0406000" + i;
        }
        else if(i > 9 && i < 100) {
            _id = "040600" + i
        }
        else if(i > 99 && i < 1000) {
            _id = "04060" + i
        }
        else if(i > 999 && i < 10000) {
            _id = "0406" + i
        }

        await token.ownerOf(_id).then((owner) => {
            _owner = owner[0].toString();
          });
        await market.getIsListing(nftAddr, _id).then((isListing) => {
            _isListing = isListing[0];
          });
        
          nfts.push({
            id: _id,
            owner: _owner,
            isListing: _isListing
          })

          console.log(_id);
    }
    
}

const nfts = [];

// Construct a schema, using GraphQL schema language
var schema = buildSchema(`
type Query {
    nfts: [NFT!]!
    findNFT(id: ID!): NFT!
}

type NFT {
    id: ID!
    owner: String!
    isListing: Boolean!
}

type Mutation {
    addNFT(id: ID!, owner: String!, isListing: Boolean!): [NFT!]!
    updateNFT(id: ID!, owner: String, isListing: Boolean): NFT!
    deleteNFT(id: ID!): NFT!
}
`);

// The root provides a resolver function for each API endpoint
var root = {
    nfts() {
        return nfts;
    },
    findNFT: ({ id }) => {
        const nft = nfts.find((nft) => nft.id == id);
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
        const nft = nfts.find((nft) => nft.id == id);

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
        const index = nfts.findIndex((nft) => nft.id == id);

        if (index === -1) {
            throw new Error(`nft with id ${id} does not exist.`);
        }

        const deletedNFT = nfts.splice(index, 1);

        return deletedNFT[0];
    }
};

var app = express();
app.use('/graphql', graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true,
}));
app.listen(4000);
console.log('Running a GraphQL API server at http://localhost:4000/graphql');
init();