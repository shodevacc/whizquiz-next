import React from 'react'
import { Container, Title } from 'components/styled'
import Confetti from 'components/Confetti'
import { useCelebrate } from 'state'

export default function QuizCompleted() {
    const { celebrate } = useCelebrate()
    return (
        <Container>
            {celebrate && <Confetti />}
            <Title lg >QuizCompleted</Title>
        </Container>

    )
}
