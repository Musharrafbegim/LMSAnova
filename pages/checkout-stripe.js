import React, { useEffect, useState } from "react";
import Navbar from "@/components/_App/Navbar";
import PageBanner from "@/components/Common/PageBanner";
import CheckoutForm from "@/components/Checkout/CheckoutForm";
import Footer from "@/components/_App/Footer";
import baseUrl from "@/utils/baseUrl";

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

			<Footer />
		</>
	);
}
