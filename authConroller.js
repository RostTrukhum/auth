import User from "./models/User.js"
import Role from "./models/Role.js"
import bcrypt from 'bcryptjs'
import { validationResult } from "express-validator"
import jwt from "jsonwebtoken"
import {config} from './config.js'

const generateAccessToken = (id, roles) => {
    const payload = {
        id,
        roles
    }
    return jwt.sign(payload, config.secret, {expiresIn: '24h'})
}

export const register = async (req, res) =>  {
    try {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json(errors)
        }
        const {username, password, role} = req.query;
        const candidate = await User.findOne({username});

        if (candidate) {
            return res.status(400).json({message: 'Username reserved'})
        }
        const hashPassword = bcrypt.hashSync(password, 7);
        const userRole = await Role.findOne({value: role});
        const user = new User({username, password: hashPassword, roles: userRole.value});
        const token = generateAccessToken(user._id, user.roles);
        await user.save();
        return res.status(200).json({message: 'User have successfully created', token, user: {username, roles: [role]}});
    } catch(e) {
        console.log(e);
        res.status(400).json({message: `Registration error ${e}`});
    }
}

export const login = async (req, res) =>  {
    try {
        if (!req.query.username || !req.query.password) {
            return res.status(400).json({message: 'fields must be filled'})
        }
        const {username, password} = req.query
        const user = await User.findOne({username})

        if (!user) {
            return res.status(400).json({message: `User ${username} not found`});
        }
        const validPassword = bcrypt.compareSync(password, user.password);

        if (!validPassword) {
            return res.status(400).json({message: `Invalid password`})
        }

        const token = generateAccessToken(user._id, user.roles);
        return res.status(200).json({token, user: {username, roles: user.roles}})

    } catch(e) {
        return res.status(403).json({message: e})
    }
}

export const getUsers = async (req, res) => {
    try {
        const users = await User.find()
        res.status(200).json({users})
    } catch(e) {

    }
}