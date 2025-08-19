import React from "react";
import { cn } from "../../../lib/utils";
import ReactPlayer from "react-player";

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

const VideoPlayer: React.FC<VideoPlayerProps> = ({
	src,
	width = "100%",
	height = "60%",
	livestream = false,
	allowfullscreen = true,
	className,
}) => {
	if (src.includes("google")) {
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
			<ReactPlayer
				src={src}
				slot="media"
				className={cn(className, "border-none w-full h-full")}
				width={width}
				height={height}
				autoPlay={false}
				controls={false}
				preload={"auto"}
			/>
			<MediaControlBar
				// --media-primary-color class works to target media buttons' color, not to be changed
				style={{ "--media-primary-color": "#D3FBD8" }}
				className="w-full flex flex-col backdrop-blur-[5px] bg-black/50"
			>
				<div className="flex w-full h-full items-center place-content-between px-3">
					<MediaTimeRange
						className={`${livestream ? "w-full" : "w-10/12"} bg-transparent`}
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
