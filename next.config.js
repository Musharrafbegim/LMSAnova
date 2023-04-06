/** @type {import('next').NextConfig} */
const path = require("path");
const nextConfig = {
	reactStrictMode: true,
	trailingSlash: true,
	sassOptions: {
		includePaths: [path.join(__dirname, "styles")],
	},
	optimizeFonts: false,
	eslint: {
		// Warning: This allows production builds to successfully complete even if
		// your project has ESLint errors.
		ignoreDuringBuilds: true,
	},
	env: {
		JWT_SECRET: "asdfghjkinbvcxzqwertyulopmkioprewqasderfgnuim",
		AWS_SES_USER: "AKIAUH22XCQ7VLTWDKVL",
		AWS_SES_PASSWORD: "BMvGZ+DwQRMD0PvEHjX6s8rRiVt+LuMeG3QZcRwm2/dv",
		CLOUD_NAME: "dkspviiwj",
		UPLOAD_PRESETS: "anovas",
		CLOUDINARY_URL:
			"https://res.cloudinary.com/dkspviiwj/image/upload",
		CLOUDINARY_VIDEO_URL:
			"https://api.cloudinary.com/v1_1/dkspviiwj/video/upload",
		CLOUDINARY_ZIP_URL:
			"https://api.cloudinary.com/v1_1/dkspviiwj/raw/upload",
		STRIPE_SECRET_KEY: "sk_test_51MJLA3GsOvz9QvpR7Mt2VdmDv9WX5RH5VIyTa6EoikV42NqNwd4ucB096rSb2yVvPbpt3tCqB1BCnduh5byhUnLr00MzQo2U4I",
		STRIPE_PUBLISHABLE_KEY: "pk_test_51MJLA3GsOvz9QvpRWwa0MOghELQxlXWbQMHcuoFvJp3mycjLJZXUQSUOYaiOImi1XbJahszl8j2JRLDsrNfGMPJH00aSelfsor",
	},
};

module.exports = nextConfig;
