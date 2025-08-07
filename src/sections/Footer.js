import { useTranslation } from 'react-i18next';

export default function Footer() {
  const { t } = useTranslation();

  return (
    <footer>
      <div className="container footer-info">
        <div className="scroll-up">
          <a href="/#"><i className="fas fa-angle-up"></i></a>
          <h6>{t('footer.back_to_top')}</h6>
        </div>
        <div className="social">
          <a href="https://github.com/Charlesss10" target="_blank" rel="noreferrer">
            <i className="fab fa-github"></i>
          </a>
          <a href="https://www.linkedin.com/in/charles-eboson" target="_blank" rel="noreferrer">
            <i className="fab fa-linkedin"></i>
          </a>
        </div>
        <p>
          {t('footer.credit')}<br />
          &copy; 2025 CharlesTech Solutions. {t('footer.rights')}
        </p>
      </div>
    </footer>
  );
}