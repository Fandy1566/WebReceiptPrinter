import React, { useEffect, useState } from 'react';

function numberWithCommas(x) {
    var parts = x.toString().split(".");
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    return parts.join(",");
}

const Print = () => {
    const [hasPrinted, setHasPrinted] = useState(false);
    const [receiptData, setReceiptData] = useState(null);

    useEffect(() => {
        const data = sessionStorage.getItem('receiptData');
        if (data) {
            setReceiptData(JSON.parse(data));
        }
    }, []);

    useEffect(() => {
        if (receiptData && !hasPrinted) {
            window.print();
            setHasPrinted(true);
        }
    }, [receiptData, hasPrinted]);

    if (!receiptData) {
        return <p>No receipt data found.</p>;
    }

    const { date, items, total } = receiptData;

    return (
        <div className="receipt" style={{ textAlign: 'center' }}>
            <h2><strong>Kantin99</strong></h2>
            <p>Jalan Inspektur Yazid no.64, Lahat, Sumatera Selatan</p>
            <p>Telp. 081272233039</p>
            <p><strong>Tanggal:</strong> {date}</p>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <table className='receiptTable' style={{ width: "100%" }}>
                    <thead>
                        <tr>
                            <th>Barang</th>
                            <th>Qty</th>
                            <th>Harga</th>
                            <th>Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        {items.map((item, index) => (
                            <tr key={index}>
                                <td>{item.name}</td>
                                <td style={{ textAlign: 'end' }}>{numberWithCommas(item.quantity)}</td>
                                <td style={{ textAlign: 'end' }}>{numberWithCommas(item.price)}</td>
                                <td style={{ textAlign: 'end' }}>{numberWithCommas(item.quantity * item.price)}</td>
                            </tr>
                        ))}
                    </tbody>
                    <tfoot>
                        <tr>
                            <td colSpan={3} style={{ textAlign: 'end' }}>
                                <div style={{ paddingInline: '10px' }}><strong>Total:</strong></div>
                            </td>
                            <td style={{ textAlign: 'end' }}>{numberWithCommas(total)}</td>
                        </tr>
                    </tfoot>
                </table>
            </div>
            <div className="mt-4">
                <p><strong>Terimakasih</strong></p>
            </div>
        </div>
    );
};

export default Print;
