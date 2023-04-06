import { Model, DataTypes } from "sequelize";
import connection from "../connection";

const initEnrolment = (sequelize, Types) => {
	class Enrolment extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
		}
	}
	Enrolment.init(
		{
			id: {
				type: Types.UUID,
				defaultValue: Types.UUIDV4,
				primaryKey: true,
			},
			bought_price: DataTypes.FLOAT,
			payment_method: DataTypes.STRING,
			buyer_name: DataTypes.STRING,
			buyer_email: DataTypes.STRING,
			buyer_avatar: DataTypes.STRING,
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
				values: ["paid", "unpaid"],
			},
		},
		{
			sequelize,
			modelName: "Enrolment",
			tableName: "enrolments",
			createdAt: "created_at",
			updatedAt: "updated_at",
		}
	);
	return Enrolment;
};

export default initEnrolment(connection, DataTypes);
