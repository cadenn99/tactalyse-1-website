import { vi, describe, test, expect, beforeEach, afterEach } from 'vitest'
import { TestContext } from '@root/typings';
import { MailerService } from '@src/services';

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

describe("", () => {
    test<TestContext>("", () => {

    })
})
