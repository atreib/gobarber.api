import {
	Entity,
	Column,
	PrimaryGeneratedColumn,
	CreateDateColumn,
	UpdateDateColumn,
} from 'typeorm';

export interface ICreateUserTDO {
	provider: string;
	date: Date;
}

export interface IUser {
	id: string;
	name: string;
	email: string;
	password: string;
	created_at: Date;
	updated_at: Date;
}

@Entity('users')
class User implements IUser {
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@Column()
	name: string;

	@Column()
	email: string;

	@Column()
	password: string;

	@CreateDateColumn()
	created_at: Date;

	@UpdateDateColumn()
	updated_at: Date;

	@Column()
	avatar: string;
}

export default User;
