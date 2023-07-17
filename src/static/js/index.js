const documentUrl = document.URL;

// Main functions
const message = await import("./message.js");
message.default();
if (
    documentUrl != "http://192.168.1.3:3000/" &&
    !documentUrl.includes("signup") &&
    !documentUrl.includes("signin")
) {
    const logoutButton = await import("./logoutButton.js"),
        sidebar = await import("./sidebar.js");
    logoutButton.default();
    sidebar.default();
}
if (documentUrl.includes("list")) {
    const confirmDelete = await import("./confirmDelete.js"),
        orderList = await import("./orderList.js");
    confirmDelete.default();
    orderList.default();
    if (documentUrl.includes("habit")) {
        const expandHabits = await import("./expandHabits.js"),
            checkHabitDays = await import("./checkHabitDays.js");
        expandHabits.default();
        checkHabitDays.default();
    }
    if (documentUrl.includes("tasks")) {
        const expandTasks = await import("./expandTasks.js"),
            doneTasksCheck = await import("./doneTasksCheck.js"),
            doneTasksSelect = await import("./doneTaskSelect.js");
        expandTasks.default();
        doneTasksCheck.default();
        doneTasksSelect.default();
    }
}
if (documentUrl.includes("update") || documentUrl.includes("add")) {
    const selectDays = await import("./selectDays.js");
    selectDays.default();
}
if (documentUrl.includes("dashboard")) {
    const checkHabitDays = await import("./checkHabitDays.js"),
        showHabitsToday = await import("./showTodayHabits.js"),
        expandTodayElements = await import("./expandTodayElements.js"),
        doneTasksCheck = await import("./doneTasksCheck.js"),
        noElementsMessage = await import("./noElementsMessage.js");
    checkHabitDays.default();
    showHabitsToday.default();
    expandTodayElements.default();
    doneTasksCheck.default();
    noElementsMessage.default();
}
if (documentUrl.includes("profile")) {
    const addUserImg = await import("./addUserImg.js");
    addUserImg.default();
}
