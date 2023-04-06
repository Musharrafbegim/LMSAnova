import User from "database/models/user";

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
		const instructors = await User.findAll({
			where: {
				instructor_request: true,
				instructor_request_confirmed: false,
			},
		});

		res.status(200).json({ instructors });
	} catch (e) {
		res.status(400).json({
			error_code: "get_instructors",
			message: e.message,
		});
	}
};

const handlePut = async (req, res) => {
	try {
		const { instId, approve } = req.body;

		if (approve) {
			await User.update(
				{
					role: "instructor",
					instructor_request_confirmed: true,
					instructor_request_confirmed_at: Date.now(),
				},
				{ where: { id: instId } }
			);
			res.status(200).json({ message: "Approve instructor request" });
		} else {
			await User.update(
				{
					instructor_request: false,
				},
				{ where: { id: instId } }
			);
			res.status(200).json({ message: "Deny instructor request" });
		}
	} catch (e) {
		res.status(400).json({
			error_code: "approve_instructors",
			message: e.message,
		});
	}
};
