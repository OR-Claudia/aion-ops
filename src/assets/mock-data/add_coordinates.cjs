const fs = require("fs");

// Sumi region center coordinates
const SUMI_CENTER = { lat: 50.59277, lon: 35.307222 };

// Function to generate random coordinates within 2km radius
function generateRandomCoordinatesInRadius(center, radiusKm = 2) {
	const radiusInDegrees = radiusKm / 111.32; // Approximate conversion from km to degrees

	// Generate random angle and distance
	const angle = Math.random() * 2 * Math.PI;
	const distance = Math.random() * radiusInDegrees;

	// Calculate new coordinates
	const lat = center.lat + distance * Math.cos(angle);
	const lon = center.lon + distance * Math.sin(angle);

	return {
		lat: parseFloat(lat.toFixed(6)),
		lon: parseFloat(lon.toFixed(6)),
	};
}

// Read the existing data file - replace with your actual data file path
const dataPath = "./src/assets/mock-data/thermo_data.js";
let content = fs.readFileSync(dataPath, "utf8");

// Find and replace each detection object to add coordinates
let detectionCount = 0;
content = content.replace(
	/({[\s\S]*?tracking_info:\s*{[\s\S]*?},[\s\S]*?}),/g,
	(match, detectionObj) => {
		// Generate random coordinates for this detection
		const coords = generateRandomCoordinatesInRadius(SUMI_CENTER);

		// Add coordinates field before the closing brace
		const modifiedDetection = detectionObj.replace(
			/(tracking_info:\s*{[\s\S]*?},)/,
			`$1\n\t\t\tcoordinates: {\n\t\t\t\tlat: ${coords.lat},\n\t\t\t\tlon: ${coords.lon},\n\t\t\t},`
		);

		detectionCount++;
		return modifiedDetection + ",";
	}
);

// Write the modified content to a new file
const outputPath = "src/assets/mock-data/output.js";
fs.writeFileSync(outputPath, content);

console.log(
	`✅ Successfully added coordinates to ${detectionCount} detections!`
);
console.log(`📁 Output file: ${outputPath}`);
console.log(
	`🗺️  All coordinates within 2km of Sumi: ${SUMI_CENTER.lat}, ${SUMI_CENTER.lon}`
);
