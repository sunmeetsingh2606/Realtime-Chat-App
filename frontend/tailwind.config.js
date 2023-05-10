/** @type {import('tailwindcss').Config} */
export default {
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
    theme: {
        extend: {
            colors: {
                primary: '#1f2328',
                secondary: '#131313',
                'secondary-emphasis': '#2e333f',
                accent: '#6b8afd',
            },
            borderRadius: {
                normal: '0.5rem',
            },
        },
    },
    plugins: [],
};
