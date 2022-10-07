import MailchimpSubscribe from "react-mailchimp-subscribe";
import NewsletterForm from "../components/NewsletterForm";

const Home = () => {

    const url = process.env.NEXT_PUBLIC_MAILCHIMP_URL;

    return (
        <div className="py-20 px-6 w-full text-center dark:bg-gray-700">
            <h1 className="text-2xl leading-loose dark:text-white">WORLD’s FIRST<br/>ON CHAIN<br/>DISTRILLERY</h1>
            <h2 className="text-4xl font-signPainter my-16 dark:text-white">INITIAL 6942 MINTS</h2>
            <h2><span  className="text-color text-5xl md:text-6xl">GENESIS GIN</span></h2>
            <MailchimpSubscribe
                url={url}
                render={ ( props ) => {
                    const { subscribe, status, message } = props || {};
                    return (
                        <NewsletterForm
                            status={ status }
                            message={ message }
                            onValidated={ formData => subscribe( formData ) }
                        />
                    );
                } }
            />
        </div>
    )
}

export default Home
