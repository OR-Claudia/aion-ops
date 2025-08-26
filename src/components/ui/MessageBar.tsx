import React from "react";

interface MessageBarProps {
	message?: string;
}

const MessageBar: React.FC<MessageBarProps> = ({
	message = "ALERT: Adhere to mission protocols and airspace restrictions. Unauthorized deviations, low-altitude flights, or failure to respond to command directives will result in immediate corrective action. Maintain secure communications, confirm all targets before engagement, and ensure compliance with Rules of Engagement (ROE).",
}) => {
	console.log("Rendering MessageBar with message:", message);
	return (
		<div className="w-full h-10 border-[1.5px] border-[rgba(211,251,216,0.5)] rounded-[10px] bg-black/70 backdrop-blur-[2px] flex items-center  px-[16px] py-[8px]">
			<div
				className="font-ubuntu text-xl font-normal leading-normal tracking-[0.8px] overflow-hidden text-ellipsis whitespace-nowrap w-full"
				style={{ color: "#E09D18" }}
			>
				{/* {message} */}
			</div>
		</div>
	);
};

export default MessageBar;
