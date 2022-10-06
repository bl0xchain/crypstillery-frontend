import { Button, DarkThemeToggle, Flowbite, Navbar } from "flowbite-react";
import Image from "next/image";
import Link from "next/link";
import Wallet from "./Wallet";

const Header = () => {
    return (
        <Navbar fluid={true} rounded={false}>
            <Navbar.Brand href="/">
                <img
                    src="/LogoCRYP.png"
                    className="mr-3 h-6 sm:h-9"
                    alt="CRYPSTILLERY Logo"
                />
            </Navbar.Brand>
            <div className="flex md:order-2 items-center">
                <Wallet />
                <Navbar.Toggle />
                <Flowbite>
                    <DarkThemeToggle />
                </Flowbite>
            </div>
            <Navbar.Collapse>
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
            </Navbar.Collapse>
        </Navbar>
    );
}

export default Header;