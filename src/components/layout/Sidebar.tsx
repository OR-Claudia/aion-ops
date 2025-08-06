import React from "react";
import { FeedItem, SectionHeader } from "../ui";
import { useFeedStore } from "../../stores";

const Sidebar: React.FC = () => {
	const { feedItems } = useFeedStore();

	return (
		<div className="absolute top-[64px] left-[34px] z-10">
			<SectionHeader title="Recent feeds" showArrow={false} />
			<div
				className={`relative w-[350px] h-[72vh] rounded-[10px] border-[1.5px] border-[rgba(211,251,216,0.5)] bg-black/60 backdrop-blur-[2px] mt-[7px]`}
			>
				<div
					className={`flex flex-col items-start gap-2 absolute left-[17px] top-[15px] w-[316px] h-[calc(72vh-32px)] overflow-y-auto pr-2`}
				>
					{feedItems.map((item) => (
						<FeedItem
							key={item.id}
							name={item.name}
							timestamp={item.timestamp}
							region={item.region}
							status={item.status}
							flightDuration={item.flightDuration}
						/>
					))}
				</div>
				<div className="w-1 h-[143px] rounded-[3px] opacity-30 bg-white absolute right-3 top-[62px]"></div>
				<div className="w-[345px] h-[99px] rounded-[10px] bg-gradient-to-b from-transparent to-black mix-blend-darken absolute left-[2px] bottom-0"></div>
			</div>
		</div>
	);
};

export default Sidebar;
