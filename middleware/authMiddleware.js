import jwt from 'jsonwebtoken'
import {config} from '../config.js'

export const middleware = (req, res, next) => {
    console.log(req)
    if (req.method === 'OPTIONS') {
        next()
    }

    try {
        const token = req.headers.authorization.split(' ')[1]
        if (!token) {
            res.status(403).json({message: 'User isn`t exist'})
        }
        const decodedData = jwt.verify(token, config.secret)
        req.user = decodedData
        next()
    } catch (e) {
        console.log(e)
        res.status(403).json({message: 'User isn`t exist'})
    }
}