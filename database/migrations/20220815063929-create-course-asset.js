"use strict";
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable("course_assets", {
			id: {
				type: Sequelize.UUID,
				defaultValue: Sequelize.UUIDV4,
				primaryKey: true,
			},
			lecture_name: {
				type: Sequelize.STRING,
			},
			lecture_file: {
				type: Sequelize.STRING,
			},
			courseId: {
				type: Sequelize.UUID,
				allowNull: false,
				onDelete: "CASCADE",
				references: {
					model: "courses",
					key: "id",
					as: "courseId",
				},
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
		await queryInterface.dropTable("course_assets");
	},
};
