import { useTranslation } from 'react-i18next';

export default function CharlesTech() {
    const { t } = useTranslation();

    return (
        <section className="CharlesTech">
            <h4>{t('charlesTech.title')}</h4>
            <p>{t('charlesTech.description')}</p>
            <a
                href="https://www.linkedin.com/in/charles-eboson"
                target="_blank"
                rel="noopener noreferrer"
            >
                <button style={{ cursor: 'pointer' }}>{t('charlesTech.button')}</button>
            </a>
        </section>
    );
}