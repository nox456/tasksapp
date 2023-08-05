// Get all habits containers and expand it when click on it
export default function expandHabits() {
    const elements = Array.from(document.getElementsByClassName("element"));
    const daysContainer = Array.from(
        document.getElementsByClassName("days-expand")
    );
    const expandIcon = Array.from(
        document.getElementsByClassName("expand-icon")
    );
    const category = Array.from(
        document.getElementsByClassName("category-expand")
    );
    const options = Array.from(
        document.getElementsByClassName("options-expand")
    );

    elements.forEach((elem, ind) => {
        elem.addEventListener("click", () => {
            if (expandIcon[ind].classList.contains("gg-chevron-down")) {
                category[ind].style.display = "block";
                options[ind].style.display = "flex";
                daysContainer[ind].style.display = "flex";
                expandIcon[ind].classList.replace(
                    "gg-chevron-down",
                    "gg-chevron-up"
                );
                elem.style.cursor = "default"
            } else {
                category[ind].style.display = "none";
                options[ind].style.display = "none";
                daysContainer[ind].style.display = "none";
                expandIcon[ind].classList.replace(
                    "gg-chevron-up",
                    "gg-chevron-down"
                );
                elem.style.cursor = "pointer"
            }
        });
    });
}
