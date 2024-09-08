document.addEventListener('DOMContentLoaded', () => {
    const dateInput = document.getElementById('date');
    const itemsBody = document.getElementById('itemsBody');
    const totalInput = document.getElementById('total');
    const receiptContainer = document.getElementById('receiptContainer');
    const receiptDate = document.getElementById('receiptDate');
    const receiptItemsBody = document.getElementById('receiptItemsBody');
    const receiptTotal = document.getElementById('receiptTotal');

    let items = [];
    let total = 0;

    // Set today's date
    const today = new Date().toISOString().split('T')[0];
    dateInput.value = today;

    // Add a new item row
    document.getElementById('addItem').addEventListener('click', () => {
        items.push({ name: '', quantity: 0, price: 0 });
        renderItems();
    });

    // Handle form submission
    document.getElementById('receiptForm').addEventListener('submit', (event) => {
        event.preventDefault();
        const receiptData = { date: dateInput.value, items, total };
        sessionStorage.setItem('receiptData', JSON.stringify(receiptData));
        generateReceipt();
    });

    function renderItems() {
        itemsBody.innerHTML = items.map((item, index) => `
            <tr>
                <td class="border px-4 py-2">
                    <input type="text" value="${item.name}" onchange="updateItem(${index}, 'name', this.value)">
                </td>
                <td class="border px-4 py-2">
                    <input type="number" value="${item.quantity}" onchange="updateItem(${index}, 'quantity', this.value)">
                </td>
                <td class="border px-4 py-2">
                    <input type="number" value="${item.price}" onchange="updateItem(${index}, 'price', this.value)">
                </td>
                <td class="border px-4 py-2">
                    <button type="button" onclick="removeItem(${index})" class="bg-red-500 text-white p-2">Remove</button>
                </td>
            </tr>
        `).join('');
        totalInput.value = total;
    }

    window.updateItem = (index, field, value) => {
        items[index][field] = field === 'quantity' || field === 'price' ? parseFloat(value) : value;
        updateTotal();
        renderItems();
    };

    window.removeItem = (index) => {
        items.splice(index, 1);
        updateTotal();
        renderItems();
    };

    function updateTotal() {
        total = items.reduce((sum, item) => sum + item.quantity * item.price, 0);
    }

    function generateReceipt() {
        const receiptData = JSON.parse(sessionStorage.getItem('receiptData'));
        if (receiptData) {
            receiptDate.textContent = receiptData.date;
            receiptItemsBody.innerHTML = receiptData.items.map((item) => `
                <tr>
                    <td>${item.name}</td>
                    <td style="text-align: end;">${numberWithCommas(item.quantity)}</td>
                    <td style="text-align: end;">${numberWithCommas(item.price)}</td>
                    <td style="text-align: end;">${numberWithCommas(item.quantity * item.price)}</td>
                </tr>
            `).join('');
            receiptTotal.textContent = numberWithCommas(receiptData.total);
            receiptContainer.style.display = 'block';
            window.print();
        }
    }

    function numberWithCommas(x) {
        x = x.toString();
        const parts = x.split(".");
        parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ".");
        return parts.join(",");
    }
});
