import React from "react";

interface DetectionItemProps {
  clusterId: string;
  coordinates: string;
  detectionInterval: string;
  objectsType: string;
  responsibleUAV: string;
}

const DetectionItem: React.FC<DetectionItemProps> = ({
  clusterId,
  coordinates,
  detectionInterval,
  objectsType,
  responsibleUAV,
}) => {
  return (
    <div className="w-[283px] h-[83px] mb-[11px] relative">
      <div className="w-[283px] h-[83px] bg-[#242B2C] rounded-[0px_10px_10px_10px] absolute left-0 top-0"></div>
      <div className="w-[259px] h-[65px] absolute left-[12px] top-[9px]">
        {/* Header with cluster ID and coordinates */}
        <div className="w-[259px] h-[18px] flex justify-between items-start mb-3">
          <div className="text-[#E3F3F2] font-ubuntu text-base font-medium leading-normal overflow-hidden text-ellipsis whitespace-nowrap max-w-[145px]">
            {clusterId}
          </div>
          <div className="text-[#E3F3F2] text-right font-ubuntu text-[10px] font-light leading-normal opacity-60 w-[116px]">
            {coordinates}
          </div>
        </div>

        {/* Details section */}
        <div className="flex flex-col gap-[1px]">
          <div className="flex justify-between items-baseline">
            <span className="text-[#E3F3F2] font-ubuntu text-[10px] font-normal leading-normal">
              Detection interval
            </span>
            <span className="text-[#E3F3F2] font-ubuntu text-[10px] font-light leading-normal">
              {detectionInterval}
            </span>
          </div>
          <div className="flex justify-between items-baseline">
            <span className="text-[#E3F3F2] font-ubuntu text-[10px] font-normal leading-normal">
              Objects type
            </span>
            <span className="text-[#E3F3F2] font-ubuntu text-[10px] font-light leading-normal">
              {objectsType}
            </span>
          </div>
          <div className="flex justify-between items-baseline">
            <span className="text-[#E3F3F2] font-ubuntu text-[10px] font-normal leading-normal">
              Responsible UAV
            </span>
            <span className="text-[#E3F3F2] font-ubuntu text-[10px] font-light leading-normal">
              {responsibleUAV}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetectionItem;
