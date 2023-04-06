"use strict";
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable("testimonials", {
			id: {
				type: Sequelize.UUID,
				defaultValue: Sequelize.UUIDV4,
				primaryKey: true,
			},
			image_url: {
				type: Sequelize.STRING,
			},
			name: {
				type: Sequelize.STRING,
			},
			designation: {
				type: Sequelize.STRING,
			},
			description: {
				type: Sequelize.TEXT,
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
		await queryInterface.dropTable("testimonials");
	},
};
