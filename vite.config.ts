import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
	assetsInclude: ["**/*.mp4", "**/*.avi"],
	plugins: [react()],
});
