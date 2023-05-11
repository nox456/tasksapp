import sidebar from "./sidebar.js";
import message from "./message.js";
import confirmDelete from "./confirmDelete.js";
import selectDays from "./selectDays.js";
import orderList from "./orderList.js";
import expandTasks from "./expandTasks.js";
import expandHabits from "./expandHabits.js";

const documentUrl = document.URL;

// Main functions
sidebar();
message();
if (documentUrl.includes("list")) {
    confirmDelete();
    orderList();
    if (documentUrl.includes("habit")) {
        expandHabits();
    }
    if (documentUrl.includes("tasks")) {
        expandTasks();
    }
}
if (documentUrl.includes("update") || documentUrl.includes("add")) {
    selectDays();
}
