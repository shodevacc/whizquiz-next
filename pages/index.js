import Head from 'next/head'
import dayjs from 'dayjs'
import Main from 'components/Main'
import NoQuiz from 'components/NoQuiz'
import React from 'react'
import Nav from 'components/Nav'
import { connectToDatabase } from 'backend/connect'
import { useQuiz, useTimeLeft } from 'state'

const addPadding = (val) => {
  const length = val.length
  return length === 1 ? `0${val}` : (val)
}


export default function Home({ quiz }) {
  const [mounted, setMounted] = React.useState(false)
  const { reset, setQuiz } = useQuiz()
  const { setTime } = useTimeLeft()

  // Callback to get hours, mins, sec left.
  const getTimeRemaining = React.useCallback(() => {
    var today = dayjs()
    const date = (dayjs().hour(0).minute(0).second(0)).add(1, 'day')
    const timeLeft = date.diff(today)
    const hours_float = timeLeft / (1000 * 60 * 60)
    const hours = parseInt(hours_float)
    const mins_float = (hours_float - hours) * 60
    const mins = parseInt(mins_float)
    // const seconds = (mins_float - mins) * 60
    const seconds = `${parseInt((mins_float - mins) * 60)}`.slice(0, 2)
    return { hours: addPadding(`${hours}`), mins: addPadding(`${mins}`), sec: addPadding(seconds) }
  }, [])

  // Timer to update time
  React.useEffect(() => {
    const Interval = setInterval(() => {
      setTime(getTimeRemaining())
    }, 1000)

    return () => {
      clearInterval(Interval)
    }
  }, [])

  React.useEffect(() => {
    // If quiz doesnt exist then reset the localstorage about quiz state
    if (!quiz) {
      reset()
      setMounted(true)
      return
    }
    setQuiz(quiz)
    setMounted(true)
  }, [])
  // console.log("THE DB IS", quiz)
  return (
    <div >
      <Nav />
      <Head>
        <title>Whiz Quiz</title>
        <meta name="description" content="Whiz Quiz" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {quiz ?
        mounted && <Main />
        :
        <NoQuiz />
      }


    </div>
  )
}

export async function getServerSideProps({ req, res }) {
  const { db, client } = await connectToDatabase()
  // const exists = await db.collection("questions").findOne({ date: data.date })
  const today = dayjs().hour(0).minute(0).second(0).millisecond(0).format('YYYY-MM-DD')

  // Returns null if quiz not found
  let todayQuiz = await db.collection("questions").findOne({ date: today })
  client.close();
  return {
    props: {
      quiz: todayQuiz
    }, // will be passed to the page component as props
  }
}