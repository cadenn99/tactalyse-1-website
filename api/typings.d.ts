import { Application } from "express"

export interface DatabaseInterface {
    connect: () => void
    createUser: (email: string, password: string) => object
    loginUser: Function
    createOrder: Function
    findOrder: Function
    findUserByOrder: Function
    completePayment: Function
    findUserOrderHistory: Function
    findAllUnfulfilledOrders: Function
    completeOrder: Function
}

export interface PaymentProcessorInterface {
    createPayment: (price: string, currency: string, description: string, email?: string) => any
    webhookHandler: (id: string) => any
}

export interface MailerInterface {
    sendEmail: (email: string, attachment: Mail.Attachment) => Promise<any>
}


export interface TestContext {
    app?: Application
    supertestInstance?: supertest.Test
    db?: DatabaseInterface
    nm?: MailerInterface
    pc?: PaymentProcessorInterface
    mockReq?: Partial<Request>
    mockRes?: Partial<Response>
    mockNext?: Partial<NextFunction>
}

export interface FormResponseInterface {
    files?: formidable.Files
    fields?: formidable.fields
}

export interface TokenInterface {
    email: string
    isEmployee: boolean
    _id: string
}

