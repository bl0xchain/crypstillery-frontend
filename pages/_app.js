import Header from '../components/Header'
import CFooter from '../components/CFooter'
import '../styles/globals.css'
import { Provider } from 'react-redux'
import store from '../redux/store'
import ConnectionCheck from '../components/ConnectionCheck'

function MyApp({ Component, pageProps }) {
    return (
        <Provider store={store}>
            <Header />
            <ConnectionCheck />
            <Component {...pageProps} />
            <CFooter />
        </Provider>
    )
}

export default MyApp
