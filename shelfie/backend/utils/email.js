import nodemailer from 'nodemailer';

export const sendEmail = async (options) => {
    // create reusable transporter object using the default SMTP transport
    const transporter = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        auth: {
            user: process.env.EMAIL_USERNAME,
            pass: process.env.EMAIL_PASSWORD
        }
    });

    //define email options
    const mailOptions = {
        from: 'ShelfieConnect <info@shelfieconnect.com',
        to: options.email,
        subject: options.subject,
        text: options.message
    }

    // send mail with defined transport object
    await transporter.sendMail(mailOptions)
}