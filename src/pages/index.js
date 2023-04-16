import { useState, useEffect, useMemo } from 'react'
import AnswerInput from '@/components/answerInput'
import words from '@/data/words.json'
import rules from '@/data/rules.json'

export default function Home() {
  // new, correct, incorrect
  const [state, setState] = useState('')
  const [word, setWord] = useState('')
  const [group, setGroup] = useState('godan')
  const [form, setForm] = useState('causative')

  const dictionary = word?.dictionary || ''
  const reading = word?.reading || ''
  const meaning = word?.meaning || ''
  const answer = getAnswer(dictionary, group, form)

  const handleOnSubmit = (submission) => {
    if (state !== 'new') {
      setState('new')
      return
    }

    // Check if submission is one of the answers
    if (checkAnswer(submission, dictionary, group, form)) {
      setState('correct')
      return
    }

    setState('incorrect')
  }

  const getNewWord = () => {
    const randomIndex = Math.floor(Math.random() * words[group].length)
    const newWord = words[group][randomIndex]
    
    if (newWord === word) {
      return getNewWord()
    }

    setWord(newWord)
  }

  // Get random word when state is new
  useMemo(() => {
    if (state !== 'new') return

    getNewWord()
  }, [state])

  useEffect(() => {
    setState('new')
  }, [])

  return (
    <>
      <div className="w-full mb-6 text-center">
        <p className="text-sm mb-1.5">Make the following <span className="font-bold text-red-500">{form}</span></p>

        <div
          className="text-3xl mb-3"
          dangerouslySetInnerHTML={{ __html: convertToRuby(reading) }}
        />
      </div>

      <div className="w-full max-w-xl flex flex-col items-center">
        <AnswerInput onSubmit={handleOnSubmit} state={state} />

        <div className="h-96 w-full">
          {state === 'correct' && (
            <div className="mt-6 w-full flex flex-1 flex-col items-center p-1 border-2 border-green-400 rounded-md">
              <div className="w-full px-3 py-1.5 rounded bg-green-500 text-green-50 text-center font-bold text-lg">
                正解
              </div>
            </div>
          )}

          {state === 'incorrect' && (
            <div className="mt-6 w-full flex flex-1 flex-col items-center p-1 border-2 border-red-400 rounded-md">
              <div className="w-full px-3 py-1.5 rounded bg-red-500 text-red-50 text-center font-bold text-lg">
                不正解
              </div>
            </div>
          )}

          {state !== 'new' && (
            <div className="mt-6 p-1 w-full flex flex-1 flex-col border-2 rounded-md border-gray-700 space-y-1">
              <div className="p-2 bg-transparent text-gray-50 rounded">
                <h2 className="font-bold mb-1.5">Correct Answer</h2>

                <span className="leading-8 text-lg">{answer}</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-1">
                <div className="space-y-3">
                  <div className="p-2 bg-sky-800 text-sky-50 rounded">
                    <h2 className="font-bold mb-1.5">Meaning</h2>

                    <span className="text-lg">
                      {meaning}
                    </span>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="p-2 bg-purple-800 text-purple-50 rounded">
                    <h2 className="font-bold mb-1.5">Group</h2>

                    <span className="text-lg">
                      {group}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  )
}

function checkAnswer(submission, word, group, form) {
  const answer = getAnswer(word, group, form)

  return submission === answer
}

function getAnswer(word, group, form) {
  const patterns = rules[group][form]

  // generate answer by taking the word and applying the rule
  // where the "find" is the last n characters of the word
  // replaced by the "replace" string. Should return a single
  // string.
  const answer = patterns.reduce((acc, pattern) => {
    const { find, replace } = pattern
    const regex = new RegExp(find + '$')
    const newWord = acc.replace(regex, replace)
    return newWord
  }, word)

  return answer
}

function convertToRuby(input) {
  const kanjiStart = '\u4E00'
  const kanjiEnd = '\u9FFF'
  const hiraganaStart = '\u3040'
  const hiraganaEnd = '\u309F'

  const regex = new RegExp(`([${kanjiStart}-${kanjiEnd}])\\[([${hiraganaStart}-${hiraganaEnd}]+)\\]`, 'g')
  const rubyText = input.replace(regex, '<ruby>$1<rt>$2</rt></ruby>')
  
  return rubyText
}