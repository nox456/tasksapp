export default function message() {
    const message_container = document.getElementById("message-container");
    const message_button = document.getElementById("message-button");
    const message_text = document.getElementById("message-text");

    const messageText = message_text.innerText;

    if (
        messageText == "Tarea Creada con Éxito" ||
        messageText == "Habito Creado con Éxito"
    ) {
        message_container.style.backgroundColor = "#090";
    } else if (
        messageText == "Tarea Eliminada con Éxito" ||
        messageText == "Habito Eliminado con Éxito"
    ) {
        message_container.style.backgroundColor = "#F00";
    } else {
        message_container.style.backgroundColor = "#229";
        message_button.style.color = "#FFF";
    }

    message_button.addEventListener("click", () => {
        message_container.style.display = "none";
    });
}
