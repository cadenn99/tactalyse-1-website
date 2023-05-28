import { MailerInterface } from "@root/typings";
import { CError } from "@src/utils";
import nodemailer from "nodemailer";
import Mail from "nodemailer/lib/mailer";

interface ConstructorInterface {
    host: string
    port: number
    user: string
    pass: string
    email: string
}

export class MailerService implements MailerInterface {
    private transporter: nodemailer.Transporter;
    private email: string

    constructor({ host, port, user, pass, email }: ConstructorInterface) {
        this.transporter = nodemailer.createTransport({
            host,
            port,
            secure: false,
            auth: {
                user,
                pass,
            },
        });
        this.email = email
    }

    /**
     * Method for sending a report to the client
     * 
     * @param email Email of the receiver
     * @param orderId Order id
     * @param filePath Path to the PDF
     */
    public async sendEmail(email: string, attachment: Mail.Attachment) {
        const info = await this.transporter.sendMail({
            from: "tactalysetest@tactalysetest.com",
            to: email,
            subject: `Tactalyse Report`,
            html: this.email,
            attachments: [attachment]
        });

        if (info.accepted.length === 0)
            throw new CError(info.err, 500)

        return info
    }
}
