import { Category, Course, User, Enrolment } from "database/models";

export default async function handler(req, res) {
	const { slug } = req.query;
	try {
		const courses = await Category.findOne({
			where: { slug: slug },
			include: [
				{
					model: Course,
					as: "courses",
					include: [
						{
							model: User,
							as: "user",
							attributes: [
								"first_name",
								"last_name",
								"profile_photo",
							],
						},
						{
							model: Enrolment,
							as: "enrolments",
							attributes: ["id"],
						},
					],
				},
			],
		});

		res.status(200).json({ courses });
	} catch (e) {
		res.status(400).json({
			error_code: "get_category_by_id",
			message: e.message,
		});
	}
}
