import React from 'react'
import styled from 'styled-components';
import { useQuiz, useTimeLeft } from 'state'

const Container = styled.div`
    position: fixed;
    display: flex;
    justify-content: center;
    align-items: center;
    top:0;
    left:0;
    height:100vh;
    width: 100vw;
    background: rgba(0,0,0,0.5) ;
   
    p{
        color:#fff;
        text-align:center;
    }
`;
const ContainerInner = styled.div`
    background: #5472D3;
    width: 95%;
    height:90vh ;
    max-height:90vh ;
    padding:10px 30px;
    border-radius: 15px;
    overflow:scroll;
    ${({ theme }) => theme.sizes.md}{
        width: 95%;
    }
`
const AnswerContainer = styled.div`
    background: ${({ theme }) => theme.colors.blue};
    border-radius: 15px;
    padding:10px 30px;
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;
    p{
        span{
            color:#E85AFF;
        }
        border-radius: 15px;
        padding: 10px;
        background: ${({ theme }) => theme.colors.blue_dark}; ;
    }
`
const Purple = styled.p`
    background: ${({ theme }) => theme.colors.blue_dark};
    padding: 5px;
    border-radius: 10px;
    display: block;
    text-align:center;
    color: #E85AFF !important;
    font-weight: 700;
`
const Flex = styled.div`
    display: flex;
    justify-content: center;
    align-items:center;
    flex-wrap:nowrap;
`
const Dash = styled.div`
    background:#fff;
    height: 2px;
    width: 20px;
    margin: 0 5px;
`;
const Button = styled.button`
    background: ${({ theme }) => theme.colors.light_blue};
    padding: 10px 25%;
    font-size: 18px;
    border-radius: 15px;
    border:none;
    color: #fff;
    margin: 0 auto;
    display: block;
    cursor:pointer ;
`
export default function Help({ setState }) {
    const { numberOfQuestions } = useQuiz()
    const { hours } = useTimeLeft()
    return (
        <Container>
            <ContainerInner>
                <p>
                    There are {numberOfQuestions ? numberOfQuestions : 'several'} questions in this puzzle.
                    Use the first letter of each correct answer, (Highlighted in <span style={{ color: '#E85AFF', fontWeight: '600', background: '#010f31', padding: '5px', borderRadius: '10px' }}>Purple</span>)
                    to unscramble the word of the day. You have 24 hours of unlimited tries ({hours} hours Left)</p>
                <p>Example:</p>
                <p>Question 1</p>
                <p>Opposite of Botton?</p>
                <Flex>
                    <Dash />
                    <Dash />
                    <Dash />
                </Flex>
                <p>All Answers will be displayed like</p>
                <AnswerContainer>
                    <p><span>T</span>op</p>
                    <p><span>E</span>ar</p>
                    <p><span>R</span>ain</p>
                    <p><span>D</span>oorway</p>
                    <p><span>N</span>eighbours</p>
                </AnswerContainer>
                <p>unscramble the word of the day using the Highlighted letters</p>
                <Purple>TREND</Purple>
                <Button onClick={() => setState(false)}>Start</Button>
            </ContainerInner>

        </Container>
    )
}
