import Brands from '../components/Brands'
import Products from '../components/Products'
import Slider from '../components/Slider'
import { Provider } from 'react-redux'
import store from '../redux/store'

const Home = () => {
    return (
        <Provider store={store}>
            <Slider />
            <Products />
            <Brands />
        </Provider>
    )
}

export default Home
