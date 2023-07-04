export default function addUserImg() {
    const addUser_input = document.getElementById("no-user-img")
    const addUser_form = document.getElementById("add-user-form")
    addUser_input.addEventListener("change", () => {
        addUser_form.submit()
    })
}
