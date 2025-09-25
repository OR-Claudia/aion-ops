import { useState, type ReactNode, type FC, useEffect } from 'react';
import { UAVLocationsCtx } from './useUAVLocations';
import { type UAVLocation } from './UAVLocation';
import { uavLocations as initUAVLocations } from './uavLocations';

export interface UAVLocationsContextType {
  getAllUAVLocations: () => UAVLocation[];
  getUAVLocationById: (id: string | number) => UAVLocation | null;
}

export const UAVLocationsCtxProvider: FC<{children: ReactNode}> = ({ children }) => {
  // todo: logic for changing the marker data, replace this with react query loading the marker updates
  const [uavLocations, setUAVLocations] = useState<UAVLocation[]>(initUAVLocations);

  // DEMO MOVEMENT - move UAVs slightly every 2 seconds
  useEffect(() => {
    const intervalId = setInterval(() => {
      setUAVLocations((prevLocations: UAVLocation[]) =>
        prevLocations.map((uav: UAVLocation) => {
          const newLat = uav.position[0] + (Math.random() - 0.5) * 0.002;
          const newLon = uav.position[1] + (Math.random() - 0.5) * 0.002;
          return {
            ...uav,
            position: [newLat, newLon] as [number, number],
          };
        })
      );
    }, 2000);

    return () => clearInterval(intervalId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <UAVLocationsCtx.Provider value={{
    getAllUAVLocations: () => uavLocations,
    getUAVLocationById: (id: string | number): UAVLocation | null => {
      for (const marker of uavLocations) {
        if (marker.data.id === id) {
          return marker;
        }
      }
      return null;
    },
  }}>{children}</UAVLocationsCtx.Provider>
};