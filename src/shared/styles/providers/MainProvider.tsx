'use client'

import { type PropsWithChildren, useEffect, useState } from 'react'
import { TanstackQueryProvider, ThemeProvider } from './index'

export function MainProvider({ children }: PropsWithChildren) {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) {
    // Можно вернуть <div className="invisible" /> или <></>
    return null
  }

  return (
    <TanstackQueryProvider>
      <ThemeProvider
        attribute="class"
        defaultTheme="light"
        storageKey="teacoder-theme"
        disableTransitionOnChange
        enableSystem={false}
      >
        {children}
      </ThemeProvider>
    </TanstackQueryProvider>
  )
}
