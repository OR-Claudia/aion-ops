import React, { useState } from "react";
import { Layout } from "../components/layout";
import { UAVCard, FilterControls, SectionHeader } from "../components/ui";
import type { UAVData } from "../components/ui/UAVCard";
import type {
  FilterState,
  FilterConfig,
} from "../components/ui/FilterControls";

const UAVListPage: React.FC = () => {
  const [filteredUAVs, setFilteredUAVs] = useState<UAVData[]>([]);

  // Filter configurations for the UAV list
  const filterConfigs: FilterConfig[] = [
    {
      key: "brand",
      label: "Brand",
      options: [
        "UAV 22456",
        "Athlon Furia",
        "Parrot AR 2.0",
        "UkrJet Bobr",
        "Kolibri 7",
        "UkrSpecSystems Shark",
        "Mavic air",
        "Global Hawk RQ-4",
      ],
    },
    {
      key: "status",
      label: "Status",
      options: [
        "active",
        "damage",
        "standby",
        "destroyed",
        "engaged",
        "offline",
      ],
    },
    {
      key: "missionType",
      label: "Mission type",
      options: ["tactical", "combat", "recon"],
    },
  ];

  // Sample UAV data matching the design
  const uavData: UAVData[] = [
    {
      id: "78239",
      name: "Athlon Furia (ID:78239)",
      type: "tactical",
      status: "damage",
      image:
        "https://api.builder.io/api/v1/image/assets/TEMP/4f096b02ea6202e65bd14e12c238cb997a8a618d?width=554",
      lastContact: "15/03/2025 06:27 pm",
      readyForFlight: "Yes",
      lastKnownLocation: "N/A",
      location: "Hangar H6",
    },
    {
      id: "22456",
      name: "UAV 22456 (ID:22456)",
      type: "combat",
      status: "active",
      image:
        "https://api.builder.io/api/v1/image/assets/TEMP/f476cc02d51fe1eb0607cb92d090efc91a3f3cf6?width=554",
      lastContact: "N/A",
      readyForFlight: "Yes",
      lastKnownLocation: "N/A",
      location: "Hangar H6",
    },
    {
      id: "274",
      name: "Parrot AR 2.0 (ID:274)",
      type: "tactical",
      status: "standby",
      image:
        "https://api.builder.io/api/v1/image/assets/TEMP/309b73395a37595a2f2e74d4e6787fbbcdf00765?width=554",
      lastContact: "Yesterday 08:44 am",
      readyForFlight: "Yes",
      lastKnownLocation: "N/A",
      location: "Hangar H6",
    },
    {
      id: "9931",
      name: "UkrJet Bobr UJ26 (ID:9931)",
      type: "combat",
      status: "destroyed",
      image:
        "https://api.builder.io/api/v1/image/assets/TEMP/e11088e3e85ed9a71bb357fdf440abc0184c8908?width=552",
      lastContact: "Today 05:31 am",
      readyForFlight: "No",
      lastKnownLocation: "lon 14.936 lat 178.9866",
      location: "N/A",
    },
    {
      id: "4452",
      name: "Kolibri 7 (ID:4452)",
      type: "tactical",
      status: "damage",
      image:
        "https://api.builder.io/api/v1/image/assets/TEMP/4c287b89be0c407640c8f81eebc78453161de70a?width=554",
      lastContact: "Yesterday 08:44 am",
      readyForFlight: "Yes",
      lastKnownLocation: "Hangar H6",
      location: "N/A",
    },
    {
      id: "3456",
      name: "UkrSpecSystems Shark (ID:3456)",
      type: "combat",
      status: "engaged",
      image:
        "https://api.builder.io/api/v1/image/assets/TEMP/668c75c5c826b3fd84337434710142918b6a9c7e?width=554",
      lastContact: "29/03/2025 08:44 am",
      readyForFlight: "Yes",
      lastKnownLocation: "Hangar H6",
      location: "lon 14.936 lat 178.9866",
    },
    {
      id: "33450",
      name: "UAV 33450 (ID:33450)",
      type: "combat",
      status: "offline",
      image:
        "https://api.builder.io/api/v1/image/assets/TEMP/c88d5aaf8fcbbac5b9b290c77f03d8e89504a97f?width=554",
      lastContact: "08/03/2025 08:44 am",
      readyForFlight: "Yes",
      lastKnownLocation: "N/A",
      location: "Hangar W5",
    },
    {
      id: "20037",
      name: "Mavic air (ID:20037)",
      type: "tactical",
      status: "engaged",
      image:
        "https://api.builder.io/api/v1/image/assets/TEMP/cdbb50c6cf6bfd1fb926deb3b4187dc355868f6c?width=554",
      lastContact: "Today 04:48 pm",
      readyForFlight: "Yes",
      lastKnownLocation: "N/A",
      location: "Serbia",
    },
    {
      id: "global-hawk",
      name: "Global Hawk RQ-4",
      type: "recon",
      status: "active",
      image:
        "https://api.builder.io/api/v1/image/assets/TEMP/666fff2ac2853f8097ba262a6c17a165b9b4da09?width=554",
      lastContact: "Yesterday 08:44 am",
      readyForFlight: "Yes",
      lastKnownLocation: "Hangar H6",
      location: "Hangar H6",
    },
    // Additional UAV entries for better testing
    {
      id: "55789",
      name: "Athlon Furia (ID:55789)",
      type: "recon",
      status: "active",
      image:
        "https://api.builder.io/api/v1/image/assets/TEMP/4f096b02ea6202e65bd14e12c238cb997a8a618d?width=554",
      lastContact: "Today 07:15 am",
      readyForFlight: "Yes",
      lastKnownLocation: "lon 15.244 lat 179.1122",
      location: "Field Base Alpha",
    },
    {
      id: "44321",
      name: "UAV 44321 (ID:44321)",
      type: "tactical",
      status: "standby",
      image:
        "https://api.builder.io/api/v1/image/assets/TEMP/f476cc02d51fe1eb0607cb92d090efc91a3f3cf6?width=554",
      lastContact: "Today 06:22 am",
      readyForFlight: "Yes",
      lastKnownLocation: "N/A",
      location: "Hangar B2",
    },
    {
      id: "88901",
      name: "Parrot AR 2.0 (ID:88901)",
      type: "combat",
      status: "offline",
      image:
        "https://api.builder.io/api/v1/image/assets/TEMP/309b73395a37595a2f2e74d4e6787fbbcdf00765?width=554",
      lastContact: "12/03/2025 03:15 pm",
      readyForFlight: "No",
      lastKnownLocation: "N/A",
      location: "Maintenance Bay 3",
    },
    {
      id: "77654",
      name: "UkrJet Bobr UJ26 (ID:77654)",
      type: "recon",
      status: "engaged",
      image:
        "https://api.builder.io/api/v1/image/assets/TEMP/e11088e3e85ed9a71bb357fdf440abc0184c8908?width=552",
      lastContact: "Today 08:45 am",
      readyForFlight: "Yes",
      lastKnownLocation: "lon 16.455 lat 180.2366",
      location: "Sector 7 Patrol",
    },
    {
      id: "99123",
      name: "Kolibri 7 (ID:99123)",
      type: "combat",
      status: "active",
      image:
        "https://api.builder.io/api/v1/image/assets/TEMP/4c287b89be0c407640c8f81eebc78453161de70a?width=554",
      lastContact: "Today 05:12 am",
      readyForFlight: "Yes",
      lastKnownLocation: "lon 13.122 lat 177.8911",
      location: "Forward Operating Base",
    },
    {
      id: "66543",
      name: "UkrSpecSystems Shark (ID:66543)",
      type: "tactical",
      status: "damage",
      image:
        "https://api.builder.io/api/v1/image/assets/TEMP/668c75c5c826b3fd84337434710142918b6a9c7e?width=554",
      lastContact: "Yesterday 11:30 pm",
      readyForFlight: "No",
      lastKnownLocation: "N/A",
      location: "Repair Facility A",
    },
    {
      id: "11987",
      name: "UAV 11987 (ID:11987)",
      type: "recon",
      status: "standby",
      image:
        "https://api.builder.io/api/v1/image/assets/TEMP/c88d5aaf8fcbbac5b9b290c77f03d8e89504a97f?width=554",
      lastContact: "Today 04:33 am",
      readyForFlight: "Yes",
      lastKnownLocation: "N/A",
      location: "Hangar C4",
    },
    {
      id: "33456",
      name: "Mavic air (ID:33456)",
      type: "combat",
      status: "destroyed",
      image:
        "https://api.builder.io/api/v1/image/assets/TEMP/cdbb50c6cf6bfd1fb926deb3b4187dc355868f6c?width=554",
      lastContact: "10/03/2025 02:14 pm",
      readyForFlight: "No",
      lastKnownLocation: "lon 12.677 lat 176.3345",
      location: "N/A",
    },
    {
      id: "44567",
      name: "Global Hawk RQ-4 (ID:44567)",
      type: "tactical",
      status: "engaged",
      image:
        "https://api.builder.io/api/v1/image/assets/TEMP/666fff2ac2853f8097ba262a6c17a165b9b4da09?width=554",
      lastContact: "Today 09:18 am",
      readyForFlight: "Yes",
      lastKnownLocation: "lon 17.899 lat 181.4567",
      location: "Mission Zone Delta",
    },
    {
      id: "55432",
      name: "Athlon Furia (ID:55432)",
      type: "combat",
      status: "offline",
      image:
        "https://api.builder.io/api/v1/image/assets/TEMP/4f096b02ea6202e65bd14e12c238cb997a8a618d?width=554",
      lastContact: "11/03/2025 07:55 pm",
      readyForFlight: "No",
      lastKnownLocation: "N/A",
      location: "Storage Facility B",
    },
    {
      id: "78902",
      name: "UAV 78902 (ID:78902)",
      type: "recon",
      status: "active",
      image:
        "https://api.builder.io/api/v1/image/assets/TEMP/f476cc02d51fe1eb0607cb92d090efc91a3f3cf6?width=554",
      lastContact: "Today 10:42 am",
      readyForFlight: "Yes",
      lastKnownLocation: "lon 18.234 lat 182.1123",
      location: "Reconnaissance Patrol",
    },
    {
      id: "12345",
      name: "Parrot AR 2.0 (ID:12345)",
      type: "tactical",
      status: "damage",
      image:
        "https://api.builder.io/api/v1/image/assets/TEMP/309b73395a37595a2f2e74d4e6787fbbcdf00765?width=554",
      lastContact: "Yesterday 01:22 pm",
      readyForFlight: "No",
      lastKnownLocation: "N/A",
      location: "Maintenance Dock 5",
    },
  ];

  // Initialize with all UAVs
  React.useEffect(() => {
    setFilteredUAVs(uavData);
  }, []);

  const handleFilterChange = (filters: FilterState) => {
    let filtered = uavData;

    if (filters.brand) {
      filtered = filtered.filter((uav) =>
        uav.name.toLowerCase().includes(filters.brand.toLowerCase()),
      );
    }

    if (filters.status) {
      filtered = filtered.filter((uav) => uav.status === filters.status);
    }

    if (filters.missionType) {
      filtered = filtered.filter((uav) => uav.type === filters.missionType);
    }

    setFilteredUAVs(filtered);
  };

  const handleUAVClick = (uav: UAVData) => {
    // Navigate to UAV detail page or handle selection
    console.log("Selected UAV:", uav);
  };

  return (
    <Layout>
      <div className="flex justify-center w-full">
        <div className="relative w-[70%] max-w-[1200px] pt-[64px]">
          {/* Header and Filter Row */}
          <div className="mb-[32px] z-30">
            <div className="flex items-center gap-8">
              <SectionHeader title="Active UAVs" width="w-[267px]" />
              <div className="w-[561px] h-10">
                <FilterControls
                  filters={filterConfigs}
                  onFilterChange={handleFilterChange}
                />
              </div>
            </div>
          </div>

          {/* Main Container */}
          <div className="relative w-full h-[678px] z-20 rounded-[10px] border-[1.5px] border-[rgba(211,251,216,0.5)] bg-black/70 backdrop-blur-[2px]">
            {/* Scrollbar */}
            <div className="absolute right-[14px] top-5 w-1 h-[143px] rounded-[3px] opacity-30 bg-white" />

            {/* Content inside container */}
            <div className="w-full h-full overflow-hidden pt-[32px] flex justify-center">
              {/* UAV Grid */}
              <div className="flex flex-wrap justify-center h-full overflow-y-auto pr-4">
                {filteredUAVs.map((uav) => (
                  <UAVCard key={uav.id} uav={uav} onClick={handleUAVClick} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default UAVListPage;
