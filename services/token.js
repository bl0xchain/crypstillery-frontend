import { sendTransaction, web3 } from "./utils"

const contractABI = require("./abis/crypstillery-abi.json");
export const tokenContractAddress = "0x40Bf6C107CAb17181ec2Aa2959BEE028b4698ee1";

export const tokenContract = new web3.eth.Contract(
    contractABI, tokenContractAddress
);

class TokenService {
    async getTotalSupply() {
        return await tokenContract.methods.totalSupply().call()
    }

    async getMaxSupply() {
        return await tokenContract.methods.maxSupply().call()
    }

    async getCost() {
        return await tokenContract.methods.cost().call()
    }

    async mintNFT(address) {
        if (!window.ethereum || address === null || address === "") {
            return {
                status: "💡 Connect your Metamask wallet to mint NFT.",
                code: 403
            };
        }
        const tokenURI = "https://gateway.pinata.cloud/ipfs/QmTDDNR3TJBeLaXjezUwsDSbFkW77Rs99itdovgYAkyF6Y";
        const value = await this.getCost();
        const data = tokenContract.methods.mint(address, tokenURI).encodeABI();
        const response = await sendTransaction(address, tokenContractAddress, data, parseInt(value).toString(16));
        return response;
    }
}

export default new TokenService();