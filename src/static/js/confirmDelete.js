export default function confirmDelete() {
    const delete_button = Array.from(
            document.getElementsByClassName("delete-button")
        ),
        confirm_button_no = Array.from(
            document.getElementsByClassName("confirm-button-no")
        ),
        blur_container = Array.from(
            document.getElementsByClassName("blur-container")
        ),
        confirm_container = Array.from(
            document.getElementsByClassName("confirm-container")
        );

    delete_button.forEach((button, index) => {
        button.addEventListener("click", () => {
            confirm_container[index].style.display = "flex";
            blur_container[index].style.display = "block";
        });
        confirm_button_no.forEach((no) => {
            no.addEventListener("click", () => {
                confirm_container[index].style.display = "none";
                blur_container[index].style.display = "none";
            });
        });
    });
}
