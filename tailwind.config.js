/** @type {import('tailwindcss').Config} */
export default {
    content: ["./src/views/**/*.hbs", "./src/views/*.hbs"],
    theme: {
        extend: {
            backgroundImage: {
                "main-background":
                    "linear-gradient(to right bottom, #13234e, #263997, #5760c7)",
            },
            gridTemplateRows: {
                layout: "10% 90%",
            },
            gridTemplateColumns: {
                layout: "85% 15%",
            },
        },
        screens: {
            sm: { max: "640px" },
            md: { max: "768px" },
            lg: { max: "1024px" },
            xl: { max: "1280px" },
            "2xl": { max: "1536px" },
        },
    },
    plugins: [],
};
