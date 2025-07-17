# Project Structure

This project follows a scalable folder structure with React Router for navigation.

## Folder Organization

```
src/
├── components/           # Reusable components
│   ├── layout/          # Layout components (TopBar, Sidebar, etc.)
│   │   ├── TopBar.tsx
│   │   ├── Sidebar.tsx
│   │   ├── MapContainer.tsx
│   │   └── index.ts
│   ├── ui/              # UI components (FeedItem, StatusIndicator, etc.)
│   │   ├── FeedItem.tsx
│   │   ├── MapStatusIndicator.tsx
│   │   ├── MapProviderSwitcher.tsx
│   ��   ├── ExpandableToolsPanel.tsx
│   │   ├── StatusIndicator.tsx
│   │   └── index.ts
│   └── index.ts         # Main components export
├── pages/               # Page components
│   ├── HomePage.tsx     # Main dashboard page
│   ├── UAVDetailsPage.tsx # Individual UAV details
│   ├── AnalyticsPage.tsx  # Analytics dashboard
│   └── index.ts         # Pages export
├── App.tsx              # Main app with router setup
├── main.tsx             # Entry point
└── index.css            # Global styles with Tailwind

```

## Component Categories

### Layout Components (`/components/layout/`)

- **TopBar**: Main navigation bar with user profile
- **Sidebar**: Recent feeds panel with UAV list
- **MapContainer**: Interactive map with Leaflet integration

### UI Components (`/components/ui/`)

- **FeedItem**: Individual UAV feed card
- **MapStatusIndicator**: Interactive location pins on map
- **MapProviderSwitcher**: Map style switcher dropdown
- **ExpandableToolsPanel**: Collapsible tools panel
- **StatusIndicator**: Generic status indicator component

### Pages (`/pages/`)

- **HomePage**: Main dashboard with map and sidebar
- **UAVDetailsPage**: Detailed view for individual UAVs
- **AnalyticsPage**: Analytics and reporting dashboard

## Adding New Pages

1. Create new page component in `/pages/`
2. Export it from `/pages/index.ts`
3. Add route in `/App.tsx`
4. Import page component in App.tsx

Example:

```tsx
// pages/SettingsPage.tsx
const SettingsPage: React.FC = () => {
  // Page implementation
};

// pages/index.ts
export { default as SettingsPage } from "./SettingsPage";

// App.tsx
import { HomePage, SettingsPage } from "./pages";
<Route path="/settings" element={<SettingsPage />} />;
```

## Navigation

Current routes:

- `/` - HomePage (main dashboard)
- `/uav/:id` - UAVDetailsPage (individual UAV details)
- `/analytics` - AnalyticsPage (analytics dashboard)

## Technologies

- **React 19** with TypeScript
- **React Router** for navigation
- **Tailwind CSS** for styling
- **Leaflet** for interactive maps
- **Vite** for build tooling
