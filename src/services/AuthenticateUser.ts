/* eslint-disable class-methods-use-this */
import { getRepository } from 'typeorm';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import User from '../models/user';
import AuthConfig from '../config/auth';

interface Request {
	email: string;
	password: string;
}

interface Response {
	user: User;
	token: string;
}

export default class AuthenticateUserService {
	public async execute({ email, password }: Request): Promise<Response> {
		const usersRepository = getRepository(User);

		const user = await usersRepository.findOne({
			where: { email },
		});
		if (!user) throw new Error('Incorrect email/password combination.');

		const isPasswordCorrect = await compare(password, user.password);
		if (!isPasswordCorrect)
			throw new Error('Incorrect email/password combination.');

		const token = sign(
			{
				payload: 'dados',
			},
			AuthConfig.jwt.secret,
			{
				subject: user.id,
				expiresIn: AuthConfig.jwt.expiresIn,
			},
		);

		delete user.password;
		return { user, token };
	}
}
