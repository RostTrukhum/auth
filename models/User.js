import Mongoose from 'mongoose'

export const User = new Mongoose.Schema({
    username: {type: String, unique: true, required: true},
    password: {type: String, required: true},
    roles: [{type: String, ref: 'Role'}]
})

export default Mongoose.model('User', User)