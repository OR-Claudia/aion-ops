import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Layout } from "../components/layout";

const UAVDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

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

          <div className="text-[#E3F3F2] font-ubuntu">
            <p>UAV Details page for ID: {id}</p>
            <p className="mt-4 text-sm opacity-70">
              This page will show detailed information about the selected UAV.
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default UAVDetailsPage;
