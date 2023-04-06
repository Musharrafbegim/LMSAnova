import { Course_Progress } from "@/database/models";

export default async function handler(req, res) {
	const { courseId, userId } = req.query;
	try {
		const courseProgress = await Course_Progress.findAll({
			where: { userId: userId, courseId: courseId },
		});

		res.status(200).json({
			courseProgress,
		});
	} catch (e) {
		res.status(400).json({
			error_code: "progress",
			message: e.message,
		});
	}
}
