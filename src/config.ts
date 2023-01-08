import dotenv from 'dotenv'


dotenv.config()

export default {
    port: 8080,
    host: 'localhost',
    mongo: {
        user: process.env.MONGO_USER || 'some-user',
        password: process.env.MONGO_PASS || 'some-password',
    },
}
