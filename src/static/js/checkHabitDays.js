// Mark the days of a habit in it container
export default function checkHabitDays() {
    const habits_containers = Array.from(document.getElementsByClassName("habit-container"))
    const days_week = {
        1: "L",
        2: "M",
        3: "X",
        4: "J",
        5: "V",
        6: "S",
        7: "D"
    }
    const today = new Date().getDay()

    habits_containers.forEach(habit => {
        const days_container = habit.querySelector("#days-container")
        const days = Array.from(days_container.querySelectorAll(".selected"))
        days.forEach(day => {
            if (day.innerText == days_week[today]) {
                habit.classList.add("habit-today")
            }
        })
    })
}
