import { Flowbite, Footer } from "flowbite-react";
import { BsFacebook, BsInstagram, BsTwitter, BsGithub } from "react-icons/bs";

const CFooter = () => {
    const theme = {
        theme: {footer: {
            base: 'w-full bg-gray-100 shadow dark:bg-gray-800 md:flex md:items-center md:justify-between',
        }}
    }
    
    return (
        <Flowbite theme={theme} >
        <Footer container={true}>
            <div className="w-full">
                {/* <div className="grid w-full justify-between sm:flex sm:justify-between md:flex md:grid-cols-1 lg:grid-cols-2">
                    <div>
                        <Footer.Brand
                        href="/"
                        src="/LogoCRYP.png"
                        alt="Crypstillery Logo"
                        />
                    </div>
                    <div className="grid grid-cols-2 gap-6 sm:mt-4 sm:gap-6">
                        <div>
                            <Footer.Title title="about" />
                            <Footer.LinkGroup col={true}>
                                <Footer.Link href="#">
                                Flowbite
                                </Footer.Link>
                                <Footer.Link href="#">
                                Tailwind CSS
                                </Footer.Link>
                            </Footer.LinkGroup>
                        </div>
                        <div>
                        <Footer.Title title="Legal" />
                            <Footer.LinkGroup col={true}>
                                <Footer.Link href="#">
                                Privacy Policy
                                </Footer.Link>
                                <Footer.Link href="#">
                                Terms & Conditions
                                </Footer.Link>
                            </Footer.LinkGroup>
                        </div>
                    </div>
                </div>
                <Footer.Divider /> */}
                <div className="w-full sm:flex sm:items-center sm:justify-between">
                    <Footer.Copyright
                        href="#"
                        by="CRYPSTILLERY"
                        year={2022}
                    />
                    <div className="mt-4 flex space-x-6 order-1 md:order-2 sm:mt-0 sm:justify-center">
                        <Footer.Icon
                        href="#"
                        icon={BsFacebook}
                        />
                        <Footer.Icon
                        href="#"
                        icon={BsInstagram}
                        />
                        <Footer.Icon
                        href="#"
                        icon={BsTwitter}
                        />
                        <Footer.Icon
                        href="#"
                        icon={BsGithub}
                        />
                    </div>
                </div>
            </div>
        </Footer>
        </Flowbite>
    )
}

export default CFooter;