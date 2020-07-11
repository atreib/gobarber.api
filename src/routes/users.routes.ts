import { getRepository } from 'typeorm';
import { Router, Request, Response } from 'express';
import CreateUserService from '../services/CreateUser';
import User from '../models/user';

const usersRouter = Router();

usersRouter.get('/', async (req: Request, res: Response) => {
	const usersRepository = getRepository(User);
	const users = await usersRepository.find();
	return res.json(users);
});

usersRouter.post('/', async (req: Request, res: Response) => {
	try {
		const { name, email, password } = req.body;

		const createUserService = new CreateUserService();

		const user = await createUserService.execute({
			name,
			email,
			password,
		});

		delete user.password;

		return res.json(user);
	} catch (err) {
		return res.status(400).json({
			message: err.message,
		});
	}
});

export default usersRouter;
