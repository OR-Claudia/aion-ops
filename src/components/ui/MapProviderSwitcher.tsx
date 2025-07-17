import React, { useState } from "react";

interface MapProviderSwitcherProps {
  onProviderChange: (provider: string, url: string) => void;
}

const MapProviderSwitcher: React.FC<MapProviderSwitcherProps> = ({
  onProviderChange,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentProvider, setCurrentProvider] = useState("Abstract");

  const providers = [
    {
      name: "Abstract",
      url: "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png",
      attribution: "&copy; CartoDB, &copy; OpenStreetMap contributors",
    },
    {
      name: "Satellite",
      url: "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
      attribution: "&copy; Esri",
    },
    {
      name: "Dark",
      url: "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png",
      attribution: "&copy; CartoDB",
    },
    {
      name: "Terrain",
      url: "https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png",
      attribution: "&copy; OpenTopoMap",
    },
  ];

  const handleProviderSelect = (provider: any) => {
    setCurrentProvider(provider.name);
    setIsOpen(false);
    onProviderChange(provider.name, provider.url);
  };

  return (
    <div className="fixed top-[120px] left-[380px] z-20">
      <div
        className="flex items-center gap-2 px-3 py-2 bg-black/80 border-[1.5px] border-[rgba(211,251,216,0.5)] rounded-md text-[#E3F3F2] font-ubuntu text-xs cursor-pointer backdrop-blur-[2px] transition-all duration-300 hover:bg-[rgba(0,198,184,0.2)]"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="text-base">🗺️</span>
        <span className="font-medium">{currentProvider}</span>
        <span
          className={`text-[10px] transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
        >
          ▼
        </span>
      </div>

      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-black/90 border-[1.5px] border-[rgba(211,251,216,0.5)] rounded-md backdrop-blur-[4px] overflow-hidden">
          {providers.map((provider) => (
            <div
              key={provider.name}
              className={`px-3 py-2 text-[#E3F3F2] font-ubuntu text-xs cursor-pointer transition-colors duration-200 hover:bg-[rgba(0,198,184,0.2)] ${
                currentProvider === provider.name
                  ? "bg-[rgba(0,198,184,0.3)] text-[#00C6B8]"
                  : ""
              }`}
              onClick={() => handleProviderSelect(provider)}
            >
              {provider.name}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MapProviderSwitcher;
