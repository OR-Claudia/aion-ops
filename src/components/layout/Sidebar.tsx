import React from "react";
import { FeedItem, SectionHeader } from "../ui";
import { useNavigate } from "react-router-dom";

const Sidebar: React.FC = () => {
	const feedItems = [
		{
			id: 43345,
			name: "KUNA",
			timestamp: "13.02.2025 06:39AM",
			region: "Warsaw N",
			status: "active",
			flightDuration: "1h34m22s",
		},
		{
			id: 74758,
			name: "Kolibri 7",
			timestamp: "13.02.2025 06:35AM",
			region: "Warsaw N",
			status: "offline",
			flightDuration: "2h12m15s",
		},
		{
			id: 98421,
			name: "Shark",
			timestamp: "13.02.2025 06:32AM",
			region: "Krakow S",
			status: "engaged",
			flightDuration: "45m33s",
		},
		{
			id: 12356,
			name: "Bobr UJ26",
			timestamp: "13.02.2025 06:28AM",
			region: "Warsaw N",
			status: "warning",
			flightDuration: "3h22m10s",
		},
		{
			id: 67890,
			name: "Eagle Alpha",
			timestamp: "13.02.2025 06:25AM",
			region: "Gdansk E",
			status: "active",
			flightDuration: "1h55m44s",
		},
		{
			id: 11223,
			name: "Phoenix Beta",
			timestamp: "13.02.2025 06:20AM",
			region: "Wroclaw W",
			status: "standby",
			flightDuration: "25m12s",
		},
		{
			id: 44556,
			name: "KUNA",
			timestamp: "13.02.2025 06:18AM",
			region: "Warsaw N",
			status: "active",
			flightDuration: "4h15m33s",
		},
		{
			id: 77889,
			name: "Falcon Gamma",
			timestamp: "13.02.2025 06:15AM",
			region: "Poznan C",
			status: "offline",
			flightDuration: "2h45m18s",
		},
		{
			id: 99001,
			name: "Raven Echo",
			timestamp: "13.02.2025 06:12AM",
			region: "Lublin S",
			status: "maintenance",
			flightDuration: "0h35m22s",
		},
		{
			id: 33445,
			name: "Osprey Foxtrot",
			timestamp: "13.02.2025 06:08AM",
			region: "Warsaw N",
			status: "active",
			flightDuration: "6h12m45s",
		},
		{
			id: 55667,
			name: "Condor Hotel",
			timestamp: "13.02.2025 06:05AM",
			region: "Katowice S",
			status: "warning",
			flightDuration: "1h22m55s",
		},
		{
			id: 88990,
			name: "Sparrow India",
			timestamp: "13.02.2025 06:02AM",
			region: "Bialystok E",
			status: "engaged",
			flightDuration: "3h44m12s",
		},
	];
	const navigate = useNavigate();

	return (
		<div className="absolute top-16 left-12">
			<SectionHeader
				title="Recent feeds"
				showArrow={true}
				onClick={() => navigate("/storage")}
			/>
			<div
				className={`relative w-[350px] h-[72vh] rounded-[10px] border-[1.5px] border-[rgba(211,251,216,0.5)] bg-black/20 backdrop-blur-[8px] mt-[7px]`}
			>
				<div
					className={`flex flex-col items-start gap-2 absolute left-4 top-3 w-[324px] h-[calc(72vh-32px)] overflow-y-auto pr-2`}
				>
					{feedItems.map((item, index) => (
						<FeedItem
							key={index}
							id={item.id}
							name={item.name}
							timestamp={item.timestamp}
							region={item.region}
							status={item.status}
							flightDuration={item.flightDuration}
						/>
					))}
				</div>

				<div className="w-[345px] h-[99px] rounded-[10px] bg-gradient-to-b from-transparent to-black mix-blend-darken absolute left-[2px] bottom-0"></div>
			</div>
		</div>
	);
};

export default Sidebar;
