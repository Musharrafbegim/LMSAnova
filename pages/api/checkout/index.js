import Stripe from "stripe";
import { v4 as uuidv4 } from "uuid";
import { Enrolment, Instructor_Earning, Course } from "database/models";
import { calculateCartTotal } from "@/utils/calculateCartTotal";
// import { checkoutConfirmation } from "email-templates/checkout-confirmation";

const stripeSecret = Stripe(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
	switch (req.method) {
		case "POST":
			await handlePostRequest(req, res);
			break;
		default:
			res.status(405).json({
				message: `Method ${req.method} not allowed`,
			});
	}
}

const handlePostRequest = async (req, res) => {
	const { cartItems, userId, buyer_name, buyer_email, buyer_avatar } =
		req.body;

	const { stripeTotal } = calculateCartTotal(cartItems);

	try {
		await stripeSecret.charges.create(
			{
				amount: stripeTotal,
				currency: "usd",
				source: "tok_mastercard",
				receipt_email: buyer_email,
				description: `Checkout | ${buyer_email} | ${userId}`,
			},
			{
				idempotencyKey: uuidv4(),
			}
		);

		cartItems.forEach(async (cart) => {
			Enrolment.create({
				bought_price: cart.price,
				payment_method: "Card",
				buyer_name: buyer_name,
				buyer_email: buyer_email,
				buyer_avatar: buyer_avatar,
				userId: userId,
				courseId: cart.id,
				status: "paid",
			});

			const courseInstractor = await Course.findOne({
				attributes: ["userId"],
				where: { id: cart.id },
			});

			await Instructor_Earning.create({
				earnings: cart.price,
				userId: courseInstractor.userId,
				courseId: cart.id,
			});
		});

		// console.log(cartItems);

		// checkoutConfirmation(cartItems, buyer_name, buyer_email);

		res.status(200).json({
			message: "Enroled successfully.",
		});
	} catch (e) {
		res.status(400).json({
			error_code: "create_enroled",
			message: e.message,
		});
	}
};
