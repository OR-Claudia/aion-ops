const fs = require("fs");

// Read the existing data file - replace with your actual data file path
const dataPath = "./src/assets/mock-data/data.ts";
let content = fs.readFileSync(dataPath, "utf8");

// Function to generate a unique ID
let detectionId = 1;
content = content.replace(
	/({[\s\S]*?tracking_info:\s*{[\s\S]*?},[\s\S]*?}),/g,
	(match, detectionObj) => {
		// Add unique ID field
		const modifiedDetection = detectionObj.replace(
			/(tracking_info:\s*{[\s\S]*?},)/,
			`$1\n\t\t\tid: ${detectionId},`
		);
		detectionId++;

		return modifiedDetection + ",";
	}
);

// Write the modified content to a new file
const outputPath = "src/assets/mock-data/output.ts";
fs.writeFileSync(outputPath, content);

console.log(
	`✅ Successfully added unique IDs to ${detectionId - 1} detections!`
);
console.log(`📁 Output file: ${outputPath}`);
