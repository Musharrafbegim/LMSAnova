import { Video, Course_Progress } from "@/database/models";

export default async function handler(req, res) {
	const { id, userId, courseId } = req.query;
	// console.log("###", req.query);
	try {
		const video = await Video.findOne({ where: { id: id } });
		if (video) {
			const progress = await Course_Progress.findOne({
				where: { userId: userId, courseId: courseId, videoId: id },
			});
			if (!progress) {
				await Course_Progress.create({
					finished: true,
					userId,
					courseId,
					videoId: id,
				});
			}
		}

		res.status(200).json({
			video,
		});
	} catch (e) {
		res.status(400).json({
			error_code: "get_videos",
			message: e.message,
		});
	}
}
