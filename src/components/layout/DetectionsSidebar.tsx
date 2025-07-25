import React, { useState } from "react";
import { SectionHeader, FilterControls, ClusterDetailsModal } from "../ui";
import DetectionItem from "../ui/DetectionItem";
import type { FilterState } from "../ui/FilterControls";
import type { DetectionData } from "./DetectionData";
import { allDetectionItems } from "./DetectionData";

const DetectionsSidebar: React.FC = () => {
  const [filteredDetections, setFilteredDetections] =
    useState<DetectionData[]>(allDetectionItems);

  const [selectedCluster, setSelectedCluster] = useState<DetectionData | null>(
    null,
  );
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleFilterChange = (filters: FilterState) => {
    let filtered = allDetectionItems;

    if (filters.type) {
      filtered = filtered.filter(
        (detection) => detection.objectsType === filters.type,
      );
    }

    if (filters.uav) {
      filtered = filtered.filter((detection) =>
        detection.responsibleUAV
          .toLowerCase()
          .includes(filters.uav.toLowerCase()),
      );
    }

    setFilteredDetections(filtered);
  };

  const handleClusterClick = (cluster: DetectionData) => {
    setSelectedCluster(cluster);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedCluster(null);
  };

  return (
    <>
      <div className="fixed top-[143px] left-[24px] w-[350px] h-[758px] z-10">
        {/* Header and Filter Row */}
        <div className="mb-[16px]">
          <div className="flex items-center gap-2">
            <SectionHeader
              title="Detections"
              width="w-[255px]"
              className="flex-shrink-0"
            />
            <FilterControls
              filters={[
                {
                  key: "type",
                  label: "Object Type",
                  options: ["mixed", "vehicle", "personnel", "unknown"],
                },
                {
                  key: "uav",
                  label: "UAV",
                  options: [
                    "UAV 22456",
                    "20037 Mavic air",
                    "UAV 335663",
                    "Kolibri 7",
                  ],
                },
              ]}
              onFilterChange={handleFilterChange}
            />
          </div>
        </div>

        {/* Detection list container */}
        <div className="relative w-[350px] h-[701px] rounded-[10px] border-[1.5px] border-[rgba(211,251,216,0.5)] bg-black/60 backdrop-blur-[2px] mt-[7px]">
          {/* Scrollable content */}
          <div className="absolute left-[17px] top-[20px] w-[316px] h-[670px] flex flex-col items-start overflow-y-auto pr-2">
            <div className="flex flex-col items-start w-[283px]">
              {filteredDetections.map((item, index) => (
                <DetectionItem
                  key={index}
                  clusterId={item.clusterId}
                  coordinates={item.coordinates}
                  detectionInterval={item.detectionInterval}
                  objectsType={item.objectsType}
                  responsibleUAV={item.responsibleUAV}
                  onClick={() => handleClusterClick(item)}
                  isSelected={selectedCluster?.clusterId === item.clusterId}
                />
              ))}
            </div>
          </div>

          {/* Scrollbar indicator */}
          <div className="w-1 h-[143px] rounded-[3px] opacity-30 bg-white absolute right-3 top-[15px]"></div>

          {/* Bottom gradient overlay */}
          <div className="w-[264px] h-[86px] rounded-[10px] bg-gradient-to-b from-transparent to-black mix-blend-darken absolute left-[2px] bottom-0"></div>
        </div>
      </div>

      {/* Cluster Details Modal */}
      <ClusterDetailsModal
        cluster={selectedCluster}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </>
  );
};

export default DetectionsSidebar;
