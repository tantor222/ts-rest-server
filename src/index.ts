import express from 'express'

import routes from './routes'
import config from './config'
import ApiError from './api/apiError'
import wrap from './api/wrap'
import mongoConnect from './db/mongo/connect'


const app = express()

app.use(express.json())
app.use('/api', routes)
app.use('*', wrap(async () => { throw new ApiError('Request path not found', 404) }))

app.listen(config.port, config.host, () => {
    console.log(`Server listen http://${config.host}:${config.port}`)
    mongoConnect()
})
