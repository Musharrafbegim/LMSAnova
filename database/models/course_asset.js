import { Model, DataTypes } from "sequelize";
import connection from "../connection";

const initCourse_Asset = (sequelize, Types) => {
	class Course_Asset extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
		}
	}
	Course_Asset.init(
		{
			id: {
				type: Types.UUID,
				defaultValue: Types.UUIDV4,
				primaryKey: true,
			},
			lecture_name: DataTypes.STRING,
			lecture_file: DataTypes.STRING,
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
		},
		{
			sequelize,
			modelName: "Course_Asset",
			tableName: "course_assets",
			createdAt: "created_at",
			updatedAt: "updated_at",
		}
	);
	return Course_Asset;
};
export default initCourse_Asset(connection, DataTypes);
