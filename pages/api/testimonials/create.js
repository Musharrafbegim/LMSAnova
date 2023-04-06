import { slugify } from "@/utils/auth";
import Testimonial from "database/models/testimonial";

export default async function handler(req, res) {
	if (!("authorization" in req.headers)) {
		return res.status(401).json({ message: "No autorization token" });
	}
	switch (req.method) {
		case "GET":
			await testimonialById(req, res);
			break;
		case "POST":
			await createTestimonial(req, res);
			break;
		case "PUT":
			await updateTestimonial(req, res);
			break;
		case "DELETE":
			await handleDelete(req, res);
			break;
		default:
			res.status(405).json({
				message: `Method ${req.method} not allowed`,
			});
	}
}

const testimonialById = async (req, res) => {
	const { testId } = req.query;
	// console.log("####", catId);
	try {
		const testimonial = await Testimonial.findOne({
			where: { id: testId },
		});

		res.status(200).json({ testimonial });
	} catch (e) {
		res.status(400).json({
			error_code: "get_testimonial_by_id",
			message: e.message,
		});
	}
};

const createTestimonial = async (req, res) => {
	const { image_url, name, designation, description } = req.body;

	try {
		const newcreateTestimonial = await Testimonial.create({
			image_url,
			name,
			designation,
			description,
		});

		res.status(200).json({
			message: "New Testimonial added",
			testimonial: newcreateTestimonial,
		});
	} catch (e) {
		res.status(400).json({
			error_code: "create_testimonial",
			message: e.message,
		});
	}
};

const updateTestimonial = async (req, res) => {
	try {
		const { testId, image_url, name, designation, description } = req.body;

		await Testimonial.update(
			{
				image_url,
				name,
				designation,
				description,
			},
			{
				where: { id: testId },
			}
		);

		res.status(200).json({
			message: "Testimonial updated.",
		});
	} catch (e) {
		res.status(400).json({
			error_code: "update_testimonial",
			message: e.message,
		});
	}
};

const handleDelete = async (req, res) => {
	const { testId } = req.query;
	// console.log(testId);
	try {
		const testi = await Testimonial.findOne({
			where: { id: testId },
		});

		testi.destroy();

		res.status(200).json({ message: "Testimonial deleted successfully." });
	} catch (e) {
		res.status(400).json({
			error_code: "delete_restimonial",
			message: e.message,
		});
	}
};
