import { useRef, useEffect, type FC, type RefObject } from "react";

import { capitalize, cn, useMetadataSync, type BBox } from "../../lib/utils";

import Hls from "hls.js";

import {
	MediaControlBar,
	MediaController,
	MediaFullscreenButton,
	MediaMuteButton,
	MediaPlayButton,
	MediaSeekBackwardButton,
	MediaSeekForwardButton,
	MediaTimeDisplay,
	MediaTimeRange,
	MediaVolumeRange,
} from "media-chrome/react";
import { PointTag } from "./PointTag/PointTag";
import { BBoxUtil } from "../../lib/bboxutils";

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
	livestream = false,
	allowfullscreen = true,
	className,
	errorMessage = "No video source available",
	enableSync = false,
}) => {
	const isGoogleEmbed = src.includes("google");
	const videoRef = useRef<HTMLVideoElement | null>(null);
	const hlsRef = useRef<Hls | null>(null);

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
	} = useMetadataSync(
		videoRef as RefObject<HTMLVideoElement>,
		enableSync && !isGoogleEmbed
	);

	// console.log(detections);

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

		return () => {
			if (hlsRef.current) {
				hlsRef.current.destroy();
				hlsRef.current = null;
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
	// console.log("No video source provided", src === "", !!src, src);
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

	const videoElement = (
		<div>
			<div style={{ width, height }} className="relative overflow-visible">
				<MediaController
					style={{
						width: "100%",
						aspectRatio: "auto",
					}}
				>
					<div
						style={{ zIndex: 90, width, height }}
						className="absolute top-0 left-0"
					>
						{detections && detections.length !== 0
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
										[1920, 1080],
										[
											videoRef.current!.clientWidth,
											videoRef.current!.clientHeight,
										]
									);

									const dCenter = dbbox.getCenterPoint();

									// don't display if bbox is undefined

									return (
										<PointTag
											style={{ left: dCenter[0], bottom: dCenter[1] }}
											className="absolute"
											key={`${d.class_id}-${i}`}
										>
											<p>{d.class_name}</p>
											<p>{d.class_name}</p>
										</PointTag>
									);
							  })
							: null}
					</div>
					<video
						ref={videoRef}
						slot="media"
						className={cn(className, "border-none w-full h-full")}
						style={{ width, height }}
						preload="auto"
						playsInline
						disablePictureInPicture={true}
					/>
					{detections && detections.length !== 0
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
									[1920, 1080],
									[
										videoRef.current!.clientWidth,
										videoRef.current!.clientHeight,
									]
								);

								const dCenter = dbbox.getCenterPoint();

								// don't display if bbox is undefined

								return (
									<PointTag
										style={{ left: dCenter[0], bottom: dCenter[1] }}
										className="absolute"
										key={`${d.class_id}-${i}`}
									>
										<div style={{ width: "fit-content", whiteSpace: "nowrap" }}>
											<p>{`ID:${d.class_id}`}</p>
											<p>{`${capitalize(d.class_name)}, ${d.confidence.toFixed(
												2
											)}`}</p>
										</div>
									</PointTag>
								);
						  })
						: null}
					<MediaControlBar
						// @ts-expect-error --media-primary-color class works to target media buttons' color, not to be changed
						style={{ "--media-primary-color": "#D3FBD8" }}
						className="w-full flex flex-col backdrop-blur-[5px] bg-black/50"
					>
						<div className="flex w-full h-full items-center place-content-between px-3">
							<MediaTimeRange
								className={`${
									livestream ? "w-full" : "w-10/12"
								} bg-transparent overflow-hidden`}
								// @ts-expect-error --media-primary-color class works to target media buttons' color, not to be changed
								style={{ "--media-primary-color": "#FFF" }}
							/>
							{livestream ? null : (
								<MediaTimeDisplay
									showDuration
									className="w-2/12 bg-transparent"
								/>
							)}
						</div>

						<div
							className={cn(
								"flex w-full h-full items-center place-content-between px-5 mb-2",
								{ ["pr-[30%]"]: !allowfullscreen }
							)}
						>
							<div
								className={cn(" flex", {
									["w-3/12"]: !allowfullscreen,
									["w-2/12"]: allowfullscreen,
								})}
							>
								<MediaMuteButton className="bg-transparent" />
								<MediaVolumeRange className="bg-transparent" />
							</div>
							{!livestream ? (
								<MediaSeekBackwardButton
									seekOffset={5}
									className="bg-transparent"
								/>
							) : null}

							<MediaPlayButton className="bg-transparent" />
							{!livestream ? (
								<MediaSeekForwardButton
									seekOffset={5}
									className="bg-transparent"
								/>
							) : null}

							{allowfullscreen && (
								<MediaFullscreenButton className="bg-transparent w-2/12" />
							)}
						</div>
					</MediaControlBar>
				</MediaController>
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
								{metadataRate.toFixed(1)} fps
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
