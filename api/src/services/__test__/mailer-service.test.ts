import { vi, describe, test, expect, beforeEach, afterEach, Mock } from 'vitest'
import { TestContext } from '@root/typings';
import { MailerService } from '@src/services';
import Mail from 'nodemailer/lib/mailer';
import nodemailer from 'nodemailer';

vi.mock("nodemailer")

beforeEach<TestContext>((context) => {
    context.nm = new MailerService({
        host: 'smtp-relay.sendinblue.com',
        port: 587,
        user: 'snowboard8442@gmail.com',
        pass: '1NcGnXO24vHSDh6U',
        email: '<h1>Hello from Tactalyse</h1>'
    })
})

afterEach(() => {
    vi.clearAllMocks();
})

describe("Tests for the Mailer Service class", () => {

    test<TestContext>("Can the Mailer Service send an email", async ({ nm }) => {
        await nm?.sendEmail("email", "" as Mail.Attachment)

        expect(nodemailer.createTransport, 'sendMail').toBeCalled()
    })
})
