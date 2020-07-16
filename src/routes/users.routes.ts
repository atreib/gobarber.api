import { getRepository } from 'typeorm';
import express, { Router, Request, Response } from 'express';
import multer from 'multer';
import uploadConfig from '../config/upload';
import CreateUserService from '../services/CreateUser';
import UpdateUserAvatarService from '../services/UpdateUserAvatarService';
import User from '../models/user';
import MiddlewareEnsureAuthenticated from '../middleware/ensureAuthenticated';

const usersRouter = Router();
const upload = multer(uploadConfig);

usersRouter.use('/avatar', express.static(uploadConfig.directory));

usersRouter.get('/', async (req: Request, res: Response) => {
	const usersRepository = getRepository(User);
	const users = await usersRepository.find();
	return res.json(users);
});

usersRouter.post('/', async (req: Request, res: Response) => {
	const { name, email, password } = req.body;

	const createUserService = new CreateUserService();

	const user = await createUserService.execute({
		name,
		email,
		password,
	});

	delete user.password;

	return res.json(user);
});

usersRouter.patch(
	'/avatar',
	MiddlewareEnsureAuthenticated,
	upload.single('avatar'),
	async (req: Request, res: Response) => {
		const { filename } = req.file; // , path, size
		const updateUserAvatarService = new UpdateUserAvatarService();
		const user = await updateUserAvatarService.execute({
			user_id: req.user.id,
			avatarFilename: filename,
		});
		delete user.password;
		return res.json(user);
	},
);

export default usersRouter;
