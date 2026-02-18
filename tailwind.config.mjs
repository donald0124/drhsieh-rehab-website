/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      // 1. 連結到 base.css 的變數
      colors: {
        primary: {
          DEFAULT: 'var(--color-primary)', // 對應 base.css
          dark: 'var(--color-primary-dark)',
          light: 'var(--color-primary-light)',
        },
        heading: 'var(--color-heading)',
        text: 'var(--color-text)',
        border: 'var(--color-border)',
        'gray-bg': 'var(--color-gray-bg)',
      },

      // 2. 連結字體設定
      fontFamily: {
        sans: ['var(--font-sans)', 'sans-serif'],
      },

      // 3. 容器設定 (同步 --container-width)
      container: {
        center: true,
        padding: '1rem',
        screens: {
          lg: '1100px', // 必須手動對應 CSS 變數的數值，因為 media query 不能用 var()
          xl: '1100px',
          '2xl': '1100px',
        },
      },

      // 4. 文章樣式 (Typography) - 這裡不需要改，因為它會自動引用上面的 colors
      typography: (theme) => ({
        DEFAULT: {
          css: {
            color: theme('colors.text'),
            maxWidth: 'none',
            h1: {
              color: theme('colors.heading'),
              fontWeight: '700',
            },
            h2: {
              color: theme('colors.heading'),
              fontWeight: '700',
              marginTop: '2em',
              marginBottom: '1em',
              borderBottom: `1px solid ${theme('colors.border')}`, // 改用變數
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
            'ul > li::marker': {
              color: theme('colors.text'),
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


    // <style is:global>
    //     /* is:global 讓這些樣式能套用到 .md 產生的 HTML */
    //     .prose h2 {
    //         font-size: 2rem;
    //         margin-top: 3rem;
    //         margin-bottom: 1.5rem;
    //         padding-bottom: 0.5rem;
    //         border-bottom: 2px solid var(--color-border);
    //         text-align: left;
    //     }
    //     .prose h3 {
    //         font-size: 1.5rem;
    //         margin-top: 2rem;
    //         text-align: left;
    //     }
    //     .prose h4 {
    //         font-size: 1.3rem;
    //         margin-top: 2rem;
    //         text-align: left;
    //     }

    //     .prose p {
    //         font-size: 1.1rem;
    //         margin-bottom: 1.5rem;
    //     }
    //     .prose ul {
    //         font-size: 1.1rem;
    //         margin-bottom: 1.5rem;
    //         padding-left: 2rem;
    //         /* 🚨 關鍵修正：強制設定列表類型和位置 */
    //         list-style-type: disc; 
    //     }

    //     .prose ol {
    //         font-size: 1.1rem;
    //         margin-bottom: 1.5rem;
    //         padding-left: 2rem;
    //         /* 🚨 關鍵修正：強制設定列表類型和位置 */
    //         list-style-type: decimal; /* 確保有序列表顯示數字 */
    //     }

    //     .prose li {
    //          margin-bottom: 0.5rem;
    //     }
    //     .prose img {
    //         max-width: 100%;
    //         height: auto;
    //         border-radius: 8px;
    //         margin: 2rem 0;
    //     }
    //     .prose a {
    //         text-decoration: underline;
    //     }
    // </style>