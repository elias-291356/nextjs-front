
import { api } from '@/shared/styles/api'
import {  TypeResetPasswordSchema } from '../schemes'
import { IUser } from '../types'

class PasswordRecoveryService {
	public async reset(body: TypeResetPasswordSchema, recaptcha?: string) {
		const headers = recaptcha ? { recaptcha } : undefined

		const response = await api.post<IUser>(
			'auth/password-recovery/reset',
			body,
			{
				headers
			}
		)

		return response
	}

	
}

export const passwordRecoveryService = new PasswordRecoveryService()
