import { isEqual } from 'date-fns';
import Appointment, {
	ICreateAppointmentDto,
	IAppointment,
} from '../models/appointment';

class AppointmentsRepository {
	private appointments: IAppointment[];

	constructor() {
		this.appointments = [];
	}

	public get(): IAppointment[] {
		return this.appointments;
	}

	public create(data: ICreateAppointmentDto): IAppointment {
		const { provider, date } = data;
		const appointment = new Appointment({ provider, date });
		this.appointments.push(appointment);
		return appointment;
	}

	public findAppointmentByDate(date: Date): IAppointment[] {
		return this.appointments.filter(r => isEqual(r.date, date));
	}
}

export default AppointmentsRepository;
