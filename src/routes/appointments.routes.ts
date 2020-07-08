import { Router, Request, Response } from 'express';
import { parseISO } from 'date-fns';
import AppointmentRepository from '../repositories/appointments';
import CreateAppointmentService from '../services/CreateAppointment';

const appointmentsRouter = Router();
const appointmentsRepository = new AppointmentRepository();

appointmentsRouter.get('/', (req: Request, res: Response) => {
	const appointments = appointmentsRepository.get();
	return res.json(appointments);
});

appointmentsRouter.post('/', (req: Request, res: Response) => {
	try {
		const { provider, date } = req.body;
		const parsedDate = parseISO(date);

		const createAppointmentService = new CreateAppointmentService(
			appointmentsRepository,
		);

		const appointment = createAppointmentService.execute({
			provider,
			date: parsedDate,
		});

		return res.json(appointment);
	} catch (err) {
		return res.status(400).json({
			message: err.message,
		});
	}
});

export default appointmentsRouter;
