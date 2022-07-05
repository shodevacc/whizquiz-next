import nc from "next-connect";
import { nextConnectConfig } from 'backend'
import Cookies from 'cookies'


export default nc(nextConnectConfig).post(async (req, res) => {
    const token = 'token'
    const cookies = new Cookies(req, res)
    cookies.set("token", token, {
        httpOnly: true,
        expires: new Date(0),
        path: "/"
    })
    return res.status(200).json("okay")
})

