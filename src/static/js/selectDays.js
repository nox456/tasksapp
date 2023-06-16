export default function selectDays() {
    const days = Array.from(document.getElementsByClassName("day"));

    days.forEach((day) => {
        day.addEventListener("click", (e) => {
            if (day.hasAttribute("name")) {
                day.removeAttribute("name");
                day.classList.toggle("selected");
            } else {
                day.setAttribute("name", "days");
                day.classList.toggle("selected");
            }
        });
    });
}
