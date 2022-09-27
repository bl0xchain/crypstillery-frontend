
import { getDecimals, getFromDecimals, getCurrencyName } from "./tokens.service";

const alchemyKey = process.env.NEXT_PUBLIC_ALCHEMY_URI;
const { createAlchemyWeb3 } = require("@alch/alchemy-web3");
const web3 = createAlchemyWeb3(alchemyKey);

const contractSpadActionABI = require("../../abis/spad-actions-abi.json");
export const actionContractAddress = "0xaCF1421e0BABb9C0Da6eBA904224B0AeCeCd1084";
export const spadActionsContract = new web3.eth.Contract(
    contractSpadActionABI, actionContractAddress
);

const contractSpadFactoryABI = require("../../abis/spad-factory-abi.json");
export const factoryContractAddress = "0xC0f30c2a151DfB53ff086CA673732005Fe66AE3D";
export const spadFactoryContract = new web3.eth.Contract(
    contractSpadFactoryABI, factoryContractAddress
);

const contractSpadABI = require("../../abis/spad-abi.json");
const contractspadERC20ABI = require("../../abis/spad-erc20-abi.json");

class SpadService {

    async getSpadAddresses() {
        const spadCount = await spadFactoryContract.methods.getSpadCount().call();
        var spadAddresses = [];
        var spadAddress;
        for (var i = (parseInt(spadCount) - 1); i >= 0; i--) {
            spadAddress = await spadFactoryContract.methods.spads(i).call();
            spadAddresses.push(spadAddress);
        }
        return spadAddresses;
    }

    async createSPAD(address, name, tokenSymbol, tokenTotalSupply, target, minInvestment, maxInvestment, passKey, coverPic, _currencyAddress) {
        if (!window.ethereum || address === null || address === "") {
            return {
                status: "💡 Connect your Metamask wallet to create SPAD.",
                code: 403
            };
        }

        const currencyAddress = (_currencyAddress == "") ? '0x0000000000000000000000000000000000000000' : _currencyAddress;
      
        const transactionParameters = {
            to: factoryContractAddress,
            from: address,
            data: spadFactoryContract.methods.createSPAD(name, tokenSymbol, getDecimals(_currencyAddress, tokenTotalSupply), getDecimals(_currencyAddress, target), getDecimals(_currencyAddress, minInvestment), getDecimals(_currencyAddress, maxInvestment), passKey, coverPic, currencyAddress).encodeABI(),
        };
      
        try {
            const txHash = await window.ethereum.request({
                method: "eth_sendTransaction",
                params: [transactionParameters],
            });
      
            return {
                status: txHash,
                code: 200
            }
      
        } catch (error) {
            return {
                status: "😥 " + error.message,
                code: 403
            };
        }
    }

    getSpadContract(spadAddress) {
        return new web3.eth.Contract(
            contractSpadABI,
            spadAddress
        );
    }

    async getSpadDetails(spadAddress) {
        const spadContract = this.getSpadContract(spadAddress);
        const spadDetails = {};
        spadDetails.name = await spadContract.methods.name().call(); 
        spadDetails.target = await spadContract.methods.target().call();
        spadDetails.currentInvestment = await spadContract.methods.currentInvestment().call();
        spadDetails.minInvestment = await spadContract.methods.minInvestment().call();
        spadDetails.maxInvestment = await spadContract.methods.maxInvestment().call();
        spadDetails.spadInitiator = await spadContract.methods.spadInitiator().call();
        spadDetails.status = await spadContract.methods.status().call();
        spadDetails.isPrivate = await spadContract.methods.isPrivate().call();
        spadDetails.currencyAddress = await spadContract.methods.currencyAddress().call();
        if(spadDetails.currencyAddress == '0x0000000000000000000000000000000000000000') {
            spadDetails.currencyAddress = "";
        }
        spadDetails.targetView = Number(getFromDecimals(spadDetails.currencyAddress, spadDetails.target));
        spadDetails.minInvestmentView = Number(getFromDecimals(spadDetails.currencyAddress,spadDetails.minInvestment));
        spadDetails.maxInvestmentView = Number(getFromDecimals(spadDetails.currencyAddress,spadDetails.maxInvestment));
        spadDetails.currentInvestmentView = Number(getFromDecimals(spadDetails.currencyAddress,spadDetails.currentInvestment));
        
        spadDetails.currentInvstPercent = Math.round((spadDetails.currentInvestment / spadDetails.target) * 10000) / 100;
        spadDetails.investorCount = await spadActionsContract.methods.getInvestorCount(spadAddress).call();
        spadDetails.tokenAddress = await spadContract.methods.spadToken().call();
        spadDetails.created = await spadContract.methods.created().call();
        
        spadDetails.investmentCurrency = getCurrencyName(spadDetails.currencyAddress);
        spadDetails.twitterHandle = await this.getTwitterHandle(spadDetails.spadInitiator);

        const tokenContract = new web3.eth.Contract(
            contractspadERC20ABI, spadDetails.tokenAddress
        );
        spadDetails.symbol = await tokenContract.methods.symbol().call();
        spadDetails.totalSupply = await tokenContract.methods.totalSupply().call();
        spadDetails.totalSupplyView = Number(getFromDecimals(spadDetails.currencyAddress,spadDetails.totalSupply));
        spadDetails.decimals = await tokenContract.methods.decimals().call();

        if(spadDetails.status == 5) {
            spadDetails.acquiredBy = await spadActionsContract.methods.getAcquiredBy(spadAddress).call();
        }

        spadDetails.initiatorContribution = await this.getContribution(spadDetails.spadInitiator, spadDetails.currencyAddress, spadAddress);
        return spadDetails;
    }

