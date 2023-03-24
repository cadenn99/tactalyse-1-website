import { Application } from "express"

export interface DatabaseInterface {
    connect: Function
    createUser: Function
    loginUser: Function
    createOrder: Function
    findOrder: Function
    findUserByOrder: Function
}

export interface PaymentProcessorInterface {
    createPayment: (price: string, currency: string, description: string) => any
    getPayment: (id: string) => any
}

export interface MailerInterface {
    sendEmail: (email: string, orderId: string, filePath: string) => Promise<any>
}

export interface TestContext {
    app: Application
    supertestInstance: supertest.Test
}

export interface FormResponseInterface {
    fields?: formidable.Fields
    files: formidable.Files
}

export interface TokenInterface {
    email: string
    isEmployee: boolean
    _id: string
}