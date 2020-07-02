import { Router, Request, Response } from 'express';
import { uuid } from 'uuidv4';

const appointmentsRouter = Router();

const appointments: object[] = [];

appointmentsRouter.get('/', (req, res) => {
	return res.json(appointments);
});

appointmentsRouter.post('/', (req, res) => {
	const { provider, date } = req.body;
	const newAppointment = {
		id: uuid(),
		provider,
		date,
	};
	appointments.push(newAppointment);
	return res.json(newAppointment);
});

export default appointmentsRouter;
