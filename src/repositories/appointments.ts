import { isEqual } from 'date-fns';
import Appointment from '../models/appointment';

class AppointmentsRepository {
	private appointments: Appointment[];

	constructor() {
		this.appointments = [];
	}

	public get(): Appointment[] {
		return this.appointments;
	}

	public create(provider: string, date: Date): Appointment {
		const appointment = new Appointment(provider, date);
		this.appointments.push(appointment);
		return appointment;
	}

	public findAppointmentByDate(date: Date): Appointment[] {
		return this.appointments.filter(r => isEqual(r.date, date));
	}
}

export default AppointmentsRepository;
