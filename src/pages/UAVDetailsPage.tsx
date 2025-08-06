import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Layout } from "../components/layout";
import { useUAVStore } from "../stores";

const UAVDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getUAVById } = useUAVStore();
  const uav = id ? getUAVById(id) : null;

  return (
    <Layout>
      <div className="pt-32 px-16">
        <div className="bg-black/60 border-[1.5px] border-[rgba(211,251,216,0.5)] rounded-[10px] backdrop-blur-[2px] p-8">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-[#E3F3F2] font-ubuntu text-3xl font-medium">
              UAV Details - {id}
            </h1>
            <button
              onClick={() => navigate("/uavs")}
              className="px-4 py-2 bg-[#00C6B8] text-[#1F2630] font-ubuntu rounded-md hover:bg-[#00C6B8]/80 transition-colors"
            >
              Back to UAV List
            </button>
          </div>

          {uav ? (
            <div className="text-[#E3F3F2] font-ubuntu">
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <h2 className="text-xl font-medium mb-4">Basic Information</h2>
                  <div className="space-y-2">
                    <p><span className="text-[#00C6B8]">Name:</span> {uav.name}</p>
                    <p><span className="text-[#00C6B8]">Type:</span> {uav.type}</p>
                    <p><span className="text-[#00C6B8]">Status:</span> {uav.status}</p>
                    <p><span className="text-[#00C6B8]">Location:</span> {uav.location}</p>
                    <p><span className="text-[#00C6B8]">Ready for Flight:</span> {uav.readyForFlight}</p>
                  </div>
                </div>
                <div>
                  <h2 className="text-xl font-medium mb-4">Mission Details</h2>
                  <div className="space-y-2">
                    <p><span className="text-[#00C6B8]">Mission:</span> {uav.mission}</p>
                    <p><span className="text-[#00C6B8]">Control Unit:</span> {uav.controlUnit}</p>
                    <p><span className="text-[#00C6B8]">Last Contact:</span> {uav.lastContact}</p>
                    <p><span className="text-[#00C6B8]">Flight Time:</span> {uav.totalFlightTime}</p>
                  </div>
                </div>
              </div>
              <div className="mt-6">
                <h2 className="text-xl font-medium mb-4">Technical Status</h2>
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <p><span className="text-[#00C6B8]">Signal:</span> {uav.signalPercentage}%</p>
                    <p><span className="text-[#00C6B8]">Battery:</span> {uav.batteryPercentage}%</p>
                  </div>
                  <div>
                    <p><span className="text-[#00C6B8]">Key Events:</span> {uav.keyEvents}</p>
                    <p><span className="text-[#00C6B8]">Last Known Location:</span> {uav.lastKnownLocation}</p>
                  </div>
                </div>
              </div>
              <div className="mt-6">
                <h2 className="text-xl font-medium mb-4">Description</h2>
                <p className="text-sm opacity-90">{uav.description}</p>
              </div>
            </div>
          ) : (
            <div className="text-[#E3F3F2] font-ubuntu">
              <p>UAV with ID "{id}" not found.</p>
              <p className="mt-4 text-sm opacity-70">
                The requested UAV does not exist or has been removed from the system.
              </p>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default UAVDetailsPage;
