/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"], // Specify content paths
  theme: {
    extend: {
      scrollbar: ["rounded"], // Enable rounded scrollbar variant
    },
  },
  plugins: [require("tailwind-scrollbar")], // Add the scrollbar plugin
};
