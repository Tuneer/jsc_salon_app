import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';

const AddMerchant = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('/api/merchants', { name, email })
      .then(() => router.push('/dashboard/admin/merchants'))
      .catch(error => console.error('Error adding merchant:', error));
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>Add Merchant</h1>
      <input
        type="text"
        placeholder="Merchant Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="email"
        placeholder="Merchant Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <button type="submit">Add Merchant</button>
    </form>
  );
};

export default AddMerchant;
