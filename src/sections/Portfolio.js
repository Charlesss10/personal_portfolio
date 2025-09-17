import { useTranslation } from 'react-i18next';

export default function Portfolio() {
  const { t } = useTranslation();

  return (
    <section className="portfolio" id="portfolio">
      <div className="header-img"></div>

      <div className="grid-header">
        <div className="info">
          <p>{t('portfolio.title')}</p>
        </div>
      </div>

      <div className="grid-port">
        <a
          href="https://www.charlesaluminium.com/"
          target="_blank"
          rel="noreferrer"
        >
          <div className="charles-aluminium">
            <div className="grid-col col1"></div>
          </div>
        </a>
      </div>

      <div className="grid-header">
        <p>{t('portfolio.footer')}</p>
      </div>
    </section>
  );
}