import {
    DocumentDefinition,
    UpdateQuery,
    QueryOptions,
    FilterQuery,
} from 'mongoose'

import { CarDTO, Car } from '../db/mongo/car'


async function createCar(car: DocumentDefinition<CarDTO>) {
    return new Car(car).save()
}

async function updateCar(carId: string, car: UpdateQuery<CarDTO>, options: QueryOptions = { lean: false }) {
    return Car.findOneAndUpdate({ _id: carId }, car, options)
}

async function getCarById(carId: string, options: QueryOptions = { lean: false }) {
    return Car.findById(carId, {}, options)
}

async function getCarByFilters(query: FilterQuery<CarDTO>, options: QueryOptions = { lean: false, limit: 100, offset: 0 }) {
    return Car.find(query, {}, options)
}

async function deleteCar(carId: string) {
    return Car.deleteOne({ _id: carId })
}

export default {
    createCar,
    updateCar,
    getCarById,
    getCarByFilters,
    deleteCar,
}
