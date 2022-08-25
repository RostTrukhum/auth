import { config } from "../config.js"
import jwt from 'jsonwebtoken'

export const roleMiddleware = (roles) => {
    return function (req, res, next) {

        try {
            const token = req.headers.authorization.split(' ')[1]
            console.log(token)
            if (!token) {
                return res.status(403).json({message: 'User isn`t exist or invalid token'})
            }

            const {roles: userRoles} = jwt.verify(token, config.secret)
            let hasRole = false
            userRoles.forEach(role => {
                if (roles.includes(role)) {
                    hasRole = true
                }
            })

            if (!hasRole) {
                return res.status(403).json({message: 'You don`t have access'})
            }

            next()
        } catch (e) {
            console.log(e)
            res.status(403).json({message: 'User isn`t exist'})
        }
    }
}