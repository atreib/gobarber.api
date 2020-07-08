import { uuid } from 'uuidv4';

export interface ICreateAppointmentDto {
	provider: string;
	date: Date;
}

export interface IAppointment {
	id: string;
	provider: string;
	date: Date;
}

class Appointment implements IAppointment {
	id: string;

	provider: string;

	date: Date;

	constructor({ provider, date }: Omit<IAppointment, 'id'>) {
		this.id = uuid();
		this.provider = provider;
		this.date = date;
	}
}

export default Appointment;
