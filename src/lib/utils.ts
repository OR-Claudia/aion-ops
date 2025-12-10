import { createContext, useContext, useState, type RefObject } from "react";
import { useEffect } from "react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { followDetections } from "../assets/mock-data/follow_detections";
import type { Frame } from "./types";
import { staticData } from "../assets/mock-data/static_data";

// Utility function for merging class names
export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}
export function capitalize(val: string) {
	return String(val).charAt(0).toUpperCase() + String(val).slice(1);
}

export function formatDetectionTimestamp(timestamp: number): string {
	const minutes = Math.floor(timestamp / 60);
	const seconds = Math.floor(timestamp % 60);
	return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(
		2,
		"0"
	)}`;
}

// Simple reverse geocoding function
export const reverseGeocode = async (
	lat: number,
	lon: number
): Promise<string> => {
	try {
		const response = await fetch(
			`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}&accept-language=en`
		);
		const data = await response.json();

		if (data && data.address) {
			const city =
				data.address.city || data.address.town || data.address.village || "";
			const country = data.address.country || "";
			return city && country
				? `${city}, ${country}`
				: country || "Unknown Location";
		}
		return "Unknown Location";
	} catch (error) {
		console.error("Reverse geocoding failed:", error);
		return "Unknown Location";
	}
};

// Enhanced MetadataSync class implementation with complete synchronization logic
interface TelemetryData {
	timestamp_us?: number;
	latitude?: number;
	longitude?: number;
	altitude?: number;
	heading?: number;
	roll?: number;
	pitch?: number;
	sensor_width_mm?: number;
	sensor_height_mm?: number;
	focal_length_mm?: number;
}

interface GeoCoordinatesData {
	latitude: number;
	longitude: number;
	estimated_ground_distance_m: number;
	camera_azimuth_deg: number;
	camera_elevation_deg: number;
	calculation_method: string;
	gimbal_method?: string;
	has_camera_specs: boolean;
}

export type BBox = [number, number, number, number];

interface DetectionData {
	class_id: number;
	class_name: string;
	confidence: number;
	track_id: number;
	bbox: BBox;
	geo_coordinates: GeoCoordinatesData;
	latitude?: number;
	longitude?: number;
}

interface MetadataItem {
	frame: number;
	timestamp: string;
	receivedAt: number;
	processedAt: number;
	sourceTimestamp?: number | null;
	detection_count?: number;
	telemetry?: TelemetryData;
	detections?: DetectionData[];
	[key: string]: unknown;
}

class MetadataSync {
	private metadataBuffer = new Map<number, MetadataItem>(); // frame -> metadata
	private metadataBySourceTime: MetadataItem[] = []; // sorted by telemetry.timestamp_us
	private metadataByProcessTime: MetadataItem[] = []; // sorted by processing timestamp
	// private lastFrameNumber = 0;
	// private startTime = Date.now();
	private frameCount = 0;
	private lastRateUpdate = Date.now();

	// HLS Latency detection
	public hlsLatencyMs = 10000; // Default 10s, will auto-detect
	public latencyDetected = false;
	public firstMetadataTime: number | null = null;
	public firstVideoStartTime: number | null = null;

	// Frame rate estimation
	private estimatedFps = 30;
	private fpsEstimated = false;

	addMetadata(data: Record<string, unknown>): void {
		const frame = (data.frame as number) || 0;
		const receivedAt = Date.now();
		const processedAt = new Date(data.timestamp as string).getTime();

		// Extract source timestamp from telemetry (in microseconds)
		const telemetry = data.telemetry as TelemetryData;
		const sourceTimestampUs = telemetry?.timestamp_us || null;
		const sourceTimestampMs = sourceTimestampUs
			? sourceTimestampUs / 1000
			: null;

		const metaWithTimings: MetadataItem = {
			...data,
			frame,
			timestamp: data.timestamp as string,
			receivedAt,
			processedAt,
			sourceTimestamp: sourceTimestampMs,
			detection_count: data.detection_count as number,
			telemetry,
			detections: data.detections as DetectionData[],
		};

		this.metadataBuffer.set(frame, metaWithTimings);

		// Add to source time sorted array (if we have source timestamp)
		if (sourceTimestampMs) {
			this.metadataBySourceTime.push(metaWithTimings);
			this.metadataBySourceTime.sort(
				(a, b) => (a.sourceTimestamp || 0) - (b.sourceTimestamp || 0)
			);
		}

		// Add to process time sorted array
		this.metadataByProcessTime.push(metaWithTimings);
		this.metadataByProcessTime.sort((a, b) => a.processedAt - b.processedAt);

		// Record first metadata for latency detection
		if (!this.firstMetadataTime) {
			this.firstMetadataTime = receivedAt;
		}

		// Estimate FPS from frame numbers if not yet estimated
		if (!this.fpsEstimated && this.metadataByProcessTime.length > 60) {
			this.estimateFps();
		}

		this.frameCount++;

		// Clean old entries (keep last 30 seconds)
		const bufferWindow = 30000;
		const cutoff = Date.now() - bufferWindow;

		for (const [f, meta] of this.metadataBuffer.entries()) {
			if (meta.receivedAt < cutoff) {
				this.metadataBuffer.delete(f);
			}
		}

		const timeCutoff = processedAt - bufferWindow;
		this.metadataByProcessTime = this.metadataByProcessTime.filter(
			(m) => m.processedAt > timeCutoff
		);

		if (sourceTimestampMs) {
			const sourceCutoff = sourceTimestampMs - bufferWindow;
			this.metadataBySourceTime = this.metadataBySourceTime.filter(
				(m) => (m.sourceTimestamp || 0) > sourceCutoff
			);
		}
	}

	private estimateFps(): void {
		// Estimate FPS from frame timestamps
		if (this.metadataByProcessTime.length < 60) return;

		const recent = this.metadataByProcessTime.slice(-60);
		const firstFrame = recent[0].frame;
		const lastFrame = recent[recent.length - 1].frame;
		const frameDiff = lastFrame - firstFrame;

		const firstTime = recent[0].processedAt;
		const lastTime = recent[recent.length - 1].processedAt;
		const timeDiffSec = (lastTime - firstTime) / 1000;

		if (timeDiffSec > 0) {
			this.estimatedFps = frameDiff / timeDiffSec;
			this.fpsEstimated = true;
			console.log(`Estimated FPS: ${this.estimatedFps.toFixed(2)}`);
		}
	}

	detectHlsLatency(videoElement: HTMLVideoElement): void {
		// Detect HLS latency by comparing live metadata vs what video is showing
		if (this.latencyDetected || !this.firstMetadataTime) return;

		if (!this.firstVideoStartTime && videoElement.currentTime > 0) {
			this.firstVideoStartTime = Date.now();
		}

		if (this.firstVideoStartTime && this.metadataByProcessTime.length > 30) {
			// Compare the time difference between first metadata and video start
			const timeDelay = this.firstVideoStartTime - this.firstMetadataTime;

			// HLS latency is typically this delay plus processing time
			this.hlsLatencyMs = Math.max(5000, Math.min(timeDelay, 30000));
			this.latencyDetected = true;
			console.log(
				`Detected HLS latency: ${(this.hlsLatencyMs / 1000).toFixed(1)}s`
			);
		}
	}

	getMetadataForTime(videoElement: HTMLVideoElement): MetadataItem | null {
		// Get metadata accounting for HLS buffering latency
		if (this.metadataByProcessTime.length === 0) return null;

		// Detect latency if not yet detected
		this.detectHlsLatency(videoElement);

		// Get the target time: current time - HLS latency
		const now = Date.now();
		const targetTime = now - this.hlsLatencyMs;

		// Find metadata closest to this target time
		let closest: MetadataItem | null = null;
		let minDiff = Infinity;

		for (const meta of this.metadataByProcessTime) {
			const diff = Math.abs(meta.receivedAt - targetTime);
			if (diff < minDiff) {
				minDiff = diff;
				closest = meta;
			}

			// Stop if we've gone past the target
			if (meta.receivedAt > targetTime + 2000) {
				break;
			}
		}

		return closest;
	}

	getLatestMetadata(): MetadataItem | null {
		if (this.metadataBuffer.size === 0) return null;
		const frames = Array.from(this.metadataBuffer.keys()).sort((a, b) => b - a);
		return this.metadataBuffer.get(frames[0]) || null;
	}

	getMetadataRate(): number | null {
		const now = Date.now();
		const elapsed = (now - this.lastRateUpdate) / 1000;
		if (elapsed < 1) return null;

		const rate = this.frameCount / elapsed;
		this.frameCount = 0;
		this.lastRateUpdate = now;
		return rate;
	}

	getHlsLatencyMs(): number {
		return this.hlsLatencyMs;
	}

	getMetadataBufferSize(): number {
		return this.metadataBuffer.size;
	}

	isLatencyDetected(): boolean {
		return this.latencyDetected;
	}

	getEstimatedFps(): number {
		return this.estimatedFps;
	}

	clearBuffer(): void {
		this.metadataBuffer.clear();
		this.metadataBySourceTime = [];
		this.metadataByProcessTime = [];
		this.frameCount = 0;
		// this.lastFrameNumber = 0;
	}

	setManualLatency(latencyMs: number): void {
		this.hlsLatencyMs = latencyMs;
		this.latencyDetected = true;
	}

	resetLatencyDetection(): void {
		this.latencyDetected = false;
		this.firstMetadataTime = null;
		this.firstVideoStartTime = null;
		this.hlsLatencyMs = 10000; // Reset to default
	}

	// Calculate current sync offset
	getCurrentSyncOffset(): number {
		const latest = this.getLatestMetadata();
		if (!latest) return 0;
		return Date.now() - latest.receivedAt - this.hlsLatencyMs;
	}

	// Get sync status text
	getSyncStatusText(): string {
		if (this.latencyDetected) {
			return `✓ Synced (${(this.hlsLatencyMs / 1000).toFixed(1)}s delay)`;
		} else if (this.metadataByProcessTime.length < 30) {
			return `Buffering (${this.metadataByProcessTime.length}/30)`;
		} else {
			return "Detecting latency...";
		}
	}

	// Get total latency for current metadata
	getCurrentLatency(): number {
		const metadata = this.getLatestMetadata();
		if (!metadata) return 0;
		return Date.now() - metadata.processedAt;
	}
}

// New content: initSSE and other necessary functions
let eventSource: EventSource | null = null;
let updateInterval: number | null = null;

const initSSE = (sync: MetadataSync) => {
	// Auto-detect: use current hostname or fall back to localhost
	// 193.123.68.104 -> Francesco host address
	// const hostname =
	// 	typeof window !== "undefined"
	// 		? window.location.hostname || "localhost"
	// 		: "localhost";
	const sseUrl = `http://193.123.68.104:8081/events`;

	if (eventSource) {
		eventSource.close();
	}

	eventSource = new EventSource(sseUrl);

	eventSource.onopen = () => {
		console.log("SSE Connected");
	};

	eventSource.onmessage = (event) => {
		try {
			const data = JSON.parse(event.data);
			sync.addMetadata(data);
		} catch (e) {
			console.error("Error parsing metadata:", e);
		}
	};

	eventSource.onerror = () => {
		console.log("SSE Disconnected - Retrying...");
		setTimeout(() => initSSE(sync), 3000);
	};
};

