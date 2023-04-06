"use strict";
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable("enrolments", {
			id: {
				type: Sequelize.UUID,
				defaultValue: Sequelize.UUIDV4,
				primaryKey: true,
			},
			bought_price: {
				type: Sequelize.FLOAT,
			},
			payment_method: {
				type: Sequelize.STRING,
			},
			buyer_name: {
				type: Sequelize.STRING,
			},
			buyer_email: {
				type: Sequelize.STRING,
			},
			buyer_avatar: {
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
			status: {
				type: Sequelize.ENUM,
				values: ["paid", "unpaid"],
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
		await queryInterface.dropTable("enrolments");
	},
};
