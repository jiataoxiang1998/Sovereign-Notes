/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'surface-dim': '#131313',
        'primary-fixed-dim': '#e9c349',
        'on-primary-fixed-variant': '#574500',
        'on-background': '#e5e2e1',
        'surface-tint': '#e9c349',
        'outline': '#99907c',
        'on-secondary-container': '#b7b5b4',
        'surface-container-lowest': '#0e0e0e',
        'secondary-container': '#474746',
        'on-surface-variant': '#d0c5af',
        'error': '#ffb4ab',
        'surface-container-highest': '#353534',
        'on-tertiary-fixed-variant': '#27438a',
        'on-tertiary-fixed': '#00174b',
        'surface-container-low': '#1c1b1b',
        'on-error-container': '#ffdad6',
        'primary-container': '#d4af37',
        'on-surface': '#e5e2e1',
        'on-primary-container': '#554300',
        'secondary': '#c8c6c5',
        'secondary-fixed-dim': '#c8c6c5',
        'outline-variant': '#4d4635',
        'inverse-on-surface': '#313030',
        'primary-fixed': '#ffe088',
        'primary': '#f2ca50',
        'tertiary-container': '#97b0ff',
        'error-container': '#93000a',
        'on-tertiary': '#082b72',
        'surface-container-high': '#2a2a2a',
        'on-secondary-fixed-variant': '#474746',
        'on-secondary': '#313030',
        'on-primary-fixed': '#241a00',
        'secondary-fixed': '#e5e2e1',
        'background': '#131313',
        'surface': '#131313',
        'tertiary-fixed': '#dbe1ff',
        'on-primary': '#3c2f00',
        'inverse-surface': '#e5e2e1',
        'on-secondary-fixed': '#1c1b1b',
        'inverse-primary': '#735c00',
        'on-error': '#690005',
        'tertiary': '#bfcdff',
        'surface-container': '#201f1f',
        'surface-bright': '#3a3939',
        'on-tertiary-container': '#254188',
        'surface-variant': '#353534',
        'neutral-950': '#0a0a0a',
        'neutral-900': '#171717',
        'neutral-500': '#525252',
        'neutral-100': '#262626'
      },
      borderRadius: {
        DEFAULT: '0.125rem',
        lg: '0.25rem',
        xl: '0.5rem',
        full: '0.75rem'
      },
      fontFamily: {
        headline: ['Manrope', 'system-ui', 'sans-serif'],
        body: ['Inter', 'system-ui', 'sans-serif'],
        label: ['Inter', 'system-ui', 'sans-serif']
      }
    }
  },
  plugins: []
}