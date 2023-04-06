import jwt from "jsonwebtoken";
import User from "database/models/user";

export default async (req, res) => {
	if (!("authorization" in req.headers)) {
		return res.status(401).json({ message: "No autorization token" });
	}
	switch (req.method) {
		case "GET":
			await userGetById(req, res);
			break;
		case "PUT":
			await userUpdate(req, res);
			break;
		default:
			res.status(405).json({
				message: `Method ${req.method} not allowed`,
			});
	}
};

const userGetById = async (req, res) => {
	try {
		const { userId } = jwt.verify(
			req.headers.authorization,
			process.env.JWT_SECRET
		);

		const user = await User.findOne({
			where: { id: userId },
		});

		res.status(200).json({ user });
	} catch (e) {
		res.status(400).json({
			error_code: "get_user_by_id",
			message: e.message,
		});
	}
};

const userUpdate = async (req, res) => {
	const {
		first_name,
		last_name,
		bio,
		gender,
		website,
		twitter,
		facebook,
		linkedin,
		youtube,
	} = req.body;
	try {
		const { userId } = jwt.verify(
			req.headers.authorization,
			process.env.JWT_SECRET
		);

		await User.update(
			{
				first_name,
				last_name,
				bio,
				gender,
				website,
				twitter,
				facebook,
				linkedin,
				youtube,
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
				avatar: updateUser.profile_photo,
			},
			process.env.JWT_SECRET,
			{
				expiresIn: "7d",
			}
		);

		res.status(200).json({
			message: "Profile updated.",
			elarniv_users_token,
		});
	} catch (e) {
		res.status(400).json({
			error_code: "update_user",
			message: e.message,
		});
	}
};
