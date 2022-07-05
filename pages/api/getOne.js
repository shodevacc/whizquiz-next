import nc from "next-connect";
import { nextConnectConfig } from 'backend'
const editJsonFile = require("edit-json-file");
const path = require('path')


export default nc(nextConnectConfig).post(async (req, res) => {
    const { id } = req.body
    if (!id) {
        throw new Error("Id is required")
    }
    // const data = req.body
    let file = editJsonFile(path.join(process.cwd(), "db", "db.json"));
    const fileData = file.get()
    const filteredQuiz = fileData.find(quiz => quiz.id === id)

    if (!filteredQuiz) {
        throw new Error("Invalid ID")
    }
    // console.log("THE FILE", file.get())
    return res.status(200).json(filteredQuiz)
})

