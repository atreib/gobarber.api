import {
	Entity,
	Column,
	PrimaryGeneratedColumn,
	CreateDateColumn,
	UpdateDateColumn,
	ManyToOne,
	JoinColumn,
} from 'typeorm';
import User from './user';

export interface ICreateAppointmentDto {
	provider_id: string;
	date: Date;
}

export interface IAppointment {
	id: string;
	provider_id: string;
	date: Date;
	created_at: Date;
	updated_at: Date;
}

@Entity('appointments')
class Appointment implements IAppointment {
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@Column()
	provider_id: string;

	@ManyToOne(() => User)
	@JoinColumn({ name: 'provider_id' })
	provider: User;

	@Column('timestamp with time zone')
	date: Date;

	@CreateDateColumn()
	created_at: Date;

	@UpdateDateColumn()
	updated_at: Date;
}

export default Appointment;
