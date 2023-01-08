import { Schema, model, connect, Document } from 'mongoose'


interface CarDTO extends Document {
    brand: string,
    name: string,
    year: number,
    price: number,
}


function setPrice(num: number): number {
    return num * 100
}

function getPrice(num: number): number {
    return Number((num / 100).toFixed(2))
}

const CarSchema = new Schema<CarDTO>({
    brand: { type: String, required: [true, 'brand is required'], trim: true },
    name: { type: String, required: [true, 'name is required'], trim: true },
    year: { type: Number, required: [true, 'year is required'], min: 0, max: 9999 },
    price: { type: Number, get: getPrice, set: setPrice, required: [true, 'price is required'], min: 0 },
}, {
    toObject : { getters: true },
    toJSON : { getters: true }
})

const Car = model<CarDTO>('Car', CarSchema)

export {
    Car,
    CarDTO,
    connect,
}
