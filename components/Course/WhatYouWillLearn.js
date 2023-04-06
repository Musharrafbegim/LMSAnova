import React from "react";

const WhatYouWillLearn = ({ what_you_will_learn }) => {
	return (
		<>
			<h3>What you will learn</h3>
			<div
				dangerouslySetInnerHTML={{ __html: what_you_will_learn }}
			></div>
		</>
	);
};

export default WhatYouWillLearn;