const updateDisplay = (videoElement: HTMLVideoElement, sync: MetadataSync) => {
	// Get metadata accounting for HLS latency
	const metadata = sync.getMetadataForTime(videoElement);
	if (!metadata) return;

	// Calculate synchronization metrics
	const now = Date.now();
	const totalLatency = now - metadata.processedAt;
	const actualSyncOffset = sync.getCurrentSyncOffset();

	// Update sync status with detailed information
	const syncStatus = sync.getSyncStatusText();
	console.log(`Sync Status: ${syncStatus}`);
	console.log(`Current Frame: ${metadata.frame}`);
	console.log(`Latency: ${totalLatency} ms`);
	console.log(`Buffer Size: ${sync.getMetadataBufferSize()} frames`);
	console.log(`Sync Offset: ${actualSyncOffset} ms`);

	// Log metadata rate if available
	const rate = sync.getMetadataRate();
	if (rate !== null) {
		console.log(`Metadata Rate: ${rate.toFixed(1)} fps`);
	}

	// Log telemetry data if available
	if (metadata.telemetry) {
		const telemetry = metadata.telemetry;
		console.log(
			`Telemetry - Lat: ${telemetry.latitude?.toFixed(
				6
			)}, Lng: ${telemetry.longitude?.toFixed(
				6
			)}, Alt: ${telemetry.altitude?.toFixed(1)}m`
		);
	}

	// Log detection count
	if (metadata.detection_count !== undefined) {
		console.log(`Detections: ${metadata.detection_count}`);
	}
};

