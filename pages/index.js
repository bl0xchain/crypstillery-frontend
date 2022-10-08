import MailchimpSubscribe from "react-mailchimp-subscribe";
import Particles from "react-particles";
import { loadBigCirclesPreset } from "tsparticles-preset-big-circles";
import { loadBubblesPreset } from "tsparticles-preset-bubbles";
import NewsletterForm from "../components/NewsletterForm";

const Home = () => {

    const url = process.env.NEXT_PUBLIC_MAILCHIMP_URL;

    return (
        <div className="py-20 px-6 w-full text-center dark:bg-gray-700">
            <h1 className="text-2xl leading-loose dark:text-white">WORLD’s FIRST<br/>ON CHAIN<br/>DISTRILLERY</h1>
            <h2 className="text-4xl font-signPainter my-16 dark:text-white">INITIAL 6942 MINTS</h2>
            {/* <h2><span  className="text-color text-5xl md:text-6xl">GENESIS GIN</span></h2> */}
            <div className="font-roboto font-bold max-w-xl mx-auto">
                <svg viewBox="0 0 100 20" style={{height:'100%'}}>
                    <defs>
                        {/* <linearGradient id="gradient" gradientTransform="rotate(225)" x1="0" x2="0" y1="0" y2="100%" gradientUnits="userSpaceOnUse">
                            <stop offset="0%" stopColor="#32C5FF" />
                            <stop offset="51%" stopColor="#B620E0" />
                            <stop offset="100%" stopColor="#F7B500" />
                        </linearGradient> */}
                        <linearGradient id="gradient" x1="0" x2="0" y1="0" y2="100%" gradientUnits="userSpaceOnUse">
                            <stop offset="100%" stopColor="#F0F0F0" />
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
                    <text x="0" y="15" fontSize="17" fill="#F0F0F0" fill-opacity="0.5">GENESIS GIN</text>
                    <text x="0" y="15" fontSize="17" fill="url(#wave)"  fill-opacity="1">GENESIS GIN</text>
                </svg>
            </div>
            
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
            <Particles id="tsparticles" options={{
                preset: "bigCircles",
                fullScreen: {
                    zIndex: -1
                }
            }} init={async (engine) => await loadBigCirclesPreset(engine)}/>
        </div>
        
    )
}

export default Home
