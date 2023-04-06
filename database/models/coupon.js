import { Model, DataTypes } from "sequelize";
import connection from "../connection";

const initCoupon = (sequelize, Types) => {
	class Coupon extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
		}
	}
	Coupon.init(
		{
			id: {
				type: DataTypes.UUID,
				defaultValue: DataTypes.UUIDV4,
				primaryKey: true,
			},
			code: DataTypes.STRING,
			discount: DataTypes.FLOAT,
			exp_date: DataTypes.DATE,
			status: DataTypes.BOOLEAN,
			deleted_at: DataTypes.DATE,
			active_for_full_site: DataTypes.BOOLEAN,
		},
		{
			sequelize,
			modelName: "Coupon",
			tableName: "coupons",
			createdAt: "created_at",
			updatedAt: "updated_at",
		}
	);
	return Coupon;
};

export default initCoupon(connection, DataTypes);
