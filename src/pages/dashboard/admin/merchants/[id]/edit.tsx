import { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';

const EditMerchant = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    // Fetch merchant details by id
    if (id) {
      axios.get(`/api/merchants/${id}`)
        .then(response => {
          setName(response.data.name);
          setEmail(response.data.email);
        })
        .catch(error => console.error('Error fetching merchant:', error));
    }
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.put(`/api/merchants/${id}`, { name, email })
      .then(() => router.push('/dashboard/admin/merchants'))
      .catch(error => console.error('Error updating merchant:', error));
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>Edit Merchant</h1>
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
      <button type="submit">Update Merchant</button>
    </form>
  );
};

export default EditMerchant;
