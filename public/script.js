document.addEventListener("DOMContentLoaded", function () {
    const billTableBody = document.querySelector("#billTable tbody");
    const grossInput = document.getElementById("grossInput");
    const sgstInput = document.getElementById("sgstInput");
    const cgstInput = document.getElementById("cgstInput");
    const grandInput = document.getElementById("grandInput");
    const taxRateSelect = document.getElementById("taxRate");

    const numberOfRows = 12;

    // Function to calculate total
    function calculateTotal() {
        const qty = parseFloat(this.parentNode.parentNode.querySelector('.qty').value) || 0;
        const rate = parseFloat(this.parentNode.parentNode.querySelector('.rate').value) || 0;
        const total = qty * rate;
        this.parentNode.parentNode.querySelector('.total').value = total.toFixed(2);

        // Update Gross value
        let grossValue = 0;
        document.querySelectorAll('.total').forEach(function (input) {
            grossValue += parseFloat(input.value) || 0;
        });
        grossInput.value = grossValue.toFixed(2);

        // Calculate SGST and CGST based on tax rate
        const taxRate = parseFloat(taxRateSelect.value);
        const sgst = (grossValue * taxRate).toFixed(2);
        const cgst = (grossValue * taxRate).toFixed(2);
        sgstInput.value = sgst;
        cgstInput.value = cgst;

        // Calculate Grand Total
        const grandTotal = grossValue + parseFloat(sgst) + parseFloat(cgst);
        grandInput.value = grandTotal.toFixed(2);

    }

    // Add rows to the table
    for (let i = 0; i < numberOfRows; i++) {
        const row = document.createElement("tr");
        row.className = 'text-base';
        row.innerHTML = `
            <td class="border border-black px-4 h-8 font-medium">${i + 1}</td>
            <td class="border border-black px-2">
                <input type="text" class="w-full outline-none h-full font-semibold">
            </td>
            <td class="border border-black px-2">
                <input type="text" class="w-full outline-none h-full font-semibold">
            </td>
            <td class="border border-black px-2">
                <input type="text" class="qty w-full outline-none h-full font-semibold">
            </td>
            <td class="border border-black px-2">
                <input type="number" class="rate w-full outline-none h-full font-semibold">
            </td>
            <td class="border border-black px-2">
                <input type="text" class="total w-full outline-none h-full font-semibold" readOnly>
            </td>
        `;
        billTableBody.appendChild(row);

        // Attach event listeners to input fields for qty and rate
        row.querySelector('.qty').addEventListener('input', calculateTotal);
        row.querySelector('.rate').addEventListener('input', calculateTotal);
    }

    // Add event listener to tax rate select element
    taxRateSelect.addEventListener('change', calculateTotal);

});

function printBill() {
    window.print();
}



