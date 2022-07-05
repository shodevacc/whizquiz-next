import nc from "next-connect";
import jwt from 'jsonwebtoken';
import ValidationHandler from 'backend/ValidationHandler'
import { login_schema } from 'backend/schema'
import { prevalidateBody, nextConnectConfig } from 'backend'
import Cookies from 'cookies'
const editJsonFile = require("edit-json-file");
const path = require('path')


export default nc(nextConnectConfig).post(async (req, res, next) => {
    const body = prevalidateBody(req)
    await ValidationHandler(body, res, next, login_schema)
}, async (req, res) => {
    console.log("LOGIN",req.cookies)
    const { username, password } = req.body;
    if (!(password === process.env.ADMIN_PASSWORD) && !(username === process.env.ADMIN_USERNAME)) {
        throw new Error("Invalid Credentials")
    }
    const token = jwt.sign({ user: process.env.ADMIN_USERNAME }, process.env.SECRET)
    const cookies = new Cookies(req, res)
    cookies.set("token", token, {
        httpOnly: true,
        maxAge: 24*60*60*1000,
        path: "/"
    })
    return res.status(200).json("okay")
})

