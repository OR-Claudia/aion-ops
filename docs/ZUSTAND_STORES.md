# Zustand State Management Implementation

This document describes the Zustand state management implementation for the Aion Ops project.

## Overview

We have implemented Zustand stores for each page that contains data objects, moving away from local component state to centralized state management. This provides better organization, maintainability, and potential for future feature additions.

## Store Structure

All stores are located in the `src/stores/` directory with the following structure:

```
src/stores/
├── index.ts          # Central export file for all stores
├── uavStore.ts       # Store for UAV data (UAVListPage, UAVDetailsPage)
├── storageStore.ts   # Store for storage/recording data (StoragePage)
├── detectionStore.ts # Store for detection cluster data (DetectionsPage)
└── feedStore.ts      # Store for feed items (HomePage sidebar)
```

## Individual Stores

### 1. UAV Store (`uavStore.ts`)

**Purpose**: Manages UAV data for the UAV list and details pages.

**State**:
- `uavs`: Complete array of UAV data
- `filteredUAVs`: Filtered UAV array based on applied filters
- `selectedUAV`: Currently selected UAV for detail view

**Actions**:
- `setFilteredUAVs()`: Updates the filtered UAV list
- `setSelectedUAV()`: Sets the selected UAV
- `getUAVById()`: Retrieves a specific UAV by ID
- `filterUAVs()`: Applies filters (brand, status, mission type)

**Used in**:
- `UAVListPage.tsx`
- `UAVDetailsPage.tsx`

### 2. Storage Store (`storageStore.ts`)

**Purpose**: Manages storage/recording data for the storage page.

**State**:
- `records`: Complete array of storage records
- `filteredRecords`: Filtered records based on applied filters
- `selectedRecord`: Currently selected record for detail view

**Actions**:
- `setFilteredRecords()`: Updates the filtered records list
- `setSelectedRecord()`: Sets the selected record
- `getRecordById()`: Retrieves a specific record by ID
- `filterRecords()`: Applies filters (UAV, status, mission type)

**Used in**:
- `StoragePage.tsx`

### 3. Detection Store (`detectionStore.ts`)

**Purpose**: Manages detection cluster data for the detections page.

**State**:
- `detections`: Complete array of detection data
- `filteredDetections`: Filtered detections based on applied filters
- `selectedDetection`: Currently selected detection for modal display

**Actions**:
- `setFilteredDetections()`: Updates the filtered detections list
- `setSelectedDetection()`: Sets the selected detection
- `getDetectionById()`: Retrieves a specific detection by cluster ID
- `filterDetections()`: Applies filters (type, UAV)

**Used in**:
- `DetectionsSidebar.tsx`

### 4. Feed Store (`feedStore.ts`)

**Purpose**: Manages feed items for the homepage sidebar.

**State**:
- `feedItems`: Array of feed items

**Actions**:
- `addFeedItem()`: Adds a new feed item
- `removeFeedItem()`: Removes a feed item by ID
- `updateFeedItem()`: Updates an existing feed item
- `getFeedItemById()`: Retrieves a specific feed item by ID

**Used in**:
- `Sidebar.tsx` (Homepage)

## Data Migration

The following data has been moved from local component state to Zustand stores:

1. **UAV Data**: Moved from `UAVListPage.tsx` local state to `uavStore.ts`
2. **Storage Records**: Moved from `StoragePage.tsx` local state to `storageStore.ts`
3. **Detection Clusters**: Moved from `DetectionData.ts` to `detectionStore.ts`
4. **Feed Items**: Moved from `Sidebar.tsx` local state to `feedStore.ts`

## Usage Examples

### Using UAV Store
```typescript
import { useUAVStore } from '../stores';

const MyComponent = () => {
  const { 
    filteredUAVs, 
    selectedUAV, 
    setSelectedUAV, 
    filterUAVs 
  } = useUAVStore();

  // Filter UAVs
  const handleFilter = () => {
    filterUAVs({ status: 'active', type: 'tactical' });
  };

  // Select UAV
  const handleSelect = (uav) => {
    setSelectedUAV(uav);
  };
};
```

### Using Detection Store
```typescript
import { useDetectionStore } from '../stores';

const DetectionComponent = () => {
  const { 
    filteredDetections, 
    selectedDetection, 
    filterDetections 
  } = useDetectionStore();

  // Apply filters
  const handleFilterChange = (filters) => {
    filterDetections({
      type: filters.type,
      uav: filters.uav,
    });
  };
};
```

## Benefits

1. **Centralized State**: All data is managed in dedicated stores rather than scattered across components
2. **Better Organization**: Clear separation of concerns with one store per data domain
3. **Type Safety**: Full TypeScript support with proper interfaces
4. **Reusability**: Data can be easily accessed from multiple components
5. **Performance**: Zustand provides efficient state updates and subscriptions
6. **Future-Ready**: Easy to extend with additional functionality like API integration, persistence, etc.

## Future Enhancements

The stores are designed to be easily extended with additional functionality:

- **API Integration**: Add async actions for fetching data from backend
- **Persistence**: Add local storage or session storage persistence
- **Real-time Updates**: Add WebSocket integration for live data updates
- **Optimistic Updates**: Add optimistic UI updates for better UX
- **Caching**: Add intelligent caching mechanisms
- **Undo/Redo**: Add action history and undo/redo functionality

## Types

All stores export their data types through the main index file:

```typescript
import { 
  UAVData, 
  StorageData, 
  DetectionData, 
  FeedItem 
} from '../stores';
```

## Backward Compatibility

- The old `DetectionData.ts` file is kept for backward compatibility but now only exports types
- All existing component interfaces are maintained to ensure smooth transition
- No breaking changes to existing component APIs
