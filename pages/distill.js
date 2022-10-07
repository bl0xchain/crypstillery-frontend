import { useSelector } from "react-redux"
import Brands from "../components/Brands"
import Mint from "../components/Mint"
import Products from "../components/Products"
import Slider from "../components/Slider"

const Distill = () => {
    const address = useSelector((state) => state.wallet.address)
    const chainId = useSelector((state) => state.wallet.chainId)
    const status = useSelector((state) => state.wallet.status)

    return (
        <>
            <Mint address={address} chainId={chainId} status={status} />
        </>
    )
}

export default Distill;