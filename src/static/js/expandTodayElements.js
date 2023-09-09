// Get all tasks and habits of today and expand it when click
export default function expandTodayElements() {
    const elements = Array.from(document.getElementsByClassName("element"));
    const iconContainer = Array.from(
        document.getElementsByClassName("icon-container")
    )
    const category = Array.from(
        document.getElementsByClassName("category-expand")
    );
    elements.forEach((elem, ind) => {
        elem.addEventListener("click", () => {
            if (iconContainer[ind].classList.contains("close")) {
                category[ind].style.display = "block";
                iconContainer[ind].innerHTML = `
                    <svg width="20" height="20" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                        <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                        <path d="M6 9l6 6l6 -6"></path>
                    </svg>
                `
                iconContainer[ind].classList.replace("close", "open")
                elem.style.cursor = "default";
            } else {
                category[ind].style.display = "none";
                iconContainer[ind].innerHTML = `
                    <svg width="20" height="20" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                        <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                        <path d="M6 15l6 -6l6 6"></path>
                    </svg>
                `
                iconContainer[ind].classList.replace("open", "close")
                elem.style.cursor = "pointer"
            }
        });
    });
}
