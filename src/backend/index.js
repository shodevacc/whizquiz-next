export const prevalidateBody = (req) => {
    var body = req.body
    if (!req.body)
        body = {}
    return body
}

export const nextConnectConfig = {
    onError: (error, req, res) => {
        console.log("THE ERROR", error)
        res.status(501).json({ error: `${error.message}` });
    },
    onNoMatch(req, res) {
        res.status(405).json({ error: `Method ${req.method} not allowed` });
    },
};

