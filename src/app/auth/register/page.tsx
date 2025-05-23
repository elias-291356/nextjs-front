import { RegisterForm } from '@/features/auth/components/RegisterForm'
import type { Metadata } from 'next'



export const metadata: Metadata = {
	title: 'Создать аккаунт'
}

export default function RegisterPage() {
	return <RegisterForm />
}

