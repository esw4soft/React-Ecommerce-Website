module.exports = {
  content: [
    'node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}',
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {},
    minHeight: {
      asdf: '50vh',
    },
  },
  plugins: [require('flowbite/plugin')],
}