    async getPortfolioSpadDetails(spadAddress, address) {
        const spadContract = this.getSpadContract(spadAddress);
        const spadDetails = {};
        spadDetails.name = await spadContract.methods.name().call(); 
        spadDetails.status = await spadContract.methods.status().call();
        spadDetails.spadInitiator = await spadContract.methods.spadInitiator().call();
        spadDetails.isPrivate = await spadContract.methods.isPrivate().call();
        spadDetails.currencyAddress = await spadContract.methods.currencyAddress().call();
        if(spadDetails.currencyAddress == '0x0000000000000000000000000000000000000000') {
            spadDetails.currencyAddress = "";
        }
        spadDetails.investmentCurrency = getCurrencyName(spadDetails.currencyAddress);

        spadDetails.tokenAddress = await spadContract.methods.spadToken().call();
        const tokenContract = new web3.eth.Contract(
            contractspadERC20ABI, spadDetails.tokenAddress
        );
        spadDetails.symbol = await tokenContract.methods.symbol().call();

        spadDetails.target = await spadContract.methods.target().call();
        spadDetails.targetView = Number(getFromDecimals(spadDetails.currencyAddress, spadDetails.target));

        if(spadDetails.status == 5) {
            spadDetails.acquiredBy = await spadActionsContract.methods.getAcquiredBy(spadAddress).call();
            try {
                spadDetails.isInvestmentClaimed = await spadActionsContract.methods.isInvestmentClaimed(spadAddress).call({from: address});
            } catch (error) {
                
            }
        }
        return spadDetails;
    }

    async getContribution(address, currencyAddress, spadAddress) {
        if (!window.ethereum || spadAddress === "" || address === "") {
            return 0;
        }
        const contribution = await spadActionsContract.methods.getContribution(spadAddress).call({from: address}); 
        return parseFloat(getFromDecimals(currencyAddress, contribution));
    }

    async activateSpad(address, spadAddress, amount, description, twitterHandle, currencyAddress) {
        if (!window.ethereum || address === null || address === "") {
            return {
                status: "💡 Connect your Metamask wallet to activate SPAD.",
                code: 403
            };
        }
        const data = spadActionsContract.methods.activate(spadAddress, description, twitterHandle).encodeABI();
        let value = "0";
        
        if(currencyAddress === "") {
            value = parseInt(web3.utils.toWei((amount).toString(), 'ether')).toString(16);    
        }
        const response = await this.sendTransaction(address, actionContractAddress, data, value);
        return response;
    }

    async contribute(address, spadAddress, currencyAddress, amount, passKey) {
        if (!window.ethereum || address === null || address === "") {
            return {
                status: "💡 Connect your Metamask wallet to contribute.",
                code: 403
            };
        }
        let value = "0";
        if(currencyAddress === "") {
            value = parseInt(web3.utils.toWei((amount).toString(), 'ether')).toString(16);    
        }
        const data = spadActionsContract.methods.contribute(spadAddress,  getDecimals(currencyAddress, (amount).toString()), passKey).encodeABI();
        const response = await this.sendTransaction(address, actionContractAddress, data, value);
        return response;
    }

