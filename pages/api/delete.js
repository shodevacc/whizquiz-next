import nc from "next-connect";
import { prevalidateBody, nextConnectConfig } from 'backend'
import ValidationHandler from 'backend/ValidationHandler'
import { delete_one_schema } from 'backend/schema'
const fs = require('fs')
const path = require('path')


export default nc(nextConnectConfig).post(async (req, res, next) => {
    var body = prevalidateBody(req)
    await ValidationHandler(body, res, next, delete_one_schema)
}, async (req, res) => {
    const { id } = req.body
    const filePath = path.join(process.cwd(), "db", "db.json")
    let rawData = fs.readFileSync(filePath)
    let file = JSON.parse(rawData)

    const filteredData = file.filter(quiz => quiz.id !== id)
    fs.writeFileSync(filePath, JSON.stringify(filteredData))

    return res.status(200).json(filteredData)
})

