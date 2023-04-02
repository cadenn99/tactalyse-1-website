export default {
    test: {
        MAILER: {
            host: '',
            port: 0,
            user: '',
            pass: '',
            email: ''
        },
        WORKING_EMAIL_PASSWORD: {
            email: 'examp464le@gmail.com',
            password: '1234565789'
        },
        BROKEN_SHORT_PASSWORD: {
            email: 'examp464le@gmail.com',
            password: '1234567'
        },
        BROKEN_INVALID_EMAIL: {
            email: 'examplegmail.com',
            password: '12345678'
        }
    }
}