// Submit the order form when select a order filter in select element
export default function orderList() {
    const orderForm = document.getElementById("order-form");
    const orderSelect = document.getElementById("order-container");

    orderSelect.addEventListener("change", () => {
        orderForm.submit();
    });
}
