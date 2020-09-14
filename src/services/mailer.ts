import EmailTemplate from "email-templates";
import nodemailer from "nodemailer";
import path from "path";

export default class Mailer {
  public static transporter: any;

  public static init() {
    console.log("init");
    let mailConfig;
    if (false) {
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
          ciphers: process.env.SMTP_USE_TLS ? "SSLv3" : undefined
        },
        requireTLS: process.env.SMTP_USE_TLS ? true : undefined
      } as any;
    } else {
      // all emails are catched by ethereal.email
      mailConfig = {
        host: "smtp-relay.sendinblue.com",
        port: 587,
        secure: false,
        auth: {
          user: 'opensevengo@gmail.com',
          pass: 'pHDRaEcw8yqn40PT',
        },
        tls: {
          rejectUnauthorized: false,
          ciphers: process.env.SMTP_USE_TLS ? "SSLv3" : undefined
        },
        requireTLS: process.env.SMTP_USE_TLS ? true : undefined
      };
    }
    Mailer.transporter = nodemailer.createTransport(mailConfig);
  }

  public static sendText(email: string, subject: string,  text: string) {
    console.log("sendText");
    return this.handle(email, subject, text);
  }

  public static async sendTemplate(email: string, subject: string, template: string, data: {[key: string]: any}) {
    console.log("sendTemplate");
    const tpl = new EmailTemplate({message: ""});
    const html = await tpl.render(
    `${path.resolve(__dirname)}/../templates/emails/${template}`,
      data,
    );

    return this.handle(email, subject, html);
  }

  private static handle(email: string, subject: string, text: string) {
    const message = {
      from: 'opensevengo@gmail.com',
      to: 'fafyuvuspa@enayu.com',
      subject: 'sdf',
      html: 'test',
    };

    return new Promise((res, rej) => {
      console.log("sendMail");
      Mailer.transporter.sendMail(message, (err: any, info: any) => {
        console.log(err, info);
        if (err) {
          rej(err);
        } else {
          res(info);
        }
      });
    });
  }
}
