export default async function ValidationHandler(data, res, next, schema) {
    try {
        await schema.validate(data, { stripUnknown: true, strict: true, abortEarly: false })
        next();
    }
    catch (e) {
        console.log("THE ERROR IS", e)
        throw new Error(e.message)
    }
}
