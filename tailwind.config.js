// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
    "./screens/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "app-blue": "#2F50C1",
      },
      fontFamily: {
        SFProTextBlack: ["SF-Pro-Text-Black"],
        SFProTextBlackItalic: ["SF-Pro-Text-BlackItalic"],
        SFProTextBold: ["SF-Pro-Text-Bold"],
        SFProTextBoldItalic: ["SF-Pro-Text-BoldItalic"],
        SFProTextHeavy: ["SF-Pro-Text-Heavy"],
        SFProTextHeavyItalic: ["SF-Pro-Text-HeavyItalic"],
        SFProTextLight: ["SF-Pro-Text-Light"],
        SFProTextLightItalic: ["SF-Pro-Text-LightItalic"],
        SFProTextMedium: ["SF-Pro-Text-Medium"],
        SFProTextMediumItalic: ["SF-Pro-Text-MediumItalic"],
        SFProTextRegular: ["SF-Pro-Text-Regular"],
        SFProTextRegularItalic: ["SF-Pro-Text-RegularItalic"],
        SFProTextSemibold: ["SF-Pro-Text-Semibold"],
        SFProTextSemiboldItalic: ["SF-Pro-Text-SemiboldItalic"],
        SFProTextThin: ["SF-Pro-Text-Thin"],
        SFProTextThinItalic: ["SF-Pro-Text-ThinItalic"],
        SFProTextUltralight: ["SF-Pro-Text-Ultralight"],
        SFProTextUltralightItalic: ["SF-Pro-Text-UltralightItalic"],
      },
    },
  },
  plugins: [],
};
