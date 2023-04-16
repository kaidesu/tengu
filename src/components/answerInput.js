import { useState } from 'react'

export default function AnswerInput({ onSubmit, state }) {
  const [answer, setAnswer] = useState('')

  const handleOnSubmit = (e) => {
    e.preventDefault()

    onSubmit(answer)

    if (state !== 'new') {
      setAnswer('')
    }
  }

  const handleOnChange = (e) => {
    setAnswer(e.target.value)
  }

  return (
    <div className="w-full">
      <form className="relative mt-2 flex items-center" onSubmit={handleOnSubmit}>
        <input
          type="text"
          name="answer"
          id="answer"
          placeholder="答えを入力してください"
          className="block w-full rounded-md border-0 py-4 px-4 text-gray-300 bg-gray-950 ring-1 ring-inset ring-gray-800 placeholder:text-gray-700 focus:ring-2 focus:ring-inset focus:ring-gray-600 leading-none text-2xl text-center"
          onChange={handleOnChange}
          readOnly={state !== 'new'}
          tabIndex={0}
          autoFocus
          value={answer}
        />

        <div className="absolute inset-y-0 right-0 flex py-1.5 pr-1.5">
          <button type="submit" className="inline-flex items-center rounded border border-gray-900 px-3 font-sans text-sm text-gray-400">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
            </svg>
          </button>
        </div>
      </form>
    </div>
  )
}