const reconnect = (
	sync: MetadataSync,
	videoRef: RefObject<HTMLVideoElement>
) => {
	// Clear the existing sync data
	sync.clearBuffer();
	sync.resetLatencyDetection();

	// Reinitialize SSE connection
	initSSE(sync);

	// Trigger display update if video element is available
	const videoElement = videoRef.current;
	if (videoElement) {
		updateDisplay(videoElement, sync);
	}

	console.log("Reconnected and reset sync state");
};

const clearBuffer = (sync: MetadataSync) => {
	sync.clearBuffer();
	console.log("Buffer cleared");
};

const updateLatency = (latencySec: number, sync: MetadataSync) => {
	sync.setManualLatency(latencySec * 1000);
	console.log(`Manual latency set to ${latencySec}s`);
};

const autoDetectLatency = (sync: MetadataSync) => {
	sync.resetLatencyDetection();
	console.log("Auto-detecting latency...");
};

// Additional utility functions from HTML implementation
const initVideoWithSync = (
	videoElement: HTMLVideoElement,
	sync: MetadataSync,
	hlsUrl?: string
) => {
	// Auto-detect: use current hostname or fall back to localhost
	const hostname =
		typeof window !== "undefined"
			? window.location.hostname || "localhost"
			: "localhost";
	const defaultHlsUrl = `http://${hostname}:8888/detected_stream/index.m3u8`;
	const sourceUrl = hlsUrl || defaultHlsUrl;

	// This function would be used if we need to initialize HLS directly
	// For now, it's mainly for reference to match the HTML implementation
	console.log(`Video sync initialized for URL: ${sourceUrl}`);

	// Set up event listeners for sync
	const timeUpdateHandler = () => {
		updateDisplay(videoElement, sync);
	};

	videoElement.addEventListener("timeupdate", timeUpdateHandler);
	videoElement.addEventListener("play", timeUpdateHandler);
	videoElement.addEventListener("seeked", timeUpdateHandler);

	return () => {
		videoElement.removeEventListener("timeupdate", timeUpdateHandler);
		videoElement.removeEventListener("play", timeUpdateHandler);
		videoElement.removeEventListener("seeked", timeUpdateHandler);
	};
};

