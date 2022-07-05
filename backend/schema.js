import { object, string, array } from 'yup'

export const login_schema = object({
    username: string().required('userame is required'),
    password: string().required('password is required')
})
export const create_schema = object({
    date: string().required('Date is required'),
    answerKey: array().of(object({
        question: string().required('Question is required'),
        answer: string().required('answer is required'),
    })),
    word_of_the_day: string().required('Word of the day is required')
})
export const get_one_schema = object({
    id: string().required('Id is required')
})
export const delete_one_schema = object({
    id: string().required('Id is required')
})