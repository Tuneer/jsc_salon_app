import { useState, useEffect, SetStateAction } from 'react';
import axios from 'axios';

const Merchants = () => {
    const [merchants, setMerchants] = useState([]);

    useEffect(() => {
        axios.get('/api/merchants')
            .then((response: { data: SetStateAction<never[]>; }) => setMerchants(response.data))
            .catch((error: any) => console.error(error));
    }, []);

    return (
        <div>
            <h1>Merchants</h1>
            <ul>
                {merchants.map((merchant) => (
                    <li key={merchant.id}>{merchant.name}</li>
                ))}
            </ul>
        </div>
    );
};

export default Merchants;
