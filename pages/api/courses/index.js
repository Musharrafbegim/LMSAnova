import jwt from "jsonwebtoken";
import { Course, User, Enrolment } from "database/models";

export default async function handler(req, res) {
	if (!("authorization" in req.headers)) {
		return res.status(401).json({ message: "No autorization token" });
	}
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
		const { userId } = jwt.verify(
			req.headers.authorization,
			process.env.JWT_SECRET
		);

		const courses = await Course.findAll({
			order: [["created_at", "DESC"]],
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
			where: { userId: userId },
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
