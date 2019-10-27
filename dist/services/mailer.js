"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Mailer {
    static sendText(email, text) {
        return this.handle(email, text);
    }
    static sendTemplate(email, template, data) {
        const text = ""; // handle template with data
        return this.handle(email, text);
    }
    static handle(email, text) {
        console.log("Send email via service");
    }
}
exports.default = Mailer;
//# sourceMappingURL=mailer.js.map