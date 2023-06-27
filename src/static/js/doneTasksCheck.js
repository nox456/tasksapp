export default function doneTasksCheck() {
    const done_check = Array.from(document.getElementsByClassName("done-check"));
    const done_form = Array.from(document.getElementsByClassName("done-form"));

    if (done_check.length > 0) {
        done_check.forEach((check,id) => {
            check.addEventListener("click", () => {
                done_form[id].submit()
            })
        })
    }
}
