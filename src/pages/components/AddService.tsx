import { useState } from 'react';
import axios from 'axios';

const AddService = ({ merchantId }: { merchantId: number }) => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');

  const handleAddService = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await axios.post('/api/services', { name, price, merchantId });
      if (response.data.success) {
        alert('Service added successfully');
        setName('');
        setPrice('');
      }
    } catch (error) {
      alert('Failed to add service');
    }
  };

  return (
    <form onSubmit={handleAddService}>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Service Name"
        required
      />
      <input
        type="number"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        placeholder="Price"
        required
      />
      <button type="submit">Add Service</button>
    </form>
  );
};

export default AddService;
