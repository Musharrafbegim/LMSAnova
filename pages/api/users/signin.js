import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import isEmail from "validator/lib/isEmail";

import User from "database/models/user";

export default async function handler(req, res) {
	switch (req.method) {
		case "POST":
			await userSignin(req, res);
			break;
		default:
			res.status(405).json({
				message: `Method ${req.method} not allowed`,
			});
	}
}

const userSignin = async (req, res) => {
	const { email, password } = req.body;

	try {
		if (!isEmail(email)) {
			return res
				.status(422)
				.json({ message: "Email should be a valid email address" });
		}

		const user = await User.findOne({
			where: { email: email },
		});

		if (!user) {
			return res
				.status(404)
				.json({ message: "User account does not exist" });
		}

		if (!user.email_confirmed) {
			return res.status(404).json({
				message:
					"Email is not confirmed yet, please confirm your email.",
			});
		}

		if (!user.status) {
			return res.status(404).json({
				message:
					"This account is temporarily disabled, please contact the support email",
			});
		}

		const passwordsMatch = await bcrypt.compare(password, user.password);
		if (passwordsMatch) {
			const elarniv_users_token = jwt.sign(
				{
					userId: user.id,
					first_name: user.first_name,
					last_name: user.last_name,
					email: user.email,
					role: user.role,
					profile_photo: user.profile_photo,
				},
				process.env.JWT_SECRET,
				{ expiresIn: "7d" }
			);
			res.status(200).json({
				message: "Login Successful!",
				elarniv_users_token,
			});
		} else {
			res.status(401).json({ message: "Password is not correct" });
		}
	} catch (e) {
		// console.error(error)
		res.status(400).json({
			error_code: "user_login",
			message: e.message,
		});
	}
};
