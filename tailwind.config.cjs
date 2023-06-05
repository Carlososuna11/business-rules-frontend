/** @type {import('tailwindcss').Config} */
// eslint-disable-next-line @typescript-eslint/no-var-requires, no-undef
const colors = require('tailwindcss/colors');
export default {
  content: [
    './src/**/*.{html,js,svelte,ts}',
    './node_modules/flowbite-svelte/**/*.{html,js,svelte,ts}',
  ],

  // eslint-disable-next-line no-undef
  plugins: [],
  theme: {
    extend: {
      colors: {
        // you can either spread `colors` to apply all the colors
        ...colors,
      },
    },
  },
};
