// Show a text when there's not tasks or habits for today
export default function noElementsMessage() {
    const lists_containers = Array.from(
        document.getElementsByClassName("list-container")
    );

    lists_containers.forEach((list) => {
        if (list.childElementCount == 0) {
            const no_tasks = document.getElementById("no-tasks");
            const no_habits = document.createElement("p");
            no_habits.classList.add("no-habits");
            no_habits.textContent = "No hay habitos para Hoy";

            if (no_tasks) {
                no_tasks.textContent = "No hay tareas para Hoy";
            }

            list.appendChild(no_habits);
        }
    });
}
