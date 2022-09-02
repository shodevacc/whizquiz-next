import React from 'react'
import axios from 'axios';
import { useErrorLoadOverlay } from 'hooks'
import AdminLayout from 'Layout/admin'
import styled from 'styled-components';
import { useRouter } from 'next/router';
import { FieldContaner, Input, Label, ErrorMessage, Row, Button } from 'styled'
import { Formik, Form as fm, Field } from "formik";
import { object, string } from 'yup'

const Form = styled(fm)`
    padding: 0 30px;
`;
export default function Login() {
    const router = useRouter()
    const { setError, setLoading, errorElement, loadingElement } = useErrorLoadOverlay()
    return (
        <>
            {errorElement}
            {loadingElement}
            <AdminLayout noOptions>
                <Formik
                    onSubmit={async (values, actions) => {
                        setLoading(true)
                        actions.setSubmitting(true)
                        try {
                            const res = await axios.post('/api/login', values)
                            if (res.status === 200) {
                                router.push("/admin")
                            }
                        }
                        catch (e) {
                            setError(e.response.data.error)
                            actions.setErrors({ password: "Invalid Credentials" })
                        }
                    }}
                    initialValues={{
                        username: "",
                        password: ""
                    }}
                    validationSchema={object().shape({
                        username: string().required('username is required'),
                        password: string().required('password is required')
                    })}
                >
                    {({ isSubmitting }) => (
                        <Form>
                            <Field name="username">
                                {({ field, form }) => {
                                    return (
                                        <FieldContaner>
                                            <Label htmlFor='username'>Username</Label>
                                            <Input {...field} id="username" />
                                            <ErrorMessage name="username" />
                                        </FieldContaner>
                                    )

                                }}

                            </Field>
                            <Field name="password">
                                {({ field, form }) => {
                                    return (
                                        <FieldContaner>
                                            <Label htmlFor='password'>password</Label>
                                            <Input {...field} type="password" id='password' />
                                            <ErrorMessage name="password" />
                                        </FieldContaner>
                                    )

                                }}

                            </Field>
                            {isSubmitting ? <Button style={{ margin: '10px 0 0 0' }} type="submit" disabled>Please Wait</Button> : <Button style={{ margin: '10px 0 0 0' }} type="submit">Submit</Button>}

                        </Form>
                    )}
                </Formik>
            </AdminLayout>
        </>

    )
}
