import React from "react";
import { Provider } from "react-redux";
import { useStore } from "../store";
import { parseCookies, destroyCookie } from "nookies";
import axios from "axios";
import { redirectUser } from "@/utils/auth";
import baseUrl from "@/utils/baseUrl";
import "../styles/bootstrap.min.css";
import "../styles/animate.min.css";
import "../styles/boxicons.min.css";
import "../styles/flaticon.css";
import "../styles/nprogress.css";
import "react-accessible-accordion/dist/fancy-example.css";
import "react-tabs/style/react-tabs.css";
import "swiper/css";
import "swiper/css/bundle";
import "react-confirm-alert/src/react-confirm-alert.css";
import "@etchteam/next-pagination/dist/index.css";
import "react-loading-skeleton/dist/skeleton.css";
// Global Styles
import "../styles/style.css";
import "../styles/responsive.css";

// Dashboard
import "../styles/dashboard.css";

import Layout from "../components/_App/Layout";

function MyApp({ Component, pageProps }) {
	const store = useStore(pageProps.initialReduxState);
	return (
		<Provider store={store}>
			<Layout>
				<Component {...pageProps} />
			</Layout>
		</Provider>
	);
}

MyApp.getInitialProps = async ({ Component, ctx }) => {
	const { elarniv_users_token } = parseCookies(ctx);
	let pageProps = {};

	if (Component.getInitialProps) {
		pageProps = await Component.getInitialProps(ctx);
	}

	if (!elarniv_users_token) {
		// if a user not logged in then user can't access those pages
		const isProtectedRoute =
			ctx.pathname === "/profile/basic-information" ||
			ctx.pathname === "/profile/photo" ||
			ctx.pathname === "/checkout" ||
			ctx.pathname === "/become-an-instructor" ||
			ctx.pathname === "/learning/my-courses" ||
			ctx.pathname === "/instructor/courses" ||
			ctx.pathname === "/admin" ||
			ctx.pathname === "/admin/instructor" ||
			ctx.pathname === "/admin/students" ||
			ctx.pathname === "/admin/partners" ||
			ctx.pathname === "/admin/testimonials" ||
			ctx.pathname === "/admin/categories" ||
			ctx.pathname === "/checkout" ||
			ctx.pathname === "/learning/wishlist";

		if (isProtectedRoute) {
			redirectUser(ctx, "/authentication");
		}
	} else {
		// if a user logged in then user can't access those pages
		const ifLoggedIn =
			ctx.pathname === "/authentication" ||
			ctx.pathname === "/reset-password";
		if (ifLoggedIn) {
			redirectUser(ctx, "/");
		}

		try {
			const payload = { headers: { Authorization: elarniv_users_token } };
			const url = `${baseUrl}/api/users/update`;
			const response = await axios.get(url, payload);
			const user = response && response.data.user;

			if (!user) {
				destroyCookie(ctx, "elarniv_users_token");
				redirectUser(ctx, "/authentication");
			}
			pageProps.user = user;
		} catch (err) {
			destroyCookie(ctx, "elarniv_users_token");
			// redirectUser(ctx, "/");
		}
	}
	return {
		pageProps,
	};
};

export default MyApp;
