const documentUrl = window.location.pathname;

// Main functions using dynamic imports
// Only in index, signin and signup pages
const message = await import("./message.js");
message.default();
if (
    documentUrl != "/" &&
    documentUrl != "signup" &&
    documentUrl != "signin"
) {
    const logoutButton = await import("./logoutButton.js"),
        sidebar = await import("./sidebar.js");
    logoutButton.default();
    sidebar.default();
}

// Only in list pages (Tasks list and Habits List)
if (documentUrl == "list") {
    const confirmDelete = await import("./confirmDelete.js"),
        orderList = await import("./orderList.js");
    confirmDelete.default();
    orderList.default();
}
if (documentUrl == "habits/list") {
    const expandHabits = await import("./expandHabits.js"),
        checkHabitDays = await import("./checkHabitDays.js");
    expandHabits.default();
    checkHabitDays.default();
}
if (documentUrl == "tasks/list") {
    const expandTasks = await import("./expandTasks.js"),
        doneTasksCheck = await import("./doneTasksCheck.js"),
        doneTasksSelect = await import("./doneTaskSelect.js");
    expandTasks.default();
    doneTasksCheck.default();
    doneTasksSelect.default();
}

// Only in update and add pages (Update and Add task, Update and Add Habit)
if (documentUrl == "update" || documentUrl == "add") {
    const selectDays = await import("./selectDays.js");
    selectDays.default();
}

// Only in dashboard page
if (documentUrl == "dashboard") {
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

// Only in Profile page
if (documentUrl == "profile") {
    const addUserImg = await import("./addUserImg.js");
    addUserImg.default();
}
