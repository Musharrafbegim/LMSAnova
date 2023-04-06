import { motion } from "framer-motion";

const Backdrop = ({ children, onClick }) => {
	return (
		<>
			{children}
			<motion.div
				onClick={onClick}
				className="modal-backdrop"
				style={{
					background: "rgba(18, 18, 18, 0.7) !important",
					backdropFilter: "blur(20px)",
				}}
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				exit={{ opacity: 0 }}
			></motion.div>
		</>
	);
};

export default Backdrop;
