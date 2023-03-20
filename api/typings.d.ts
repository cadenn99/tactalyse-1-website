import { Application } from "express"

export interface DatabaseInterface {
    connect: Function
    createUser: Function
    loginUser: Function
    createOrder: Function
    findOrder: Function
}

export interface TestContext {
    app: Application
    supertestInstance: supertest.Test
}

export interface FormResponseInterface {
    fields?: formidable.Fields
    files: formidable.Files
}
