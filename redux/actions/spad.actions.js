import spadService from "../services/spad.service";
import { TRANSACTION_SUBMITTED } from "../types";

export const createSpad = (address, name, tokenSymbol, tokenTotalSupply, target, minInvestment, maxInvestment, passKey, coverPic, currencyAddress) => (dispatch) => {
    return spadService.createSPAD(address, name, tokenSymbol, tokenTotalSupply, target, minInvestment, maxInvestment, passKey, coverPic, currencyAddress).then(
        (response) => {
            let data = {
                show: true,
                message: "Your SPAD creation has been sent to Etherscan",
                address: response.status,
                code: response.code
            }
            dispatch({
                type: TRANSACTION_SUBMITTED,
                payload: data
            });
            return Promise.resolve(response.code);
        },
        (error) => {
            console.log(error);
            return Promise.reject();
        }
    );
}

export const activateSpad = (address, spadAddress, amount, description, twitterHandle, currencyAddress) => (dispatch) => {
    return spadService.activateSpad(address, spadAddress, amount, description, twitterHandle, currencyAddress).then(
        (response) => {
            let data = {
                show: true,
                message: "Your SPAD Activation has been sent to Etherscan",
                address: response.status,
                code: response.code
            }
            dispatch({
                type: TRANSACTION_SUBMITTED,
                payload: data
            });
            return Promise.resolve(response.code);
        },
        (error) => {
            console.log(error);
            return Promise.reject();
        }
    );
}

export const contribute = (address, spadAddress, currencyAddress, amount, passKey) => (dispatch) => {
    return spadService.contribute(address, spadAddress, currencyAddress, amount, passKey).then(
        (response) => {
            let data = {
                show: true,
                message: "You SPAD Contribution has been sent to Etherscan",
                address: response.status,
                code: response.code
            }
            dispatch({
                type: TRANSACTION_SUBMITTED,
                payload: data
            });
            return Promise.resolve(response.code);
        },
        (error) => {
            console.log(error);
            return Promise.reject();
        }
    );
}

export const pitchApproval = (address, spadAddress, pitcher, approval) => (dispatch) => {
    return spadService.pitchApproval(address, spadAddress, pitcher, approval).then(
        (response) => {
            let data = {
                show: true,
                message: "Your SPAD Pitch Approval has been sent to Etherscan",
                address: response.status,
                code: response.code
            }
            dispatch({
                type: TRANSACTION_SUBMITTED,
                payload: data
            });
            return Promise.resolve(response.code);
        },
        (error) => {
            console.log(error);
            return Promise.reject();
        }
    );
}

export const pitchForSPAD = (address, spadAddress, name, description, passKey) => (dispatch) => {
    return spadService.pitchForSPAD(address, spadAddress, name, description, passKey).then(
        (response) => {
            let data = {
                show: true,
                message: "Your Pitch for SPAD has been sent to Etherscan",
                address: response.status,
                code: response.code
            }
            dispatch({
                type: TRANSACTION_SUBMITTED,
                payload: data
            });
            return Promise.resolve(response.code);
        },
        (error) => {
            console.log(error);
            return Promise.reject();
        }
    );
}

export const claimInvestment = (address, spadAddress) => (dispatch) => {
    return spadService.claimInvestment(address, spadAddress).then(
        (response) => {
            let data = {
                show: true,
                message: "Your SPAD Investment Claim has been sent to Etherscan",
                address: response.status,
                code: response.code
            }
            dispatch({
                type: TRANSACTION_SUBMITTED,
                payload: data
            });
            return Promise.resolve(response.code);
        },
        (error) => {
            console.log(error);
            return Promise.reject();
        }
    );
}

export const setTwitterHandle = (address, handle) => (dispatch) => {
    return spadService.setTwitterHandle(address, handle).then(
        (response) => {
            let data = {
                show: true,
                message: "Your Twitter verification has been sent to Etherscan",
                address: response.status,
                code: response.code
            }
            dispatch({
                type: TRANSACTION_SUBMITTED,
                payload: data
            });
            return Promise.resolve(response.code);
        },
        (error) => {
            console.log(error);
            return Promise.reject();
        }
    );
}