import tokensService from "../services/tokens.service";
import { TRANSACTION_SUBMITTED } from "../types";

export const allowCurrency = (address, currencyAddress, amount) => (dispatch) => {
    return tokensService.allowCurrency(address, currencyAddress, amount).then(
        (response) => {
            console.log(response);
            let data = {
                show: true,
                message: "Your Currency Allowance has been sent to Etherscan",
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