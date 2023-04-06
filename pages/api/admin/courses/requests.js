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
				approved: false,
			},
		});

		res.status(200).json({ courses });
	} catch (e) {
		res.status(400).json({
			error_code: "get_courses_for_approve",
			message: e.message,
		});
	}
};

const handlePut = async (req, res) => {
	try {
		const { courseId, approved } = req.body;
		// console.log(courseId);

		if (approved) {
			await Course.update(
				{
					approved: true,
				},
				{ where: { id: courseId } }
			);
			res.status(200).json({ message: "Published course" });
		} else {
			const course = await Course.findOne({ where: { id: courseId } });
			course.destroy();
			res.status(200).json({ message: "Course Deleted" });
		}
	} catch (e) {
		res.status(400).json({
			error_code: "approve_courses",
			message: e.message,
		});
	}
};
