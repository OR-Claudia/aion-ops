import { create } from 'zustand';

export interface StorageData {
  id: string;
  title: string;
  date: string;
  image: string;
  uav: string;
  missionType: string;
  flightDuration: string;
  operator: string;
  status: string;
  description: string;
  coordinates: string;
  videoUrl: string;
  mission: string;
  flightDatetime: string;
  operatorId: string;
  keyEvents: string;
  missionDescription: string;
  flightPath: string;
}

interface StorageStoreState {
  records: StorageData[];
  filteredRecords: StorageData[];
  selectedRecord: StorageData | null;
  // Actions
  setFilteredRecords: (records: StorageData[]) => void;
  setSelectedRecord: (record: StorageData | null) => void;
  getRecordById: (id: string) => StorageData | undefined;
  filterRecords: (filters: { uav?: string; status?: string; missionType?: string }) => void;
}

// Initial storage data
const initialStorageData: StorageData[] = [
  {
    id: "1",
    title: "Recon Patrol - 02/14/2025",
    date: "13.02.2025 06:39AM",
    image: "https://api.builder.io/api/v1/image/assets/TEMP/8c45012e7e0d9fc53fa827e203dab5c8f541002a?width=288",
    uav: "UAV 22456",
    missionType: "Recon",
    flightDuration: "1h33m",
    operator: "Charles Xavier",
    status: "Success",
    description: "The footage documents a reconnaissance operation, observing interactions between civilians and armored vehicles. No immediate hostile actions or engagements are noted. The recording focuses on movements, positioning, and general activity in the area, providing valuable situational awareness. Environmental conditions, audio clarity, and key points of interest are noted for further review.",
    coordinates: "-14.936, 178.9866",
    videoUrl: "https://api.builder.io/api/v1/image/assets/TEMP/44b9c8122a7a47d70f1b920b0520db9e595ee19a?width=827",
    mission: "Recon",
    flightDatetime: "25/03/2025 13:33",
    operatorId: "EMP101",
    keyEvents: "N/A",
    missionDescription: "Lorem ipsum dolor sit amet. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea Commodo Consequat.",
    flightPath: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  },
  {
    id: "2",
    title: "Recon Patrol - 05/05/2024",
    date: "13.02.2025 06:39AM",
    image: "https://api.builder.io/api/v1/image/assets/TEMP/1e9ff41e8c0533a88b02f5714433fb8c2b0a8cf4?width=288",
    uav: "20037 Mavic air",
    missionType: "Recon",
    flightDuration: "1h33m",
    operator: "Emma U. Brown",
    status: "Success",
    description: "The footage documents a reconnaissance operation, observing interactions between civilians and armored vehicles. No immediate hostile actions or engagements are noted. The recording focuses on movements, positioning, and general activity in the area, providing valuable situational awareness. Environmental conditions, audio clarity, and key points of interest are noted for further review.",
    coordinates: "-14.936, 178.9866",
    videoUrl: "https://api.builder.io/api/v1/image/assets/TEMP/44b9c8122a7a47d70f1b920b0520db9e595ee19a?width=827",
    mission: "Recon",
    flightDatetime: "05/05/2024 13:33",
    operatorId: "EMP102",
    keyEvents: "N/A",
    missionDescription: "Lorem ipsum dolor sit amet. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea Commodo Consequat.",
    flightPath: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  },
  {
    id: "3",
    title: "Recon Patrol - 12/22/2024",
    date: "13.02.2025 06:39AM",
    image: "https://api.builder.io/api/v1/image/assets/TEMP/eb10590cd8cf7c4a72ce0f0c52e5e1a3e96b8308?width=288",
    uav: "UAV 22456",
    missionType: "Recon",
    flightDuration: "1h33m",
    operator: "Luke P. Bailey",
    status: "Success",
    description: "The footage documents a reconnaissance operation, observing interactions between civilians and armored vehicles. No immediate hostile actions or engagements are noted. The recording focuses on movements, positioning, and general activity in the area, providing valuable situational awareness. Environmental conditions, audio clarity, and key points of interest are noted for further review.",
    coordinates: "-14.936, 178.9866",
    videoUrl: "https://api.builder.io/api/v1/image/assets/TEMP/44b9c8122a7a47d70f1b920b0520db9e595ee19a?width=827",
    mission: "Recon",
    flightDatetime: "12/22/2024 13:33",
    operatorId: "EMP103",
    keyEvents: "N/A",
    missionDescription: "Lorem ipsum dolor sit amet. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea Commodo Consequat.",
    flightPath: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  },
  {
    id: "4",
    title: "Recon Patrol - 12/18/2024",
    date: "13.02.2025 06:39AM",
    image: "https://api.builder.io/api/v1/image/assets/TEMP/e7e3ad66214149785e55acfa7a8aecd4c0f82268?width=288",
    uav: "UAV 33450",
    missionType: "Recon",
    flightDuration: "1h33m",
    operator: "Jaxon Z. Fisher",
    status: "Success",
    description: "The footage documents a reconnaissance operation, observing interactions between civilians and armored vehicles. No immediate hostile actions or engagements are noted. The recording focuses on movements, positioning, and general activity in the area, providing valuable situational awareness. Environmental conditions, audio clarity, and key points of interest are noted for further review.",
    coordinates: "-14.936, 178.9866",
    videoUrl: "https://api.builder.io/api/v1/image/assets/TEMP/44b9c8122a7a47d70f1b920b0520db9e595ee19a?width=827",
    mission: "Recon",
    flightDatetime: "12/18/2024 13:33",
    operatorId: "EMP104",
    keyEvents: "N/A",
    missionDescription: "Lorem ipsum dolor sit amet. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea Commodo Consequat.",
    flightPath: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  },
  {
    id: "5",
    title: "Recon Patrol - 01/18/2025",
    date: "13.02.2025 06:39AM",
    image: "https://api.builder.io/api/v1/image/assets/TEMP/e1433ad1a1b2b1e4d7cc343c61d9b6d847aa2a77?width=288",
    uav: "UAV 33450",
    missionType: "Recon",
    flightDuration: "1h33m",
    operator: "William D. White",
    status: "Success",
    description: "The footage documents a reconnaissance operation, observing interactions between civilians and armored vehicles. No immediate hostile actions or engagements are noted. The recording focuses on movements, positioning, and general activity in the area, providing valuable situational awareness. Environmental conditions, audio clarity, and key points of interest are noted for further review.",
    coordinates: "-14.936, 178.9866",
    videoUrl: "https://api.builder.io/api/v1/image/assets/TEMP/44b9c8122a7a47d70f1b920b0520db9e595ee19a?width=827",
    mission: "Recon",
    flightDatetime: "01/18/2025 13:33",
    operatorId: "EMP105",
    keyEvents: "N/A",
    missionDescription: "Lorem ipsum dolor sit amet. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea Commodo Consequat.",
    flightPath: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  },
  {
    id: "6",
    title: "Recon Patrol - 02/16/2025",
    date: "13.02.2025 06:39AM",
    image: "https://api.builder.io/api/v1/image/assets/TEMP/eb10590cd8cf7c4a72ce0f0c52e5e1a3e96b8308?width=288",
    uav: "20037 Mavic air",
    missionType: "Recon",
    flightDuration: "1h33m",
    operator: "Henry L. Scott",
    status: "Success",
    description: "The footage documents a reconnaissance operation, observing interactions between civilians and armored vehicles. No immediate hostile actions or engagements are noted. The recording focuses on movements, positioning, and general activity in the area, providing valuable situational awareness. Environmental conditions, audio clarity, and key points of interest are noted for further review.",
    coordinates: "-14.936, 178.9866",
    videoUrl: "https://api.builder.io/api/v1/image/assets/TEMP/44b9c8122a7a47d70f1b920b0520db9e595ee19a?width=827",
    mission: "Recon",
    flightDatetime: "02/16/2025 13:33",
    operatorId: "EMP106",
    keyEvents: "N/A",
    missionDescription: "Lorem ipsum dolor sit amet. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea Commodo Consequat.",
    flightPath: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  },
  {
    id: "7",
    title: "Recon Patrol - 02/18/2025",
    date: "13.02.2025 06:39AM",
    image: "https://api.builder.io/api/v1/image/assets/TEMP/5a8295c6f9a5352be5b2c5500f3fe7548476c906?width=288",
    uav: "UAV 33450",
    missionType: "Recon",
    flightDuration: "1h33m",
    operator: "Charles Xavier",
    status: "Success",
    description: "The footage documents a reconnaissance operation, observing interactions between civilians and armored vehicles. No immediate hostile actions or engagements are noted. The recording focuses on movements, positioning, and general activity in the area, providing valuable situational awareness. Environmental conditions, audio clarity, and key points of interest are noted for further review.",
    coordinates: "-14.936, 178.9866",
    videoUrl: "https://api.builder.io/api/v1/image/assets/TEMP/44b9c8122a7a47d70f1b920b0520db9e595ee19a?width=827",
    mission: "Recon",
    flightDatetime: "02/18/2025 13:33",
    operatorId: "EMP101",
    keyEvents: "N/A",
    missionDescription: "Lorem ipsum dolor sit amet. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea Commodo Consequat.",
    flightPath: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  },
  {
    id: "8",
    title: "Recon Patrol - 02/16/2025",
    date: "13.02.2025 06:39AM",
    image: "https://api.builder.io/api/v1/image/assets/TEMP/eb10590cd8cf7c4a72ce0f0c52e5e1a3e96b8308?width=288",
    uav: "Drone XYZ",
    missionType: "Recon",
    flightDuration: "1h33m",
    operator: "Charles Xavier",
    status: "Success",
    description: "The footage documents a reconnaissance operation, observing interactions between civilians and armored vehicles. No immediate hostile actions or engagements are noted. The recording focuses on movements, positioning, and general activity in the area, providing valuable situational awareness. Environmental conditions, audio clarity, and key points of interest are noted for further review.",
    coordinates: "-14.936, 178.9866",
    videoUrl: "https://api.builder.io/api/v1/image/assets/TEMP/44b9c8122a7a47d70f1b920b0520db9e595ee19a?width=827",
    mission: "Recon",
    flightDatetime: "02/16/2025 13:33",
    operatorId: "EMP101",
    keyEvents: "N/A",
    missionDescription: "Lorem ipsum dolor sit amet. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea Commodo Consequat.",
    flightPath: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  },
];

export const useStorageStore = create<StorageStoreState>((set, get) => ({
  records: initialStorageData,
  filteredRecords: initialStorageData,
  selectedRecord: null,

  setFilteredRecords: (records: StorageData[]) => set({ filteredRecords: records }),

  setSelectedRecord: (record: StorageData | null) => set({ selectedRecord: record }),

  getRecordById: (id: string) => {
    const { records } = get();
    return records.find(record => record.id === id);
  },

  filterRecords: (filters: { uav?: string; status?: string; missionType?: string }) => {
    const { records } = get();
    let filtered = records;

    if (filters.uav) {
      filtered = filtered.filter((record) =>
        record.uav.toLowerCase().includes(filters.uav!.toLowerCase())
      );
    }

    if (filters.status) {
      filtered = filtered.filter((record) => record.status === filters.status);
    }

    if (filters.missionType) {
      filtered = filtered.filter((record) => record.missionType === filters.missionType);
    }

    set({ filteredRecords: filtered });
  },
}));
