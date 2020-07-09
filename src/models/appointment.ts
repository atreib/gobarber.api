import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

export interface ICreateAppointmentDto {
	provider: string;
	date: Date;
}

export interface IAppointment {
	id: string;
	provider: string;
	date: Date;
}

@Entity('appointments')
class Appointment implements IAppointment {
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@Column()
	provider: string;

	@Column('timestamp with time zone')
	date: Date;
}

export default Appointment;
