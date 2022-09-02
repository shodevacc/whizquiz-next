import React from 'react'
import dayjs from 'dayjs';
import styled from 'styled-components';
import { useTimeLeft } from 'state'

const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
`;
const Title = styled.div`
    font-size:36px;
`
export default function TimeLeft() {
    const { hours, mins, sec } = useTimeLeft()
    // console.log("time", time)
    return (
        <Container>
            <h2 className='smallTitle'>Time Left</h2>
            <Title>{hours}:{mins}:{sec}</Title>
        </Container>
    )
}
