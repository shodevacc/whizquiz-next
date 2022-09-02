import nc from "next-connect";
import dayjs from "dayjs";
import crypto from 'crypto';
import { prevalidateBody, nextConnectConfig } from 'backend'
import ValidationHandler from 'backend/ValidationHandler'
import { create_schema } from 'backend/schema'
import { connectToDatabase } from 'backend/connect'
const editJsonFile = require("edit-json-file");
const path = require('path')
var customParseFormat = require('dayjs/plugin/customParseFormat')
import { v4 as uuidv4 } from 'uuid';



export default nc(nextConnectConfig).post(async (req, res, next) => {
    var body = prevalidateBody(req)
    await ValidationHandler(body, res, next, create_schema)
}, async (req, res) => {
    console.log("Start waiting")
    const { db, client } = await connectToDatabase()
    const questionsCollection = db.collection("questions");
    const data = req.body
    dayjs.extend(customParseFormat)

    if (!dayjs(data.date, 'YYYY-MM-DD', true).isValid())
        throw new Error("Invalid Date. Send Date as YYYY-MM-DD")
    console.log('CWD', process.cwd())
    const exists = await db.collection("questions").findOne({ date: data.date })
    if (exists) {
        throw new Error("Quiz for this date already exists")
    }
    const result = await questionsCollection.insert({ _id: uuidv4(), ...data })
    client.close();
    return res.status(200).json(result)
})

