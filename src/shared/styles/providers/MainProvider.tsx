'use client'

import { type PropsWithChildren, useEffect, useState } from 'react'
import { TanstackQueryProvider, ThemeProvider, ToastProvider } from './index'

export function MainProvider({ children }: PropsWithChildren) {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) {

    return null
  }

  return (
    <TanstackQueryProvider>
      <ThemeProvider
        attribute="class"
        defaultTheme="light"
        storageKey="color-theme"
        disableTransitionOnChange
        enableSystem={false}
      >
        <ToastProvider/>
        {children}
      </ThemeProvider>
    </TanstackQueryProvider>
  )
}
