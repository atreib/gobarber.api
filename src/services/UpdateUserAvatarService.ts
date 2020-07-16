/* eslint-disable class-methods-use-this */
import { getRepository } from 'typeorm';
import path from 'path';
import fs from 'fs';
import User from '../models/user';
import uploadConfig from '../config/upload';

interface Request {
	user_id: string;
	avatarFilename: string;
}

class UpdateUserAvatarService {
	public async execute({ user_id, avatarFilename }: Request): Promise<User> {
		const userRepository = getRepository(User);
		const user = await userRepository.findOne(user_id);
		if (!user) throw new Error('You need to be logged in.');

		if (user.avatar) {
			// delete actual user avatar
			const userAvatarFilePath = path.join(
				uploadConfig.directory,
				user.avatar,
			);

			const existsUserAvatar = await fs.promises.stat(userAvatarFilePath);
			if (existsUserAvatar) await fs.promises.unlink(userAvatarFilePath);
		}

		user.avatar = avatarFilename;
		await userRepository.save(user);
		return user;
	}
}

export default UpdateUserAvatarService;
