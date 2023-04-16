import { useContext } from 'react'
import { SettingsContext } from '@/contexts/settingsContext'

export default function useSettingsContext() {
  const context = useContext(SettingsContext)

  if (context === undefined) {
    throw new Error('useSettingsContext must be used within a SettingsContextProvider')
  }

  return context
}