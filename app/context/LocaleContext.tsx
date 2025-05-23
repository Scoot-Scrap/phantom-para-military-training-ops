// app/context/LocaleContext.tsx

'use client'

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode
} from 'react'
import { useRouter } from 'next/router'

interface LocaleContextProps {
  locale: string
  t: (key: string) => string
  formatDate: (date: string) => string
}

const LocaleContext = createContext<LocaleContextProps>({
  locale: 'en',
  t: (key) => key,
  formatDate: (date) => date
})

export function LocaleProvider({ children }: { children: ReactNode }) {
  const { locale } = useRouter()
  const [messages, setMessages] = useState<Record<string, string>>({})

  useEffect(() => {
    async function loadMessages() {
      const msgs = await import(`../../messages/${locale}.json`)
      setMessages(msgs.default)
    }
    loadMessages()
  }, [locale])

  const t = (key: string) => messages[key] ?? key

  const formatDate = (date: string) => {
    return new Intl.DateTimeFormat(locale, {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(new Date(date))
  }

  return (
    <LocaleContext.Provider value={{ locale, t, formatDate }}>
      {children}
    </LocaleContext.Provider>
  )
}

export const useLocale = () => useContext(LocaleContext)