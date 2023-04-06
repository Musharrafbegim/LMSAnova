import Partner from "database/models/partner";

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
		const partners = await Partner.findAll({
			order: [["created_at", "DESC"]],
		});

		res.status(200).json({ partners });
	} catch (e) {
		res.status(400).json({
			error_code: "get_partners",
			message: e.message,
		});
	}
};
