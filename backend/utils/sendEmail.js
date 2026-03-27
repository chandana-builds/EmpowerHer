const nodemailer = require('nodemailer');

const sendEmail = async (options) => {
    // If credentials are not set (e.g., local testing without .env), mock the email
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
        console.log(`\n================================`);
        console.log(`[MOCK EMAIL] To: ${options.email}`);
        console.log(`[SUBJECT] ${options.subject}`);
        console.log(`[CONTENT] \n${options.message}`);
        console.log(`================================\n`);
        return true; 
    }

    try {
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            }
        });

        const mailOptions = {
            from: `EmpowerHer <${process.env.EMAIL_USER}>`,
            to: options.email,
            subject: options.subject,
            text: options.message,
        };

        await transporter.sendMail(mailOptions);
        return true;
    } catch (error) {
        console.error("Error sending email:", error.message);
        throw new Error("Email could not be sent.");
    }
};

module.exports = sendEmail;
