import nodemailer from 'nodemailer'
import pdf from 'html-pdf';
import path from 'path';
import { fileURLToPath } from 'url';
import ejs from 'ejs'

const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);

async function generatePDF(htmlContent) {
    return new Promise((resolve, reject) => {
        const options = { format: 'A4' };
        pdf.create(htmlContent, options).toBuffer((err, buffer) => {
            if (err) {
                return reject(err);
            }
            resolve(buffer);
        });
    });
}

const transporter = nodemailer.createTransport({
        host: 'giowm1359.siteground.biz',
        port: '465',
        secure: true,
        auth: {
            user: process.env.EMAIL_USER, // generated mailtrap user
            pass: process.env.EMAIL_PASS, // generated mailtrap password
        }
});

export const sendEmail = async (subject , email, data , location ) => {
    const html = await ejs.renderFile(__dirname + location, { data } );
    // const pdfBuffer = await generatePDF(html)
    //  console.log("error 1")
    const mailOptions = {
        from: 'easyjackets@easyjackets.com',
        to: email, // recipient's email address
        subject: `${subject}`,
        html,
        // attachments: [
        //     {
        //         filename: 'name-easyJackets.pdf',
        //         content: pdfBuffer,
        //         contentType: 'application/pdf'
        //     }
        // ],
        secure: true
    };
       
    try {
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
              console.error("Error sending email:", error);
              // Optional: log or send error details to monitor production
            } else {
              console.log("Email sent successfully:", info.response);
            }
          });
        console.log('Email sent successfully');
    } catch (error) {
        console.error('Error sending email:', error);
    }
};