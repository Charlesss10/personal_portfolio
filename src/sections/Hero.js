import person from '../images/person.png';
import bg from '../images/bg.png';
import { useTranslation } from 'react-i18next';

export default function Hero() {
    const { t } = useTranslation();

    return (
        <section className="hero">
            <div className="hero-top container">
                <div className="bg-img">
                    <img src={bg} alt="" />
                </div>
                <div className="content">
                    <div className="info">
                        <h1>{t('hero.greeting')}</h1>
                        <h2>{t('hero.name')}</h2>
                        <h6>{t('hero.title')}</h6>
                    </div>
                    <div className="contact-me">
                        <a href="https://www.linkedin.com/in/charles-eboson">
                            <i className="fa-brands fa-linkedin" target="_blank" rel="noreferrer"></i>
                        </a>
                        <a href="https://github.com/Charlesss10" target="_blank" rel="noreferrer">
                            <i className="fa-brands fa-github"></i>
                        </a>
                    </div>
                </div>
                <div className="person-img">
                    <img src={person} alt="person" />
                </div>
            </div>
        </section>
    );
}