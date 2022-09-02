import React from 'react'
import { useErrorLoadOverlay } from 'hooks'
import AdminLayout from 'Layout/admin'
import Link from 'next/link'
import styled from 'styled-components';
import axios from 'axios';
import { useRouter } from 'next/router';
import { Title } from 'components/styled'
import { useMutation } from 'react-query'
import { requireAuthentication } from 'utils'
import Head from 'next/head';
import { connectToDatabase } from 'backend/connect'

const Table = styled.table`
    width: 100%;
    border: 1px solid;
    border-collapse: collapse;
`;
const Row = styled.tr``
const TabelHead = styled.thead`
    background: ${({ theme }) => theme.colors.blue};
    color: #fff;
`
const TableBody = styled.tbody``
const Heading = styled.th`
border: 1px solid;
`
const Data = styled.td`
border: 1px solid;
text-align: center;
`
const Button = styled.button``
export default function View({ file }) {
    const { mutateAsync } =
        useMutation((data) => axios.post('/api/delete', data))
    const router = useRouter()
    const { setError, setLoading, errorElement, loadingElement } = useErrorLoadOverlay()
    // if (isLoading) {
    //     setLoading(true)
    // }
    // if (isError) {
    //     console.log("SETTING ERROR",error )
    //     setError(error.response.data.error)
    //     reset()
    //     // console.log("ERROR", error)
    // }
    // if (isSuccess) {
    //     router.reload(window.location.pathname)
    // }
    // console.log("THE FILE", file)
    const handleDelete = async (data) => {
        setLoading(true)
        try {
            await mutateAsync(data)
            router.reload(window.location.pathname)
        }
        catch (e) {
            setError(e.response.data.error)
        }
    }
    return (
        <>
            {errorElement}
            {loadingElement}
            <AdminLayout >
                {file && file.length ? <Table>
                    <TabelHead>
                        <Row>
                            <Heading>word of the day</Heading>
                            <Heading>Date</Heading>
                            <Heading>View</Heading>
                            <Heading>Delete</Heading>
                        </Row>
                    </TabelHead>
                    <TableBody>
                        {file.map((questions, index) => {
                            return (
                                <React.Fragment key={index}>
                                    <Row>
                                        <Data>{questions.word_of_the_day}</Data>
                                        <Data>{questions.date}</Data>
                                        <Data>
                                            <Link href={`admin/${questions._id}`} key={index}>
                                                <span><Button>View</Button></span>
                                            </Link>
                                        </Data>

                                        <Data>
                                            <Button onClick={() => {
                                                handleDelete({ id: questions._id })
                                            }}>Delete</Button>
                                        </Data>
                                    </Row>
                                </React.Fragment>

                            )
                        })}
                    </TableBody>
                </Table> :
                    <div>
                        <Title lg>
                            No Questions
                        </Title>

                    </div>}
            </AdminLayout>
        </>

    )
}

export const getServerSideProps = requireAuthentication(async () => {
    const { db, client } = await connectToDatabase()
    const quizes = await db.collection('questions').find({}).sort({ date: -1 }).toArray();
    client.close();

    return {
        props: {
            file: quizes
        }
    }
})