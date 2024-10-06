import { useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';

const DeleteMerchant = () => {
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    if (id) {
      axios.delete(`/api/merchants/${id}`)
        .then(() => router.push('/dashboard/admin/merchants'))
        .catch(error => console.error('Error deleting merchant:', error));
    }
  }, [id]);

  return <p>Deleting merchant...</p>;
};

export default DeleteMerchant;
