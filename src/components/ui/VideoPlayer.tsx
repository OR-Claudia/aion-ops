import { useRef, useEffect, type FC } from "react";
import { cn } from "../../lib/utils";
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

interface VideoPlayerProps {
	src: string;
	width?: number | string;
	height?: number | string;
	className?: string;
	livestream?: boolean;
	allowfullscreen?: boolean;
}

const VideoPlayer: FC<VideoPlayerProps> = ({
	src,
	width = "100%",
	height = "60%",
	livestream = false,
	allowfullscreen = true,
	className,
}) => {
	const isGoogleEmbed = src.includes("google");
	const videoRef = useRef<HTMLVideoElement | null>(null);
	const hlsRef = useRef<Hls | null>(null);

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
			></iframe>
		);
	}

	return (
		<MediaController
			style={{
				width: "100%",
				aspectRatio: "auto",
			}}
		>
			<video
				ref={videoRef}
				slot="media"
				className={cn(className, "border-none w-full h-full")}
				style={{ width, height }}
				preload="auto"
				playsInline
			/>
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
						<MediaTimeDisplay showDuration className="w-2/12 bg-transparent" />
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
						<MediaSeekForwardButton seekOffset={5} className="bg-transparent" />
					) : null}

					{allowfullscreen && (
						<MediaFullscreenButton className="bg-transparent w-2/12" />
					)}
				</div>
			</MediaControlBar>
		</MediaController>
	);
};

export default VideoPlayer;
