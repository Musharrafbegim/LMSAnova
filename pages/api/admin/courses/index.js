import { Course, User, Category, Video } from "database/models";

export default async function handler(req, res) {
	if (!("authorization" in req.headers)) {
		return res.status(401).json({ message: "No autorization token" });
	}
	switch (req.method) {
		case "GET":
			await handleGet(req, res);
			break;
		case "PUT":
			await handlePut(req, res);
			break;
		default:
			res.status(405).json({
				message: `Method ${req.method} not allowed`,
			});
	}
}

const handleGet = async (req, res) => {
	try {
		const courses = await Course.findAll({
			order: [["created_at", "DESC"]],
			include: [
				{
					model: User,
					as: "user",
					attributes: ["first_name", "last_name", "profile_photo"],
				},
				{
					model: Category,
					as: "category",
					attributes: ["name", "slug"],
				},
				{
					model: Video,
					as: "videos",
					attributes: ["title"],
				},
			],
			where: {
				approved: true,
			},
		});

		res.status(200).json({ courses });
	} catch (e) {
		res.status(400).json({
			error_code: "get_courses",
			message: e.message,
		});
	}
};

const handlePut = async (req, res) => {
	try {
		const { courseId, apply } = req.body;
		if (apply) {
			await Course.update(
				{
					in_home_page: true,
					in_home_page_set_at: Date.now(),
				},
				{ where: { id: courseId } }
			);
			res.status(200).json({ message: "This course set to homepage" });
		} else {
			await Course.update(
				{
					in_home_page: false,
					in_home_page_set_at: null,
				},
				{ where: { id: courseId } }
			);
			res.status(200).json({ message: "This course unset to homepage" });
		}
	} catch (e) {
		res.status(400).json({
			error_code: "course_set_to_home",
			message: e.message,
		});
	}
};
