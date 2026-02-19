import { Bold } from 'lucide-astro';

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

      typography: (theme) => ({
        DEFAULT: {
          css: {
            // 1. 基礎設定
            maxWidth: 'none', // 讓文章寬度跟隨容器 (不要被預設的 65ch 限制)
            color: theme('colors.text'), // 內文顏色 (深灰)
            lineHeight: '1.8', // 增加行高，提升閱讀舒適度 (醫療文章字多，這很重要)

            // 2. 標題設計 (H1 - H4)
            h1: {
              color: theme('colors.heading'),
              fontWeight: 'bold',
              fontSize: '2.25em',
              marginTop: '0',
              marginBottom: '0.8em',
              lineHeight: '1.1',
            },
            h2: {
              color: theme('colors.heading'),
              fontWeight: '700',
              fontSize: '1.75em',
              marginTop: '2em', // 標題上方留白多一點
              marginBottom: '1em',
              lineHeight: '1.3',
              borderBottom: `2px solid ${theme('colors.primary.light')}`, // 底部加上淺藍色裝飾線
              paddingBottom: '0.3em',
              display: 'inline-block', // 讓底線只跟文字一樣寬 (可選)
              width: '100%', // 或者讓底線延伸整行 (目前選這個)
            },
            h3: {
              color: theme('colors.primary.dark'), // H3 使用深藍色，區分層級
              fontWeight: '600',
              fontSize: '1.4em',
              marginTop: '1.6em',
              marginBottom: '0.6em',
            },
            h4: {
              color: theme('colors.heading'),
              fontWeight: '600',
              marginTop: '1.5em',
              marginBottom: '0.5em',
            },

            // 3. 內文與強調
            p: {
              marginTop: '1.25em',
              marginBottom: '1.25em',
            },
            strong: {
              color: theme('colors.heading'), // 強調文字加深
              fontWeight: '600',
              backgroundColor: theme('colors.primary.light'), // (選用) 像螢光筆一樣的背景底色
              padding: '0 4px', // 背景底色的留白
              borderRadius: '2px',
            },
            a: {
              color: theme('colors.primary.DEFAULT'),
              textDecoration: 'none', // 預設拿掉底線，看起來比較乾淨
              fontWeight: '500',
              borderBottom: `1px solid ${theme('colors.primary.DEFAULT')}`, // 自定義細底線
              transition: 'all 0.2s ease',
              '&:hover': {
                color: theme('colors.primary.dark'),
                borderBottomWidth: '2px', // Hover 時底線變粗
                backgroundColor: 'rgba(0, 90, 156, 0.05)', // 微微的藍色背景
              },
            },

            // 4. 列表樣式
            ul: {
              marginTop: '1em',
              marginBottom: '1em',
              paddingLeft: '1.5em', // 縮排
            },
            ol: {
              marginTop: '1em',
              marginBottom: '1em',
              paddingLeft: '1.5em',
            },
            'li': {
              marginTop: '0.5em',
              marginBottom: '0.5em',
            },
            'ul > li::marker': {
              color: theme('colors.primary.DEFAULT'), // 列表前面的點點用品牌藍色
            },
            'ol > li::marker': {
              color: theme('colors.primary.DEFAULT'), // 數字也用品牌藍色
              fontWeight: '600',
            },

            // 5. 引用區塊 (Blockquote) - 模仿醫療筆記風格
            blockquote: {
              fontWeight: '500',
              fontStyle: 'italic',
              color: theme('colors.heading'),
              borderLeftWidth: '4px',
              borderLeftColor: theme('colors.primary.DEFAULT'), // 左側粗藍線
              backgroundColor: theme('colors.gray-bg'), // 灰色背景
              padding: '1em 1.5em', // 內距
              borderRadius: '0 8px 8px 0', // 右側圓角
              marginTop: '2em',
              marginBottom: '2em',
              quotes: '"\\201C""\\201D""\\2018""\\2019"', // 定義引號樣式
            },
            'blockquote p:first-of-type::before': {
              content: 'open-quote',
            },
            'blockquote p:last-of-type::after': {
              content: 'close-quote',
            },

            // 6. 圖片與媒體
            img: {
              borderRadius: '8px', // 圖片圓角
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)', // 輕微陰影
              marginTop: '2em',
              marginBottom: '2em',
            },
            figcaption: {
              color: theme('colors.text'),
              textAlign: 'center',
              fontSize: '0.875em',
              marginTop: '0.5em',
              opacity: '0.8',
            },
            
            // 7. 表格 (如果有用到 Markdown 表格)
            table: {
              width: '100%',
              tableLayout: 'auto',
              textAlign: 'left',
              marginTop: '2em',
              marginBottom: '2em',
              fontSize: '0.95em',
            },
            thead: {
              backgroundColor: theme('colors.primary.light'),
              color: theme('colors.heading'),
              borderBottomWidth: '1px',
              borderBottomColor: theme('colors.primary.dark'),
            },
            'thead th': {
              padding: '0.75em',
              fontWeight: '600',
            },
            'tbody td': {
              padding: '0.75em',
              borderBottomWidth: '1px',
              borderBottomColor: theme('colors.border'),
            },
          },
        },
      }),

      // 4. 文章樣式 (Typography) - 這裡不需要改，因為它會自動引用上面的 colors
      // typography: (theme) => ({
      //   DEFAULT: {
      //     css: {
      //       color: theme('colors.text'),
      //       maxWidth: 'none',
      //       lineHeight: '1.8',

      //       h1: {
      //         color: theme('colors.heading'),
      //         fontWeight: '700',
      //       },
      //       h2: {
      //         color: theme('colors.heading'),
      //         fontWeight: '700',
      //         marginTop: '2em',
      //         marginBottom: '1em',
      //         borderBottom: `1px solid ${theme('colors.border')}`, // 改用變數
      //       },
      //       h3: {
      //         color: theme('colors.heading'),
      //         fontWeight: '600',
      //       },
      //       a: {
      //         color: theme('colors.primary.DEFAULT'),
      //         textDecoration: 'underline',
      //         '&:hover': {
      //           color: theme('colors.primary.dark'),
      //         },
      //       },
      //       strong: {
      //         color: theme('colors.heading'),
      //         fontWeight: '600',
      //       },
      //       'ul > li::marker': {
      //         color: theme('colors.text'),
      //       },
      //     },
      //   },
      // }),
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