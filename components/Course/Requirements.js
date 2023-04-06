import React from "react";

const Requirements = ({ requirements }) => {
	return (
		<>
			<h3>Requirements</h3>
			<div dangerouslySetInnerHTML={{ __html: requirements }}></div>
		</>
	);
};

export default Requirements;
