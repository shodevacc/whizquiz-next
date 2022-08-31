import React from 'react'
import dayjs from 'dayjs'
import AdminLayout from 'Layout/admin'
import axios from 'axios'
import { requireAuthentication } from 'utils'
import { useErrorLoadOverlay } from 'hooks'
import { useRouter } from 'next/router'
import { FieldContaner, Input, Label, ErrorMessage, Row, Button } from 'styled'
import { object, array, string } from 'yup'
import { Formik, Form, Field, FieldArray, useField, useFormikContext } from "formik";

// //Check if the date is past
function onlyFutureDate(date) {
    if (date === undefined) {
        return false;
    }
    var today = dayjs().hour(0).minute(0).second(0).millisecond(0);
    var selectedDate = dayjs(date).hour(0).minute(0).second(0).millisecond(0);
    if (selectedDate.isBefore(today)) {
        return false;
    }
    return true;
}


export default function Create() {
    const router = useRouter()
    const { setError, setLoading, errorElement, loadingElement } = useErrorLoadOverlay()

    return (
        <>
            {errorElement}
            {loadingElement}
            <AdminLayout backUrl="/admin">
                <Formik
                    onSubmit={async (values, actions) => {
                        // console.log("VALUES", values)
                        setLoading(true)
                        actions.setSubmitting(true)
                        try {
                            const res = await axios.post(`/api/create`, values)
                            if (res.status === 200) {
                                router.push('/admin')
                            }
                        }
                        catch (e) {
                            console.log("ERROR", e)
                            setError(e.response.data.error)
                            // actions.setErrors({answerKey})
                        }
                        finally {
                            actions.setSubmitting(false)
                        }


                    }}
                    initialValues={{
                        date: '',
                        word_of_the_day: '',
                        answerKey: [{ question: "", answer: "" }],
                    }}
                    validationSchema={object().shape({
                        date: string().required("Date is required").test(
                            "onlyFutureDate",
                            "Please select a future date",
                            onlyFutureDate
                        ),
                        word_of_the_day: string().required("Word of the day is required"),
                        answerKey: array().of(object().shape({
                            question: string().required("Question is required"),
                            answer: string().required("Answer is required")
                        }))
                    })}
                >
                    {({ isSubmitting }) => (
                        <Form>
                            <Row>
                                <Field name="date">
                                    {({ field, form }) => {
                                        // console.log("form", form)
                                        return (
                                            <FieldContaner>
                                                <Label htmlFor='date'>date</Label>
                                                <Input {...field} type='date' id="date" />
                                                <ErrorMessage name="date" />
                                            </FieldContaner>
                                        )

                                    }}

                                </Field>
                                <Field name="word_of_the_day">
                                    {({ field, form }) => {
                                        return (
                                            <FieldContaner>
                                                <Label htmlFor='word_of_the_day'>Word of the day</Label>
                                                <Input {...field} id="word_of_the_day" />
                                                <ErrorMessage name="word_of_the_day" />
                                            </FieldContaner>
                                        )

                                    }}

                                </Field>
                            </Row>

                            <QuestionForm />
                            {isSubmitting ? <Button type="submit" style={{ width: '80%' }} disabled>Please Wait</Button> : <Button type="submit" style={{ width: '80%' }}>Submit</Button>}

                        </Form>
                    )}
                </Formik>
            </AdminLayout>
        </>

    )
}


function QuestionForm() {
    const [word] = useField('word_of_the_day')
    const context = useFormikContext()
    React.useEffect(() => {
        let questions = []
        if (word.value && word.value.length) {
            for (let i = 0; i < word.value.length; i++) {
                questions.push({ question: '', answer: '' })
            }
        }
        context.getFieldHelpers('answerKey').setValue(questions)
    }, [word.value])
    return (
        <FieldArray name="answerKey">
            {({ field, form, ...arrayHelpers }) => {
                return (form.values.answerKey.map((data, index) => {
                    // console.log("KEYS",`answerkey-${index}`)
                    return (
                        <>
                            <Row key={`answerkey-${index}`}>
                                <Field name={`answerKey.${index}.question`}>
                                    {({ field }) => {
                                        return (
                                            <FieldContaner>
                                                <Label htmlFor={`answerKey.${index}.question`}>Question {index + 1}</Label>
                                                <Input {...field} id={`answerKey.${index}.question`} />
                                                <ErrorMessage name={`answerKey.${index}.question`} />
                                            </FieldContaner>
                                        )
                                    }}
                                </Field>
                                <Field name={`answerKey.${index}.answer`}>
                                    {({ field }) => {
                                        return (
                                            <FieldContaner>
                                                <Label htmlFor={`answerKey.${index}.answer`}>answer {index + 1}</Label>
                                                <Input {...field} id={`answerKey.${index}.answer`} />
                                                <ErrorMessage name={`answerKey.${index}.answer`} />
                                            </FieldContaner>
                                        )
                                    }}
                                </Field>
                            </Row>
                            {/* <button type="button" className="p-3 my-2 text-white bg-pink-dark" onClick={() => arrayHelpers.push({ question: '', answer: '' })}>Add a Code</button> */}
                        </>

                    )
                }))

            }}

        </FieldArray>
    )
}

export const getServerSideProps = requireAuthentication(async () => {
    return {
        props: {
        }
    }
})