export interface MetaData {
	metadata: MetadataItem | null;
	latency: number;
	bufferSize: number;
	syncStatus: string;
	currentFrame: number;
	metadataRate: number;
	syncOffset: number;
	telemetry: TelemetryData | null;
	detections: DetectionData[];
	detectionCount: number;
	selectedDetection: number | null;
	activeFrame?: Frame | null;
}

type MetaDataCtxType = [
	MetaData,
	(data: Partial<MetaData>) => void,
	(activeFrame: MetaData["activeFrame"]) => void
];

export const metaDataDefault = {
	metadata: null,
	latency: 0,
	bufferSize: 0,
	syncStatus: "Initializing...",
	currentFrame: 0,
	metadataRate: 0,
	syncOffset: 0,
	telemetry: null,
	detections: [],
	detectionCount: 0,
	selectedDetection: null,
	activeFrame: null,
};

export const metaDataCtxDefault: MetaDataCtxType = [
	metaDataDefault,
	() => {},
	() => {},
];

export const MetaDataCtx = createContext<MetaDataCtxType>(metaDataCtxDefault);

// Enhanced hook for metadata synchronization with comprehensive data
const useMetadataSync = (
	videoRef: RefObject<HTMLVideoElement>,
	enableSync = true
) => {
	const [
		{
			metadata,
			latency,
			bufferSize,
			syncStatus,
			currentFrame,
			metadataRate,
			syncOffset,
			telemetry,
			detections,
			detectionCount,
			activeFrame,
		},
		updateMetaData,
	] = useContext(MetaDataCtx);

	useEffect(() => {
		if (!enableSync) {
			updateMetaData({
				syncStatus: "Disabled",
			});
			return;
		}

		const sync = new MetadataSync();
		let timeUpdateHandler: (() => void) | null = null;
		let statisticsInterval: NodeJS.Timeout | null = null;

		// Initialize SSE connection
		initSSE(sync);

		const videoElement = videoRef.current;
		if (videoElement) {
			timeUpdateHandler = () => {
				// Update display for debugging
				updateDisplay(videoElement, sync);

				// Get current metadata synchronized to video time
				const currentMetadata = sync.getMetadataForTime(videoElement);
				// Update sync metrics
				const newMetaDataForCtx: Partial<MetaData> = {
					latency: sync.getCurrentLatency(),
					bufferSize: sync.getMetadataBufferSize(),
					syncStatus: sync.getSyncStatusText(),
					syncOffset: sync.getCurrentSyncOffset(),
				};

				if (currentMetadata) {
					newMetaDataForCtx.metadata = currentMetadata;
					newMetaDataForCtx.currentFrame = currentMetadata.frame;
					newMetaDataForCtx.telemetry = currentMetadata.telemetry || null;
					newMetaDataForCtx.detections = currentMetadata.detections || [];
					newMetaDataForCtx.detectionCount =
						currentMetadata.detection_count || 0;
				}

				updateMetaData(newMetaDataForCtx);
			};

			videoElement.addEventListener("timeupdate", timeUpdateHandler);
			videoElement.addEventListener("play", timeUpdateHandler);
			videoElement.addEventListener("seeked", timeUpdateHandler);
		}

		// Background update for statistics that don't need to be tied to video events
		statisticsInterval = setInterval(() => {
			const rate = sync.getMetadataRate();

			// if (rate !== null) {
			if (rate !== null && detections !== followDetections) {
				updateMetaData({
					metadataRate: rate,
					detections: followDetections as DetectionData[],
					detectionCount: followDetections.length,
				});
			}
		}, 1000);

		// Cleanup function
		return () => {
			if (eventSource) {
				eventSource.close();
				eventSource = null;
			}
			if (updateInterval) {
				clearInterval(updateInterval);
				updateInterval = null;
			}
			if (statisticsInterval) {
				clearInterval(statisticsInterval);
			}
			if (videoElement && timeUpdateHandler) {
				videoElement.removeEventListener("timeupdate", timeUpdateHandler);
				videoElement.removeEventListener("play", timeUpdateHandler);
				videoElement.removeEventListener("seeked", timeUpdateHandler);
			}
		};
	}, [enableSync, videoRef]);

	return {
		metadata,
		latency,
		bufferSize,
		syncStatus,
		currentFrame,
		metadataRate,
		syncOffset,
		telemetry,
		detections,
		detectionCount,
		activeFrame,
	};
};

