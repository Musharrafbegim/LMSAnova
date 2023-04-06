import Course_Asset from "database/models/course_asset";

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

const handleGet = async (req, res) => {
	const { id: courseId } = req.query;
	try {
		const course_assets = await Course_Asset.findAll({
			// group: "group_name",
			order: [["created_at", "DESC"]],
			where: { courseId: courseId },
		});

		res.status(200).json({ course_assets });
	} catch (e) {
		res.status(400).json({
			error_code: "get_course_assets",
			message: e.message,
		});
	}
};

const handlePost = async (req, res) => {
	const { id: courseId } = req.query;
	const { lecture_name, lecture_file } = req.body;

	try {
		await Course_Asset.create({
			lecture_name,
			lecture_file,
			courseId: courseId,
		});

		res.status(200).send({ message: "Asset uploaded successfully" });
	} catch (e) {
		res.status(400).json({
			error_code: "post_course_asset",
			message: e.message,
		});
	}
};

const handleDelete = async (req, res) => {
	const { id } = req.query;
	try {
		const course_asset = await Course_Asset.findOne({
			where: { id: id },
		});

		course_asset.destroy();

		res.status(200).json({ message: "Asset deleted successfully" });
	} catch (e) {
		res.status(400).json({
			error_code: "delete_course_asset",
			message: e.message,
		});
	}
};
