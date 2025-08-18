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
	// livestream?: boolean;
	allowfullscreen?: boolean;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({
	src,
	width = "100%",
	height = "60%",
	// livestream = false,
	allowfullscreen = false,
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
				// ref={playerRef}
				autoPlay={false}
				// playing={playing}
				// onProgress={handleProgress}
				controls={false}
				// pip={false}
				style={{}}
			/>
			<MediaControlBar className="w-full flex flex-col backdrop-blur-[5px] bg-black/40">
				<div className="flex w-full h-full items-center place-content-between px-3 ">
					<MediaTimeRange className="w-10/12 bg-transparent" />
					<MediaTimeDisplay showDuration className="w-2/12 bg-transparent" />
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

					<MediaSeekBackwardButton seekOffset={5} className="bg-transparent" />
					<MediaPlayButton className="bg-transparent" />
					<MediaSeekForwardButton seekOffset={5} className="bg-transparent" />
					{allowfullscreen && (
						<MediaFullscreenButton className="bg-transparent w-2/12" />
					)}
				</div>
			</MediaControlBar>
		</MediaController>
	);
};

export default VideoPlayer;
