/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    colors: {
      body: '#EBB582',
      textColor: '#785A46',
      secondBody: '#EB8A3E',
      secondColor: '#D24136'
    },
      
    extend: {
      maxWidth: {
        deskwide: '1500px',
        desknarrow: '1000px',
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
};

// .color1 {color: #a7be97;}
// .color2 {color: #d8d0aa;}
// .color3 {color: #101d06;}
// .color4 {color: #777a75;}
// .color5 {color: #e5e5e5;}
