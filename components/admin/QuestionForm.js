import React from 'react'
import { Input, Label, ErrorMessage } from 'styled'
import { Field, FieldArray, useFormikContext, useField } from 'formik'

export default function QuestionForm() {
    const [wordlength, setWordlength] = React.useState(0)
    const [word] = useField('word')
    const context = useFormikContext()
    console.log(context.getFieldHelpers('answerKey'),
        context.getFieldMeta('answerKey'),
        context.getFieldProps('answerKey'))
    React.useEffect(() => {
        let questions = []
        if (word.value && word.value.length) {
            for (let i = 0; i < word.value.length; i++) {
                questions.push({ question: '', answer: '' })
            }
        }
        context.getFieldHelpers('answerKey').setValue(questions)
        // setWordlength(word.value.length)
    }, [word.value])
    return (
        <FieldArray name="answerKey">
            {({ field, form, ...arrayHelpers }) => {
                return (form.values.answerKey.map((data, index) => {
                    return (
                        <>
                            <div key={index}>
                                <Field name={`answerKey.${index}.question`}>
                                    {({ field }) => {
                                        return (
                                            <>
                                                <Label htmlFor={`answerKey.${index}.question`}>Question {index + 1}</Label>
                                                <Input {...field} id={`answerKey.${index}.question`} />
                                                <ErrorMessage name={`answerKey.${index}.question`} />
                                            </>
                                        )
                                    }}
                                </Field>
                                <Field name={`answerKey.${index}.answer`}>
                                    {({ field }) => {
                                        return (
                                            <>
                                                <Label htmlFor={`answerKey.${index}.answer`}>answer {index + 1}</Label>
                                                <Input {...field} id={`answerKey.${index}.answer`} />
                                                <ErrorMessage name={`answerKey.${index}.answer`} />
                                            </>
                                        )
                                    }}
                                </Field>
                            </div>
                            {/* <button type="button" className="p-3 my-2 text-white bg-pink-dark" onClick={() => arrayHelpers.push({ question: '', answer: '' })}>Add a Code</button> */}
                        </>

                    )
                }))

            }}

        </FieldArray>
    )
}
