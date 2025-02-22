import React from 'react';
import ReactDOM from 'react-dom';
import AppointmentBooking from './components/AppointmentBooking';
import './components/AppointmentBooking.css';

const initAppointmentBooking = (containerId, apiBaseUrl = 'http://localhost:8081/api') => {
    const container = document.getElementById(containerId);
    if (!container) {
        console.error(`Container with ID "${containerId}" not found`);
        return;
    }
    ReactDOM.render(<AppointmentBooking apiBaseUrl={apiBaseUrl} />, container);
};

// Expose globally
window.AppointmentBookingPlugin = {
    init: initAppointmentBooking,
    destroy: (containerId) => {
        const container = document.getElementById(containerId);
        if (container) ReactDOM.unmountComponentAtNode(container);
    },
};