import logo from '../images/logo.png';
import logo_2 from '../images/logo_2.png';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useLocation } from 'react-router-dom';

export default function Header() {
    const [isVisible, setIsVisible] = useState(false); // State to manage visibility
    const { i18n, t } = useTranslation(); // Add translation hook
    const navigate = useNavigate();
    const location = useLocation();

    const toggleNavbar = () => {
        setIsVisible(!isVisible);
    };

    const changeLanguage = (lng) => {
        const currentPath = location.pathname;

        // Replace only the leading /en or /de with new lang
        const newPath = currentPath.replace(/^\/(en|de)/, `/${lng}`);

        // Change language
        i18n.changeLanguage(lng);

        // Navigate to updated path
        navigate(newPath);
    };

    return (
        <header>
            <nav className="container navbar">
                <div className="nav-wrapper">
                    {/* Language Switcher */}
                    <div className="language-switcher">
                        <button onClick={() => changeLanguage('en')} className={i18n.language === 'en' ? 'active' : ''}>
                            EN
                        </button>
                        <button onClick={() => changeLanguage('de')} className={i18n.language === 'de' ? 'active' : ''}>
                            DE
                        </button>
                    </div>

                    {/* Logo section */}
                    <div className="nav-left">
                        <a href="/#"><img src={logo} alt="logo" className="logo" /></a>
                        <a href="/#"><img src={logo_2} alt="logo_2" className="mobile-logo" /></a>
                    </div>

                    {/* Hamburger */}
                    <div className="hamburger" onClick={toggleNavbar} style={{ cursor: 'pointer' }}>
                        <i className="fa-solid fa-bars-staggered" data-visible={!isVisible}></i>
                        <i className="fa-solid fa-xmark" data-visible={isVisible}></i>
                    </div>
                </div>

                {/* Navigation links */}
                <ul className="nav-links" data-visible={isVisible}>
                    <li><a href="#about">{t('nav.about')}</a></li>
                    <li><a href="#skills">{t('nav.skills')}</a></li>
                    <li><a href="#portfolio">{t('nav.portfolio')}</a></li>
                    <a className="btn" href="#contact">{t('nav.contact')}</a>
                </ul>
            </nav>

        </header>
    );
}