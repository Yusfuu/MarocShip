const defaultTheme = require('tailwindcss/defaultTheme')
module.exports = {
    content: ["./src/**/*.{js,jsx,ts,tsx}"],
    theme: {
        screens: {
            'xs': '0px',
            ...defaultTheme.screens,
        },
    },
    plugins: [
        require('tailwind-scrollbar-hide')
    ],
}