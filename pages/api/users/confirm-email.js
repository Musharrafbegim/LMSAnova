import validate from "uuid-validate";
import User from "database/models/user";

export default async (req, res) => {
	switch (req.method) {
		case "PUT":
			await userEmailConfirm(req, res);
			break;
		default:
			res.status(405).send(`Method ${req.method} not allowed`);
	}
};

const userEmailConfirm = async (req, res) => {
	let { token, email } = req.body;
	const validUuid = validate(token);
	try {
		if (!token) {
			return res.status(422).json({
				message:
					"Assigned token is missing, try clicking on the exact link from the email",
			});
		} else if (!validUuid) {
			return res.status(422).json({ message: "Token is incorrect" });
		}

		const user = await User.findOne({
			where: { email: email },
		});

		// console.log(user)

		if (!user) {
			return res.status(422).json({ message: `Email is incorrect` });
		} else if (user.email_confirmed) {
			return res
				.status(422)
				.send({ message: `Email address is already confirmed!` });
		}

		await User.update(
			{
				email_confirmed: true,
				email_confirmed_at: Date.now(),
			},
			{
				where: {
					id: user.id,
				},
			}
		);

		res.status(201).json({
			message: `Email address confirmed successfully. Thank you`,
		});
	} catch (error) {
		// console.error(error)
		res.status(400).json({
			error_code: "email_confirmation",
			message: e.message,
		});
	}
};
