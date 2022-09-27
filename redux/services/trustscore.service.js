import spadService from './spad.service';
var ENS = require('ethereum-ens');
const alchemyKey = process.env.NEXT_PUBLIC_ALCHEMY_URI;
const etherscanKey = "18IRCJFPPN4YMEU2R7A9MRHTM1CIDP4K65";
const { createAlchemyWeb3 } = require("@alch/alchemy-web3");
import { Alchemy, Network } from "alchemy-sdk";

const web3 = createAlchemyWeb3(alchemyKey);
const axios = require('axios');

const config = {
    apiKey: "37iwP9RbrvOO_2J9jqQn3Pr9BhVcet_O",
    network: Network.ETH_ROPSTEN,
};
const alchemy = new Alchemy(config);
  

class TrustScoreService {
    async getEns (address) {
        var ensName = ""
        var provider = web3.currentProvider ;
        var ens = new ENS(provider);
        try {
            await ens.reverse(address).name().then(function(name) { 
                ensName = name;
             });
        } catch (error) {
        }
        return ensName;
    }

    async getNftsForOwner(address) {
        const nfts = await alchemy.nft.getNftsForOwner(address);
        return nfts.totalCount;
    }

    async getTrustScore(address) {
        // if wallet has more than 20 transactions (20)
        let value = 0;
        const transactionCount = await web3.eth.getTransactionCount(address);
        if(transactionCount >= 20) {
            value += 20;
        }
        // total value of transactions is 5 ETH (20)
        const transactionValue = await this.getTransactionsValue(address);
        if(parseFloat(transactionValue) >= 5) {
            value += 20;
        }
        // wallet has an ENS domain (25)
        const ens = await this.getEns(address);
        if(ens !== "") {
            value += 25;
        }
        // Twitter connected (20)
        const handle = await spadService.getTwitterHandle(address);
        if(handle !== "") {
            value += 20;
        }

        // NFTs in wallet (15)
        const NFTTransactions = await this.getNftsForOwner(address);
        if(NFTTransactions >= 1) {
            value += 15;
        }

        return value
    }

    async getTransactionsValue(address) {
        var api = require('etherscan-api').init(etherscanKey, 'ropsten', '3000');
        var value = 0;
        try {
            var txlist = await api.account.txlist(address, 1, 'latest', 1, 500, 'desc');
            txlist.result.forEach(transaction => {
                value += parseInt(transaction.value);
            });
        } catch (error) {
            console.log(error);
        }
        return web3.utils.fromWei(value.toString());
    }

    async getNFTTransactions(address) {
        var value = 0;
        try {
            var sent = 0;
            var received = 0;
            var txlist = await axios.get('https://api-ropsten.etherscan.io/api', {
                params: {
                    module: 'account',
                    action: 'tokennfttx',
                    address: address,
                    page: 1,
                    offset: 100,
                    startblock: 0,
                    endblock: 99999999,
                    sort: 'asc',
                    apikey: etherscanKey
                }
            });
            txlist.data.result.forEach(transaction => {
                if(transaction.from === address) {
                    sent++;
                } else {
                    received++;
                }
            });
            value = received - sent;
        } catch (error) {
            console.log(error);
        }
        return value;
    }
}

export default new TrustScoreService();