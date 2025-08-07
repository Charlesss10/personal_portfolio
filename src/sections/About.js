import React from 'react';
import { useTranslation } from 'react-i18next';
import seperator_black from '../images/separator_black.png';

export default function About() {
  const { t } = useTranslation();

  return (
    <section className="aboutme container " id="about">
      <div className="header-info">
        <h4>{t('about.header')}</h4>
        <p>{t('about.p1')}</p>
        <p>{t('about.p2')}</p>
        <p>{t('about.p3')}</p>
        <img src={seperator_black} alt="" />
      </div>
      <div className="grid-about">
        <div className="development columns">
          <h6>{t('about.development_title')}</h6>
          <p>{t('about.development_text')}</p>
        </div>
        <div className="maintenance columns">
          <h6>{t('about.maintenance_title')}</h6>
          <p>{t('about.maintenance_text')}</p>
        </div>
      </div>
      <img src={seperator_black} alt="" />
    </section>
  );
}
