'use client'

import { MainProvider } from '@/shared/styles/providers'
import { ToggleTheme } from '@/shared/styles/components/ui'

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <MainProvider>
      <ToggleTheme />
      {children}
    </MainProvider>
  )
}
