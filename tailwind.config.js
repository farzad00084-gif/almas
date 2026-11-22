/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: { extend: { colors: { ink: '#191b17', paper: '#f2efe6', light: '#faf8f1', olive: '#535943', gold: '#c7a85e', line: '#d5d0c3', muted: '#77796f' }, fontFamily: { display: ['Georgia', 'Times New Roman', 'serif'], sans: ['Inter', 'Helvetica Neue', 'Arial', 'sans-serif'] } } },
  plugins: []
};
