import { api } from "@/shared/styles/api"

class VerificationService {
	public async newVerification(token: string | null) {
		const response = await api.post('auth/email-confirmation', { token })

		return response
	}
}

export const verificationService = new VerificationService()
