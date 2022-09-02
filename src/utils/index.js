import { jwtVerify } from 'jose'

export const setAnswerColor = (answer, correctAnswer) => {
    // console.log("CHECK THIS",answer,correctAnswer)
    var currentAnswer = answer.toLowerCase()
    var correctAnswerLower = correctAnswer.toLowerCase()
    currentAnswer.split("").forEach((char, index) => {
        const correctCharacter = correctAnswerLower.includes(char)
        const element = document.getElementById(`${index}-character`)
        if (!element)
            return
        if (!correctCharacter) {
            element.classList.remove(...["correctColor", "wrongPosColor"])
            element.classList.add("wrongColor")
        }
        const correctPosition = char === correctAnswerLower.charAt(index)
        if (correctPosition) {
            element.classList.remove(...["wrongColor", "wrongPosColor"])
            element.classList.add("correctColor")
        }
        if (correctCharacter && !correctPosition) {
            element.classList.remove(...["wrongColor", "correctColor"])
            element.classList.add("wrongPosColor")
        }
    })
}

export const initialiseAnswer = (length) => {
    var char = ""
    for (let i = 0; i < length; i++)
        char += '#'
    return char
}

export function requireAuthentication(gssp) {
    return async (ctx) => {
        const { req } = ctx
        const { token } = req.cookies;
        try {
            const { payload: { user } } = await jwtVerify(token, new TextEncoder().encode(process.env.SECRET))
            if (!(user === process.env.ADMIN_USERNAME)) {
                return {
                    redirect: {
                        permanant: false,
                        destination: '/admin/login'
                    }
                }
            }
        }
        catch (e) {
            console.log("THE WRROR IS", e.message)
            return {
                redirect: {
                    permanant: false,
                    destination: '/admin/login'
                }
            }
        }

        return await gssp(ctx);
    }
}