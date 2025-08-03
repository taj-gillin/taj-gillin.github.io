import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      // shadcn/ui typically extends theme here via presets or directly
      // For now, we only need the typography plugin.
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}
export default config 