import { useState } from 'react';
import axios from 'axios';

const CreateAppointment = ({ merchantId }) => {
    const [serviceId, setServiceId] = useState('');
    const [customerId, setCustomerId] = useState('');
    const [employeeId, setEmployeeId] = useState('');
    const [appointmentDate, setAppointmentDate] = useState('');
    const [couponCode, setCouponCode] = useState('');

    const handleCreateAppointment = async () => {
        try {
            const response = await axios.post('/api/appointments', {
                service_id: serviceId,
                customer_id: customerId,
                merchant_id: merchantId,
                employee_id: employeeId,
                appointment_date: appointmentDate,
                coupon_code: couponCode
            });
            console.log('Appointment created:', response.data);
        } catch (error) {
            console.error('Error creating appointment:', error);
        }
    };

    return (
        <div>
            <h1>Create Appointment</h1>
            <form onSubmit={(e) => { e.preventDefault(); handleCreateAppointment(); }}>
                <input type="text" placeholder="Service ID" value={serviceId} onChange={(e) => setServiceId(e.target.value)} />
                <input type="text" placeholder="Customer ID" value={customerId} onChange={(e) => setCustomerId(e.target.value)} />
                <input type="text" placeholder="Employee ID" value={employeeId} onChange={(e) => setEmployeeId(e.target.value)} />
                <input type="datetime-local" placeholder="Appointment Date" value={appointmentDate} onChange={(e) => setAppointmentDate(e.target.value)} />
                <input type="text" placeholder="Coupon Code" value={couponCode} onChange={(e) => setCouponCode(e.target.value)} />
                <button type="submit">Create Appointment</button>
            </form>
        </div>
    );
};

export default CreateAppointment;
