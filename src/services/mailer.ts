import EmailTemplate from "email-templates";
import nodemailer from "nodemailer";
import path from "path";

export default class Mailer {
  public static transporter: any;

  public static init() {
    let mailConfig;
    if (process.env.NODE_ENV === "production" ) {
      mailConfig = {
        host: process.env.SMTP_HOST,
        port: process.env.SMTP_PORT || 25,
        secure: !process.env.SMTP_USE_TLS,
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASSWORD,
        },
        tls: {
          rejectUnauthorized: false,
          ciphers: process.env.SMTP_USE_TLS ? 'SSLv3' : undefined
        },
        requireTLS: process.env.SMTP_USE_TLS ? true : undefined
      } as any;
    } else {
      // all emails are catched by ethereal.email
      mailConfig = {
        host: "smtp.ethereal.email",
        port: 587,
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASSWORD,
        },
      };
    }
    console.log('Mailer config', process.env, mailConfig);
    Mailer.transporter = nodemailer.createTransport(mailConfig);
  }

  public static sendText(email: string, subject: string,  text: string) {
    return this.handle(email, subject, text);
  }

  public static async sendTemplate(email: string, subject: string, template: string, data: {[key: string]: any}) {
    const tpl = new EmailTemplate({message: ""});
    const html = await tpl.render(
    `${path.resolve(__dirname)}/../templates/emails/${template}`,
      data,
    );

    return this.handle(email, subject, html);
  }

  private static handle(email: string, subject: string, text: string) {
    const message = {
      from: process.env.SMTP_FROM,
      to: email,
      subject,
      html: text,
    };

    return new Promise((res, rej) => {
      Mailer.transporter.sendMail(message, (err: any, info: any) => {
        if (err) {
          console.error(message, err);
          rej(err);
        } else {
          res(info);
        }
      });
    });
  }
}
