export interface VideoInfo {
	input_file: string;
	output_file: string;
	width: number;
	height: number;
	fps: number;
	total_frames: number;
}

export interface DetectedInFrame {
	class_id: number;
	class_name: string;
	confidence: number;
	latitude?: number;
	longitude?: number;
	altitude: number;
	track_id: number;
	bbox?: [number, number, number, number];
	geo_coordinates?: {
		latitude?: number;
		longitude?: number;
	};
}

export interface Frame {
	frame_number: number;
	timestamp_ms: number;
	timestamp_iso: string;
	telemetry: {
		latitude: number;
		longitude: number;
		altitude: number;
		heading: number;
	};
	detections: DetectedInFrame[];
	detection_count: number;
}

export interface VideoData {
	video_info: VideoInfo;
	frames: Frame[];
}
