import React from "react";

const GeneralLoader = () => {
	return (
		<>
			<style jsx>{`
				.spinner-border {
					position: relative;
					left: 50%;
				}
			`}</style>
			<div className="spinner-border text-danger" role="status">
				<span className="visually-hidden">Loading...</span>
			</div>
		</>
	);
};

export default GeneralLoader;
