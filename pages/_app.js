import Header from '../components/Header'
import CFooter from '../components/CFooter'
import '../styles/globals.css'
import { Provider } from 'react-redux'
import store from '../redux/store'
import ConnectionCheck from '../components/ConnectionCheck'
import TransactionModal from '../components/TransactionModal'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

function MyApp({ Component, pageProps }) {
    return (
        <Provider store={store}>
            <Header />
            <ConnectionCheck />
            <TransactionModal />
            <ToastContainer />
            <Component {...pageProps} />
            <CFooter />
        </Provider>
    )
}

export default MyApp
