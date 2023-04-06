import Sequelize from "sequelize";
import config from "./config/config.mjs";

let sequelize;
if (process.env.NODE_ENV === "production") {
	sequelize = new Sequelize(config.production);
} else {
	sequelize = new Sequelize(config.development);
}

const connection = sequelize;

export default connection;
