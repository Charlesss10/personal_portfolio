import seperator_black from '../images/separator_black.png';
import React from 'react';
import axios from 'axios';

export default function Contact() {
    const [formData, setFormData] = React.useState({
        name: "",
        phone: "",
        email: "",
        message: "",
    });

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(
                '/api/sendEmail',
                formData, // formData is sent directly here
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }
            );

            if (response.data.success) {
                alert(response.data.message || "Message sent successfully!");
                setFormData({ name: "", phone: "", email: "", message: "" });
            } else {
                alert("Failed to send message. Please try again.");
            }
        } catch (error) {
            console.error("Error sending message:", error.response?.data || error);
            alert("An error occurred. Please try again.");
        }
    };

    return (
        <section className="contact container" id="contact">
            <div className="header-info">
                <h4>CONTACT</h4>
                <p>Interested in more details? Fill out the form to get in touch.</p>
                <img src={seperator_black} alt="" />
            </div>
            <form onSubmit={handleSubmit}>
                <input type="text" name="name" id="name" placeholder="ENTER YOUR NAME*" onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
                <input type="email" name="email" id="email" placeholder="ENTER YOUR EMAIL*" onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
                <input type="text" name="phone" id="phone" placeholder=" ENTER YOUR PHONE*" onChange={(e) => setFormData({ ...formData, phone: e.target.value })} />
                <textarea type="text" name="message" id="message" placeholder="ENTER YOUR MESSAGE*" maxLength={2000} onChange={(e) => setFormData({ ...formData, message: e.target.value })} style={{ resize: 'vertical', minHeight: '100px' }} />
                <button style={{ cursor: 'pointer' }}>SUBMIT</button>
            </form>
        </section>
    );
}