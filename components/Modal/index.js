import { motion } from "framer-motion";
import Backdrop from "../Backdrop";

const dropIn = {
	hidden: {
		y: "-100vh",
		opacity: 0,
	},
	visible: {
		y: "0",
		opacity: 1,
		transition: {
			duration: 0.1,
			type: "spring",
			damping: 25,
			stiffness: 500,
		},
	},
	exit: {
		y: "100vh",
		opacity: 0,
	},
};

const Modal = ({ handleClose, image_url }) => {
	return (
		<>
			<Backdrop onClick={handleClose}>
				<motion.div
					className="modal fade show"
					onClick={(e) => e.stopPropagation()}
					variants={dropIn}
					initial="hidden"
					animate="visible"
					exit="exit"
				>
					<div className="modal-dialog modal-dialog-centered">
						<div className="modal-content">
							<button
								type="button"
								className="btn-close"
								onClick={handleClose}
							>
								<i className="bx bx-x"></i>
							</button>
							<img src={image_url} alt="modal-image" />
						</div>
					</div>
				</motion.div>
			</Backdrop>
		</>
	);
};

export default Modal;
