import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { HomePage, UAVListPage, UAVDetailsPage, DetectionsPage, StoragePage } from "./pages";
import { DetectionProvider } from "./components/layout/DetectionContext";

function App() {
  return (
    <DetectionProvider>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/uavs" element={<UAVListPage />} />
          <Route path="/uav/:id" element={<UAVDetailsPage />} />
          <Route path="/detections" element={<DetectionsPage />} />
          <Route path="/storage" element={<StoragePage />} />
          {/*
            Additional routes can be added here:
            <Route path="/settings" element={<SettingsPage />} />
            <Route path="/reports" element={<ReportsPage />} />
          */}
        </Routes>
      </Router>
    </DetectionProvider>
  );
}

export default App;
