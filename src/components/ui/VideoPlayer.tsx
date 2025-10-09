/* eslint-disable @typescript-eslint/no-unused-vars */
import { useRef, useEffect, type FC, type RefObject, useState } from "react";

import {
	capitalize,
	cn,
	useFollowDetections,
	useMetadataSync,
	type BBox,
} from "../../lib/utils";

import Hls from "hls.js";

import {
	// MediaControlBar,
	MediaController,
	// MediaFullscreenButton,
	// MediaMuteButton,
	// MediaPlayButton,
	// MediaSeekBackwardButton,
	// MediaSeekForwardButton,
	// MediaTimeDisplay,
	// MediaTimeRange,
	// MediaVolumeRange,
} from "media-chrome/react";
import { PointTag } from "./PointTag/PointTag";
import { BBoxUtil } from "../../lib/bboxutils";
// import { staticData } from "../../assets/mock-data/static_data";
// import type { Frame } from "../../lib/types";

interface VideoPlayerProps {
	src?: string;
	width?: number | string;
	height?: number | string;
	className?: string;
	livestream?: boolean;
	allowfullscreen?: boolean;
	errorMessage?: string;
	enableSync?: boolean;
}

const VideoPlayer: FC<VideoPlayerProps> = ({
	src = "",
	width = "100%",
	height = "60%",
	// livestream = false,
	// allowfullscreen = true,
	className,
	errorMessage = "No video source available",
	enableSync = false,
}) => {
	const videoRef = useRef<HTMLVideoElement | null>(null);
	const isGoogleEmbed = src.includes("google");
	const hlsRef = useRef<Hls | null>(null);
	const { activeFrameData, currentTimeMs } = useFollowDetections(
		videoRef as RefObject<HTMLVideoElement>
	);
	const [isBuffering, setIsBuffering] = useState<boolean>(false);
	// const [hasStartedPlayback, setHasStartedPlayback] = useState<boolean>(false);
	// const [currentTimeMs, setCurrentTimeMs] = useState<number>(0);
	// const [activeFrameData, setActiveFrameData] = useState<Frame | null>(null);

	// Fixing type mismatch by asserting non-null videoRef.current
	const {
		latency,
		bufferSize,
		syncStatus,
		currentFrame,
		metadataRate,
		syncOffset,
		telemetry,
		detections,
		detectionCount,
		metadata,
		activeFrame,
	} = useMetadataSync(
		videoRef as RefObject<HTMLVideoElement>,
		enableSync && !isGoogleEmbed
	);

	const isVideoPlaying: boolean =
		videoRef.current !== null &&
		!videoRef.current.paused /*&& !videoRef.current.ended*/ &&
		videoRef.current.currentTime > 0;

	// useEffect(() => {
	// 	const videoElement = videoRef.current;
	// 	if (!videoElement) return;

	// 	const handleTimeUpdate = () => {
	// 		const currentTime = videoRef.current?.currentTime;
	// 		if (currentTime === undefined) return;
	// 		const timeMs = currentTime * 1000;
	// 		setCurrentTimeMs(timeMs);

	// 		if (staticData && staticData.frames.length > 0) {
	// 			let activeFrame: Frame | null = null;

	// 			for (let i = 0; i < staticData.frames.length; i++) {
	// 				const currentFrame = staticData.frames[i];
	// 				const nextFrame = staticData.frames[i + 1];

	// 				if (nextFrame) {
	// 					if (
	// 						timeMs >= currentFrame.timestamp_ms &&
	// 						timeMs < nextFrame.timestamp_ms
	// 					) {
	// 						activeFrame = currentFrame;
	// 						break;
	// 					}
	// 				} else {
	// 					// Last frame - active if time >= its timestamp
	// 					if (timeMs >= currentFrame.timestamp_ms) {
	// 						activeFrame = currentFrame;
	// 						break;
	// 					}
	// 				}
	// 			}

	// 			setActiveFrameData(activeFrame);
	// 		}
	// 	};

	// 	videoElement.addEventListener("timeupdate", handleTimeUpdate);

	// 	return () => {
	// 		videoElement.removeEventListener("timeupdate", handleTimeUpdate);
	// 	};
	// }, []);

	// Update activeFrame in context when activeFrameData changes

	// useEffect(() => {
	// 	const videoElement = videoRef.current;
	// 	if (!videoElement) return;

	// 	const handlePlay = async () => {
	// 		if (!hasStartedPlayback) {
	// 			setHasStartedPlayback(true);

	// 			try {
	// 				await fetch("http://193.123.68.104:8000/api/send-objects-to-tak", {
	// 					method: "POST",
	// 					headers: {
	// 						"Content-Type": "application/json",
	// 					},
	// 				});
	// 				console.log("TAK API called successfully");
	// 			} catch (error) {
	// 				console.error("Failed to call TAK API:", error);
	// 			}
	// 		}
	// 	};
	// 	videoElement.addEventListener("play", handlePlay);
	// 	return () => {
	// 		videoElement.removeEventListener("play", handlePlay);
	// 	};
	// }, [hasStartedPlayback]);

	useEffect(() => {
		const videoElement = videoRef.current;
		if (!videoElement) return;
		if (isGoogleEmbed) return; // skip HLS init for iframe source

		// Cleanup existing instance when src changes
		if (hlsRef.current) {
			hlsRef.current.destroy();
			hlsRef.current = null;
		}

		const isHlsSource =
			src.toLowerCase().includes(".m3u8") ||
			src.toLowerCase().includes("application/vnd.apple.mpegurl");

		if (isHlsSource) {
			if (Hls.isSupported()) {
				const hlsInstance = new Hls({
					maxBufferLength: 30,
					backBufferLength: 30,
					lowLatencyMode: true,
				});
				hlsRef.current = hlsInstance;
				hlsInstance.attachMedia(videoElement);
				hlsInstance.on(Hls.Events.MEDIA_ATTACHED, () => {
					hlsInstance.loadSource(src);
				});
				// Optional: surface errors to console
				hlsInstance.on(Hls.Events.ERROR, (_, data) => {
					if (data.fatal) {
						switch (data.type) {
							case Hls.ErrorTypes.NETWORK_ERROR:
								hlsInstance.startLoad();
								break;
							case Hls.ErrorTypes.MEDIA_ERROR:
								hlsInstance.recoverMediaError();
								break;
							default:
								hlsInstance.destroy();
						}
					}
				});
				hlsInstance.on(Hls.Events.FRAG_PARSING_METADATA, (_, data) => {
					console.log("METADATA is: ", data);
				});
			} else if (videoElement.canPlayType("application/vnd.apple.mpegurl")) {
				// Safari natively supports HLS
				videoElement.src = src;
				videoElement.load();
			} else {
				// Fallback: let the browser try
				videoElement.src = src;
			}
		} else {
			// Non-HLS sources (e.g., MP4)
			videoElement.src = src;
		}

		const timeout = setTimeout(() => {
			videoElement.play();
			setIsBuffering(false);
		}, 3000);

		return () => {
			setIsBuffering(true);
			if (hlsRef.current) {
				hlsRef.current.destroy();
				hlsRef.current = null;
			}
			if (videoElement) {
				videoElement.pause();
			}
			if (timeout) {
				clearTimeout(timeout);
			}
		};
	}, [src, isGoogleEmbed]);

	if (isGoogleEmbed) {
		return (
			<iframe
				src={src}
				allow="autoplay"
				className={cn(className, "border-none mt-2")}
				allowFullScreen={false}
				width={width}
				height={height}
				referrerPolicy={"origin"}
			>
				{/* <div className=""></div> */}
			</iframe>
		);
	}
	if (src === "" || !src) {
		return (
			<div
				className={cn(
					"w-full h-[300px] flex items-center justify-center bg-[#1C2122] text-white/50",
					className
				)}
			>
				{errorMessage}
			</div>
		);
	}

	//console.log("detections: ", detections);

	const videoElement = (
		<div className="relative overflow-visible">
			<div style={{ width, height }} className="relative overflow-visible">
				<div
					style={{
						zIndex: 90,
						minWidth: "100%",
						width: `${videoRef.current?.clientWidth ?? 0}px`,
						height: `${videoRef.current?.clientHeight ?? 0}px`,
					}}
					className="absolute top-0 left-0 overflow-visible"
				>
					{isVideoPlaying &&
					activeFrameData?.detections &&
					activeFrameData?.detections.length !== 0
						? activeFrameData?.detections.map((d, i) => {
								if (d.bbox === undefined) {
									return null;
								}
								const _dbbox: number[] = Array.isArray(d.bbox)
									? d.bbox
									: Object.values(d.bbox);

								if (!_dbbox) {
									console.warn(`Skipping detection ${i} — malformed bbox`, d);
									return null;
								}

								const dbbox: BBoxUtil = new BBoxUtil(
									_dbbox as BBox,
									[1280, 720],
									[
										videoRef.current?.clientWidth ?? 0,
										videoRef.current?.clientHeight ?? 0,
									]
								);

								const dCenter = dbbox.getCenterPoint();
								let pointSize = dbbox.getShorterRescaledDim() * 0.8;

								if (pointSize < 10) {
									pointSize = 10;
								}

								// don't display if bbox is undefined

								return (
									<PointTag
										position={dCenter}
										pointSize={pointSize}
										key={`${d.class_id}-${i}`}
									>
										<div style={{ width: "fit-content", whiteSpace: "nowrap" }}>
											<p>{`ID:${d.track_id}`}</p>
											<p>{`${capitalize(d.class_name)}, ${d.confidence.toFixed(
												2
											)}`}</p>
										</div>
									</PointTag>
								);
						  })
						: null}
					{/* {detections && detections.length !== 0
						? detections.map((d, i) => {
								if (d.bbox === undefined) {
									return null;
								}
								const _dbbox: number[] = Array.isArray(d.bbox)
									? d.bbox
									: Object.values(d.bbox);

								if (!_dbbox) {
									console.warn(`Skipping detection ${i} — malformed bbox`, d);
									return null;
								}

								const dbbox: BBoxUtil = new BBoxUtil(
									_dbbox as BBox,
									[1280, 720],
									[
										videoRef.current?.clientWidth ?? 0,
										videoRef.current?.clientHeight ?? 0,
									]
								);

								const dCenter = dbbox.getCenterPoint();
								let pointSize = dbbox.getShorterRescaledDim() * 0.8;

								if (pointSize < 10) {
									pointSize = 10;
								}

								// don't display if bbox is undefined

								return (
									<PointTag
										position={dCenter}
										pointSize={pointSize}
										key={`${d.class_id}-${i}`}
									>
										<div style={{ width: "fit-content", whiteSpace: "nowrap" }}>
											<p>{`ID:${d.track_id}`}</p>
											<p>{`${capitalize(d.class_name)}, ${d.confidence.toFixed(
												2
											)}`}</p>
										</div>
									</PointTag>
								);
						  })
						: null} */}
				</div>
				<MediaController style={{ minWidth: "100%" }}>
					<video
						ref={videoRef}
						slot="media"
						className={cn(className, "border-none w-full h-full")}
						style={{ width, height }}
						preload="auto"
						playsInline
						disablePictureInPicture={true}
					/>
				</MediaController>
				{isBuffering ? (
					<div className="absolute bottom-3 left-0 w-full flex flex-row justify-center">
						Buffering...
					</div>
				) : null}
			</div>

			{!isGoogleEmbed && enableSync && (
				<div className="text-xs text-gray-400 mt-2 space-y-1 max-h-40 overflow-y-auto bg-black/20 p-2 rounded">
					<div>
						<div className="grid grid-cols-2 gap-2">
							<p>
								<span className="text-green-400 text-xs">Sync Status:</span>
								{syncStatus}
							</p>
							<p>
								<span className="text-blue-400 text-xs">Current Frame:</span>
								{currentFrame}
							</p>
							<p>
								<span className="text-yellow-400 text-xs">Latency:</span>
								{latency} ms
							</p>
							<p>
								<span className="text-purple-400 text-xs">Buffer Size:</span>
								{bufferSize} frames
							</p>
							<p>
								<span className="text-pink-400 text-xs">Metadata Rate:</span>
								{metadataRate?.toFixed(1)} fps
							</p>
							<p>
								<span className="text-cyan-400 text-xs">Sync Offset:</span>
								{syncOffset}
								ms
							</p>
						</div>
						{telemetry && (
							<div className="grid grid-cols-2 gap-2">
								<p>
									<span className="text-red-400 text-xs">Lat:</span>
									{telemetry.latitude?.toFixed(6) || "-"}
								</p>
								<p>
									<span className="text-red-400 text-xs">Lng:</span>
									{telemetry.longitude?.toFixed(6) || "-"}
								</p>
								<p>
									<span className="text-red-400 text-xs">Alt:</span>
									{telemetry.altitude?.toFixed(1) || "-"}m
								</p>
								<p>
									<span className="text-red-400 text-xs">Heading:</span>
									{telemetry.heading?.toFixed(1) || "-"}°
								</p>
								<p>
									<span className="text-red-400 text-xs">Roll:</span>
									{telemetry.roll?.toFixed(2) || "-"}°
								</p>
								<p>
									<span className="text-red-400 text-xs">Pitch:</span>
									{telemetry.pitch?.toFixed(2) || "-"}°
								</p>
							</div>
						)}
					</div>
					{detections && detections.length > 0 && (
						<div className="mt-2 border-t border-gray-600 pt-2">
							<p className="text-orange-400 font-semibold">
								Detections ({detectionCount}):
							</p>
							<div className="max-h-20 overflow-y-auto">
								{detections.slice(0, 3).map((detection, index) => (
									<p key={index} className="text-xs">
										<span className="text-green-300">
											{detection.class_name}
										</span>
										-
										<span className="text-yellow-300">
											{(detection.confidence * 100).toFixed(1)}%
										</span>
									</p>
								))}
								{detections.length > 3 && (
									<p className="text-gray-500">
										...and {detections.length - 3} more
									</p>
								)}
							</div>
						</div>
					)}
					{metadata && (
						<div className="mt-2 border-t border-gray-600 pt-2">
							<p className="text-xs">
								<span className="text-gray-500">Processed:</span>
								{new Date(metadata.timestamp).toLocaleTimeString()}
							</p>
							{metadata.sourceTimestamp && (
								<p className="text-xs">
									<span className="text-gray-500">Source:</span>
									{new Date(metadata.sourceTimestamp).toLocaleTimeString()}
								</p>
							)}
						</div>
					)}
				</div>
			)}
		</div>
	);

	return isGoogleEmbed ? (
		<iframe
			src={src}
			allow="autoplay"
			className={cn(className, "border-none mt-2")}
			allowFullScreen={false}
			width={width}
			height={height}
			referrerPolicy={"origin"}
		></iframe>
	) : (
		videoElement
	);
};

export default VideoPlayer;
