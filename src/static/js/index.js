const menu_icon = document.getElementById("menu-icon");
const sidebar = document.getElementById("sidebar");
const navbar = document.getElementById("navbar");
const main_container = document.getElementById("main-container")

let menuIsActive = false;

menu_icon.addEventListener("click", () => {
    if (menuIsActive == false) {
        sidebar.style.display = "block";
        navbar.style.gridColumn = "span 1";
        main_container.style.gridColumn = "span 1"
        menuIsActive = true
    } else {
        sidebar.style.display = "none";
        navbar.style.gridColumn = "span 2";
        main_container.style.gridColumn = "span 2"
        menuIsActive = false
    }
});
