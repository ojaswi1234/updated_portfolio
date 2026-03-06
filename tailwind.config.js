/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        'neo-yellow': '#fde047',
        'neo-pink': '#f9a8d4',
        'neo-cyan': '#67e8f9',
        'neo-green': '#86efac',
        'neo-orange': '#fdba74',
      },
    },
  },
  plugins: [],
}
