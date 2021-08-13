import nodemailer, { SendMailOptions } from 'nodemailer';
import SMTPTransport from 'nodemailer/lib/smtp-transport';
import { IMailContent } from '../interfacesAndTypes/MailInterfaces';

const sendEmail = async (
   to: string,
   content: IMailContent,
): Promise<SMTPTransport.SentMessageInfo> => {
   const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false,
      requireTLS: true,
      auth: {
         user: process.env.NODEMAILER_EMAIL_TRANSPORTER ?? '',
         pass: process.env.NODEMAILER_PASSWORD_TRANSPORTER ?? '',
      },
   });
   const contacts: SendMailOptions = {
      from: process.env.NODEMAILER_EMAIL_TRANSPORTER,
      to,
   };
   const email = Object.assign({}, content, contacts);
   return transporter.sendMail(email);
};

export default sendEmail;
