import jwt from "jsonwebtoken";
import Video from "database/models/video";

export default async function handler(req, res) {
	if (!("authorization" in req.headers)) {
		return res.status(401).json({ message: "No autorization token" });
	}
	switch (req.method) {
		case "GET":
			await handleGet(req, res);
			break;
		case "POST":
			await handlePost(req, res);
			break;
		case "DELETE":
			await handleDelete(req, res);
			break;
		default:
			res.status(405).json({
				message: `Method ${req.method} not allowed`,
			});
	}
}

const handlePost = async (req, res) => {
	const {
		group_name,
		title,
		thumb,
		video,
		video_length,
		is_preview,
		short_id,
		courseId,
	} = req.body;
	try {
		const { userId } = jwt.verify(
			req.headers.authorization,
			process.env.JWT_SECRET
		);

		await Video.create({
			group_name,
			title,
			thumb,
			video,
			video_length,
			is_preview,
			short_id,
			courseId,
			userId,
		});

		res.status(200).json({ message: "Video Uploaded Successfully." });
	} catch (e) {
		res.status(400).json({
			error_code: "upload_video",
			message: e.message,
		});
	}
};
