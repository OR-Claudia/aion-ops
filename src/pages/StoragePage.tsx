/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { Layout } from "../components/layout";
import {
	SectionHeader,
	FilterControls,
	StorageList,
	StorageDetailPanel,
} from "../components/ui";
import type { StorageData } from "../components/ui/StorageItem";
import type {
	FilterConfig,
	FilterState,
} from "../components/ui/FilterControls";
import { cn } from "../lib/utils";
import DetectionsModal from "../components/ui/Modals/DetectionsModal";
import MissionPathModal from "../components/ui/Modals/MissionPathModal";
import { getStorageList } from "../api/storage";
import AnalysisModal from "../components/ui/Modals/AnalysisModal";

const StoragePage: React.FC = () => {
	const [originalRecords, setOriginalRecords] = useState<StorageData[]>([]);
	const [filtered, setFiltered] = useState<StorageData[]>([]);
	const [selectedRecord, setSelectedRecord] = useState<StorageData | null>(
		null
	);
	const [detectionsOpen, setDetectionsOpen] = useState<boolean>(false);
	const [MissionPathOpen, setMissionPathOpen] = useState<boolean>(false);
	const [activeTab, setActiveTab] = useState("rgb");

	const [isAnalysisOpen, setIsAnalysisOpen] = useState<boolean>(false);

	useEffect(() => {
		const fetchStorageData = async () => {
			const data = await getStorageList();
			setOriginalRecords(data);
		};
		fetchStorageData();
	}, [activeTab]);

	useEffect(() => {
		setFiltered([]);
	}, [activeTab]);

	useEffect(() => {
		if (selectedRecord && originalRecords.length > 0) {
			const updatedRecord = originalRecords.find(
				(record) => record.id === selectedRecord.id
			);
			if (updatedRecord) {
				setSelectedRecord(updatedRecord);
			}
		}
	}, [originalRecords, activeTab]);

	const filterConfigs: FilterConfig[] = [
		{
			key: "uav",
			label: "UAV",
			options: ["KUNA", "Mavic air", "Athlon Furia", "UkrJet Bobr UJ26"],
		},
		{
			key: "status",
			label: "Status",
			options: ["active", "offline", "engaged", "destroyed"],
		},
		{
			key: "missionType",
			label: "Mission type",
			options: ["Reconnaissance", "Combat", "Tactical"],
		},
	];

	const handleFilterChange = (filters: FilterState) => {
		let filtered = originalRecords;

		if (filters.uav) {
			filtered = filtered.filter((record) =>
				record.uav.toLowerCase().includes(filters.uav.toLowerCase())
			);
		}

		if (filters.status) {
			filtered = filtered.filter((record) => record.status === filters.status);
		}

		if (filters.missionType) {
			filtered = filtered.filter(
				(record) => record.missionType === filters.missionType
			);
		}
		setFiltered(filtered);
	};

	const handleRecordClick = (record: StorageData) => {
		setSelectedRecord(record);
	};

	const handleCloseDetail = () => {
		setSelectedRecord(null);
	};

	return (
		<Layout>
			<div className="w-full flex justify-center pt-15">
				<div className="w-[80%] flex flex-col">
					{/* Header and Filter Row */}
					<div className="flex-shrink-0 px-6 mb-1">
						<div className="flex items-center gap-8">
							<SectionHeader
								title="Storage"
								showArrow={false}
								width="w-[267px]"
							/>
							<div className="w-[54px] h-10 -ml-3">
								<FilterControls
									filters={filterConfigs}
									onFilterChange={handleFilterChange}
								/>
							</div>
						</div>
					</div>

					{/* Main Content Area */}
					{selectedRecord && (
						<AnalysisModal
							key={`analysis-${selectedRecord.id}`}
							isOpen={isAnalysisOpen}
							onClose={() => setIsAnalysisOpen(false)}
							systemStatus={
								selectedRecord.analysisResult?.systemStatusText ?? ""
							}
							missionProgress={
								selectedRecord.analysisResult?.missionProgressText ?? ""
							}
							operationalSummary={
								selectedRecord.analysisResult?.operationalSummaryText ?? ""
							}
						/>
					)}

					<div className="flex items-start gap-2 px-6 pb-6">
						{/* Storage List Container */}
						<div
							className={cn(
								"relative z-20 rounded-[0_10px_10px_10px] border-[1.5px] border-[rgba(211,251,216,0.5)] bg-black/50 backdrop-blur-[5px] h-[calc(100vh-320px)] pt-[16px] mt-[16px] transition-all duration-300",
								{
									"w-[60%]": selectedRecord,
									"w-full": !selectedRecord,
								}
							)}
						>
							{/* Content inside container */}
							<div className="w-full h-full overflow-hidden flex px-[20px]">
								<StorageList
									records={filtered.length > 0 ? filtered : originalRecords}
									selectedRecord={selectedRecord}
									onRecordClick={handleRecordClick}
									isDetailView={!!selectedRecord}
								/>
							</div>
						</div>

						{/* Detail Panel */}
						{selectedRecord && (
							<div className="flex-shrink-0 ml-[12px] mt-[16px]">
								<StorageDetailPanel
									setAnalysisOpen={setIsAnalysisOpen}
									setDetectionsOpen={setDetectionsOpen}
									setMissionPathOpen={setMissionPathOpen}
									record={selectedRecord}
									activeTab={activeTab}
									setActiveTab={setActiveTab}
									onClose={handleCloseDetail}
								/>
							</div>
						)}
						{/* Detections Modal */}
						{detectionsOpen && selectedRecord ? (
							<DetectionsModal
								record={selectedRecord}
								isOpen={detectionsOpen}
								onClose={() => setDetectionsOpen(false)}
								activeTab={activeTab}
								// record={selectedRecord}
							/>
						) : null}
						{/* MissionPath Modal */}
						{MissionPathOpen && selectedRecord ? (
							<MissionPathModal
								isOpen={MissionPathOpen}
								onClose={() => setMissionPathOpen(false)}
								record={selectedRecord}
							/>
						) : null}
					</div>
				</div>
			</div>
		</Layout>
	);
};

export default StoragePage;
