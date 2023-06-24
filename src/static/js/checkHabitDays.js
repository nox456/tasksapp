export default function checkHabitDays() {
    const habits_containers = Array.from(document.getElementsByClassName("habit-container"))
    const days_week = {
        1: "Lunes",
        2: "Martes",
        3: "Miercoles",
        4: "Jueves",
        5: "Viernes",
        6: "Sabado",
        7: "Domingo"
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
