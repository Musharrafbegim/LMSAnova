import { Model, DataTypes } from "sequelize";
import connection from "../connection";

const initFavourite = (sequelize, Types) => {
	class Favourite extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
		}
	}
	Favourite.init(
		{
			id: {
				type: Types.UUID,
				defaultValue: Types.UUIDV4,
				primaryKey: true,
			},
			userId: {
				type: Types.UUID,
				allowNull: false,
				onDelete: "CASCADE",
				references: {
					model: "users",
					key: "id",
					as: "userId",
				},
			},
			courseId: {
				type: Types.UUID,
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
			modelName: "Favourite",
			tableName: "favourites",
			createdAt: "created_at",
			updatedAt: "updated_at",
		}
	);
	return Favourite;
};

export default initFavourite(connection, DataTypes);
