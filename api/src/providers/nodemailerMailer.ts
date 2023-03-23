import { MailerInterface } from "@root/typings";
import nodemailer from "nodemailer";

interface ConstructorInterface {
    host: string
    port: number
    user: string
    pass: string
    email: string
}

export class nodemailerMailer implements MailerInterface {
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

    public async sendEmail(email: string, orderId?: string, filePath?: string) {
        await this.transporter.sendMail({
            from: "tactalysetest@tactalysetest.com",
            to: email,
            subject: `Report - #${orderId}`,
            html: this.email,
            attachments: [{
                filename: 'Report.xlsx',
                path: filePath
            }]
        });
    }
}
