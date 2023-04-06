import { Model, DataTypes } from "sequelize";
import connection from "../connection";

const initCourse_Progress = (sequelize, Types) => {
	class Course_Progress extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
		}
	}
	Course_Progress.init(
		{
			id: {
				type: Types.UUID,
				defaultValue: Types.UUIDV4,
				primaryKey: true,
			},
			finished: DataTypes.BOOLEAN,
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
			videoId: {
				type: DataTypes.UUID,
				allowNull: false,
				onDelete: "CASCADE",
				references: {
					model: "videos",
					key: "id",
					as: "videoId",
				},
			},
		},
		{
			sequelize,
			modelName: "Course_Progress",
			tableName: "course_progresses",
			createdAt: "created_at",
			updatedAt: "updated_at",
		}
	);
	return Course_Progress;
};

export default initCourse_Progress(connection, DataTypes);
