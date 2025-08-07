import React from 'react';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import seperator_black from '../images/separator_black.png';

export default function Contact() {
  const { t } = useTranslation();

  const [formData, setFormData] = React.useState({
    name: "",
    phone: "",
    email: "",
    message: "",
  });
  const formRef = React.useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        '/api/sendEmail',
        formData,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      if (response.data.success) {
        alert(response.data.message || t('contact.success'));
        formRef.current.reset();
        setFormData({ name: "", phone: "", email: "", message: "" });
      } else {
        alert(t('contact.fail'));
      }
    } catch (error) {
      console.error("Error sending message:", error.response?.data || error);
      alert(t('contact.error'));
    }
  };

  return (
    <section className="contact container" id="contact">
      <div className="header-info">
        <h4>{t('contact.title')}</h4>
        <p>{t('contact.description')}</p>
        <img src={seperator_black} alt="" />
      </div>
      <form ref={formRef} onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          id="name"
          placeholder={t('contact.name_placeholder')}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        />
        <input
          type="email"
          name="email"
          id="email"
          placeholder={t('contact.email_placeholder')}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        />
        <input
          type="text"
          name="phone"
          id="phone"
          placeholder={t('contact.phone_placeholder')}
          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
        />
        <textarea
          type="text"
          name="message"
          id="message"
          placeholder={t('contact.message_placeholder')}
          maxLength={2000}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          style={{ resize: 'vertical', minHeight: '100px' }}
        />
        <button style={{ cursor: 'pointer' }}>{t('contact.submit')}</button>
      </form>
    </section>
  );
}