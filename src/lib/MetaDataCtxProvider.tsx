import { useReducer, type FC, type ReactNode } from "react";
import { MetaDataCtx, metaDataDefault, type MetaData } from "./utils";

type ActionTypes = 'update';

interface MetaDataReducerAct {
  type: ActionTypes;
  payload?: Partial<MetaData>;
}

const reducer = (prevState: MetaData, action: MetaDataReducerAct): MetaData => {
  switch(action.type) {
    case 'update':
      return {...action.payload as MetaData};
    default:
      return prevState;
  }
};

export const MetaDataCtxProvider: FC<{ children: ReactNode }> = ({ children }) => {

  const [state, dispatch] = useReducer(reducer, metaDataDefault);

  const updateMetaData = (newMetaData: Partial<MetaData>): void => {
    dispatch({
      type: "update",
      payload: newMetaData,
    });
  };

  return <MetaDataCtx.Provider value={{...state, updateMetaData}}>{children}</MetaDataCtx.Provider>;
};