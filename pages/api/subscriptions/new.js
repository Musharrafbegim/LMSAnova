import Subscription from "database/models/subscription";

export default async function handler(req, res) {
	const { email } = req.body;
	try {
		const isEmailExist = await Subscription.findOne({
			where: { email: email },
		});
		// console.log(isEmailExist);

		if (isEmailExist) {
			return res
				.status(200)
				.json({ code: "exist", message: "Email already exist." });
		}

		await Subscription.create({
			email,
		});

		res.status(200).json({ message: "Email subscribe successfully" });
	} catch (e) {
		res.status(400).json({
			error_code: "get_my_courses",
			message: e.message,
		});
	}
}
