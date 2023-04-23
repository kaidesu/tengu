import { Fragment, useEffect, useState } from 'react'
import Checkbox from '@/components/checkbox'
import { Dialog, Transition } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import useSettingsContext from '@/hooks/useSettingsContext'
import words from '@/data/words.json'

export default function Settings({ isOpen, setIsOpen }) {
  const { state, dispatch } = useSettingsContext()
  const [combinations, setCombinations] = useState(0)

  const toggleForm = (name) => {
    dispatch({ type: 'TOGGLE_FORM', payload: name })
  }

  const toggleGroup = (name) => {
    dispatch({ type: 'TOGGLE_GROUP', payload: name })
  }

  useEffect(() => {
    const selectedForms = Object.keys(state.forms).filter((form) => {
      return state.forms[form]
    })

    const selectedGroups = Object.keys(state.groups).filter((group) => {
      return state.groups[group]
    })

    const filteredWords = words.filter((word) => {
      return selectedGroups.includes(word.group)
    })

    setCombinations(filteredWords.length * (selectedForms.length || 1))
  }, [state.groups, state.forms])

  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={setIsOpen}>
        <Transition.Child
          as={Fragment}
          enter="transition-opacity ease-linear duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition-opacity ease-linear duration-300"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-900/80" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10 sm:pl-16">
              <Transition.Child
                as={Fragment}
                enter="transform transition ease-in-out duration-500 sm:duration-700"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transform transition ease-in-out duration-500 sm:duration-700"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <Dialog.Panel className="pointer-events-auto w-screen max-w-2xl">
                  <div className="flex h-full flex-col overflow-y-scroll bg-gray-950 shadow-xl">
                    <div className="flex-1">
                      
                      {/* Header */}
                      <div className="border-b border-gray-800 px-4 py-6 sm:px-6">
                        <div className="flex items-start justify-between space-x-3">
                          <div className="space-y-1">
                            <Dialog.Title className="text-base font-semibold leading-6 text-gray-100">
                              Settings
                            </Dialog.Title>

                            <p className="text-sm text-gray-600">
                              Configure which conjugation sets you'd like to drill.
                            </p>

                            <p className="text-sm text-gray-600">
                              どの活用セットを練習したいか設定してください。
                            </p>
                          </div>

                          <div className="flex h-7 items-center">
                            <button
                              type="button"
                              className="rounded-md bg-gray-700 text-gray-300 hover:text-gray-50 focus:outline-none focus:ring-violet-500 focus:ring-offset-2"
                              onClick={() => setIsOpen(false)}
                            >
                              <span className="sr-only">Close settings</span>
                              <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                            </button>
                          </div>
                        </div>
                      </div>

                      {/* Content */}
                      <div className="space-y-6 py-6 sm:space-y-0 sm:divide-y sm:divide-gray-800 sm:py-0 text-gray-100">
                        <div className="space-y-2 px-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:space-y-0 sm:px-6 sm:py-5">
                          <div>
                            <label
                              htmlFor="forms"
                              className="block text-sm font-medium leading-6 sm:mt-1.5"
                            >
                              Forms
                            </label>
                          </div>

                          <div className="sm:col-span-2">
                            
                            <Checkbox id="negative-form" label="Negative" checked={state.forms.negative} handleOnChange={() => toggleForm('negative')}>
                              Expresses negation or denial.
                            </Checkbox>

                            <Checkbox id="past-form" label="Past" checked={state.forms.past} handleOnChange={() => toggleForm('past')}>
                              Indicates past actions or states.
                            </Checkbox>

                            <Checkbox id="te-form" label="て-form" checked={state.forms.te} handleOnChange={() => toggleForm('te')}>
                              A versatile form used for connecting actions, making requests, or expressing permission.
                            </Checkbox>

                            <Checkbox id="progressive" label="Progressive" checked={state.forms.progressive} handleOnChange={() => toggleForm('progressive')}>
                              Describes ongoing actions or states.
                            </Checkbox>

                            <Checkbox id="desire" label="Desire" checked={state.forms.desire} handleOnChange={() => toggleForm('desire')}>
                              Expresses desire or intention.
                            </Checkbox>

                            <Checkbox id="volitional" label="Volitional" checked={state.forms.volitional} handleOnChange={() => toggleForm('volitional')}>
                              Indicates a speaker's intention, suggestion, or invitation to do an action.
                            </Checkbox>

                            <Checkbox id="potential" label="Potential" checked={state.forms.potential} handleOnChange={() => toggleForm('potential')}>
                              Describes the ability or possibility to perform an action.
                            </Checkbox>

                            <Checkbox id="imperative" label="Imperative" checked={state.forms.imperative} handleOnChange={() => toggleForm('imperative')}>
                              Conveys a command or strong request.
                            </Checkbox>

                            <Checkbox id="passive" label="Passive" checked={state.forms.passive} handleOnChange={() => toggleForm('passive')}>
                              Indicates that the subject is being acted upon.
                            </Checkbox>

                            <Checkbox id="causative" label="Causative" checked={state.forms.causative} handleOnChange={() => toggleForm('causative')}>
                              Expresses that someone causes or makes another person do something.
                            </Checkbox>

                            <Checkbox id="causative-passive" label="Causative Passive" checked={state.forms.causativePassive} handleOnChange={() => toggleForm('causativePassive')}>
                              Expresses that someone is caused or made to do something by another person, while the subject passively experiences the action.
                            </Checkbox>
                          </div>
                        </div>

                        <div className="space-y-2 px-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:space-y-0 sm:px-6 sm:py-5">
                          <div>
                            <label
                              htmlFor="groups"
                              className="block text-sm font-medium leading-6 sm:mt-1.5"
                            >
                              Groups
                            </label>
                          </div>

                          <div className="sm:col-span-2">
                            <Checkbox id="ichidan" label="Group II Verbs (一段動詞)" checked={state.groups.ichidan} handleOnChange={() => toggleGroup('ichidan')}>
                              Also known as る or ichidan verbs.
                            </Checkbox>

                            {/* <Checkbox id="godan" label="Godan" checked={state.groups.godan} handleOnChange={() => toggleGroup('godan')}>
                              Also known as う or Group II verbs.
                            </Checkbox> */}

                            <div className="mt-3 p-3 bg-gray-900 bg-opacity-80 rounded-md shadow text-sm text-center text-gray-300 font-bold">
                              <span className="text-violet-400">{combinations}</span> combinations
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  )
}