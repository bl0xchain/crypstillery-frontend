import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
const alchemyKey = process.env.NEXT_PUBLIC_ALCHEMY_URI;
const { createAlchemyWeb3 } = require("@alch/alchemy-web3");
const web3 = createAlchemyWeb3(alchemyKey);

export const connectWallet = createAsyncThunk(
    'wallet/connect',
    async () => {
        if (typeof window.ethereum !== 'undefined') {
            try {
                const addressArray = await window.ethereum.request({
                    method: "eth_requestAccounts",
                });
                const chainId = await  window.ethereum.request({ method: 'eth_chainId' });
                return {
                    address: addressArray[0],
                    chainId: chainId,
                    status: chainId == '0x4' ? "CONNECTED" : "INVALID_CHAIN"
                }
            } catch (err) {
                return {
                    address: "",
                    chainId: "",
                    status: "NOT_CONNECTED"
                }
            }
        } else {
            return {
                address: "",
                chainId: "",
                status: "NO_METAMASK"
            }
        }
    }
)

export const changeNetwork = createAsyncThunk(
    'wallet/change',
    async () => {
        if (typeof window.ethereum !== 'undefined') {
            const chainId = '4';
            if (window.ethereum.networkVersion !== chainId) {
                try {
                    await window.ethereum.request({
                        method: 'wallet_switchEthereumChain',
                        params: [{ chainId: '0x4' }]
                    });
                    const addressArray = await window.ethereum.request({
                        method: "eth_requestAccounts",
                    });
                    const chainId = await  window.ethereum.request({ method: 'eth_chainId' });
                    return {
                        address: addressArray[0],
                        chainId: chainId,
                        status: chainId == '0x4' ? "CONNECTED" : "INVALID_CHAIN"
                    }
                } catch (error) {
                    const addressArray = await window.ethereum.request({
                        method: "eth_requestAccounts",
                    });
                    const chainId = await  window.ethereum.request({ method: 'eth_chainId' });
                    return {
                        address: addressArray[0],
                        chainId: chainId,
                        status: chainId == '0x4' ? "CONNECTED" : "INVALID_CHAIN"
                    }
                }
            }
        } else {
            console.log('no metamask')
            return {
                address: "",
                chainId: "",
                status: "NO_METAMASK"
            }
        }
    }
)

export const loadWallet = createAsyncThunk(
    'wallet/load',
    async () => {
        if (typeof window.ethereum !== 'undefined') {
            try {
                const addressArray = await window.ethereum.request({
                    method: "eth_accounts",
                });
                if (addressArray.length > 0) {
                    const chainId = await  window.ethereum.request({ method: 'eth_chainId' });
                    return {
                        address: web3.utils.toChecksumAddress(addressArray[0]),
                        chainId: chainId,
                        status: chainId == '0x4' ? "CONNECTED" : "INVALID_CHAIN"
                    }
                } else {
                    return {
                        address: "",
                        chainId: "",
                        status: "NOT_CONNECTED"
                    }
                }
            } catch (err) {
                return {
                    address: "",
                    chainId: "",
                    status: "UNKNOWN_ERROR"
                }
            }
    
        } else {
            return {
                address: "",
                chainId: "",
                status: "NO_METAMASK"
            }
        }
    }
)


export const walletSlice = createSlice({
    name: 'wallet',
    initialState: {
        address: "",
        chainId: "",
        status: "NOT_LOADED",
        popUp: false
    },
    reducers: {
        showPopUp(state) {
            state.popUp = true
        },
        hidePopUp(state) {
            state.popUp = false
        }
    },
    extraReducers: (builder) => {
        builder.addCase(connectWallet.pending, (state, action) => {
            state.status = "PENDING"
        })
        builder.addCase(connectWallet.fulfilled, (state, action) => {
            state.status = action.payload.status
            state.address = action.payload.address
            state.chainId = action.payload.chainId
        })
        builder.addCase(loadWallet.pending, (state, action) => {
            state.status = "PENDING"
        })
        .addCase(loadWallet.fulfilled, (state, action) => {
            state.status = action.payload.status
            state.address = action.payload.address
            state.chainId = action.payload.chainId
        })
        .addCase(changeNetwork.fulfilled, (state, action) => {
            state.status = action.payload.status
            state.address = action.payload.address
            state.chainId = action.payload.chainId
        })
    }
})

export const { showPopUp, hidePopUp } = walletSlice.actions

export default walletSlice.reducer

