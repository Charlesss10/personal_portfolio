import logo from '../images/logo.png';
import logo_2 from '../images/logo_2.png';
import { useState } from 'react';

export default function Header() {
    const [isVisible, setIsVisible] = useState(false); // State to manage visibility

    const toggleNavbar = () => {
        setIsVisible(!isVisible);
    };

    return (
        <header>
            <div className="hamburger" onClick={toggleNavbar} style={{ cursor: 'pointer' }}>
                <i className="fa-solid fa-bars-staggered" data-visible={!isVisible}></i>
                <i className="fa-solid fa-xmark" data-visible={isVisible}></i>
            </div>
            <nav className="container navbar">
                <img src={logo} alt="logo" className="logo" />
                <img src={logo_2} alt="logo" className="mobile-logo" />
                <ul className="nav-links" data-visible={isVisible}>
                    <li><a href="#about">About me</a></li>
                    <li><a href="#skills">Skills</a></li>
                    <li><a href="#portfolio">Portfolio</a></li>
                    <a className="btn" href="#contact">Contact Me</a>
                </ul>
            </nav>
        </header>
    );
}