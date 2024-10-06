import { useEffect, useState } from 'react';
import axios from 'axios';

const Merchants = () => {
  const [merchants, setMerchants] = useState([]);

  useEffect(() => {
    // Fetch all merchants
    axios.get('/api/merchants')
      .then(response => setMerchants(response.data))
      .catch(error => console.error('Error fetching merchants:', error));
  }, []);

  return (
    <div>
      <h1>All Merchants</h1>
      <a href="/dashboard/admin/merchants/add" className="btn">Add Merchant</a>
      <ul>
        {merchants.map(merchant => (
          <li key={merchant.id}>
            {merchant.name} - {merchant.email}
            <a href={`/dashboard/admin/merchants/${merchant.id}/edit`}>Edit</a> | 
            <a href={`/dashboard/admin/merchants/${merchant.id}/delete`}>Delete</a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Merchants;
