import React from "react";
import { motion } from "framer-motion";

const ForgotPasswordForm = () => {
	return (
		<>
			<div className="ptb-100">
				<div className="container">
					<div className="row justify-content-center">
						<div className="col-lg-6">
							<div className="login-form">
								<p>Please enter Email address.</p>

								<form>
									<div className="form-group">
										<label>Email</label>
										<input
											type="text"
											className="form-control"
											placeholder="Email"
										/>
									</div>

									<motion.button
										type="submit"
										whileTap={{ scale: 0.9 }}
									>
										Reset
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

export default ForgotPasswordForm;
