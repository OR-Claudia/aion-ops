import React from "react";
import { FeedItem, SectionHeader } from "../ui";

const Sidebar: React.FC = () => {
  const feedItems = [
    {
      name: "UAV 22456",
      timestamp: "13.02.2025 06:39AM",
      region: "Warsaw N",
      status: "active",
      flightDuration: "1h34m22s",
    },
    {
      name: "Kolibri 7 (ID:4452)",
      timestamp: "13.02.2025 06:35AM",
      region: "Warsaw N",
      status: "offline",
      flightDuration: "2h12m15s",
    },
    {
      name: "Shark (ID:3456)",
      timestamp: "13.02.2025 06:32AM",
      region: "Krakow S",
      status: "engaged",
      flightDuration: "45m33s",
    },
    {
      name: "Bobr UJ26 (ID:9931)",
      timestamp: "13.02.2025 06:28AM",
      region: "Warsaw N",
      status: "warning",
      flightDuration: "3h22m10s",
    },
    {
      name: "Eagle Alpha",
      timestamp: "13.02.2025 06:25AM",
      region: "Gdansk E",
      status: "active",
      flightDuration: "1h55m44s",
    },
    {
      name: "Phoenix Beta",
      timestamp: "13.02.2025 06:20AM",
      region: "Wroclaw W",
      status: "standby",
      flightDuration: "25m12s",
    },
    {
      name: "Hawk Delta",
      timestamp: "13.02.2025 06:18AM",
      region: "Warsaw N",
      status: "active",
      flightDuration: "4h15m33s",
    },
    {
      name: "Falcon Gamma",
      timestamp: "13.02.2025 06:15AM",
      region: "Poznan C",
      status: "offline",
      flightDuration: "2h45m18s",
    },
    {
      name: "Raven Echo",
      timestamp: "13.02.2025 06:12AM",
      region: "Lublin S",
      status: "maintenance",
      flightDuration: "0h35m22s",
    },
    {
      name: "Osprey Foxtrot",
      timestamp: "13.02.2025 06:08AM",
      region: "Warsaw N",
      status: "active",
      flightDuration: "6h12m45s",
    },
    {
      name: "Condor Hotel",
      timestamp: "13.02.2025 06:05AM",
      region: "Katowice S",
      status: "warning",
      flightDuration: "1h22m55s",
    },
    {
      name: "Sparrow India",
      timestamp: "13.02.2025 06:02AM",
      region: "Bialystok E",
      status: "engaged",
      flightDuration: "3h44m12s",
    },
  ];

  return (
    <div className="fixed top-[143px] left-[24px] w-[350px] h-[748px] z-10">
      <SectionHeader title="Recent feeds" />
      <div className="relative w-[350px] h-[701px] rounded-[10px] border-[1.5px] border-[rgba(211,251,216,0.5)] bg-black/60 backdrop-blur-[2px] mt-[7px]">
        <div className="flex flex-col items-start gap-2 absolute left-[17px] top-[15px] w-[316px] h-[660px] overflow-y-auto pr-2">
          {feedItems.map((item, index) => (
            <FeedItem
              key={index}
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
