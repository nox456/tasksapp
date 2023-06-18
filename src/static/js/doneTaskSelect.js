export default function doneTaskSelect() {
    const done_select_form = document.getElementById("done-select-form")
    const done_select = document.getElementById("done-select")

    done_select.addEventListener("change", () => {
        done_select_form.submit()
    })
}
