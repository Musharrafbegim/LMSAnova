import Testimonial from "database/models/testimonial";

export default async function handler(req, res) {
	switch (req.method) {
		case "GET":
			await handleGet(req, res);
			break;

		default:
			res.status(405).json({
				message: `Method ${req.method} not allowed`,
			});
	}
}

const handleGet = async (req, res) => {
	try {
		const testimonials = await Testimonial.findAll({
			order: [["created_at", "DESC"]],
		});

		res.status(200).json({ testimonials });
	} catch (e) {
		res.status(400).json({
			error_code: "get_testimonials",
			message: e.message,
		});
	}
};
