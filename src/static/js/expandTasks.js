export default function expandTasks() {
    const elements = Array.from(document.getElementsByClassName("element"));
    const category = Array.from(document.getElementsByClassName("category-expand"));
    const options = Array.from(document.getElementsByClassName("options-expand"));
    const expandIcon = Array.from(document.getElementsByClassName("expand-icon"))

    elements.forEach((elem, ind) => {
        elem.addEventListener("click", () => {
            if (expandIcon[ind].classList.contains("gg-chevron-down")) {
                category[ind].style.display = "block";
                options[ind].style.display = "flex";
                expandIcon[ind].classList.replace("gg-chevron-down", "gg-chevron-up")
            } else {
                category[ind].style.display = "none";
                options[ind].style.display = "none";
                expandIcon[ind].classList.replace("gg-chevron-up", "gg-chevron-down")
            }
        });
    });
}
