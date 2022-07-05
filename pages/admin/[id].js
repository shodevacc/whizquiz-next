import React from 'react'
import AdminLayout from 'Layout/admin'
import axios from 'axios'
import { useErrorLoadOverlay } from 'hooks'
import { useRouter } from 'next/router'
import { useMutation } from 'react-query'
import { Button } from 'styled'
import styled from 'styled-components';

const Title = styled.h2`
    text-align: center;
    ${({ theme }) => theme.colors.blue};
`

export default function Viewone({ file }) {
    const { mutateAsync } =
        useMutation((data) => axios.post('/api/delete', data))
    const router = useRouter()
    const { setError, setLoading, errorElement, loadingElement } = useErrorLoadOverlay()

    const handleDelete = async (data) => {
        setLoading(true)
        try {
            await mutateAsync(data)
            router.push('/admin')
        }
        catch (e) {
            setError(e.response.data.error)
        }
    }
    return (
        <>
            {errorElement}
            {loadingElement}
            <AdminLayout backUrl="/admin">
                {file && file.answerKey && file.answerKey.length ? <>
                    <Button onClick={() => {
                        handleDelete({ id: file.id })
                    }}>Delete Quiz</Button>

                    <div>
                        <Title> Word of the day: {file.word_of_the_day}</Title>
                        <h2>Questions</h2>
                        {file.answerKey.map((quesans, index) => {
                            return (
                                <ul key={index}>
                                    <li>Question: {quesans.question}</li>
                                    <li>Answer: {quesans.answer}</li>
                                </ul>
                            )
                        })}
                    </div>
                </> :
                    <Title> No Quiz Exists for this Id</Title>
                }
            </AdminLayout>


        </>

    )
}

export async function getServerSideProps({ req, res, query }) {
    const editJsonFile = require("edit-json-file");
    const path = require('path')

    const { id } = query
    let file = editJsonFile(path.join(process.cwd(), "db", "db.json"));
    file = file.get()
    let filteredQuestion = {}
    for (let i = 0; i < file.length; i++) {
        console.log(id, file[i].id)
        if (id === file[i].id) {
            filteredQuestion = file[i]
            break;
        }

    }
    console.log("THE QUERY", filteredQuestion)

    return {
        props: {
            file: filteredQuestion
        }
    }
}