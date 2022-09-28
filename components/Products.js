import { Card, Rating } from "flowbite-react";

const Products = () => {
    return (
        <div className="py-8 px-6 w-full bg-gray-50">
            <h2 className="mb-4 text-3xl font-bold text-center">
                Featured NFTs
            </h2>
            <div className="flex flex-row">
                <div className="basis-full sm:basis-1/2 md:basis-1/3 lg:basis-1/4" >
                    <Card
                        imgAlt="Apple Watch Series 7 in colors pink, silver, and black"
                        imgSrc="https://flowbite.com/docs/images/blog/image-1.jpg"
                    >
                        <a href="#">
                            <h5 className="text-lg font-semibold tracking-tight text-gray-900 dark:text-white">
                                Apple Watch Series 7 GPS, Aluminium Case, Starlight Sport
                            </h5>
                        </a>
                        <div className="mt-2.5 mb-5 flex items-center">
                            <Rating>
                                <Rating.Star />
                                <Rating.Star />
                                <Rating.Star />
                                <Rating.Star />
                                <Rating.Star filled={false} />
                                <p className="ml-2 text-sm font-medium text-gray-500 dark:text-gray-400">
                                    4.5 out of 5
                                </p>
                            </Rating>
                        </div>
                        <div className="flex items-center justify-between">
                            <span className="text-xl font-bold text-gray-900 dark:text-white flex items-center">
                                <img src="/eth-logo.svg" width={14} alt="ETH" className="mr-3" /> 5.0
                            </span>
                            <a
                                href="#"
                                className="rounded-lg bg-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                            >
                                Add to cart
                            </a>
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    )
}

export default Products;