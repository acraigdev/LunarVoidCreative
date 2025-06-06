import { heroui } from '@heroui/react';
export default heroui({
  addCommonColors: true,
  themes: {
    light: {
      colors: {
        background: '#fcf7ff', // or DEFAULT
        foreground: '#11181C', // or 50 to 900 DEFAULT
        // divider,
        // overlay,
        // focus,
        // content1,
        // content2,
        // content3,
        // content4
        // default
        primary: {
          50: '#fcf7ff',
          100: '#F4E1F7',
          200: '#E7C4F0',
          300: '#C499D3',
          400: '#956EA8',
          500: '#5B3C6E',
          600: '#482B5E',
          700: '#361E4F',
          800: '#26133F',
          900: '#1B0B34',
          DEFAULT: '#5B3C6E',
        },
        secondary: {
          100: '#CAFBFC',
          200: '#98F2F9',
          300: '#62DAED',
          400: '#3BBADC',
          500: '#0590C6',
          600: '#0370AA',
          700: '#02548E',
          800: '#013B72',
          900: '#002A5F',
          DEFAULT: '#02548E',
        },
        success: {
          100: '#E6FBCB',
          200: '#C8F799',
          300: '#9DE864',
          400: '#73D13D',
          500: '#3db30a',
          600: '#299907',
          700: '#198005',
          800: '#0D6703',
          900: '#045501',
          DEFAULT: '#0D6703',
        },
        warning: {
          100: '#FBF2CA',
          200: '#F8E296',
          300: '#EAC75F',
          400: '#D5A837',
          500: '#BA8003',
          600: '#9F6802',
          700: '#855301',
          800: '#6B3F00',
          900: '#593100',
          DEFAULT: '#6B3F00',
        },
        danger: {
          100: '#F9D7CD',
          200: '#F4A89D',
          300: '#E06B67',
          400: '#C13F47',
          500: '#991025',
          600: '#830B29',
          700: '#6E082A',
          800: '#580529',
          900: '#490328',
          DEFAULT: '#991025',
        },
      },
    },
  },
});
