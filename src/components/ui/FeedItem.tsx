import React from "react";

interface FeedItemProps {
	name: string;
	timestamp?: string;
	region: string;
	status: string;
	id: number;
	flightDuration: string;
}

const FeedItem: React.FC<FeedItemProps> = ({
	id,
	name,
	timestamp,
	region,
	status,
	flightDuration,
}) => {
	return (
		<div className="w-[300px] h-[100px] mb-[8px] relative before:absolute before:top-0 before:left-0 before:w-full before:h-full before:rounded-[0px_10px_10px_10px] before:bg-[#242B2C] flex items-center justify-center">
			<div className="relative w-[277px] h-[82px] mt-[6px]">
				<div className="flex justify-between items-start w-full">
					<div className="text-[#E3F3F2] font-ubuntu text-base font-normal leading-normal overflow-hidden text-ellipsis whitespace-nowrap max-w-[145px]">
						{`[${id}] ${name}`}
					</div>
					{timestamp && (
						<div className="text-[#E3F3F2] text-right font-ubuntu text-[10px] font-normal leading-normal opacity-60 w-[116px]">
							{timestamp}
						</div>
					)}
				</div>
				<div className="flex flex-col gap-[1px]">
					<div className="flex justify-between items-baseline">
						<span className="text-[#E3F3F2] font-ubuntu text-[10px] font-normal leading-normal">
							Region
						</span>
						<span className="text-[#E3F3F2] font-ubuntu text-[10px] font-normal leading-normal">
							{region}
						</span>
					</div>
					<div className="flex justify-between items-baseline">
						<span className="text-[#E3F3F2] font-ubuntu text-[10px] font-normal leading-normal">
							Status
						</span>
						<span className="text-[#E3F3F2] font-ubuntu text-[10px] font-normal leading-normal">
							{status}
						</span>
					</div>
					<div className="flex justify-between items-baseline">
						<span className="text-[#E3F3F2] font-ubuntu text-[10px] font-normal leading-normal">
							Flight duration
						</span>
						<span className="text-[#E3F3F2] font-ubuntu text-[10px] font-normal leading-normal">
							{flightDuration}
						</span>
					</div>
				</div>
			</div>
		</div>
	);
};

export default FeedItem;
