export default function expandTodayElements() {
    const elements = Array.from(document.getElementsByClassName("element"));
    const expandIcon = Array.from(
        document.getElementsByClassName("expand-icon")
    );
    const category = Array.from(
        document.getElementsByClassName("category-expand")
    );
    elements.forEach((elem, ind) => {
        elem.addEventListener("click", () => {
            if (expandIcon[ind].classList.contains("gg-chevron-down")) {
                category[ind].style.display = "block";
                expandIcon[ind].classList.replace(
                    "gg-chevron-down",
                    "gg-chevron-up"
                );
                elem.style.cursor = "default";
            } else {
                category[ind].style.display = "none";
                expandIcon[ind].classList.replace(
                    "gg-chevron-up",
                    "gg-chevron-down"
                );
                elem.style.cursor = "pointer"
            }
        });
    });
}
