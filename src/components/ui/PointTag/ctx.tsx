import { type Dispatch, type SetStateAction, createContext, useContext } from 'react';

export interface PointTagCtx {
  close: () => void;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

export const pointTagCtx = createContext<PointTagCtx | null>(null);

export const usePointTag = () => {
  const ctx = useContext(pointTagCtx);
  if (!ctx) {
    throw new Error("This hook should only be used in PointTag context.");
  }
}