/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './app/**/*.{js,jsx}',
    './ui/**/*.{js,jsx}',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
  // Safelist classes that are dynamically generated and won't be detected by content scanning
  safelist: [
    // Add any dynamic classes here if needed
  ],
  // Purge unused CSS in production
  corePlugins: {
    // Disable preflight if not needed to reduce base CSS
    // preflight: false,
  },
}
