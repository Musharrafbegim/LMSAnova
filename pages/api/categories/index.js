import Category from "database/models/category";

export default async function handler(req, res) {
	if (!("authorization" in req.headers)) {
		return res.status(401).json({ message: "No autorization token" });
	}
	switch (req.method) {
		case "GET":
			await handleGet(req, res);
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

const handleGet = async (req, res) => {
	try {
		const categories = await Category.findAll({
			order: [["created_at", "DESC"]],
			limit: 20,
		});

		res.status(200).json({ categories });
	} catch (e) {
		res.status(400).json({
			error_code: "get_categories",
			message: e.message,
		});
	}
};

const handleDelete = async (req, res) => {
	const { catId } = req.query;
	// console.log(catId);
	try {
		const cat = await Category.findOne({
			where: { id: catId },
		});

		cat.destroy();

		res.status(200).json({ message: "Category deleted successfully." });
	} catch (e) {
		res.status(400).json({
			error_code: "get_categories",
			message: e.message,
		});
	}
};
