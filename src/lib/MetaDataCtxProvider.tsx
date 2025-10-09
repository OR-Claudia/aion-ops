import { useReducer, type FC, type ReactNode } from "react";
import { MetaDataCtx, metaDataDefault, type MetaData } from "./utils";

type ActionTypes = "update" | "updateActiveFrame";
interface MetaDataReducerAct {
	type: ActionTypes;
	payload?: Partial<MetaData>;
}

const reducer = (prevState: MetaData, action: MetaDataReducerAct): MetaData => {
	switch (action.type) {
		case "update": {
			const newState = { ...(action.payload as Partial<MetaData>) };
			if (typeof newState.selectedDetection !== "undefined") {
				if (prevState.selectedDetection === newState.selectedDetection) {
					newState.selectedDetection = null;
				}
			}
			return { ...prevState, ...newState };
		}
		case "updateActiveFrame": {
			if (!action.payload) return prevState;
			return { ...prevState, activeFrame: action.payload?.activeFrame };
		}
		default:
			return prevState;
	}
};

export const MetaDataCtxProvider: FC<{ children: ReactNode }> = ({
	children,
}) => {
	const [state, dispatch] = useReducer(reducer, {
		...metaDataDefault,
		activeFrame: null,
	});

	const updateMetaData = (newMetaData: Partial<MetaData>): void => {
		dispatch({
			type: "update",
			payload: newMetaData,
		});
	};

	const updateActiveFrame = (activeFrame: MetaData["activeFrame"]): void => {
		dispatch({
			type: "updateActiveFrame",
			payload: { activeFrame },
		});
	};

	return (
		<MetaDataCtx.Provider value={[state, updateMetaData, updateActiveFrame]}>
			{children}
		</MetaDataCtx.Provider>
	);
};
