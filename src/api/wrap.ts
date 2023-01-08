import { Request, Response } from 'express'


type Controller = (req: Request, res?: Response) => Promise<any>

function wrap (controller: Controller) {
    return function(request: Request, response: Response) {
        controller(request, response)
            .then(data => {
                return response.status(200).json({ response: data || null, error: null })
            })
            .catch(error => {
                const statusCode: number = error.statusCode || 500
                console.error(`API ERROR: path: ${request.path} code: ${statusCode}, message: ${error.message}, stack: ${error.stack}`)
                return response.status(statusCode).json({ response: null, error: error.message })
            })
    }
}

export default wrap
