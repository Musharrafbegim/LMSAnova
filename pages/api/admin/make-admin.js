import { User } from "database/models";

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
		const admins = await User.findAll({
			order: [["created_at", "DESC"]],
			where: {
				role: "admin",
			},
		});

		res.status(200).json({ admins });
	} catch (e) {
		res.status(400).json({
			error_code: "get_courses_for_approve",
			message: e.message,
		});
	}
};

const handlePut = async (req, res) => {
	try {
		const { userId, admin } = req.body;

		if (admin) {
			await User.update(
				{
					role: "admin",
				},
				{ where: { id: userId } }
			);
			res.status(200).json({ message: "This user now admin access" });
		} else {
			await User.update(
				{
					role: "student",
				},
				{ where: { id: userId } }
			);
			res.status(200).json({ message: "Removed from admin" });
		}
	} catch (e) {
		res.status(400).json({
			error_code: "make_admin",
			message: e.message,
		});
	}
};
