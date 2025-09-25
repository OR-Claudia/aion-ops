import { useContext, createContext } from "react";
import { type UAVLocationsContextType } from './UAVLocationsCtx';

export const UAVLocationsCtx = createContext<UAVLocationsContextType | null>(null);

export const useUAVLocations = () => {
  const ctx = useContext(UAVLocationsCtx);

  if (!ctx) {
    throw new Error('You must use UAV locations hook where the UAV locations context is available.')
  }

  return ctx;
};