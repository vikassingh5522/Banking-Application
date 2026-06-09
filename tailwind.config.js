/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  corePlugins: {
    preflight: false,
  },
  theme: {
    extend: {
      colors: {
        bank: {
          navy: '#061B3A',
          blue: '#2563EB',
          cyan: '#06B6D4',
          ink: '#0F172A',
          muted: '#64748B',
        },
      },
      boxShadow: {
        soft: '0 24px 80px rgba(15, 23, 42, 0.12)',
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
