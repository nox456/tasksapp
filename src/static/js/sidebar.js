// Expand and collapse the sidebar when click on menu icon
export default function sidebar() {
    if (document.getElementById("sidebar")) {
        const menu_icon = document.getElementById("menu-icon");
        const sidebar = document.getElementById("sidebar");
        const header = document.getElementById("main-header");
        const main_container = document.getElementById("main-container");
        const main_blur_container = document.getElementById(
            "main-blur-container"
        );
        const logout_confirm = document.getElementById("logout-confirm");

        let menuIsActive = false;
        const screenWidth = window.screen.width
        menu_icon.addEventListener("click", () => {
            if (menuIsActive == false) {
                sidebar.style.display = "flex";
                if (screenWidth > 640) {
                    main_container.style.gridColumn = "span 1";
                } else {
                    main_blur_container.style.display = "block";
                }
                menuIsActive = true;
            } else {
                main_blur_container.style.display = "none";
                sidebar.style.display = "none";
                if (screenWidth > 640) {
                    main_container.style.gridColumn = "span 2";
                }
                logout_confirm.style.display = "none";
                menuIsActive = false;
            }
        });
    }
}
