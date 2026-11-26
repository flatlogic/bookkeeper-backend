import { createTransport, Transporter } from "nodemailer";
import path from "path";
import { compileFile } from "pug";

export default class Mailer {
  public static transporter: Transporter;

  public static init() {
    const port = Number(process.env.SMTP_PORT || 587);
    const user = process.env.SMTP_USER;
    const pass = process.env.SMTP_PASSWORD;
    Mailer.transporter = createTransport({
      host: process.env.SMTP_HOST,
      port,
      secure: port === 465,
      requireTLS: process.env.SMTP_USE_TLS === "true" || process.env.SMTP_USE_TLS === "1",
      auth: user || pass ? {user, pass} : undefined,
    });
  }

  public static sendText(email: string, subject: string, text: string) {
    return this.handle(email, subject, text);
  }

  public static async sendTemplate(email: string, subject: string, template: string, data: {[key: string]: any}) {
    const render = compileFile(path.join(__dirname, "../templates/emails", template + ".pug"));
    return this.handle(email, subject, render(data));
  }

  private static handle(email: string, subject: string, html: string) {
    return Mailer.transporter.sendMail({from: process.env.SMTP_FROM, to: email, subject, html});
  }
}
