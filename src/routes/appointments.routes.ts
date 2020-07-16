import { getCustomRepository } from 'typeorm';
import { Router, Request, Response } from 'express';
import { parseISO } from 'date-fns';
import AppointmentsRepository from '../repositories/appointments';
import CreateAppointmentService from '../services/CreateAppointment';
import MiddlewareEnsureAuthenticated from '../middleware/ensureAuthenticated';

const appointmentsRouter = Router();

appointmentsRouter.use(MiddlewareEnsureAuthenticated);

appointmentsRouter.get('/', async (req: Request, res: Response) => {
	const appointmentsRepository = getCustomRepository(AppointmentsRepository);
	const appointments = await appointmentsRepository.find();
	return res.json(appointments);
});

appointmentsRouter.post('/', async (req: Request, res: Response) => {
	const { provider_id, date } = req.body;
	const parsedDate = parseISO(date);

	const createAppointmentService = new CreateAppointmentService();

	const appointment = await createAppointmentService.execute({
		provider_id,
		date: parsedDate,
	});

	return res.json(appointment);
});

export default appointmentsRouter;
