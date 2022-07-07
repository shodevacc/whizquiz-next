import React from 'react'
import styled from 'styled-components';
import { Container as CTN } from 'components/styled'
import { useQuiz, useTimeLeft } from 'state'


const Container = styled(CTN)`
    
`
const AnswerContainer = styled.div`
background: ${({ theme }) => theme.colors.blue};
border-radius: 25px;
padding: 10px 0;
width:100%;
 h2{
     color:#fff;
     text-decoration: underline;
 }
`
const Title = styled.h3`
    text-align: center;
`;

const P = styled.p`
text-align:center;
display: inline-block;
        text-transform: capitalize;
      margin: 10px auto;
      padding: 10px 20px;
      background: ${({ theme }) => theme.colors.light_blue};
      color:#fff;
      border-radius: 20px;
      font-weight:600;
      background:${({ theme }) => theme.colors.light_blue};
`
const Center = styled.div`
    display:flex;
    justify-content:center;
    align-items:center;
`
export default function Answers() {
    const [answersToDisplay, setanswersToDisplay] = React.useState([])
    const { hours } = useTimeLeft()
    const { quizCompleted, quiz, questionsCompleted, allAnswers, currentQuestionNumber } = useQuiz()
    // console.log(currentQuestionNumber, 'currentAnswerKey', allAnswers)
    React.useEffect(() => {
        if (questionsCompleted) {
            setanswersToDisplay(allAnswers)
            return
        }
        // console.log("CEHCEOUCECN",allAnswers.map((ans, index) => (index <= currentQuestionNumber)?ans:null))
        setanswersToDisplay(allAnswers.filter((ans, index) => (index < currentQuestionNumber)))
        return () => { }
    }, [currentQuestionNumber, questionsCompleted])

    // console.log(answersToDisplay,currentQuestionNumber)
    return (
        <Container>
            {(currentQuestionNumber !== 0 || quizCompleted) && <AnswerContainer>

                {quizCompleted && <>
                    <Title style={{ color: '#fff', textDecoration: 'underline' }}>Word Of the Day</Title>
                    <Center >
                        <P>{quiz.word_of_the_day}</P>
                    </Center>

                </>}
                <h2 style={{ textAlign: 'center' }}>Answers</h2>
                <div className='answercontainer'>
                    {answersToDisplay.map((answer, index) => {
                        return (
                            <p key={answer}>{answer.split('').map((char, index) => {
                                return (
                                    <span style={{ color: index === 0 ? "#E85AFF" : "inherit" }} key={`${index}-${char}-${answer}`}>
                                        {char}
                                    </span>
                                )
                            })}</p>
                        )
                    })}
                </div>
            </AnswerContainer>}
            {
                !quizCompleted && <Title>You have {hours} hours to solve {allAnswers.length} questions to guess the word of
                    the day
                </Title>
            }

        </Container >
    )
}
