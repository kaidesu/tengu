import useSettingsContext from '@/hooks/useSettingsContext'
import { useState, useEffect, useMemo } from 'react'
import AnswerInput from '@/components/answerInput'
import words from '@/data/words.json'
import rules from '@/data/rules.json'

export default function Home() {
  const { state } = useSettingsContext()
  
  const [phase, setPhase] = useState('') // new, correct, incorrect
  const [word, setWord] = useState({})
  const [form, setForm] = useState('')
  
  const dictionary = word?.dictionary || ''
  const reading = word?.reading || ''
  const meaning = word?.meaning || ''
  const group = word?.group || ''
  const answer = getAnswer(dictionary, group, form)

  const handleOnSubmit = (submission) => {
    if (phase !== 'new') {
      setPhase('new')
      return
    }

    // Check if submission is one of the answers
    if (checkAnswer(submission, dictionary, group, form)) {
      setPhase('correct')
      return
    }

    setPhase('incorrect')
  }

  const getNewWord = () => {
    // First filter out words that don't have the selected group from state
    const filteredWords = words.filter((word) => {
      return state.groups[word.group]
    })

    if (filteredWords.length === 0) return

    const randomIndex = Math.floor(Math.random() * filteredWords.length)
    const newWord = filteredWords[randomIndex]
    
    if (newWord === word) {
      return getNewWord()
    }

    setWord(newWord)
  }

  const getNewForm = () => {
    // First filter out forms from state that are not selected
    const filteredForms = Object.keys(state.forms).filter((form) => {
      return state.forms[form]
    })

    if (filteredForms.length === 0) return

    const randomIndex = Math.floor(Math.random() * filteredForms.length)
    setForm(filteredForms[randomIndex])
  }

  // Get random word when phase is new
  useMemo(() => {
    if (phase !== 'new') return

    getNewWord()
    getNewForm()
  }, [phase])

  useEffect(() => {
    setPhase('new')
  }, [])

  return (
    <>
      <div className="w-full mb-6 text-center">
        <p className="text-sm mb-1.5">
          Make the following
          
          {/* Being lazy, so hard coding these for now */}
          {form === 'negative' && (
            <span className="bg-red-600 font-bold text-red-50 p-1 ml-1 rounded">{form}</span>
          )}
          {form === 'past' && (
            <span className="bg-amber-600 font-bold text-amber-50 p-1 ml-1 rounded">{form}</span>
          )}
          {form === 'te' && (
            <span className="bg-green-600 font-bold text-green-50 p-1 ml-1 rounded">{form}</span>
          )}
          {form === 'progressive' && (
            <span className="bg-cyan-600 font-bold text-cyan-50 p-1 ml-1 rounded">{form}</span>
          )}
          {form === 'desire' && (
            <span className="bg-pink-600 font-bold text-pink-50 p-1 ml-1 rounded">{form}</span>
          )}
          {form === 'volitional' && (
            <span className="bg-indigo-600 font-bold text-indigo-50 p-1 ml-1 rounded">{form}</span>
          )}
          {form === 'potential' && (
            <span className="bg-orange-600 font-bold text-orange-50 p-1 ml-1 rounded">{form}</span>
          )}
          {form === 'imperative' && (
            <span className="bg-lime-300 font-bold text-lime-600 p-1 ml-1 rounded">{form}</span>
          )}
          {form === 'passive' && (
            <span className="bg-gray-600 font-bold text-gray-50 p-1 ml-1 rounded">{form}</span>
          )}
          {form === 'causative' && (
            <span className="bg-violet-600 font-bold text-violet-50 p-1 ml-1 rounded">{form}</span>
          )}
        </p>

        <div
          className="text-3xl mb-3"
          dangerouslySetInnerHTML={{ __html: convertToRuby(reading) }}
        />
      </div>

      <div className="w-full max-w-xl flex flex-col items-center">
        <AnswerInput onSubmit={handleOnSubmit} phase={phase} />

        <div className="h-96 w-full">
          {phase === 'correct' && (
            <div className="mt-6 w-full flex flex-1 flex-col items-center p-1 border-2 border-green-400 rounded-md">
              <div className="w-full px-3 py-1.5 rounded bg-green-500 text-green-50 text-center font-bold text-lg">
                正解
              </div>
            </div>
          )}

          {phase === 'incorrect' && (
            <div className="mt-6 w-full flex flex-1 flex-col items-center p-1 border-2 border-red-400 rounded-md">
              <div className="w-full px-3 py-1.5 rounded bg-red-500 text-red-50 text-center font-bold text-lg">
                不正解
              </div>
            </div>
          )}

          {phase !== 'new' && (
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
  if (!word || !group || !form) return

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