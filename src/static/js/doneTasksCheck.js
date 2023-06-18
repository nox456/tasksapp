export default function doneTasks() {
    const done_check = document.getElementById("done-check");
    const done_form = document.getElementById("done-form");

    if (done_check) {
        done_check.addEventListener("click", () => {
            done_form.submit();
        });
    }
}
