module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable("coupons", {
			id: {
				type: Sequelize.UUID,
				defaultValue: Sequelize.UUIDV4,
				primaryKey: true,
			},
			code: {
				type: Sequelize.STRING,
			},
			discount: {
				type: Sequelize.FLOAT,
			},
			exp_date: {
				type: Sequelize.DATE,
			},
			status: {
				type: Sequelize.BOOLEAN,
				defaultValue: true,
			},
			deleted_at: {
				type: Sequelize.DATE,
			},
			active_for_full_site: {
				type: Sequelize.BOOLEAN,
				defaultValue: false,
			},
			created_at: {
				allowNull: false,
				type: Sequelize.DATE,
				defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
			},
			updated_at: {
				allowNull: false,
				type: Sequelize.DATE,
				defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
			},
		});
	},
	async down(queryInterface, Sequelize) {
		await queryInterface.dropTable("coupons");
	},
};
