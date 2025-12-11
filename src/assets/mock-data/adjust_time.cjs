/**
 * Adjust all "timestamp" and "frame_time" numeric values in a source file by subtracting a given offset.
 * Usage:
 *   node src/assets/mock-data/adjust_time.cjs <offsetSeconds> [inputPath] [outputPath]
 *
 * Examples:
 *   node src/assets/mock-data/adjust_time.cjs 5
 *     - subtracts 5.0 from every "timestamp" and "frame_time" in src/assets/mock-data/aerial-data.ts
 *     - writes the result to src/assets/mock-data/output.ts
 *
 *   node src/assets/mock-data/adjust_time.cjs 2 src/assets/mock-data/aerial-data.ts src/assets/mock-data/output.ts
 *
 * Notes:
 * - Offset is applied as a subtraction (values are clamped to a minimum of 0 to avoid negative times).
 * - The script preserves the original number of decimal places for each value.
 */

const fs = require("fs");
const path = require("path");

// CLI args
const [, , offsetArg, inputArg, outputArg] = process.argv;

if (!offsetArg) {
	console.error("Missing required argument: <offsetSeconds>");
	console.error(
		"Usage: node src/assets/mock-data/adjust_time.cjs <offsetSeconds> [inputPath] [outputPath]"
	);
	process.exit(1);
}

const offsetSeconds = parseFloat(offsetArg);
if (!Number.isFinite(offsetSeconds)) {
	console.error(
		`Invalid offsetSeconds "${offsetArg}". Provide a valid number.`
	);
	process.exit(1);
}

// Default paths
const defaultInput = path.resolve(
	process.cwd(),
	"src/assets/mock-data/data.ts"
);
const defaultOutput = path.resolve(
	process.cwd(),
	"src/assets/mock-data/output_rgb_time.ts"
);

const inputPath = inputArg
	? path.resolve(process.cwd(), inputArg)
	: defaultInput;
const outputPath = outputArg
	? path.resolve(process.cwd(), outputArg)
	: defaultOutput;

// Read input
if (!fs.existsSync(inputPath)) {
	console.error(`Input file not found: ${inputPath}`);
	process.exit(1);
}

let content = fs.readFileSync(inputPath, "utf8");

// Regex to target only keys "timestamp" or "frame_time" followed by a numeric literal
// Capture groups:
//  1: key (timestamp|frame_time)
//  2: separator (original spaces + colon + spaces)
//  3: numeric literal (potentially negative, integer or decimal)
//  4: fractional part (optional)
const timeKeyPattern = /\b(timestamp|frame_time)(\s*:\s*)(-?\d+(?:\.\d+)?)/g;

// Keep counters
const counts = {
	timestamp: 0,
	frame_time: 0,
};

function formatAdjusted(originalStr, adjusted) {
	// Preserve original decimal places
	const m = originalStr.match(/\.(\d+)/);
	const decPlaces = m ? m[1].length : 0;

	// Clamp to >= 0 and avoid -0
	const clamped = Math.max(0, adjusted);
	if (decPlaces > 0) {
		const s = clamped.toFixed(decPlaces);
		return s === "-0" || s === "-0.0"
			? "0" + (decPlaces ? "." + "0".repeat(decPlaces) : "")
			: s;
	}
	// No decimals originally: keep integer style
	return String(Math.round(clamped));
}

content = content.replace(timeKeyPattern, (match, key, sep, numStr) => {
	const original = parseFloat(numStr);
	const adjusted = original - offsetSeconds;
	const formatted = formatAdjusted(numStr, adjusted);

	if (key === "timestamp") counts.timestamp += 1;
	if (key === "frame_time") counts.frame_time += 1;

	return `${key}${sep}${formatted}`;
});

// Write output
fs.writeFileSync(outputPath, content, "utf8");

const total = counts.timestamp + counts.frame_time;
console.log(`✅ Adjusted time fields by -${offsetSeconds}s`);
console.log(`• timestamp: ${counts.timestamp}`);
console.log(`• frame_time: ${counts.frame_time}`);
console.log(`• Total replaced: ${total}`);
console.log(`📁 Output file: ${path.relative(process.cwd(), outputPath)}`);
