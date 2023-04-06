import Sequelize from "sequelize";
import { Course, User, Enrolment } from "database/models";

export default async function handler(req, res) {
	switch (req.method) {
		case "GET":
			await handleGetRequest(req, res);
			break;
		default:
			res.status(405).json({
				message: `Method ${req.method} not allowed`,
			});
	}
}

const handleGetRequest = async (req, res) => {
	try {
		const courses = await Course.findAll({
			order: Sequelize.literal("rand()"),
			limit: 2,
			include: [
				{
					model: User,
					as: "user",
					attributes: ["first_name", "last_name", "profile_photo"],
				},
				{
					model: Enrolment,
					as: "enrolments",
					attributes: ["id"],
				},
			],
			where: { in_home_page: true, approved: true },
		});

		res.status(200).json({
			courses,
		});
	} catch (e) {
		res.status(400).json({
			error_code: "get_my_courses",
			message: e.message,
		});
	}
};
