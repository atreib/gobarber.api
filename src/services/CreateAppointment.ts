/* eslint-disable class-methods-use-this */
import { startOfHour } from 'date-fns';
import { getCustomRepository } from 'typeorm';
import Appointment from '../models/appointment';
import AppointmentsRepository from '../repositories/appointments';
import AppError from '../errors/AppError';

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
		if (result) throw new AppError('Horário não disponível', 400);

		const newAppointment = appointmentsRepository.create({
			provider_id,
			date: appointmentDate,
		});
		await appointmentsRepository.save(newAppointment);

		return newAppointment;
	}
}
