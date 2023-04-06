import { Model, DataTypes } from "sequelize";
import connection from "../connection";

const initPartner = (sequelize, Types) => {
	class Partner extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
		}
	}
	Partner.init(
		{
			id: {
				type: Types.UUID,
				defaultValue: Types.UUIDV4,
				primaryKey: true,
			},
			name: DataTypes.STRING,
			partner_image: DataTypes.STRING,
		},
		{
			sequelize,
			modelName: "Partner",
			tableName: "partners",
			createdAt: "created_at",
			updatedAt: "updated_at",
		}
	);
	return Partner;
};
export default initPartner(connection, DataTypes);
