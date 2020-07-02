import { Router, Request, Response } from 'express';
import { startOfHour, parseISO } from 'date-fns';
import AppointmentRepository from '../repositories/appointments';

const appointmentsRouter = Router();
const appointmentsRepository = new AppointmentRepository();

appointmentsRouter.get('/', (req: Request, res: Response) => {
	const appointments = appointmentsRepository.get();
	return res.json(appointments);
});

appointmentsRouter.post('/', (req: Request, res: Response) => {
	const { provider, date } = req.body;
	const parsedDate = startOfHour(parseISO(date));

	const result = appointmentsRepository.findAppointmentByDate(parsedDate);
	if (result && result.length > 0)
		return res.status(400).json({
			message: 'Horário não disponível',
		});

	const newAppointment = appointmentsRepository.create(provider, parsedDate);
	return res.json(newAppointment);
});

export default appointmentsRouter;
