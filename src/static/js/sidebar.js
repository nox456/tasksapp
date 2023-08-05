// Expand and collapse the sidebar when click on menu icon
export default function sidebar() {
    if (document.getElementById("sidebar")) {
        const menu_icon = document.getElementById("menu-icon");
        const sidebar = document.getElementById("sidebar");
        const navbar = document.getElementById("navbar");
        const main_container = document.getElementById("main-container");
        const main_blur_container = document.getElementById(
            "main-blur-container"
        );
        const logout_confirm = document.getElementById("logout-confirm");

        let menuIsActive = false;

        menu_icon.addEventListener("click", () => {
            if (menuIsActive == false) {
                main_blur_container.style.display = "block";
                sidebar.style.display = "flex";
                navbar.style.gridColumn = "span 1";
                main_container.style.gridColumn = "span 1";
                menuIsActive = true;
            } else {
                main_blur_container.style.display = "none";
                sidebar.style.display = "none";
                navbar.style.gridColumn = "span 2";
                main_container.style.gridColumn = "span 2";
                logout_confirm.style.display = "none";
                menuIsActive = false;
            }
        });
    }
}
