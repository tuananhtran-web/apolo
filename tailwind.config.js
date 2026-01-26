module.exports = {
  darkMode: ["selector", '[zaui-theme="dark"]'],
  purge: {
    enabled: true,
    content: ["./src/**/*.{js,jsx,ts,tsx,vue}"],
  },
  theme: {
    extend: {
      colors: {
        primary: '#0E6F4E',
        secondary: '#F5B400',
        accent: '#E53935',
        background: '#FFFFFF',
      },
      fontFamily: {
        mono: ["Roboto Mono", "monospace"],
      },
    },
  },
};
