import { Model, DataTypes } from "sequelize";
import connection from "../connection";

const initTestimonial = (sequelize, Types) => {
	class Testimonial extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
		}
	}
	Testimonial.init(
		{
			id: {
				type: Types.UUID,
				defaultValue: Types.UUIDV4,
				primaryKey: true,
			},
			image_url: DataTypes.STRING,
			name: DataTypes.STRING,
			designation: DataTypes.STRING,
			description: DataTypes.TEXT,
		},
		{
			sequelize,
			modelName: "Testimonial",
			tableName: "testimonials",
			createdAt: "created_at",
			updatedAt: "updated_at",
		}
	);
	return Testimonial;
};

export default initTestimonial(connection, DataTypes);
