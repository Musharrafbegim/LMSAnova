import Coupon from "database/models/coupon";

export default async function handler(req, res) {
	const { coupon } = req.body;

	try {
		if (!coupon) {
			return res.status(422).json({
				message: "Invalid coupon code",
			});
		}

		const discount = await Coupon.findOne({
			where: { code: coupon, active_for_full_site: true },
		});

		if (discount) {
			res.status(200).json({ message: "Coupon code applied", discount });
		} else {
			res.status(422).json({ message: "There is no any coupon code" });
		}
	} catch (e) {
		res.status(400).json({
			error_code: "create_coupon",
			message: e.message,
		});
	}
}
