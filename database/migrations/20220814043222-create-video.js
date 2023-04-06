"use strict";
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable("videos", {
			id: {
				type: Sequelize.UUID,
				defaultValue: Sequelize.UUIDV4,
				primaryKey: true,
			},
			group_name: {
				type: Sequelize.STRING,
			},
			title: {
				type: Sequelize.STRING,
			},
			thumb: {
				type: Sequelize.STRING,
			},
			video: {
				type: Sequelize.STRING,
			},
			video_length: {
				type: Sequelize.FLOAT,
			},
			is_preview: {
				type: Sequelize.BOOLEAN,
				defaultValue: false,
			},
			short_id: {
				allowNull: false,
				defaultValue: 0,
				type: Sequelize.INTEGER,
			},
			assets_zip: {
				type: Sequelize.STRING,
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
		await queryInterface.dropTable("videos");
	},
};
