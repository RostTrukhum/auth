import Mongoose from 'mongoose'

export const Role = new Mongoose.Schema({
    value: {type: String, unique: true, required: true, default: 'USER'},
})

export default Mongoose.model('Role', Role)