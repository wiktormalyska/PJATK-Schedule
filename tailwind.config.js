/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './app/**/*.{js,tsx,ts,jsx}',"./App.tsx", "./components/**/*.{js,jsx,ts,tsx}"
    ],
    presets: [require("nativewind/preset")],
    theme: {
        extend: {},
    },
    plugins: [],
}

