import { Button, DarkThemeToggle, Flowbite, Navbar } from "flowbite-react";
import Link from "next/link";
import { useRouter } from "next/router";
import Wallet from "./Wallet";

const Header = () => {
    const router = useRouter()

    return (
        <Navbar fluid={true} rounded={false}>
            <Navbar.Brand>
                <Link href="/">
                    <img
                        src="/LogoCRYP.png"
                        className="mr-3 h-9 sm:h-9 cursor-pointer"
                        alt="CRYPSTILLERY Logo"
                    />
                </Link>
            </Navbar.Brand>
            <div className="flex md:order-2 items-center">
                {
                    router.pathname === "/" ? 
                    <Link href="/distill">
                        <a className="btn-flow">
                            LET'S DISTILL
                        </a>
                    </Link> :
                    <Wallet />
                }
                {/* <Navbar.Toggle /> */}
                <Flowbite>
                    <DarkThemeToggle />
                </Flowbite>
            </div>
            {/* <Navbar.Collapse>
                <Navbar.Link href="/navbars" active={true}>
                    Home
                </Navbar.Link>
                <Navbar.Link href="/navbars">
                    About
                </Navbar.Link>
                <Navbar.Link href="/navbars">
                    Services
                </Navbar.Link>
                <Navbar.Link href="/navbars">
                    Pricing
                </Navbar.Link>
                <Navbar.Link href="/navbars">
                    Contact
                </Navbar.Link>
            </Navbar.Collapse> */}
        </Navbar>
    );
}

export default Header;