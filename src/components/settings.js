import { Fragment } from 'react'
import Checkbox from '@/components/checkbox'
import { Dialog, Transition } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'

export default function Settings({ isOpen, setIsOpen }) {
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
                          <div classNAme="space-y-1">
                            <Dialog.Title className="text-base font-semibold leading-6 text-gray-100">
                              Settings
                            </Dialog.Title>

                            <p className="text-sm text-gray-600">
                              Configure which conjugation sets you'd like to drill.
                            </p>

                            <p className="text-sm text-gray-600">
                              どの活用セットを練習したいか設定してください。
                            </p>

                            <p className="text-sm text-red-500">
                              Not currently connected.
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
                            
                            <Checkbox id="negative-form" label="Negative">
                              Expresses negation or denial.
                            </Checkbox>

                            <Checkbox id="past-form" label="Past">
                              Indicates past actions or states.
                            </Checkbox>

                            <Checkbox id="te-form" label="て-form">
                              A versatile form used for connecting actions, making requests, or expressing permission.
                            </Checkbox>

                            <Checkbox id="progressive" label="Progressive">
                              Describes ongoing actions or states.
                            </Checkbox>

                            <Checkbox id="desire" label="Desire">
                              Expresses desire or intention.
                            </Checkbox>

                            <Checkbox id="volitional" label="Volitional">
                              Indicates a speaker's intention, suggestion, or invitation to do an action.
                            </Checkbox>

                            <Checkbox id="potential" label="Potential">
                              Describes the ability or possibility to perform an action.
                            </Checkbox>

                            <Checkbox id="imperative" label="Imperative">
                              Conveys a command or strong request.
                            </Checkbox>

                            <Checkbox id="passive" label="Passive">
                              Indicates that the subject is being acted upon.
                            </Checkbox>

                            <Checkbox id="causative" label="Causative">
                              Expresses that someone causes or makes another person do something.
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
                            <Checkbox id="ichidan" label="Ichidan">
                              Also known as る or Group I verbs.
                            </Checkbox>

                            <Checkbox id="godan" label="Godan">
                              Also known as う or Group II verbs.
                            </Checkbox>
                          </div>
                        </div>

                        <div className="space-y-2 px-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:space-y-0 sm:px-6 sm:py-5">
                          <div>
                            <label
                              htmlFor="other"
                              className="block text-sm font-medium leading-6 sm:mt-1.5"
                            >
                              Other
                            </label>
                          </div>

                          <div className="sm:col-span-2">
                            ...
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Footer */}
                    <div className="flex-shrink-0 border-t border-gray-800 px-4 py-4 sm:px-6">
                      <div className="flex justify-end space-x-3">
                        <button
                          type="button"
                          className="rounded-md px-3 py-2 text-sm font-semibold bg-gray-700 text-gray-300 hover:text-gray-50 focus:outline-none focus:ring-violet-500 focus:ring-offset-2"
                          onClick={() => setIsOpen(false)}
                        >
                          Cancel
                        </button>

                        <button
                          type="button"
                          className="rounded-md px-3 py-2 text-sm font-semibold bg-violet-700 text-violet-200 hover:text-violet-50 focus:outline-none focus:ring-violet-500 focus:ring-offset-2"
                          onClick={() => setIsOpen(false)}
                        >
                          Save
                        </button>
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