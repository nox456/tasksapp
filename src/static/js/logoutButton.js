// Show and hide the logout confirm message
export default function logoutButton() {
    if (document.getElementById("logout-button")) {
        const logoutButton = document.getElementById("logout-button");
        const logout_confirm = document.getElementById("logout-confirm");
        const confirm_button_no = document.getElementById("confirm-button-no");
        const main_blur_container = document.getElementById(
            "main-blur-container"
        );

        logoutButton.addEventListener("click", () => {
            logout_confirm.style.display = "flex";
            main_blur_container.style.display = "block"
        });
        confirm_button_no.addEventListener("click", () => {
            logout_confirm.style.display = "none";
            main_blur_container.style.display = "none"
        });
    }
}
