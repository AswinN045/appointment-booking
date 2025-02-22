import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './AppointmentBooking.css';

const AppointmentBooking = ({ apiBaseUrl = 'http://localhost:8081/api' }) => {
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        date: '',
        time: '',
    });
    const [slots, setSlots] = useState([]);
    const [message, setMessage] = useState('');
    const [showPopup, setShowPopup] = useState(false);
    const [popupMessage, setPopupMessage] = useState('');
    const [isSuccess, setIsSuccess] = useState(true);

    const fetchSlots = async (date) => {
        try {
            const response = await axios.get(`${apiBaseUrl}/slots/${date}`);
            setSlots(response.data);
        } catch (err) {
            setMessage('Error fetching slots');
            console.error(err);
        }
    };

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
    };

    const handleDateChange = (e) => {
        const date = e.target.value;
        setFormData({ ...formData, date });
        if (date) fetchSlots(date);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('Submitting:', formData);

        if (!formData.name || !formData.phone || !formData.date || !formData.time) {
            setPopupMessage('All fields are required');
            setIsSuccess(false);
            setShowPopup(true);
            return;
        }

        try {
            const response = await axios.post(`${apiBaseUrl}/book`, formData);
            if (response.data.success) {
                setPopupMessage('Booking confirmed!');
                setIsSuccess(true);
                setShowPopup(true);
                fetchSlots(formData.date); // Refresh slots
            }
        } catch (err) {
            setPopupMessage(err.response?.data?.error || 'Error booking appointment');
            setIsSuccess(false);
            setShowPopup(true);
            console.error('Booking error:', err);
        }
    };

    const handlePopupClose = () => {
        setShowPopup(false);
        if (isSuccess) {
            setFormData({ name: '', phone: '', date: '', time: '' });
            setSlots([]);
            setMessage('');
        }
    };

    return (
        <div className="appointment-booking">
            <h2>Book an Appointment</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    id="name"
                    placeholder="Full Name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                />
                <input
                    type="tel"
                    id="phone"
                    placeholder="Phone Number"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                />
                <input
                    type="date"
                    id="date"
                    value={formData.date}
                    onChange={handleDateChange}
                    required
                />
                <select
                    id="time"
                    value={formData.time}
                    onChange={handleInputChange}
                    required
                >
                    <option value="">Select a time slot</option>
                    {slots.map((slot) => (
                        <option key={slot} value={slot}>
                            {slot}
                        </option>
                    ))}
                </select>
                <button type="submit">Book Now</button>
            </form>
            {message && <div className="message">{message}</div>}

            {showPopup && (
                <div className={`popup ${isSuccess ? 'success' : 'error'}`}>
                    <div className="popup-content">
                        <p>{popupMessage}</p>
                        <button type="button" onClick={handlePopupClose}>
                            OK
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AppointmentBooking;