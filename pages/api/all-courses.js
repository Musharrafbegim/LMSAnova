import { Op } from "sequelize";
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
	const { page, limit, short, search } = req.query;
	const pageNumber = parseInt(page);
	const getRealNumber = isNaN(pageNumber) ? 0 : pageNumber;
	const coursesOffset = limit * (getRealNumber - 1);
	const LIMIT = parseInt(limit);
	try {
		let totalPages;
		totalPages = await Course.count({ where: { approved: true } });

		const courses = await Course.findAll({
			where: {
				[Op.or]: [
					{ title: { [Op.like]: `%${search}%` } },
					{ short_desc: { [Op.like]: `%${search}%` } },
				],
				approved: true,
			},
			// where: { approved: true },

			order: short ? [["latest_price", short]] : [["created_at", "DESC"]],
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
			offset: coursesOffset,
			limit: LIMIT,
		});

		const coursesCount = await Course.count({
			where: {
				[Op.or]: [
					{ title: { [Op.like]: `%${search}%` } },
					{ short_desc: { [Op.like]: `%${search}%` } },
				],
				approved: true,
			},
		});

		totalPages = Math.ceil(totalPages / limit);

		res.status(200).json({
			courses,
			totalPages,
			coursesCount,
		});
	} catch (e) {
		res.status(400).json({
			error_code: "get_all_courses",
			message: e.message,
		});
	}
};
