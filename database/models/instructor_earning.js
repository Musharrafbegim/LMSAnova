import { Model, DataTypes } from "sequelize";
import connection from "../connection";

const initInstructor_Earning = (sequelize, Types) => {
	class Instructor_Earning extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
		}
	}
	Instructor_Earning.init(
		{
			id: {
				type: Types.UUID,
				defaultValue: Types.UUIDV4,
				primaryKey: true,
			},
			earnings: DataTypes.FLOAT,
			userId: {
				type: DataTypes.UUID,
				allowNull: false,
				onDelete: "CASCADE",
				references: {
					model: "users",
					key: "id",
					as: "userId",
				},
			},
			courseId: {
				type: DataTypes.UUID,
				allowNull: false,
				onDelete: "CASCADE",
				references: {
					model: "courses",
					key: "id",
					as: "courseId",
				},
			},
			status: {
				type: DataTypes.ENUM,
				values: ["due", "paid", "cancelled"],
				defaultValue: "due",
			},
		},
		{
			sequelize,
			modelName: "Instructor_Earning",
			tableName: "instructor_earnings",
			createdAt: "created_at",
			updatedAt: "updated_at",
		}
	);
	return Instructor_Earning;
};

export default initInstructor_Earning(connection, DataTypes);
