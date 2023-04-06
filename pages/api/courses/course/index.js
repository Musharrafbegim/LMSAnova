import { Course, User, Category, Enrolment } from "database/models";

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
	const { slug } = req.query;
	try {
		const course = await Course.findOne({
			include: [
				{
					model: User,
					as: "user",
					attributes: [
						"first_name",
						"last_name",
						"profile_photo",
						"bio",
					],
				},
				{
					model: Category,
					as: "category",
					attributes: ["name", "slug"],
				},
				{
					model: Enrolment,
					as: "enrolments",
					attributes: ["id"],
				},
			],
			where: { slug: slug },
		});

		res.status(200).json({
			course,
		});
	} catch (e) {
		res.status(400).json({
			error_code: "get_course",
			message: e.message,
		});
	}
};