    async sendTransaction(address, contractAddress, data, value) {
        if (!window.ethereum || address === null || address === "") {
            return {
                status: "💡 Connect your Metamask wallet to create SPAD.",
                code: 403
            };
        }
      
        const transactionParameters = {
            to: contractAddress,
            from: address,
            data: data,
            value: value
        };
      
        try {
            const txHash = await window.ethereum.request({
                method: "eth_sendTransaction",
                params: [transactionParameters],
            });
      
            return {
                status: txHash,
                code: 200
            }
      
        } catch (error) {
            return {
                status: "😥 " + error.message,
                code: 403
            };
        }
    }

    async getPitch(address, spadAddress) {
        const pitch = await spadActionsContract.methods.getPitch(spadAddress).call({from: address});
        return pitch;
    }

    async getPitchers(spadAddress) {
        const pitchers = await spadActionsContract.methods.getPitchers(spadAddress).call();
        return pitchers;
    }

    async pitchForSPAD(address, spadAddress, name, description, passKey) {
        if (!window.ethereum || address === null || address === "") {
            return {
                status: "💡 Connect your Metamask wallet to pitch.",
                code: 403
            };
        }
        const value = 0;
        const data = spadActionsContract.methods.pitchSpad(spadAddress, name, description, passKey).encodeABI();
        const response = await this.sendTransaction(address, actionContractAddress, data, value);
        return response;
    }

    getContributionEvents (spadAddress, callback) {
        // console.log(spadAddress);
        if (!window.ethereum || spadAddress === "") {
            return false;
        }
        spadActionsContract.getPastEvents('Contributed', {
            filter: {spadAddress: spadAddress},
            fromBlock: 0,
            toBlock: 'latest'
        }, callback)
        .then(function(events) {
            return Promise.resolve(events);
        });
    }

    async pitchApproval(address, spadAddress, pitcher, approval) {
        if (!window.ethereum || address === null || address === "") {
            return {
                status: "💡 Connect your Metamask wallet to process approval.",
                code: 403
            };
        }
        const value = 0;
        const data = spadActionsContract.methods.pitchReview(spadAddress, pitcher, approval).encodeABI();
        const response = await this.sendTransaction(address, actionContractAddress, data, value);
        return response;
    }

    async claimInvestment(address, spadAddress) {
        if (!window.ethereum || address === null || address === "") {
            return {
                status: "💡 Connect your Metamask wallet to claim tokens.",
                code: 403
            };
        }
        const value = 0;
        const data = spadActionsContract.methods.claimInvestment(spadAddress).encodeABI();
        const response = await this.sendTransaction(address, actionContractAddress, data, value);
        return response;
    }

    isInvestmentClaimed = async(address, spadAddress) => {
        try {
            const isClamied = await spadActionsContract.methods.isInvestmentClaimed(spadAddress).call({from: address});
            return isClamied;
        } catch (error) {
            return false;
        }
    }

    getInitiatedSpads = async(address) => {
        const spadAddresses = await spadActionsContract.methods.getInitiatedSpads().call({from: address});
        return spadAddresses;
    }

    getInvestedSpads = async(address) => {
        const spadAddresses = await spadActionsContract.methods.getInvestedSpads().call({from: address});
        return spadAddresses;
    }

    getInvestedSpads = async(address) => {
        const spadAddresses = await spadActionsContract.methods.getInvestedSpads().call({from: address});
        return spadAddresses;
    }

    getTwitterHandle = async(address) => {
        if (!window.ethereum || address === "") {
            return "";
        }
        const handle = await spadFactoryContract.methods.getTwitterHandle(address).call(); 
        return handle;
    }

    async setTwitterHandle(address, handle) {
        if (!window.ethereum || address === null || address === "") {
            return {
                status: "💡 Connect your Metamask wallet to process approval.",
                code: 403
            };
        }
        const value = 0;
        const data = spadFactoryContract.methods.setTwitterHandle(address, handle).encodeABI();
        const response = await this.sendTransaction(address, factoryContractAddress, data, value);
        return response;
    }

}

export default new SpadService();