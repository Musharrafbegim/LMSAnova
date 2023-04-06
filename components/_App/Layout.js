import React, { useState, useEffect } from "react";
import Head from "next/head";
import Script from "next/script";
import { Toaster } from "react-hot-toast";
import GoTop from "@/components/_App/GoTop";
import { AnimatePresence } from "framer-motion";
import Modal from "../Modal";
import axios from "axios";
import baseUrl from "@/utils/baseUrl";

const Layout = ({ children }) => {
	const [modalOpen, setModalOpen] = useState();
	const [modalImage, setModalImage] = useState("");

	useEffect(() => {
		const fetchSetting = async () => {
			const resp = await axios.get(`${baseUrl}/settings.json`);
			setModalOpen(resp.data.siteModal);
			setModalImage(resp.data.siteModalImage);
			if (resp.data.siteModal) {
				document.body.style.overflow = "hidden";
			}
		};
		fetchSetting();
	}, []);

	const close = () => {
		setModalOpen(false);
		document.body.style.overflow = "unset";
	};
	return (
		<>
			<Head>
				<title>
					Anova
				</title>
				<meta
					name="viewport"
					content="initial-scale=1.0, width=device-width"
				/>
				<link
					rel="icon"
					href="https://res.cloudinary.com/dev-empty/image/upload/v1661337274/elfav.png"
				/>
			</Head>

			{children}
			<Script src="https://meet.jit.si/external_api.js" />

			<Toaster />

			<GoTop />

			<AnimatePresence
				initial={false}
				onExitComplete={() => null}
				mode="wait"
			>
				{modalOpen && modalImage && (
					<Modal
						modalOpen={modalOpen}
						handleClose={close}
						image_url={modalImage}
					/>
				)}
			</AnimatePresence>
		</>
	);
};

export default Layout;
