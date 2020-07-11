import { Router, Request, Response } from 'express';
import AuthenticateUserService from '../services/AuthenticateUser';

const sessionsRouter = Router();

sessionsRouter.post('/', async (req: Request, res: Response) => {
	try {
		const { email, password } = req.body;
		const authenticateUserService = new AuthenticateUserService();
		const { user, token } = await authenticateUserService.execute({
			email,
			password,
		});
		return res.json({ user, token });
	} catch (err) {
		return res.status(400).json({
			message: err.message,
		});
	}
});

export default sessionsRouter;
