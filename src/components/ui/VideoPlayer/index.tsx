import React, { useCallback, useRef, useState } from "react";
import { cn } from "../../../lib/utils";
import ReactPlayer from "react-player";
import Button from "../Button";
import SeekForward from "../../../assets/seek-forward.svg";
import SeekBackward from "../../../assets/seek-backward.svg";
import Play from "../../../assets/play.svg";
import Pause from "../../../assets/pause.svg";
import ExpandWide from "../../../assets/expand-wide.svg";

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
	allowfullscreen = false,
	className,
}) => {
	{
		/* Using ReactPlayer as a type works in app but throws error in VSCode, do not change */
	}
	const playerRef = useRef<ReactPlayer>(null);
	const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
	const [playing, setPlaying] = useState<boolean>(false);

	const handlePlayPause = useCallback(() => {
		setPlaying((prev) => !prev);
	}, []);

	const seekForward = () => {
		if (playerRef.current) {
			playerRef.current.seekTo(
				playerRef.current.getCurrentTime() + 5,
				"seconds"
			);
		}
	};

	const seekBackward = () => {
		if (playerRef.current) {
			playerRef.current.seekTo(
				playerRef.current.getCurrentTime() - 5,
				"seconds"
			);
		}
	};

	const toggleFullscreen = () => {
		if (!isFullscreen) {
			playerRef.current.requestFullscreen();
		} else {
			document.exitFullscreen();
		}
		setIsFullscreen((prev) => !prev);
	};

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
		<div>
			<ReactPlayer
				src={src}
				className={cn(className, "border-none mt-2")}
				width={width}
				height={height}
				ref={playerRef}
				playing={playing}
				controls={false}
				pip={false}
				style={{}}
			/>
			{/* Controls for video playback */}
			<div className="flex justify-between items-center mt-5">
				<div className="w-[100%] flex  justify-center items-center space-between">
					<Button variant="video" onClick={seekBackward}>
						<img
							src={SeekBackward}
							alt={"Seek backward"}
							className="w-5 h-5 cursor-pointer hover:scale-110 transition-transform duration-200"
						/>
					</Button>
					<Button variant="video" onClick={handlePlayPause}>
						<img
							src={playing ? Pause : Play}
							alt={playing ? "Pause video" : "Play video"}
							className="w-5 h-5 cursor-pointer hover:scale-110 transition-transform duration-200"
						/>
					</Button>
					<Button variant="video" onClick={seekForward}>
						<img
							src={SeekForward}
							alt={"Seek forward"}
							className="w-5 h-5  cursor-pointer hover:scale-110 transition-transform duration-200"
						/>
					</Button>
				</div>
				{/* Fullscreen toggle button */}
				{allowfullscreen && (
					<Button variant="video" onClick={toggleFullscreen}>
						<img
							src={ExpandWide}
							alt={"Seek forward"}
							className="w-5 h-5  cursor-pointer hover:scale-110 transition-transform duration-200"
						/>
					</Button>
				)}
			</div>
		</div>
	);
};

export default VideoPlayer;
