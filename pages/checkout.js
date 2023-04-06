import React from "react";
import Navbar from "@/components/_App/Navbar";
import PageBanner from "@/components/Common/PageBanner";
import CheckoutForm from "@/components/Checkout/CheckoutForm";
import Footer from "@/components/_App/Footer";

export default function CheckoutPage({ user }) {
	return (
		<>
			<Navbar user={user} />

			<PageBanner
				pageTitle="Checkout"
				homePageUrl="/"
				homePageText="Home"
				activePageText="Checkout"
			/>

			<CheckoutForm user={user} />

			<Footer />
		</>
	);
}
