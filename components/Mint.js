import { Button, Progress, Spinner } from "flowbite-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { showTxModal } from "../redux/slices/transactionSlice";
import { showPopUp } from "../redux/slices/walletSlice";
import tokenService, { tokenContract } from "../services/token";
import { fromWei } from "../services/utils";

const Mint = ({ address, chainId, status }) => {
    const dispatch = useDispatch()

    const [minting, setMinting] = useState(false)
    const [totalSupply, setTotalSupply] = useState('')
    const [maxSupply, setMaxSupply] = useState('')
    const [percent, setPercent] = useState(0)
    const [cost, setCost] = useState('')
    const [error, setError] = useState('')

    const handleMint = async () => {
        setError("")
        if(status !== 'CONNECTED') {
            dispatch(showPopUp())
        } else {
            setMinting(true)
            const response = await tokenService.mintNFT(address)
            if(response.code !== 200) {
                setError(response.status)
                dispatch(showTxModal({
                    status: 400,
                    message: response.status,
                    address: ''
                }))
            } else {
                setError("")
                dispatch(showTxModal({
                    status: 200,
                    message: 'Minting request has been submitted successfully',
                    address: response.status
                }))
            }
            setMinting(false)
        }
    }

    useEffect(() => {
        tokenService.getTotalSupply().then((value) => {
            setTotalSupply(value);
        })
        tokenService.getMaxSupply().then((value) => {
            setMaxSupply(value);
        })
        tokenService.getCost().then((value) => {
            setCost(fromWei(value));
        })
    }, [])

    useEffect(() => {
        if(totalSupply > 0 && maxSupply > 0) {
            setPercent((totalSupply / maxSupply) * 100)
        }
    }, [totalSupply, maxSupply])

    useEffect( () => {
        tokenContract.events.TokenMinted({
            filter: { to: address }
        }, (error, data) => {
            console.log(error)
            console.log(data)
            if(error) {
                toast.error("Problem with minting the token.")
            } else {
                toast.success("The token minted successfully.")
                tokenService.getTotalSupply().then((value) => {
                    setTotalSupply(value);
                })
            }
        })
    }, [address])

    return (
        <div className="py-8 px-6 w-full text-center dark:bg-gray-700">
            <img className="max-h-96 mx-auto md:mt-12" src="/crypt-bottle.png" alt="NFT Bottle" />
            <div className="max-w-sm mx-auto">
                <h3 className="py-4 font-bold text-gray-500">{maxSupply-totalSupply}/{maxSupply} AVAILABLE</h3>
            </div>
            <div className="mt-6">
                {
                    minting ?
                    <button disabled type="button" class="text-white btn-color focus:ring-4 focus:outline-none font-medium rounded-full text-sm px-4 py-2 text-center inline-flex items-center">
                        <Spinner size="sm" color="purple" style={{marginBottom: '10px'}} />
                        <span className="ml-3">MINTING...</span>
                    </button> :
                    <button className="text-white focus:ring-4 focus:outline-none font-medium rounded-full text-sm px-4 pt-2 pb-3 btn-color" onClick={handleMint}>MINT {cost} ETH</button>
                }
                
            </div>
            {
                error &&
                <p className="text-rose-700 mt-3">{ error }</p>
            }
        </div>
    )
}

export default Mint;