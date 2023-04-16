import { Cog8ToothIcon } from '@heroicons/react/24/outline'

export default function Header({ setIsOpen }) {
  return (
    <div className="p-6 flex items-center justify-between">
      <div className="text-xl font-bold text-gray-100">Tengu</div>

      <button
        type="button"
        className="-m-2.5 p-2.5 text-gray-400"
        onClick={() => setIsOpen(true)}
      >
        <Cog8ToothIcon className="w-6 h-6 text-gray-100" />
      </button>
    </div>
  )
}