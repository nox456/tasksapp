export default function selectDays () {
    const days = Array.from(document.getElementsByClassName("day"));

    days.forEach((day) => {
        day.addEventListener("click", (e) => {
            if (day.hasAttribute("name")) {
                day.removeAttribute("name");
                day.style.backgroundColor = "transparent";
                day.style.borderColor = "#000"
            } else {
                day.setAttribute("name", "days");
                day.style.backgroundColor = "#090";
                day.style.borderColor = "#090"
            }
        });
    });
};
