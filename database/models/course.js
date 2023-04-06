import { Model, DataTypes } from "sequelize";
import connection from "../connection";

const initCourse = (sequelize, Types) => {
	class Course extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
		}
	}
	Course.init(
		{
			id: {
				type: Types.UUID,
				defaultValue: Types.UUIDV4,
				primaryKey: true,
			},
			title: DataTypes.STRING,
			slug: DataTypes.STRING,
			short_desc: DataTypes.TEXT,
			overview: DataTypes.TEXT,
			latest_price: DataTypes.FLOAT,
			before_price: DataTypes.FLOAT,
			lessons: DataTypes.STRING,
			duration: DataTypes.STRING,
			image: DataTypes.STRING,
			access_time: {
				type: DataTypes.ENUM,
				values: ["Lifetime", "Three Months", "Six Months", "1 Year"],
				defaultValue: "Lifetime",
			},
			requirements: DataTypes.TEXT,
			what_you_will_learn: DataTypes.TEXT,
			who_is_this_course_for: DataTypes.TEXT,
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
			catId: {
				type: DataTypes.UUID,
				allowNull: false,
				onDelete: "CASCADE",
				references: {
					model: "categories",
					key: "id",
					as: "catId",
				},
			},
			approved: DataTypes.BOOLEAN,
			in_home_page: DataTypes.BOOLEAN,
			in_home_page_set_at: DataTypes.DATE,
			is_class: DataTypes.BOOLEAN,
		},
		{
			sequelize,
			modelName: "Course",
			tableName: "courses",
			createdAt: "created_at",
			updatedAt: "updated_at",
		}
	);
	return Course;
};
export default initCourse(connection, DataTypes);
