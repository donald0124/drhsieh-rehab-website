/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#005a9c', // 專業藍
          dark: '#004070',    // 深藍 (hover)
          light: '#f0f6fa',   // 淺藍背景 (Synced with style.css)
        },
        heading: '#222222',
        text: '#444444',
        border: '#dddddd',
        'gray-bg': '#f9f9f9', // Added from style.css
      },
      container: {
        center: true,
        padding: '1rem',
        screens: {
          lg: '1100px', // Synced with --container-width
          xl: '1100px',
          '2xl': '1100px',
        },
      },
      typography: (theme) => ({
        DEFAULT: {
          css: {
            color: theme('colors.text'),
            maxWidth: 'none', // Allow full width in container
            h1: {
              color: theme('colors.heading'),
              fontWeight: '700',
            },
            h2: {
              color: theme('colors.heading'),
              fontWeight: '700',
              marginTop: '2em',
              marginBottom: '1em',
              // 這裡甚至可以加 border-bottom 來美化
              borderBottom: `1px solid ${theme('colors.gray.200')}`,
            },
            h3: {
              color: theme('colors.heading'),
              fontWeight: '600',
            },
            a: {
              color: theme('colors.primary.DEFAULT'),
              textDecoration: 'underline',
              '&:hover': {
                color: theme('colors.primary.dark'),
              },
            },
            strong: {
              color: theme('colors.heading'),
              fontWeight: '600',
            },
            // 修正列表樣式 (有時候 bullet 顏色會跟文字不同步)
            'ul > li::marker': {
              color: theme('colors.text'),
            },
            ul: {
              listStyleType: 'disc',
            },
          },
        },
      }),
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}