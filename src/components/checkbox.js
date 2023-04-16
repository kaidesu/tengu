export default function Checkbox({ label, id, checked, handleOnChange, children }) {
  return (
    <div className="relative flex items-start">
      <div className="flex h-6 items-center">
        <input
          id={id}
          aria-describedby={`${id}-description`}
          name={id}
          type="checkbox"
          className="h-4 w-4 rounded border-gray-600 bg-gray-700 text-violet-600 focus:ring-violet-600"
          checked={checked}
          onChange={handleOnChange}
        />
      </div>
      <div className="ml-3 text-sm leading-6">
        <label htmlFor={id} className="font-medium text-gray-50">
          {label}
        </label>
        <p id={`${id}-description`} className="text-gray-500">
          {children}
        </p>
      </div>
    </div>
  )
}