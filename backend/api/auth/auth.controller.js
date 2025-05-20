import { authService } from './auth.service.js'
import { logger } from '../../services/logger.service.js'

export async function login(req, res) {
	const { username, password } = req.body
	logger.info('Login attempt for username:', username)
	
	try {
		logger.info('Attempting to authenticate user...')
		const user = await authService.login(username, password)
		logger.info('User authenticated successfully')
		
		const loginToken = authService.getLoginToken(user)
		logger.info('Login token generated')
        
		res.cookie('loginToken', loginToken, { sameSite: 'None', secure: true })
		logger.info('Cookie set, sending response')
		res.json(user)
	} catch (err) {
		logger.error('Failed to Login:', err)
		logger.error('Error details:', err.message)
		res.status(401).send({ err: 'Failed to Login' })
	}
}

export async function signup(req, res) {
	try {
		const credentials = req.body
		logger.info('Signup attempt with credentials:', { ...credentials, password: '[REDACTED]' })
		
		// Validate required fields
		if (!credentials.username || !credentials.password || !credentials.fullname) {
			logger.error('Missing required fields:', { 
				hasUsername: !!credentials.username,
				hasPassword: !!credentials.password,
				hasFullname: !!credentials.fullname
			})
			return res.status(400).send({ err: 'Missing required signup information' })
		}
		
		logger.info('Creating new account...')
		const account = await authService.signup(credentials)
		logger.info('Account created successfully:', { username: account.username, fullname: account.fullname })
		
		logger.info('Logging in new user...')
		const user = await authService.login(credentials.username, credentials.password)
		
		const loginToken = authService.getLoginToken(user)
		logger.info('Login token generated')
		
		res.cookie('loginToken', loginToken, { sameSite: 'None', secure: true })
		logger.info('Cookie set, sending response')
		res.json(user)
	} catch (err) {
		logger.error('Failed to signup:', err)
		logger.error('Error details:', err.message)
		res.status(400).send({ err: err.message || 'Failed to signup' })
	}
}

export async function logout(req, res) {
	try {
		res.clearCookie('loginToken')
		res.send({ msg: 'Logged out successfully' })
	} catch (err) {
		res.status(400).send({ err: 'Failed to logout' })
	}
}