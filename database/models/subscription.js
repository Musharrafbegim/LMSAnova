import { Model, DataTypes } from "sequelize";
import connection from "../connection";

const initSubscription = (sequelize, Types) => {
	class Subscription extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
		}
	}
	Subscription.init(
		{
			id: {
				type: Types.UUID,
				defaultValue: Types.UUIDV4,
				primaryKey: true,
			},
			email: DataTypes.STRING,
			active: DataTypes.BOOLEAN,
		},
		{
			sequelize,
			modelName: "Subscription",
			tableName: "subscriptions",
			createdAt: "created_at",
			updatedAt: "updated_at",
		}
	);
	return Subscription;
};

export default initSubscription(connection, DataTypes);
