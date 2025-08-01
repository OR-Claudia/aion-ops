import React from "react";
import StorageItem, { type StorageData } from "./StorageItem";

interface StorageListProps {
	records: StorageData[];
	selectedRecord?: StorageData | null;
	onRecordClick: (record: StorageData) => void;
	isDetailView?: boolean;
}

const StorageList: React.FC<StorageListProps> = ({
	records,
	selectedRecord,
	onRecordClick,
	isDetailView = false,
}) => {
	return (
		<div className="flex flex-col gap-[11px] h-full overflow-y-auto w-full">
			{records.map((record) => (
				<StorageItem
					key={record.id}
					record={record}
					selected={selectedRecord?.id === record.id}
					onClick={onRecordClick}
					isDetailView={isDetailView}
				/>
			))}
		</div>
	);
};

export default StorageList;
