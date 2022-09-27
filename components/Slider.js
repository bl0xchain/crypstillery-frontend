import { Carousel } from "flowbite-react";

const Slider = () => {
    return (
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
    )
}

export default Slider;