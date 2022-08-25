import express from 'express'
import mongoose from 'mongoose'
import logger from "morgan";
import flash from "express-flash";
import cors from 'cors'
import {router} from './authRouter.js'
import bodyParser from 'body-parser'

const PORT = process.env.PORT || 5050


const app = express()

app.use(cors({
    origin: '*'
}))
app.use(flash());
app.use(logger("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use('/', router)

const start = async () => {
    try {
        await mongoose.connect('mongodb+srv://rost:Rost_333@cluster0.qwtafib.mongodb.net/auth_roles?retryWrites=true&w=majority')
        app.listen(PORT, () => console.log(`server started on PORT ${PORT}`))
    } catch (e) {
        console.log(e)
    }
}

start()