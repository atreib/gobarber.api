import { startOfHour } from 'date-fns';
import Appointment from '../models/appointment';
import AppointmentsRepository from '../repositories/appointments';

interface Request {
	provider: string;
	date: Date;
}

export default class CreateAppointmentService {
	private appointmentsRepository: AppointmentsRepository;

	constructor(appointmentRepository: AppointmentsRepository) {
		this.appointmentsRepository = appointmentRepository;
	}

	public execute({ date, provider }: Request): Appointment {
		const appointmentDate = startOfHour(date);

		const result = this.appointmentsRepository.findAppointmentByDate(
			appointmentDate,
		);

		if (result && result.length > 0) throw Error('Horário não disponível');

		const newAppointment = this.appointmentsRepository.create({
			provider,
			date: appointmentDate,
		});

		return newAppointment;
	}
}
