const Eth = require('ethjs');
const eth = new Eth(new Eth.HttpProvider('https://rpc-testnet.bitkubchain.io'));
const marketAddr = require('./marketAddr')
const nftAddr = require('./nftAddr')
const marketABI = require('./marketABI')
const nftABI = require('./nftABI')
const data = require('./data')

async function init() {
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
        
          data.nfts.push({
            id: _id,
            owner: _owner,
            isListing: _isListing
          })

          console.log(_id);
    }
}

module.exports = init;