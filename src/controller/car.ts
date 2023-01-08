import { Request, Router } from 'express'
import { QueryOptions } from 'mongoose'

import ApiError from '../api/apiError'
import wrap from '../api/wrap'
import carModel from '../model/car'


async function getCarController(req: Request) {
    const options: QueryOptions = { limit: 100 }
    if (req.query.skip) {
        options.skip = Number(req.query.skip)
    }
    if (req.query.limit) {
        options.limit = Number(req.query.limit)
    }
    if (req.query.sortField) {
        options.sort = { [req.query.sortField.toString()]: Number(req.query.sort) || 1 }
    }
    const cars = await carModel.getCarByFilters(req.query, options)
    return cars
}

async function getCarByIdController(req: Request) {
    const car = await carModel.getCarById(req.params.id)
    if (!car) {
        throw new ApiError(`Car ${req.params.id} not found`, 404)
    }
    return car
}

async function createCarController(req: Request) {
    const car = await carModel.createCar(req.body)
    return car
}


async function updateCarController(req: Request) {
    const car = await carModel.getCarById(req.params.id)
    if (!car) {
        throw new ApiError(`Car ${req.params.id} not found`, 404)
    }
    const updatedCar = await carModel.updateCar(req.params.id, req.body, { new: true, lean: false })
    return updatedCar
}

async function deleteCarController(req: Request) {
    const car = await carModel.getCarById(req.params.id)
    if (!car) {
        throw new ApiError(`Car ${req.params.id} not found`, 404)
    }
    await carModel.deleteCar(req.params.id)
    return 'OK'
}

const carController = Router()

carController.get('/', wrap(getCarController))
carController.post('/', wrap(createCarController))
carController.delete('/:id', wrap(deleteCarController))
carController.get('/:id', wrap(getCarByIdController))
carController.put('/:id', wrap(updateCarController))


export default carController
