/* eslint-disable class-methods-use-this */
import { startOfHour } from 'date-fns';
import { getCustomRepository } from 'typeorm';
import Appointment from '../models/appointment';
import AppointmentsRepository from '../repositories/appointments';

interface Request {
	provider_id: string;
	date: Date;
}

export default class CreateAppointmentService {
	public async execute({ date, provider_id }: Request): Promise<Appointment> {
		const appointmentsRepository = getCustomRepository(
			AppointmentsRepository,
		);

		const appointmentDate = startOfHour(date);

		const result = await appointmentsRepository.findAppointmentByDate(
			appointmentDate,
		);
		if (result) throw Error('Horário não disponível');

		const newAppointment = appointmentsRepository.create({
			provider_id,
			date: appointmentDate,
		});
		await appointmentsRepository.save(newAppointment);

		return newAppointment;
	}
}
