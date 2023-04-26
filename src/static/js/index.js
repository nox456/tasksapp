import sidebar from "./sidebar.js";
import message from "./message.js";
import confirmDelete from "./confirmDelete.js";
import selectDays from "./selectDays.js";

const documentUrl = document.URL;

// Main functions
sidebar();
if (documentUrl.includes("list")) {
    message();
    confirmDelete();
}
if (documentUrl.includes("update") || documentUrl.includes("add")) {
    selectDays();
}
