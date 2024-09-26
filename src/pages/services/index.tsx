import { useState, useEffect, SetStateAction } from 'react';
import axios from 'axios';

const Services = ({ merchantId }) => {
    const [services, setServices] = useState([]);

    useEffect(() => {
        axios.get(`/api/services?merchant_id=${merchantId}`)
            .then((response: { data: SetStateAction<never[]>; }) => setServices(response.data))
            .catch((error: any) => console.error(error));
    }, [merchantId]);

    return (
        <div>
            <h1>Services</h1>
            <ul>
                {services.map((service) => (
                    <li key={service.id}>{service.name} - ${service.base_price}</li>
                ))}
            </ul>
        </div>
    );
};

export default Services;
