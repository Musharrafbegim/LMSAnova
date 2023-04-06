import Course_Asset from "database/models/course_asset";

export default async function handler(req, res) {
	const { id: courseId } = req.query;
	try {
		const assets = await Course_Asset.findAll({
			order: [["created_at", "DESC"]],
			where: { courseId: courseId },
		});

		res.status(200).json({ assets });
	} catch (e) {
		res.status(400).json({
			error_code: "get_course_assets",
			message: e.message,
		});
	}
}
