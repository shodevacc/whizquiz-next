import React from 'react'
import { Container, Title } from 'components/styled'
import Confetti from 'components/Confetti'
import { useQuiz } from 'state'

export default function QuizCompleted() {
    const [showCelebrate, setShowCelebrate] = React.useState(true)
    const { celebrate } = useQuiz()
    React.useEffect(() => {
        if (celebrate) {
            setTimeout(() => {
                setShowCelebrate(false)
            }, 10000)
        }
    }, [celebrate])

    return (
        <Container>
            {celebrate && showCelebrate && <Confetti />}
            <Title lg >QuizCompleted</Title>
        </Container>

    )
}
