import { Model, DataTypes } from "sequelize";
import connection from "../connection";

const initUser = (sequelize, Types) => {
	class User extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		// static associate(models) {
		// 	// define association here
		// }
	}
	User.init(
		{
			id: {
				type: Types.UUID,
				defaultValue: Types.UUIDV4,
				primaryKey: true,
			},
			first_name: Types.STRING,
			last_name: Types.STRING,
			email: Types.STRING,
			password: Types.STRING,
			gender: Types.STRING,
			designation: Types.STRING,
			bio: Types.TEXT,
			profile_photo: Types.STRING,
			location: Types.STRING,
			phone: Types.STRING,
			reset_password_token: Types.UUID,
			reset_password_send_at: Types.DATE,
			reset_password_at: Types.DATE,
			website: Types.STRING,
			twitter: Types.STRING,
			facebook: Types.STRING,
			linkedin: Types.STRING,
			youtube: Types.STRING,
			role: {
				type: Types.ENUM,
				values: ["student", "admin", "instructor"],
				defaultValue: "student",
			},
			email_confirmed: Types.BOOLEAN,
			email_confirmed_at: Types.DATE,
			instructor_request: Types.BOOLEAN,
			instructor_request_confirmed: Types.BOOLEAN,
			instructor_request_confirmed_at: Types.DATE,
			instructor_status: Types.BOOLEAN,
			instructor_subject: Types.STRING,
			instructor_description: Types.STRING,
			status: Types.BOOLEAN,
			is_profile_public: Types.BOOLEAN,
		},
		{
			sequelize,
			modelName: "User",
			tableName: "users",
			createdAt: "created_at",
			updatedAt: "updated_at",
		}
	);
	return User;
};

export default initUser(connection, DataTypes);
