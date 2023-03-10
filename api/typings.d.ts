import { Application } from "express"

export interface DatabaseInterface {
    connect: Function
    createUser: Function
    loginUser: Function
}

export interface TestContextAuth {
    app: Application
    supertestInstance: supertest.Test
}