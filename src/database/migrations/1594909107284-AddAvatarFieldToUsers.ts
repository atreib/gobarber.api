/* eslint-disable class-methods-use-this */

import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

// eslint-disable-next-line prettier/prettier
export default class AddAvatarFieldToUsers1594909107284 implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.addColumn(
			'users',
			new TableColumn({
				name: 'avatar',
				type: 'varchar',
				isNullable: true,
			}),
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.dropColumn('users', 'avatar');
	}
}
