import sidebar from "./sidebar.js";
import message from "./message.js"
import confirmDelete from "./confirmDelete.js";
import selectDays from "./selectDays.js";

// Main functions
sidebar()
message()
confirmDelete()
if (document.URL.includes("update") || document.URL.includes("add")) {
    selectDays()
}
