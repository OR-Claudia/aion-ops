import { create } from 'zustand';

export interface FeedItem {
  id: string;
  name: string;
  timestamp: string;
  region: string;
  status: string;
  flightDuration: string;
}

interface FeedStoreState {
  feedItems: FeedItem[];
  // Actions
  addFeedItem: (item: FeedItem) => void;
  removeFeedItem: (id: string) => void;
  updateFeedItem: (id: string, updates: Partial<FeedItem>) => void;
  getFeedItemById: (id: string) => FeedItem | undefined;
}

// Initial feed data
const initialFeedData: FeedItem[] = [
  {
    id: "1",
    name: "UAV 22456",
    timestamp: "13.02.2025 06:39AM",
    region: "Warsaw N",
    status: "active",
    flightDuration: "1h34m22s",
  },
  {
    id: "2",
    name: "Kolibri 7 (ID:4452)",
    timestamp: "13.02.2025 06:35AM",
    region: "Warsaw N",
    status: "offline",
    flightDuration: "2h12m15s",
  },
  {
    id: "3",
    name: "Shark (ID:3456)",
    timestamp: "13.02.2025 06:32AM",
    region: "Krakow S",
    status: "engaged",
    flightDuration: "45m33s",
  },
  {
    id: "4",
    name: "Bobr UJ26 (ID:9931)",
    timestamp: "13.02.2025 06:28AM",
    region: "Warsaw N",
    status: "warning",
    flightDuration: "3h22m10s",
  },
  {
    id: "5",
    name: "Eagle Alpha",
    timestamp: "13.02.2025 06:25AM",
    region: "Gdansk E",
    status: "active",
    flightDuration: "1h55m44s",
  },
  {
    id: "6",
    name: "Phoenix Beta",
    timestamp: "13.02.2025 06:20AM",
    region: "Wroclaw W",
    status: "standby",
    flightDuration: "25m12s",
  },
  {
    id: "7",
    name: "Hawk Delta",
    timestamp: "13.02.2025 06:18AM",
    region: "Warsaw N",
    status: "active",
    flightDuration: "4h15m33s",
  },
  {
    id: "8",
    name: "Falcon Gamma",
    timestamp: "13.02.2025 06:15AM",
    region: "Poznan C",
    status: "offline",
    flightDuration: "2h45m18s",
  },
  {
    id: "9",
    name: "Raven Echo",
    timestamp: "13.02.2025 06:12AM",
    region: "Lublin S",
    status: "maintenance",
    flightDuration: "0h35m22s",
  },
  {
    id: "10",
    name: "Osprey Foxtrot",
    timestamp: "13.02.2025 06:08AM",
    region: "Warsaw N",
    status: "active",
    flightDuration: "6h12m45s",
  },
  {
    id: "11",
    name: "Condor Hotel",
    timestamp: "13.02.2025 06:05AM",
    region: "Katowice S",
    status: "warning",
    flightDuration: "1h22m55s",
  },
  {
    id: "12",
    name: "Sparrow India",
    timestamp: "13.02.2025 06:02AM",
    region: "Bialystok E",
    status: "engaged",
    flightDuration: "3h44m12s",
  },
];

export const useFeedStore = create<FeedStoreState>((set, get) => ({
  feedItems: initialFeedData,

  addFeedItem: (item: FeedItem) =>
    set((state) => ({
      feedItems: [item, ...state.feedItems],
    })),

  removeFeedItem: (id: string) =>
    set((state) => ({
      feedItems: state.feedItems.filter(item => item.id !== id),
    })),

  updateFeedItem: (id: string, updates: Partial<FeedItem>) =>
    set((state) => ({
      feedItems: state.feedItems.map(item =>
        item.id === id ? { ...item, ...updates } : item
      ),
    })),

  getFeedItemById: (id: string) => {
    const { feedItems } = get();
    return feedItems.find(item => item.id === id);
  },
}));
