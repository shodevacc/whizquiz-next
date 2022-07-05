import Head from 'next/head'
import dayjs from 'dayjs'
import Main from 'components/Main'
import NoQuiz from 'components/NoQuiz'
import React from 'react'
import Nav from 'components/Nav'
import { useQuiz } from 'state'

export default function Home({ quiz }) {
  const [mounted, setMounted] = React.useState(false)
  const { reset, setQuiz } = useQuiz()
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
  const editJsonFile = require("edit-json-file");
  const path = require('path')
  let file = editJsonFile(path.join(process.cwd(), "db", "db.json"));
  const fileData = file.get()
  const today = dayjs().hour(0).minute(0).second(0).millisecond(0)
  // Returns undefined if quiz not found
  const todayQuiz = fileData.find(quiz => dayjs(quiz.date).hour(0).minute(0).second(0).millisecond(0).isSame(today))

  return {
    props: {
      quiz: todayQuiz || null
    }, // will be passed to the page component as props
  }
}