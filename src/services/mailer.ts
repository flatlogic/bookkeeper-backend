export default class Mailer {
  public static sendText(email: string, text: string) {
    return this.handle(email, text);
  }

  public static sendTemplate(email: string, template: string, data: {[key: string]: any}) {
    const text = ""; // handle template with data
    return this.handle(email, text);
  }

  private static handle(email: string, text: string) {
    console.log("Send email via service");
  }
}
