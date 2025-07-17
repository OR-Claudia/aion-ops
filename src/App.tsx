import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { HomePage, UAVListPage, UAVDetailsPage, DetectionsPage } from "./pages";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/uavs" element={<UAVListPage />} />
        <Route path="/uav/:id" element={<UAVDetailsPage />} />
        <Route path="/detections" element={<DetectionsPage />} />
        {/*
          Additional routes can be added here:
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="/reports" element={<ReportsPage />} />
        */}
      </Routes>
    </Router>
  );
}

export default App;
