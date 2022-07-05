import nc from "next-connect";
import { nextConnectConfig } from 'backend'
const editJsonFile = require("edit-json-file");
const path = require('path')


export default nc(nextConnectConfig).get(async (req, res) => {
    let file = editJsonFile(path.join(process.cwd(), "db", "db.json"));
    // console.log("THE FILE", file.get())
    return res.status(200).json(file.get())
})

