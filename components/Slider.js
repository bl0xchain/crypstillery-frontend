import { Carousel, Flowbite } from "flowbite-react";

const Slider = () => {
    const theme = {
        theme: {carousel: {
            scrollContainer: {
                base: 'flex h-56 snap-mandatory overflow-y-hidden overflow-x-scroll scroll-smooth rounded-none sm:h-64 xl:h-80 2xl:h-96',
            },
        },}
    }
    return (
        <Flowbite theme={theme} >
        <div className="h-56 sm:h-64 xl:h-80 2xl:h-96">
            <Carousel>
                <img
                src="/crypstillery-img1.jpg"
                alt="..."
                />
                <img
                src="/crypstillery-img2.jpg"
                alt="..."
                />
                <img
                src="/crypstillery-img3.jpg"
                alt="..."
                />
            </Carousel>
        </div>
        </Flowbite>
    )
}

export default Slider;