import jwt from "jsonwebtoken";
import User from "database/models/user";

export default async (req, res) => {
	if (!("authorization" in req.headers)) {
		return res.status(401).json({ message: "No autorization token" });
	}
	switch (req.method) {
		case "PUT":
			await userProfilePhoto(req, res);
			break;
		default:
			res.status(405).json({
				message: `Method ${req.method} not allowed`,
			});
	}
};

const userProfilePhoto = async (req, res) => {
	const { profile_photo } = req.body;
	try {
		const { userId } = jwt.verify(
			req.headers.authorization,
			process.env.JWT_SECRET
		);

		await User.update(
			{
				profile_photo,
			},
			{
				where: { id: userId },
			}
		);

		const updateUser = await User.findOne({
			where: { id: userId },
		});

		const elarniv_users_token = jwt.sign(
			{
				userId: updateUser.id,
				first_name: updateUser.first_name,
				last_name: updateUser.last_name,
				email: updateUser.email,
				role: updateUser.role,
				profile_photo: updateUser.profile_photo,
			},
			process.env.JWT_SECRET,
			{
				expiresIn: "7d",
			}
		);

		res.status(200).json({
			message: "Profile photo updated.",
			elarniv_users_token,
		});
	} catch (e) {
		res.status(400).json({
			error_code: "update_user_avatar",
			message: e.message,
		});
	}
};
