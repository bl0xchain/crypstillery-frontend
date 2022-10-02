import { Button, Progress, Spinner } from "flowbite-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { showTxModal } from "../redux/slices/transactionSlice";
import { showPopUp } from "../redux/slices/walletSlice";
import tokenService from "../services/token";
import { fromWei } from "../services/utils";

const Mint = ({ address, chainId, status }) => {
    const dispatch = useDispatch()

    const [minting, setMinting] = useState(false)
    const [totalSupply, setTotalSupply] = useState('')
    const [maxSupply, setMaxSupply] = useState('')
    const [cost, setCost] = useState('')
    const [error, setError] = useState('')

    const handleMint = async () => {
        setError("")
        if(status !== 'CONNECTED') {
            dispatch(showPopUp())
        } else {
            setMinting(true)
            const response = await tokenService.mintNFT(address)
            console.log(response)
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

    return (
        <div className="py-8 px-6 w-full  text-center bg-amber-100">
            <h2 className="mb-4 text-3xl font-bold">
                Mint your NFT!
            </h2>
            <Image src="/crypstillery-bottle.png" width={250} height={250} alt="NFT" />
            <span className="text-xl font-bold text-gray-900 dark:text-white flex justify-center items-center">
                <img src="/eth-logo.svg" width={14} alt="ETH" className="mr-3" /> {cost}
            </span>
            <div className="w-96 mx-auto">
                <h3 className="py-4 text-xl font-bold">{totalSupply} out of {maxSupply} NFTs minted</h3>
                <Progress
                    progress={45}
                    color="yellow"
                />
            </div>
            <div className="mt-6 flex justify-center">
                {
                    minting ?
                    <Button color="warning" size="xl" disabled={true}>
                        <div className="mr-3">
                            <Spinner size="sm" color="warning" />
                        </div>
                        MINTING ...
                    </Button> :
                    <Button className="inline-block" color="warning" size="xl" onClick={handleMint}>MINT NOW</Button>
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