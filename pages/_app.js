import Header from '../components/Header'
import CFooter from '../components/CFooter'
import '../styles/globals.css'
import { Provider } from 'react-redux'
import store from '../redux/store'

function MyApp({ Component, pageProps }) {
    return (
        <Provider store={store}>
            <Header />
            <Component {...pageProps} test="etst" />
            <CFooter />
        </Provider>
    )
}

export default MyApp
