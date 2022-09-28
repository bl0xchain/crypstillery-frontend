import { Badge, Button, Spinner, Tooltip } from "flowbite-react";
import { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeNetwork, connectWallet, loadWallet } from "../redux/slices/walletSlice";
import { getShortAddress } from "../redux/utils";
import { FaUnlink } from "react-icons/fa"

const Wallet = () => {
    const dispatch = useDispatch()
    const address = useSelector((state) => state.wallet.address)
    const status = useSelector((state) => state.wallet.status)
    const chainId = useSelector((state) => state.wallet.chainId)

    const handleConnect = () => {
        dispatch(connectWallet())
    }

    const addWalletListener = useCallback( () => {
        if (window.ethereum) {
            window.ethereum.on("accountsChanged", (accounts) => {
                console.log(accounts)
                dispatch(loadWallet())
            });
            window.ethereum.on("chainChanged", (chainid) => {
                console.log(chainid)
                dispatch(loadWallet())
            });
        }
    }, []);

    useEffect(() => {
        dispatch(loadWallet())
        addWalletListener()
    }, [])

    return (
        <>
        {
            address === "" ?
            <>
            {
                status == 'PENDING' ?
                <Button disabled={true}>
                    <div className="mr-3">
                        <Spinner size="sm" light={true} />
                    </div>
                    Connecting
                </Button> :
                <Button onClick={handleConnect}>Connect Wallet</Button>
            }
            </>
             : 
            <>
            {
                chainId === '0x4' ?
                <span className="font-semibold">Connected: {getShortAddress(address)}</span> :
                <Tooltip content="Connect to Rinkeby Testnet" placement="left">
                    <Badge color="failure" icon={FaUnlink} size="sm" onClick={() => dispatch(changeNetwork())} className="px-3 cursor-pointer">
                        Wrong Network
                    </Badge>
                </Tooltip>
            }
            
            </>
        }
        </>
    )
}

export default Wallet;