const useFollowDetections = (videoRef: RefObject<HTMLVideoElement>) => {
	const [currentTimeMs, setCurrentTimeMs] = useState<number>(0);
	const [activeFrameData, setActiveFrameData] = useState<Frame | null>(null);
	const [, updateActiveFrame] = useContext(MetaDataCtx);

	useEffect(() => {
		const videoElement = videoRef.current;
		if (!videoElement) return;

		const handleTimeUpdate = () => {
			const currentTime = videoRef.current?.currentTime;
			if (currentTime === undefined) return;
			const timeMs = currentTime * 1000;
			setCurrentTimeMs(timeMs);

			if (staticData && staticData.frames.length > 0) {
				let activeFrame: Frame | null = null;

				for (let i = 0; i < staticData.frames.length; i++) {
					const currentFrame = staticData.frames[i];
					const nextFrame = staticData.frames[i + 1];

					if (nextFrame) {
						if (
							timeMs >= currentFrame.timestamp_ms &&
							timeMs < nextFrame.timestamp_ms
						) {
							activeFrame = currentFrame;
							break;
						}
					} else {
						// Last frame - active if time >= its timestamp
						if (timeMs >= currentFrame.timestamp_ms) {
							activeFrame = currentFrame;
							break;
						}
					}
				}

				setActiveFrameData(activeFrame);
			}
		};

		videoElement.addEventListener("timeupdate", handleTimeUpdate);

		return () => {
			videoElement.removeEventListener("timeupdate", handleTimeUpdate);
		};
	}, []);

	useEffect(() => {
		updateActiveFrame({ activeFrame: activeFrameData });
	}, [activeFrameData]);

	return { currentTimeMs, activeFrameData };
};

export {
	useFollowDetections,
	useMetadataSync,
	MetadataSync,
	initSSE,
	updateDisplay,
	clearBuffer,
	updateLatency,
	autoDetectLatency,
	reconnect,
	initVideoWithSync,
};

export type { MetadataItem, TelemetryData, DetectionData };
