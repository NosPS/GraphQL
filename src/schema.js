const { buildSchema } = require("graphql");

const schema = buildSchema(`
type Query {
    nfts: [NFT!]!
    findNFT(tokenId: ID!): NFT!
    logs: [LOG!]!
    findLOG(tokenId: ID!): [LOG!]!
}

type NFT {
    tokenId: ID!
    owner: String!
    uri: String!
    price: String!
    isListing: Boolean!
}

type LOG {
    blockNumber: Int!
    transactionHash: String!
    tokenId: ID!
    from: String!
    to: String!
    price: String!
    timestamp: Int!
}

type Mutation {
    addNFT(tokenId: ID!, owner: String!, uri: String!, price: String!, isListing: Boolean!): [NFT!]!
    updateNFT(tokenId: ID!, owner: String, uri: String, price: String, isListing: Boolean): NFT!
    deleteNFT(tokenId: ID!): NFT!
    addLOG(blockNumber: Int!, transactionHash: String!, tokenId: ID!, from: String!, to: String!, price: String!, timestamp: Int!): [LOG!]!
    updateLOG(blockNumber: Int, transactionHash: String!, tokenId: ID, from: String, to: String, price: String, timestamp: Int): LOG!
    deleteLOG(transactionHash: String!): LOG!
}
`);

module.exports = schema;