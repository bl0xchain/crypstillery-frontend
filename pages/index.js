import MailchimpSubscribe from "react-mailchimp-subscribe";
import NewsletterForm from "../components/NewsletterForm";

const Home = () => {

    const url = process.env.NEXT_PUBLIC_MAILCHIMP_URL;

    return (
        <div className="py-20 px-6 w-full text-center dark:bg-gray-700">
            <h1 className="text-2xl leading-loose dark:text-white">WORLD’s FIRST<br/>ON CHAIN<br/>DISTRILLERY</h1>
            <h2 className="text-4xl font-signPainter my-16 dark:text-white">INITIAL 6942 MINTS</h2>
            <h2><span  className="text-color text-5xl md:text-6xl">GENESIS GIN</span></h2>
            <svg viewbox="0 0 300 60" style={{height:'100%'}}>
                <defs>
                    <linearGradient id="gradient">
                    <stop color="#000"/>
                    </linearGradient>
                    <pattern id="wave" x="0" y="-0.5" width="100%" height="100%" patternUnits="userSpaceOnUse">
                    <path id="wavePath" d="M-40 9 Q-30 7 -20 9 T0 9 T20 9 T40 9 T60 9 T80 9 T100 9 T120 9 V20 H-40z" mask="url(#mask)" fill="url(#gradient)"> 
                        <animateTransform
                            attributeName="transform"
                            begin="0s"
                            dur="1.5s"
                            type="translate"
                            from="0,0"
                            to="40,0"
                            repeatCount="indefinite" />
                    </path>
                    </pattern>
                </defs>
                <text text-anchor="middle" x="50" y="15" font-size="17" fill="white" fill-opacity="0.1">LIQUID</text>
                <text text-anchor="middle" x="50" y="15" font-size="17" fill="url(#wave)"  fill-opacity="1">LIQUID</text>
            </svg>
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
