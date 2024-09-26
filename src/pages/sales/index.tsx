import { useState, useEffect } from 'react';
import axios from 'axios';

const SalesReport = () => {
  const [sales, setSales] = useState([]);
  const [merchantId, setMerchantId] = useState('1'); // Static merchant ID for example
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  // Fetch sales data when merchant ID, startDate, and endDate are provided
  useEffect(() => {
    if (startDate && endDate) {
      axios
        .get(`/api/sales`, {
          params: { merchant_id: merchantId, start_date: startDate, end_date: endDate },
        })
        .then((response) => {
          setSales(response.data);
        })
        .catch((error) => {
          console.error('Error fetching sales data:', error);
        });
    }
  }, [merchantId, startDate, endDate]);

  return (
    <div>
      <h1>Sales Report</h1>
      <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
      <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
      <button onClick={() => console.log(sales)}>Log Sales Data</button>
      <ul>
        {sales.map((sale: any) => (
          <li key={sale.id}>{sale.sale_date} - ${sale.total_amount}</li>
        ))}
      </ul>
    </div>
  );
};

export default SalesReport;
