import React, { useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";

export default function Statistics() {
	const { isAuthenticated } = useAuth0();
	useEffect(() => {
		!isAuthenticated && window.location.replace("/#");
	}, [isAuthenticated]);
	return (
		<>
			<>
				<div className="flex flex-col w-[44rem]">aa</div>
			</>
		</>
	)
}