import React from 'react'
import axios from 'axios';
import Link from 'next/link'
import AdminNav from 'components/AdminNav'
import { useRouter } from 'next/router';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowAltCircleLeft } from '@fortawesome/free-solid-svg-icons'
import { Button } from 'styled'
import { useErrorLoadOverlay } from 'hooks'

const Container = styled.div`
    padding: 20px 30px;
`
const Options = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 10px 0 0 0;
    padding: 0 30px;

`
const Center = styled.div`
display: flex;
    justify-content: flex-start;
    align-items: center;
`
const Back = styled(FontAwesomeIcon)`
    margin: 10px;
    font-size: 20px;
    color: ${({ theme }) => theme.colors.blue};;
    transition: transform .3s ease;
    cursor: pointer;
    :hover{
        transform: scale(1.1)
    }
`

export default function AdminLayout({ children, backUrl = null, noOptions = false, handleDelete = null }) {
    const router = useRouter()
    const { setError, setLoading, errorElement, loadingElement } = useErrorLoadOverlay()
    const handleLogout = async () => {
        setLoading(true)
        try {
            const res = await axios.post(`/api/logout`)
            if (res.status === 200) {
                router.push('admin/login')
            }
        }
        catch (e) {
            setError(e.response.data.error)
        }

    }
    return (
        <>
            {errorElement}
            {loadingElement}
            <div>
                <AdminNav />
                {!noOptions && <Options>
                    <Center >
                        {backUrl && <Link href={backUrl}>
                            <span>
                                <Back icon={faArrowAltCircleLeft} />
                            </span>
                        </Link>}


                        <Link href="/admin/create">
                            <span>
                                <Button>Create New</Button>
                            </span>
                        </Link>
                    </Center>

                    {handleDelete && <Button onClick={handleDelete}>Delete Quiz</Button>}
                    <Button style={{ margin: '0' }} onClick={handleLogout}>Logout</Button>
                </Options>}

                <Container>
                    {children}
                </Container>

            </div>
        </>

    )
}
