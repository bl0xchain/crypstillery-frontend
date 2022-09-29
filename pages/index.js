import Brands from '../components/Brands'
import Products from '../components/Products'
import Slider from '../components/Slider'
import Mint from '../components/Mint'
import { useSelector } from 'react-redux'

const Home = () => {
    const address = useSelector((state) => state.wallet.address)
    const chainId = useSelector((state) => state.wallet.chainId)
    return (
        <>
            <Slider />
            <Mint address={address} chainId={chainId} />
            <Products />
            <Brands />
        </>
    )
}

export default Home
