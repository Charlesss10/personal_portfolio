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
          <a href="https://github.com/Charlesss10" title="GitHub Profile" target="_blank" rel="noreferrer">
            <i className="fab fa-github"></i>
          </a>
          <a href="https://www.linkedin.com/in/charles-eboson" title="LinkedIn Profile" target="_blank" rel="noreferrer">
            <i className="fab fa-linkedin"></i>
          </a>
          <a href="https://storage.googleapis.com/cv_eboson_charles/cv_eboson_charles.pdf" title="Download CV/Resume" target="_blank" rel="noreferrer">
            <i className="fa-solid fa-id-card"></i>
          </a>
        </div>
        <p>
          © 2024 Charles Aluminium Designed by{" "}
          <a
            href="https://www.linkedin.com/in/charles-eboson/"
            target="_blank"
            rel="noopener noreferrer"
          >
            CharlesTech Solutions
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{ marginLeft: "6px", marginBottom: "4px", verticalAlign: "middle" }}
            >
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
              <polyline points="15 3 21 3 21 9"></polyline>
              <line x1="10" y1="14" x2="21" y2="3"></line>
            </svg>
          </a>
        </p>
      </div>
    </footer>
  );
}