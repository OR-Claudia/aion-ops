export const generateAnalysisReport = (id: string) => {
	switch (id) {
		case "1":
			console.log("Generating analysis for case 1");
			return {
				systemStatusText:
					"Battery at 54% with 1.3 hours of remaining operational reserve. Signal integrity maintained at -39 dBm, encrypted uplink showing stable throughput and no detected interference. Navigation, thermal imaging, and object-tracking subsystems functioning within nominal operational thresholds.",

				missionProgressText:
					"Patrol sweep reached 67% completion of assigned 10km forest-corridor segment. Flight path remained stable at an average altitude of 120m above mixed conifer woodland. Visibility held at 5.8km under light overcast conditions. Minor wind shear detected but within acceptable compensation limits.",

				operationalSummaryText:
					"Live feed captured activity along a gravel service path. Autonomous tagging identified two moving vehicles traveling northeast at approx. 38–42 km/h. Additional detections included six civilians dispersed along the pathway and three armed individuals categorized as soldier-class entities based on equipment signatures. Movement patterns indicate no immediate hostile interaction. Multi-spectral capture logged 2.4 GB of environmental and activity-focused data. System maintaining continuous observation without anomalies.",
			};
		case "2":
			console.log("Generating analysis for case 2");
			return {
				systemStatusText:
					"Battery holding at 63% with projected 1.7 hours of continued operational endurance. Long-range transmission link stabilized at -42 dBm, maintaining clean encrypted throughput with no detected frame degradation. Aerial imaging suite functioning optimally across optical, thermal, and motion-tracking subsystems.",

				missionProgressText:
					"Current sweep achieved 74% completion of the designated forest-perimeter grid segment. Aerial altitude maintained at 210m, providing extended visibility over canopy openings and adjacent gravel access roads. Air conditions steady with 6.4km visibility and mild upper-level turbulence.",

				operationalSummaryText:
					"Aerial capture revealed increased activity along the gravel road running parallel to the forest edge. Automated classifiers identified four vehicles—two stationary near the treeline and two moving eastbound at moderate speed. Elevated presence of armed personnel detected: approximately seven individuals exhibiting soldier-class characteristics distributed along both road edges and partial canopy cover. Civilians observed in smaller numbers with non-coordinated movement patterns. Thermal signatures and movement indicators suggest heightened activity relative to prior pass. Recorded dataset reached 3.6 GB, including wide-area scans and multi-spectrum surveillance. All systems performing within mission parameters.",
			};
		default:
			console.log("Generating analysis for case default");
			return {
				systemStatusText:
					"Battery concluded at 62% capacity with 1.9 hours reserve remaining. WiFi connectivity maintained stable performance at -41 dBm throughout operation, with encrypted data transmission experiencing zero packet loss. All critical systems operated within normal parameters for mission duration.",
				missionProgressText:
					"Successfully completed 81% of designated 18km² patrol grid covering mixed terrain including agricultural zones, woodland sectors, and rural settlements. Navigation maintained precise waypoint execution at 150m altitude. Weather conditions remained favorable with 7km visibility and moderate crosswinds from southwest.",

				operationalSummaryText:
					"Standard reconnaissance proceeded with systematic grid coverage. Sensor array collected multi-spectrum imagery totaling 3.1 GB transmitted data. Area assessment revealed expected forest and mixed terrain infrastructure patterns. Mission timeline concluded as scheduled. All safety protocols observed with no anomalies.",
			};
	}
};
