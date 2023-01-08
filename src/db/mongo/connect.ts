import mongoose from 'mongoose'

import config from '../../config'


function connect(uri: string): void {
    mongoose.connect(uri)
        .then(() => console.log('Mongo connected'))
        .catch(error => console.log(`Mongo connection error ${error}`))
}

function mongoConnect(): void {
    const mongoUri = `mongodb+srv://${config.mongo.user}:${config.mongo.password}@cluster0.vnoh1py.mongodb.net/?retryWrites=true&w=majority`
    
    mongoose.connection.on('error', (error) => console.error(error))

    mongoose.connection.on('disconnected', () => {
        console.log('Mogoose disconnected')
        setTimeout(() => connect(mongoUri), 500)
    })

    connect(mongoUri)
}

export default mongoConnect
