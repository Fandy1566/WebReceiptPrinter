import React, { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [date, setDate] = useState('');
  const [items, setItems] = useState([{ name: '', quantity: 0, price: 0 }]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const today = new Date().toISOString().split('T')[0];
    setDate(today);
  }, []);

  const handleItemChange = (index, field, value) => {
    const newItems = [...items];
    newItems[index] = { ...newItems[index], [field]: value };
    setItems(newItems);
    updateTotal(newItems);
  };

  const updateTotal = (items) => {
    const newTotal = items.reduce((sum, item) => sum + item.quantity * item.price, 0);
    setTotal(newTotal);
  };

  const handleAddItem = () => {
    setItems([...items, { name: '', quantity: 0, price: 0 }]);
  };

  const handleRemoveItem = (index) => {
    const newItems = items.filter((_, i) => i !== index);
    setItems(newItems);
    updateTotal(newItems);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const receiptData = { date, items, total };

    sessionStorage.setItem('receiptData', JSON.stringify(receiptData));

    window.open('/print', '_blank');
  };

  return (
    <main style={{textAlign: 'center'}}>
      <h1>Receipt Printer</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="date">Date:</label>
          <input
            type="date"
            id="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>

        <h3>Items</h3>
        <div style={{display: 'flex', justifyContent:'center'}}>
            <table>
            <thead>
                <tr>
                <th className="border px-4 py-2">Item Name</th>
                <th className="border px-4 py-2">Quantity</th>
                <th className="border px-4 py-2">Price</th>
                <th className="border px-4 py-2">Actions</th>
                </tr>
            </thead>
            <tbody>
                {items.map((item, index) => (
                <tr key={index}>
                    <td className="border px-4 py-2">
                    <input
                        type="text"
                        id={`name_${index}`}
                        value={item.name}
                        onChange={(e) => handleItemChange(index, 'name', e.target.value)}
                    />
                    </td>
                    <td className="border px-4 py-2">
                    <input
                        type="number"
                        id={`quantity_${index}`}
                        value={item.quantity}
                        onChange={(e) => handleItemChange(index, 'quantity', Number(e.target.value))}
                    />
                    </td>
                    <td className="border px-4 py-2">
                    <input
                        type="number"
                        id={`price_${index}`}
                        value={item.price}
                        onChange={(e) => handleItemChange(index, 'price', Number(e.target.value))}
                    />
                    </td>
                    <td className="border px-4 py-2">
                    <button
                        type="button"
                        onClick={() => handleRemoveItem(index)}
                        className="bg-red-500 text-white p-2"
                    >
                        Remove
                    </button>
                    </td>
                </tr>
                ))}
            </tbody>
            </table>
        </div>
        <button type="button" onClick={handleAddItem} className="bg-blue-500 text-white p-2 mt-2">
          Add Item
        </button>

        <div>
          <label htmlFor="total">Total:</label>
          <input
            type="number"
            id="total"
            value={total}
            readOnly
          />
        </div>

        <button type="submit">Generate Receipt</button>
      </form>
    </main>
  );
}

export default App;
