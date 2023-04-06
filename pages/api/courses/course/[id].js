import Course from "database/models/course";

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
	const { id } = req.query;
	try {
		const course = await Course.findOne({
			where: { id: id },
		});

		res.status(200).json({ course });
	} catch (e) {
		res.status(400).json({
			error_code: "update_course",
			message: e.message,
		});
	}
};

const handlePut = async (req, res) => {
	const { id } = req.query;
	const {
		title,
		short_desc,
		overview,
		latest_price,
		before_price,
		lessons,
		duration,
		image,
		access_time,
		requirements,
		what_you_will_learn,
		who_is_this_course_for,
		catId,
	} = req.body;
	try {
		const course = await Course.update(
			{
				title,
				short_desc,
				overview,
				latest_price,
				before_price,
				lessons,
				duration,
				image,
				access_time,
				requirements,
				what_you_will_learn,
				who_is_this_course_for,
				catId,
			},
			{
				where: { id: id },
			}
		);

		res.status(200).json({ message: "Course updated successfully" });
	} catch (e) {
		res.status(400).json({
			error_code: "update_course",
			message: e.message,
		});
	}
};

const handleDelete = async (req, res) => {
	const { id } = req.query;
	try {
		const course = await Course.findOne({
			where: { id: id },
		});

		course.destroy();

		res.status(200).json({ message: "Course deleted successfully" });
	} catch (e) {
		res.status(400).json({
			error_code: "delete_course",
			message: e.message,
		});
	}
};
