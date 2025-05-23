'use client'

import { type PropsWithChildren } from 'react'

import { TanstackQueryProvider, ThemeProvider } from './index'

export function MainProvider({ children }: PropsWithChildren<unknown>) {
	return (
		<TanstackQueryProvider>
			<ThemeProvider
				attribute='class'
				defaultTheme='light'
				disableTransitionOnChange
				storageKey='teacoder-theme'
			>
				{/* <ToastProvider /> */}
				{children}
			</ThemeProvider>
		</TanstackQueryProvider>
	)
}
