import Header from '../components/Header'
import CFooter from '../components/CFooter'
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Header />
      <Component {...pageProps} />
      <CFooter />
    </>
  )
}

export default MyApp
