import React, { useState } from "react";
import baseUrl from "@/utils/baseUrl";
import axios from "axios";
import toast from "react-hot-toast";
import { motion } from "framer-motion";

const SubscribeForm = () => {
	const [email, setEmail] = useState("");

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const payload = { email: email };
			const url = `${baseUrl}/api/subscriptions/new`;
			const response = await axios.post(url, payload);
			setEmail("");
			if (response.data.code == "exist") {
				toast.error(response.data.message, {
					style: {
						border: "1px solid #ff0033",
						padding: "16px",
						color: "#ff0033",
					},
					iconTheme: {
						primary: "#ff0033",
						secondary: "#FFFAEE",
					},
				});
			} else {
				toast.success(response.data.message, {
					style: {
						border: "1px solid #4BB543",
						padding: "16px",
						color: "#4BB543",
					},
					iconTheme: {
						primary: "#4BB543",
						secondary: "#FFFAEE",
					},
				});
			}
		} catch (err) {
			let {
				response: {
					data: { message },
				},
			} = err;
			toast.error(message, {
				style: {
					border: "1px solid #ff0033",
					padding: "16px",
					color: "#ff0033",
				},
				iconTheme: {
					primary: "#ff0033",
					secondary: "#FFFAEE",
				},
			});
		}
	};

	return (
		<>
			<div className="subscribe-area bg-f9f9f9 ptb-100">
				<div className="container">
					<div className="subscribe-content">
						<span className="sub-title">Go At Your Own Pace</span>
						<h2>Subscribe To Our Newsletter</h2>
						<p>
							Lorem ipsum dolor sit amet, consectetur adipiscing
							elit, sed do eiusmod tempor incididunt ut labore et
							dolore magna aliqua.
						</p>

						<form
							className="newsletter-form"
							onSubmit={handleSubmit}
						>
							<input
								type="email"
								className="input-newsletter"
								placeholder="Enter your email address"
								name="email"
								value={email}
								onChange={(e) => setEmail(e.target.value)}
								required
							/>

							<motion.button
								type="submit"
								className="default-btn"
								whileTap={{ scale: 0.5 }}
							>
								<i className="flaticon-user"></i> Subscribe Now{" "}
								<span></span>
							</motion.button>
						</form>
					</div>
				</div>

				<div className="shape13" data-speed="0.06" data-revert="true">
					<img src="/images/shape12.png" alt="image" />
				</div>
			</div>
		</>
	);
};

export default SubscribeForm;
