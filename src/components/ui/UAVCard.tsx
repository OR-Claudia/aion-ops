import React from "react";

export interface UAVData {
  id: string;
  name: string;
  type: "tactical" | "combat" | "recon";
  status: "active" | "damage" | "standby" | "destroyed" | "engaged" | "offline";
  image: string;
  lastContact: string;
  readyForFlight: "Yes" | "No";
  lastKnownLocation: string;
  location: string;
}

interface UAVCardProps {
  uav: UAVData;
  onClick?: (uav: UAVData) => void;
}

const statusConfig = {
  active: { color: "#71BC2C", label: "active" },
  damage: { color: "#C10000", label: "damage" },
  standby: { color: "#E09D18", label: "standby" },
  destroyed: { color: "#C10000", label: "destroyed" },
  engaged: { color: "#00C6B8", label: "engaged" },
  offline: { color: "rgba(227, 243, 242, 0.5)", label: "offline" },
};

const UAVCard: React.FC<UAVCardProps> = ({ uav, onClick }) => {
  const statusInfo = statusConfig[uav.status];

  return (
    <div
      className="w-[277px] h-[188px] relative cursor-pointer hover:scale-105 transition-transform duration-200 m-[16px]"
      onClick={() => onClick?.(uav)}
    >
      {/* Background placeholder */}
      <div
        className="w-[277px] h-[187px] opacity-10 bg-app-text absolute left-0 top-0"
        style={{ borderRadius: "0px 4px 4px 4px" }}
      />

      {/* UAV Image */}
      <img
        className="w-[277px] h-[152px] absolute left-0 top-0 object-cover"
        style={{ borderRadius: "0px 4px 4px 0px" }}
        src={uav.image}
        alt={uav.name}
      />

      {/* Image overlay gradient */}
      <div
        className="w-[277px] h-[152px] absolute left-0 top-0"
        style={{
          background:
            "linear-gradient(179deg, rgba(102, 102, 102, 0.00) -20.07%, #1E1E1E 99.39%)",
          backgroundBlendMode: "multiply",
          borderRadius: "0px 4px 4px 0px",
        }}
      />

      {/* UAV Details overlay on image */}
      <div className="absolute left-[17px] top-[94px] w-[244px] h-[50px] flex flex-col gap-0.5 mb-[6px]">
        <div className="flex justify-between items-center">
          <span className="text-app-text font-ubuntu text-[10px] font-medium">
            Last contact
          </span>
          <span className="text-app-text font-ubuntu text-[10px] font-normal">
            {uav.lastContact}
          </span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-app-text font-ubuntu text-[10px] font-medium">
            Ready for flight
          </span>
          <span className="text-app-text font-ubuntu text-[10px] font-normal">
            {uav.readyForFlight}
          </span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-app-text font-ubuntu text-[10px] font-medium">
            Last known location
          </span>
          <span className="text-app-text font-ubuntu text-[10px] font-normal">
            {uav.lastKnownLocation}
          </span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-app-text font-ubuntu text-[10px] font-medium">
            Location
          </span>
          <span className="text-app-text font-ubuntu text-[10px] font-normal">
            {uav.location}
          </span>
        </div>
      </div>

      {/* Bottom section */}
      <div
        className="w-[277px] h-[45px] absolute left-0 top-[143px]"
        style={{
          borderRadius: "0px 0px 4px 4px",
          backgroundColor: "#242B2C",
        }}
      />

      {/* UAV Info and Status */}
      <div className="absolute left-[17px] top-[143px] w-[244px] h-[45px] flex justify-between items-center">
        <div className="flex flex-col justify-center items-start gap-0.5">
          <span className="text-app-text font-share-tech text-[12px] font-normal">
            {uav.name}
          </span>
          <span className="text-app-text font-share-tech text-[10px] font-normal opacity-70">
            {uav.type}
          </span>
        </div>

        {/* Status indicator */}
        <div className="flex items-center gap-[6px]">
          <span className="text-app-text font-ubuntu text-[10px] font-light opacity-50">
            {statusInfo.label}
          </span>
          <div
            className="w-[11px] h-[11px] rounded-full"
            style={{ backgroundColor: statusInfo.color }}
          />
        </div>
      </div>
    </div>
  );
};

export default UAVCard;
