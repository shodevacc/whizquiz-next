import create from "zustand";
import { persist } from "zustand/middleware";


const initialState = {
    quiz: {
        date: '',
        answerKey: [],
        word_of_the_day: ''
    },
    celebrate: false,
    allAnswers: [],
    numberOfQuestions: 0,
    currentQuestionNumber: 0,
    questionsCompleted: false,
    quizCompleted: false,
}
export const useQuiz = create(
    persist(
        (set) => ({
            ...initialState,
            setQuiz: (quiz) => set((state) => {
                return {
                    ...state,
                    allAnswers: quiz.answerKey.map(item => item.answer),
                    numberOfQuestions: quiz.answerKey.length,
                    quiz: quiz
                }
            }),
            setCelebrate: (celebrateState) => set((state) => {
                return {
                    ...state,
                    celebrate: celebrateState
                }
            }),
            incrementQuestion: () => set((state) => {
                if (state.currentQuestionNumber + 1 < state.numberOfQuestions) {
                    return {
                        ...state,
                        currentQuestionNumber: state.currentQuestionNumber + 1
                    }
                }
                else {
                    return {
                        ...state,
                        questionsCompleted: true
                    }
                }
            }),
            setQuizCompleted: (completedState) => set((state) => {
                return {
                    ...state,
                    quizCompleted: completedState
                }
            }),
            reset: () => set((state) => {
                return {
                    ...initialState,
                }
            })
        })
        ,
        {
            name: 'quiz'
        })
)

export const useTimeLeft = create((set) => ({
    hours: '',
    mins: '',
    sec: '',
    setTime: (time) => set(() => {
        return {
            hours: time.hours,
            mins: time.mins,
            sec: time.sec
        }
    })
}))
