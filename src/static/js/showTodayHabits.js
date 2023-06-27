export default function showHabitsToday() {
    const list_container = document.getElementById("list-container")
    const habits = Array.from(list_container.children)    

    habits.forEach(habit => {
        if (!habit.classList.contains("habit-today")) {
            habit.remove()
        }
    })
}
