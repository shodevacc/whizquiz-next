import React from 'react'
import AdminLayout from 'Layout/admin'
import axios from 'axios'
import { useErrorLoadOverlay } from 'hooks'
import { useRouter } from 'next/router'
import { useMutation } from 'react-query'
import { Button } from 'styled'
import { requireAuthentication } from 'utils'
import styled from 'styled-components';

const Title = styled.h2`
    text-align: center;
    ${({ theme }) => theme.colors.blue};
`
const Flex = styled.div`
    display: grid;
    grid-template-columns: repeat(1, minmax(0, 1fr));
    gap:5px;
    ${({ theme }) => theme.sizes.sm}{
        grid-template-columns: repeat(2, minmax(0, 1fr));
    }
`
const Card = styled.div`
    border: 1px solid gray;
    padding: 10px;
    border-radius: 10px;
    width: 100%;
    margin: 10px;
    p{
        margin:10px 0;
        span{
            font-weight:600;
        }
    }

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
            <AdminLayout backUrl="/admin" handleDelete={() => handleDelete({ id: file.id })}>
                {file && file.answerKey && file.answerKey.length ? <>
                    <div>
                        <Title> Word of the day: {file.word_of_the_day}</Title>
                        <h2>Questions & Answers</h2>
                        <Flex>
                            {file.answerKey.map((quesans, index) => {
                                return (
                                    <Card key={`${quesans.question}-${index}`}>
                                        <p>{index + 1}.</p>
                                        <p><span>Question: </span><br />{quesans.question}</p>
                                        <p><span>Answer: </span><br /> {quesans.answer}</p>
                                    </Card>
                                )
                            })}
                        </Flex>

                    </div>
                </> :
                    <Title> No Quiz Exists for this Id</Title>
                }
            </AdminLayout>


        </>

    )
}

export const getServerSideProps = requireAuthentication(async ({ req, res, query }) => {
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
    // console.log("THE QUERY", filteredQuestion)

    return {
        props: {
            file: filteredQuestion
        }
    }
})

