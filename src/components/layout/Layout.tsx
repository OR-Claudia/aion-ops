import React from "react";
import { useLocation } from "react-router-dom";
import TopBar from "./TopBar";
import MapContainer from "./MapContainer";
import { MessageBar, ExpandableToolsPanel } from "../ui";
import { MapContextProvider } from "./MapContext";

interface LayoutProps {
	children: React.ReactNode;
	showTools?: boolean;
}

const Layout: React.FC<LayoutProps> = ({ children, showTools = false }) => {
	const location = useLocation();
	const isHomePage = location.pathname === "/";

	return (
		<MapContextProvider>
			<div className="w-screen h-screen bg-[#222631] relative overflow-hidden font-ubuntu">
				{/* MapContainer - always present, but indicators only on homepage */}
				<MapContainer showIndicators={isHomePage} />

				{/* TopBar - always present */}
				<TopBar />

				{/* MessageBar - always present at bottom */}

				<div className="fixed bottom-[32px] w-[80%] z-20 left-1/2 transform -translate-x-1/2 ">
					<MessageBar />
				</div>

				{/* ExpandableToolsPanel - only on pages that request it */}
				{showTools && (
					<div
						className="fixed top-[143px] z-10 border-[rgba(211,251,216,0.5)] rounded-[10px_0px_0px_10px] border-t-[1.5px] border-l-[1.5px] border-b-[1.5px] border-border-glass bg-black/80 backdrop-blur-[2px]"
						style={{ right: 0 }}
					>
						<ExpandableToolsPanel />
					</div>
				)}

				{/* Page Content - rendered over the map */}
				<div className="relative z-50">
					<div className="pointer-events-auto">{children}</div>
				</div>
			</div>
		</MapContextProvider>
	);
};

export default Layout;
