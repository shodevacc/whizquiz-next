import nc from "next-connect";
import { prevalidateBody, nextConnectConfig } from 'backend'
import ValidationHandler from 'backend/ValidationHandler'
import { delete_one_schema } from 'backend/schema'
import { connectToDatabase } from 'backend/connect'


export default nc(nextConnectConfig).post(async (req, res, next) => {
    var body = prevalidateBody(req)
    await ValidationHandler(body, res, next, delete_one_schema)
}, async (req, res) => {
    const { id } = req.body
    const { db, client } = await connectToDatabase()
    const result = await db.collection('questions').deleteOne({ _id: id })
    client.close();
    return res.status(200).json(result)
})

