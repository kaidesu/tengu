import Link from 'next/link'
import { useState } from 'react'
import Header from '@/components/header'
import Settings from '@/components/settings'

export default function Layout({ children }) {
  const [isOpen, setIsOpen] = useState(false)
  

  return (
    <div className="bg-gradient-to-b from-gray-900 to-gray-950 text-white flex flex-1 flex-col h-full">
      <Header setIsOpen={setIsOpen} />

      <Settings isOpen={isOpen} setIsOpen={setIsOpen} />

      <div className="flex flex-col flex-1 items-center justify-center p-6">
        {children}
      </div>
      
      <div className="p-6 text-center text-sm">
        <Link href="https://github.com/kaidesu" className="text-gray-400 hover:text-purple-400 underline underline-offset-4">
          カイが開発しました
        </Link>
        ・
        <Link href="https://github.com/kaidesu/tengu" className="text-gray-400 hover:text-purple-400 underline underline-offset-4">
          GitHub
        </Link>
      </div>
    </div>
  )
}