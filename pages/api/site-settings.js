import fs from "fs";
let siteSettings = require("../../public/settings.json");

export default async function handler(req, res) {
	const { site, image_url } = req.body;

	try {
		if (image_url) {
			siteSettings.siteModalImage = image_url;

			const sss = Object.assign(siteSettings);
			fs.writeFileSync(
				`${process.cwd()}/public/settings.json`,
				JSON.stringify(sss, null, 4)
			);
		} else {
			siteSettings.siteModal = site;

			const sss = Object.assign(siteSettings);
			fs.writeFileSync(
				`${process.cwd()}/public/settings.json`,
				JSON.stringify(sss, null, 4)
			);
		}

		res.status(200).json({ message: "Settings updated" });
	} catch (e) {
		res.status(400).json({
			error_code: "get_my_courses",
			message: e.message,
		});
	}
}
