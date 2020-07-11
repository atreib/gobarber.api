/* eslint-disable class-methods-use-this */
import {
	MigrationInterface,
	QueryRunner,
	TableColumn,
	TableForeignKey,
} from 'typeorm';

// eslint-disable-next-line prettier/prettier
export default class AlterAppointmentsWithRelationAndDates1594489562960 implements MigrationInterface {

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.dropColumn('appointments', 'provider');
		await queryRunner.addColumn(
			'appointments',
			new TableColumn({
				name: 'provider_id',
				type: 'uuid',
				isNullable: true,
			}),
		);
		await queryRunner.createForeignKey(
			'appointments',
			new TableForeignKey({
				name: 'AppointmentProvider',
				columnNames: ['provider_id'],
				referencedColumnNames: ['id'],
				referencedTableName: 'users',
				onDelete: 'SET NULL',
				onUpdate: 'CASCADE',
			}),
		);

		await queryRunner.addColumns('appointments', [
			new TableColumn({
				name: 'created_at',
				type: 'timestamp',
				default: 'now()',
			}),
			new TableColumn({
				name: 'updated_at',
				type: 'timestamp',
				default: 'now()',
			}),
		]);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.dropColumn('appointments', 'updated_at');
		await queryRunner.dropColumn('appointments', 'created_at');
		await queryRunner.dropForeignKey('appointments', 'AppointmentProvider');
		await queryRunner.dropColumn('appointments', 'provider_id');
		await queryRunner.addColumn(
			'appointments',
			new TableColumn({
				name: 'provider',
				type: 'varchar',
			}),
		);
	}
}
