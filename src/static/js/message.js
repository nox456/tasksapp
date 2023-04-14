export default function message () {
const message_container = document.getElementById("message-container")
const message_button = document.getElementById("message-button")
const message_text = document.getElementById("message-text")

if (message_text.innerText == "Tarea Creada con Éxito") {
    message_container.style.backgroundColor = "#090" 
} else if (message_text.innerText == "Tarea Eliminada con Éxito") {
    message_container.style.backgroundColor = "#F00"
} else {
    message_container.style.backgroundColor = "#229"
    message_button.style.color = "#FFF"
}

message_button.addEventListener("click", () => {
    message_container.style.display = "none"
})

}
