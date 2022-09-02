import React from 'react'
import { useQuiz } from 'state'
import Questions from 'components/Questions'
import FinalStep from 'components/FinalStep'
import Answers from 'components/Answers'
import TimeLeft from 'components/TimeLeft'
import QuizCompleted from 'components/QuizCompleted'

export default function Main() {
  const { questionsCompleted: questions_completed, quizCompleted } = useQuiz()


  if (quizCompleted) {
    return (
      <div style={{ zIndex: 1 }}>
        <QuizCompleted />
        <Answers />
      </div>
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

