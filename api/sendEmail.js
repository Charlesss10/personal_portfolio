const nodemailer = require('nodemailer');

let formSubmissions = [];

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { name, email, phone, message } = req.body;

        // Configure the email transporter
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.REACT_APP_WORK_EMAIL,
                pass: process.env.REACT_APP_WORK_EMAIL_APP_PASSWORD,
            },
            logger: true,
            debug: true
        });

        const mailOptions = {
            from: process.env.REACT_APP_WORK_EMAIL,
            to: process.env.REACT_APP_WORK_EMAIL,
            subject: `New Contact Form Submission from ${name}`,
            text: `You have a new form submission:

        Name: ${name}
        Phone: ${phone}
        Email: ${email}
        Message: ${message}`,
        };

        try {
            // Store form data in memory
            formSubmissions.push({ name, email, phone, message });

            await transporter.sendMail(mailOptions);
            return res.status(200).json({ success: true, message: 'Email sent successfully!' });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: 'Error sending email' });
        }
    }
    // Handle unsupported methods
    return res.status(405).json({ error: 'Method Not Allowed' });
}