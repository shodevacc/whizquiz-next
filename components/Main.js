import React from 'react'
import { useQuiz } from 'state'
import Nav from 'components/Nav'
import Questions from 'components/Questions'
import NoQuiz from 'components/NoQuiz'
import FinalStep from 'components/FinalStep'
import Answers from 'components/Answers'
import TimeLeft from 'components/TimeLeft'
import QuizCompleted from 'components/QuizCompleted'

export default function Main() {
  const { questionsCompleted: questions_completed, quizCompleted } = useQuiz()

  if (quizCompleted) {
    return (
      <>
        <QuizCompleted />
        <Answers />
      </>
    )
  }
  else {
    return (
      <>

        <TimeLeft />
        {questions_completed ? <FinalStep /> : <Questions />}
        <Answers />
      </>

    )
  }
}

