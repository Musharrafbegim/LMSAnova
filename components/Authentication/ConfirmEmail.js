import React from "react";
import axios from "axios";
import toast from "react-hot-toast";
import Router from "next/router";
import LoadingSpinner from "@/utils/LoadingSpinner";
import baseUrl from "@/utils/baseUrl";
import { motion } from "framer-motion";

const INITIAL_USER = {
	email: "",
};

const ConfirmEmail = () => {
	const [user, setUser] = React.useState(INITIAL_USER);
	const [disabled, setDisabled] = React.useState(true);
	const [loading, setLoading] = React.useState(false);

	React.useEffect(() => {
		const isUser = Object.values(user).every((el) => Boolean(el));
		isUser ? setDisabled(false) : setDisabled(true);
	}, [user]);

	const handleChange = (e) => {
		const { name, value } = e.target;
		setUser((prevState) => ({ ...prevState, [name]: value }));
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			setLoading(true);
			const url = `${baseUrl}/api/users/send-confirmation-email`;
			const payload = { ...user };
			const response = await axios.post(url, payload);
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
			Router.push("/authentication");
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
		} finally {
			setLoading(false);
		}
	};

	return (
		<>
			<div className="ptb-100">
				<div className="container">
					<div className="row justify-content-center">
						<div className="col-lg-6">
							<div className="login-form">
								<p>Please enter Email address.</p>

								<form onSubmit={handleSubmit}>
									<div className="form-group">
										<label>Email</label>
										<input
											type="text"
											className="form-control"
											placeholder="Email"
											name="email"
											value={user.email}
											onChange={handleChange}
										/>
									</div>

									<motion.button
										type="submit"
										disabled={disabled}
										whileTap={{ scale: 0.9 }}
									>
										Send Confirmation Email
										{loading ? <LoadingSpinner /> : ""}
									</motion.button>
								</form>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default ConfirmEmail;
