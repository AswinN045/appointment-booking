import React from 'react';
import ReactDOM from 'react-dom';
import AppointmentBooking from './components/AppointmentBooking';
import './components/AppointmentBooking.css';

(function() {
  window.AppointmentBookingPlugin = {
    init: (containerId, apiBaseUrl = 'http://localhost:8081/api') => {
      console.log('Init called with:', containerId, apiBaseUrl);
      const container = document.getElementById(containerId);
      if (!container) {
        console.error('Container not found:', containerId);
        return;
      }
      ReactDOM.render(<AppointmentBooking apiBaseUrl={apiBaseUrl} />, container);
    },
    destroy: (containerId) => {
      console.log('Destroy called for:', containerId);
      const container = document.getElementById(containerId);
      if (container) ReactDOM.unmountComponentAtNode(container);
    },
  };
  console.log('AppointmentBookingPlugin defined:', window.AppointmentBookingPlugin);
})();