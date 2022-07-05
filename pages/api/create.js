import nc from "next-connect";
import dayjs from "dayjs";
import crypto from 'crypto';
import { prevalidateBody, nextConnectConfig } from 'backend'
import ValidationHandler from 'backend/ValidationHandler'
import { create_schema } from 'backend/schema'
const editJsonFile = require("edit-json-file");
const path = require('path')
var customParseFormat = require('dayjs/plugin/customParseFormat')


export default nc(nextConnectConfig).post(async (req, res, next) => {
    var body = prevalidateBody(req)
    await ValidationHandler(body, res, next, create_schema)
}, async (req, res) => {
    const data = req.body
    dayjs.extend(customParseFormat)

    if (!dayjs(data.date, 'YYYY-MM-DD', true).isValid())
        throw new Error("Invalid Date. Send Date as YYYY-MM-DD")

    let file = editJsonFile(path.join(process.cwd(), "db", "db.json"));
    let fileData = file.get()

    // Check if quiz for this date already exists
    const exists = fileData.find(quiz => quiz.date === data.date)

    if (exists) {
        throw new Error("Quiz for this date already exists")
    }

    const newData = {
        id: crypto.randomBytes(16).toString("hex"),
        ...data
    }
    fileData.push(newData)

    // Sort by dates before storing (Descending. Newdate=>oldDate)
    fileData.sort((a, b) => dayjs(a.date).isAfter(dayjs(b.date)) ? -1 : 1)
    file.set("", fileData)
    file.save();
    return res.status(200).json(newData)
})

