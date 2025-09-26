import person from '../images/person.png';
import bg from '../images/bg.png';
import { useTranslation } from 'react-i18next';

export default function Hero() {
    const { t } = useTranslation();

    return (
        <section className="hero">
            <div className="bg-img">
                <img src={bg} alt="" />
            </div>
            <div className="hero-top container">
                <div className="content">
                    <div className="info">
                        <h1>{t('hero.greeting')}</h1>
                        <h2>{t('hero.name')}</h2>
                        <h6>{t('hero.title')}</h6>
                    </div>
                    <div className="contact-me">
                        <a href="https://www.linkedin.com/in/charles-eboson" title="LinkedIn Profile" target="_blank" rel="noreferrer">
                            <i className="fa-brands fa-linkedin"></i>
                        </a>
                        <a href="https://github.com/Charlesss10" title="GitHub Profile" target="_blank" rel="noreferrer">
                            <i className="fa-brands fa-github"></i>
                        </a>
                        <a href="https://storage.googleapis.com/cv_eboson_charles/cv_eboson_charles.pdf" title="Download CV/Resume" target="_blank" rel="noreferrer">
                            <i className="fa-solid fa-id-card"></i>
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