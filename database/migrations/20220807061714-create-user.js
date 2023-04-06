module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable("users", {
			id: {
				type: Sequelize.UUID,
				defaultValue: Sequelize.UUIDV4,
				primaryKey: true,
			},
			first_name: {
				type: Sequelize.STRING,
				allowNull: false,
			},
			last_name: {
				type: Sequelize.STRING,
				allowNull: false,
			},
			email: {
				type: Sequelize.STRING,
				allowNull: false,
			},
			password: {
				type: Sequelize.STRING,
				allowNull: false,
			},
			gender: {
				type: Sequelize.STRING,
			},
			designation: {
				type: Sequelize.STRING,
			},
			bio: {
				type: Sequelize.TEXT,
			},
			profile_photo: {
				type: Sequelize.STRING,
			},
			location: {
				type: Sequelize.STRING,
			},
			phone: {
				type: Sequelize.STRING,
			},
			reset_password_token: {
				type: Sequelize.UUID,
			},
			reset_password_send_at: {
				type: Sequelize.DATE,
			},
			reset_password_at: {
				type: Sequelize.DATE,
			},
			website: {
				type: Sequelize.STRING,
			},
			twitter: {
				type: Sequelize.STRING,
			},
			facebook: {
				type: Sequelize.STRING,
			},
			linkedin: {
				type: Sequelize.STRING,
			},
			youtube: {
				type: Sequelize.STRING,
			},
			role: {
				type: Sequelize.ENUM,
				values: ["student", "admin", "instructor"],
				defaultValue: "student",
			},
			email_confirmed: {
				type: Sequelize.BOOLEAN,
				defaultValue: false,
			},
			email_confirmed_at: {
				type: Sequelize.DATE,
			},
			instructor_request: {
				type: Sequelize.BOOLEAN,
				defaultValue: false,
			},
			instructor_request_confirmed: {
				type: Sequelize.BOOLEAN,
				defaultValue: false,
			},
			instructor_request_confirmed_at: {
				type: Sequelize.DATE,
			},
			instructor_status: {
				type: Sequelize.BOOLEAN,
			},
			instructor_subject: {
				type: Sequelize.STRING,
			},
			instructor_description: {
				type: Sequelize.STRING,
			},
			status: {
				type: Sequelize.BOOLEAN,
				defaultValue: true,
			},
			is_profile_public: {
				type: Sequelize.BOOLEAN,
				defaultValue: true,
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
	async down(queryInterface) {
		await queryInterface.dropTable("users");
	},
};
