"use strict";
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable("courses", {
			id: {
				type: Sequelize.UUID,
				defaultValue: Sequelize.UUIDV4,
				primaryKey: true,
			},
			title: {
				type: Sequelize.STRING,
				allowNull: false,
			},
			slug: {
				type: Sequelize.STRING,
				allowNull: false,
				unique: true,
			},
			short_desc: {
				type: Sequelize.TEXT,
			},
			overview: {
				type: Sequelize.TEXT,
			},
			latest_price: {
				type: Sequelize.FLOAT,
			},
			before_price: {
				type: Sequelize.FLOAT,
			},
			lessons: {
				type: Sequelize.STRING,
			},
			duration: {
				type: Sequelize.STRING,
			},
			image: {
				type: Sequelize.STRING,
			},
			access_time: {
				type: Sequelize.ENUM,
				values: ["Lifetime", "Three Months", "Six Months", "1 Year"],
				defaultValue: "Lifetime",
			},
			requirements: {
				type: Sequelize.TEXT,
			},
			what_you_will_learn: {
				type: Sequelize.TEXT,
			},
			who_is_this_course_for: {
				type: Sequelize.TEXT,
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
			catId: {
				type: Sequelize.UUID,
				allowNull: false,
				onDelete: "CASCADE",
				references: {
					model: "categories",
					key: "id",
					as: "catId",
				},
			},
			approved: {
				type: Sequelize.BOOLEAN,
				defaultValue: false,
			},
			in_home_page: {
				type: Sequelize.BOOLEAN,
				defaultValue: false,
			},
			in_home_page_set_at: {
				type: Sequelize.DATE,
			},
			is_class: {
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
		await queryInterface.dropTable("courses");
	},
};
