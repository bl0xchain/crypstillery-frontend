import Header from '../components/Header'
import CFooter from '../components/CFooter'
import '../styles/globals.css'
import { Provider } from 'react-redux'
import store from '../redux/store'
import ConnectionCheck from '../components/ConnectionCheck'
import TransactionModal from '../components/TransactionModal'

function MyApp({ Component, pageProps }) {
    return (
        <Provider store={store}>
            <Header />
            <ConnectionCheck />
            <TransactionModal />
            <Component {...pageProps} />
            <CFooter />
        </Provider>
    )
}

export default MyApp
