"use strict";
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable("course_progresses", {
			id: {
				type: Sequelize.UUID,
				defaultValue: Sequelize.UUIDV4,
				primaryKey: true,
			},
			finished: {
				type: Sequelize.BOOLEAN,
				defaultValue: true,
			},
			userId: {
				type: Sequelize.UUID,
				allowNull: false,
				onDelete: "CASCADE",
				references: {
					model: "users",
					key: "id",
					as: "userId",
				},
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
			videoId: {
				type: Sequelize.UUID,
				allowNull: false,
				onDelete: "CASCADE",
				references: {
					model: "videos",
					key: "id",
					as: "videoId",
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
		await queryInterface.dropTable("course_progresses");
	},
};
