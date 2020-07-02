import { Router, Request, Response } from 'express';
import { uuid } from 'uuidv4';
import { startOfHour, parseISO, isEqual } from 'date-fns';

const appointmentsRouter = Router();

interface AppointmentModel {
	id: string;
	provider: string;
	date: Date;
}

const appointments: AppointmentModel[] = [];

appointmentsRouter.get('/', (req: Request, res: Response) => {
	return res.json(appointments);
});

const findAppointmentByDate = (date: Date): AppointmentModel[] => {
	return appointments.filter(r => isEqual(r.date, date));
};

appointmentsRouter.post('/', (req: Request, res: Response) => {
	const { provider, date } = req.body;
	const parsedDate = startOfHour(parseISO(date));

	const result = findAppointmentByDate(parsedDate);

	if (result && result.length > 0)
		return res.status(400).json({
			message:
				'Horário não disponível sabe como fica eu nao sei o que eu to fazendo',
		});

	const newAppointment: AppointmentModel = {
		id: uuid(),
		provider,
		date: parsedDate,
	};
	appointments.push(newAppointment);
	return res.json(newAppointment);
});

export default appointmentsRouter;
