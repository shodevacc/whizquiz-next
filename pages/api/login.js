import nc from "next-connect";
import { SignJWT } from 'jose'
import ValidationHandler from 'backend/ValidationHandler'
import { login_schema } from 'backend/schema'
import { prevalidateBody, nextConnectConfig } from 'backend'
import Cookies from 'cookies'


export default nc(nextConnectConfig).post(async (req, res, next) => {
    const body = prevalidateBody(req)
    await ValidationHandler(body, res, next, login_schema)
}, async (req, res) => {
    // console.log("LOGIN",req.cookies)
    const { username, password } = req.body;
    if (!(password === process.env.ADMIN_PASSWORD) || !(username === process.env.ADMIN_USERNAME)) {
        throw new Error("Invalid Credentials")
    }
    // console.log("CRYPTO")
    const token = await new SignJWT({ user: process.env.ADMIN_USERNAME }).setProtectedHeader({ alg: 'HS256' }).sign(new TextEncoder().encode(process.env.SECRET))

    // const token = jwt.sign({ user: process.env.ADMIN_USERNAME }, process.env.SECRET)
    const cookies = new Cookies(req, res)
    cookies.set("token", token, {
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000,
        path: "/"
    })
    return res.status(200).json("okay")
})

