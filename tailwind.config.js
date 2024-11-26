const withMT = require("@material-tailwind/react/utils/withMT");

module.exports = withMT({
  darkMode: 'class',
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./node_modules/tw-elements-react/dist/js/**/*.js", // Ajout pour tw-elements-react
  ],
  theme: {
    extend: {
      colors: {
        lightBackground: '#ffffff',
        darkBackground: '#1e293b',
        lightText: '#1f2937',
        darkText: '#f8fafc',
        darkHeader: '#0f172a',
        primary: {
          DEFAULT: '#6366f1',
          600: '#4f46e5',
          700: '#4338ca',
        },
        info: {
          DEFAULT: '#54b4d3',
          600: '#3b82f6',
          700: '#2563eb',
        },
        formBackground: '#1f2837',
        formField: '#374051',
        buttonPrimary: '#2662ea',
      },
    },
  },
  plugins: [
    require('tw-elements-react/dist/plugin') // Ajout du plugin tw-elements-react
  ],
});