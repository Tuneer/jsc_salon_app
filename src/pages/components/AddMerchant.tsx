import { useState } from 'react';
import axios from 'axios';

const AddMerchant = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleAddMerchant = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await axios.post('/api/merchants', { name, email });
      if (response.data.success) {
        setSuccess('Merchant added successfully!');
        setName('');
        setEmail('');
      } else {
        setError(response.data.message);
      }
    } catch (error) {
      setError('Failed to add merchant.');
    }
  };

  return (
    <div>
      <h2>Add Merchant</h2>
      <form onSubmit={handleAddMerchant}>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Merchant Name"
          required
        />
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Merchant Email"
          required
        />
        <button type="submit">Add Merchant</button>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        {success && <p style={{ color: 'green' }}>{success}</p>}
      </form>
    </div>
  );
};

export default AddMerchant;
