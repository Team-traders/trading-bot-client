const withMT = require("@material-tailwind/react/utils/withMT");

module.exports = withMT({
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./node_modules/tw-elements-react/dist/js/**/*.js", // Ajout pour tw-elements-react
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require('tw-elements-react/dist/plugin') // Ajout du plugin tw-elements-react
  ],
});