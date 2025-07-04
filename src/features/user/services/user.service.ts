import { IUser } from '@/features/auth/types'
import { api } from '@/shared/styles/api'
import { TypeSettingsSchema } from '../schemas'



class UserService {
	public async findProfile() {
		const response = await api.get<IUser>('users/profile')

		return response
	}

	public async updateProfile(body: TypeSettingsSchema) {
		const response = await api.patch<IUser>('users/profile', body)

		return response
	}
}

export const userService = new UserService()
