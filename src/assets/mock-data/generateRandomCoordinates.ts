// This script generates random coordinates within 100km of Sumi, Ukraine

function getRandomCoordinates(): { lat: number; lon: number }[] {
	// Sumi, Ukraine coordinates
	const sumiLat = 50.91;
	const sumiLon = 34.8;

	// Earth's radius in kilometers
	const earthRadius = 6371;

	// Generate 10 random coordinates within 100km radius
	const randomCoordinates: { lat: number; lon: number }[] = [];
	for (let i = 0; i < 10; i++) {
		const distance = Math.random() * 100; // Random distance between 0 and 100 km
		const bearing = Math.random() * 2 * Math.PI; // Random bearing in radians

		const lat1 = (sumiLat * Math.PI) / 180;
		const lon1 = (sumiLon * Math.PI) / 180;

		const lat2 = Math.asin(
			Math.sin(lat1) * Math.cos(distance / earthRadius) +
				Math.cos(lat1) * Math.sin(distance / earthRadius) * Math.cos(bearing)
		);
		const lon2 =
			lon1 +
			Math.atan2(
				Math.sin(bearing) * Math.sin(distance / earthRadius) * Math.cos(lat1),
				Math.cos(distance / earthRadius) - Math.sin(lat1) * Math.sin(lat2)
			);

		randomCoordinates.push({
			lat: (lat2 * 180) / Math.PI,
			lon: (lon2 * 180) / Math.PI,
		});
	}

	return randomCoordinates;
}

const randomCoords = getRandomCoordinates();
console.log(randomCoords);

// Optionally, you can write these coordinates to a new file or modify the existing data.ts
// For now, we'll just log them to the console
