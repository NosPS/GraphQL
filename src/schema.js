const { buildSchema } = require("graphql");

const schema = buildSchema(`
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

module.exports = schema;