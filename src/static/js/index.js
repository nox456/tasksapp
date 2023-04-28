import sidebar from "./sidebar.js";
import message from "./message.js";
import confirmDelete from "./confirmDelete.js";
import selectDays from "./selectDays.js";
import orderList from "./orderList.js";

const documentUrl = document.URL;

// Main functions
sidebar();
if (documentUrl.includes("list")) {
    message();
    confirmDelete();
    orderList()
}
if (documentUrl.includes("update") || documentUrl.includes("add")) {
    selectDays();
}
