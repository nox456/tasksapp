export default function showHabitsToday() {
    const habits = Array.from(document.getElementById("list-container").children)    
    const list_container = document.getElementById("list-container")

    habits.forEach(habit => {
        if (!habit.classList.contains("habit-today")) {
            habit.remove()
        }
    })
    if (list_container.childElementCount == 0) {
        const no_habits_today = document.createElement("p")
        no_habits_today.textContent = "No hay habitos para hoy"
        list_container.appendChild(no_habits_today)
    }
}
