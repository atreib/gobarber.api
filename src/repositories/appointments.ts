// import { isEqual } from 'date-fns';
import { EntityRepository, Repository } from 'typeorm';
import Appointment, { IAppointment } from '../models/appointment';

@EntityRepository(Appointment)
class AppointmentsRepository extends Repository<Appointment> {
	public async findAppointmentByDate(
		date: Date,
	): Promise<IAppointment | null> {
		// return this.appointments.filter(r => isEqual(r.date, date));
		const findAppointment = await this.findOne({
			where: { date },
		});
		return findAppointment || null;
	}
}

export default AppointmentsRepository;
