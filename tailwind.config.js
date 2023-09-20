/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/views/**/*.hbs","./src/views/*.hbs"],
  theme: {
    extend: {
        backgroundImage: {
            'main-background': 'linear-gradient(to right bottom, #13234e, #263997, #5760c7)'
        },
        gridTemplateRows: {
            'layout': '10% 90%'
        },
        gridTemplateColumns: {
            'layout': '85% 15%'
        }
    },
  },
  plugins: [],
}

