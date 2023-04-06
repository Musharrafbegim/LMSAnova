import jwt from "jsonwebtoken";
import User from "database/models/user";
import { instructorRequest } from "../../../email-templates/instructor-request";

export default async function handler(req, res) {
	if (!("authorization" in req.headers)) {
		return res.status(401).json({ message: "No autorization token" });
	}
	switch (req.method) {
		case "PUT":
			await handlePut(req, res);
			break;

		default:
			res.status(405).json({
				message: `Method ${req.method} not allowed`,
			});
	}
}

const handlePut = async (req, res) => {
	const { name, email, phone, instructor_subject, instructor_description } =
		req.body;
	try {
		const { userId } = jwt.verify(
			req.headers.authorization,
			process.env.JWT_SECRET
		);

		const user = await User.findOne({
			where: { id: userId, instructor_request: true },
		});

		const admins = await User.findAll({
			where: { role: "admin" },
		});

		if (user) {
			res.status(422).json({ message: "Already sent a request." });
		} else {
			const instructor = await User.update(
				{
					instructor_request: true,
					instructor_subject,
					instructor_description,
					phone,
				},
				{ where: { id: userId } }
			);

			admins.forEach((admin) => {
				// console.log(admin.email);
				instructorRequest(
					admin.email,
					name,
					email,
					instructor_subject,
					instructor_description
				);
			});

			res.status(200).json({
				message: "Recieved a request and we will back to you soon.",
				instructor,
			});
		}
	} catch (e) {
		// console.log(e);
		res.status(400).json({
			error_code: "get_students",
			message: e.message,
		});
	}
};
