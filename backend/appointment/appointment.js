import db from '../db.js';

const getTimeSlots = () => {
    const slots = [];
    for (let hour = 10; hour <= 17; hour += 0.5) {
        if (hour < 13 || hour >= 14) {
            const isPM = hour >= 12;
            const displayHour = hour > 12 ? Math.floor(hour - 12) : Math.floor(hour);
            const minutes = hour % 1 === 0 ? '00' : '30';
            const period = isPM ? 'PM' : 'AM';
            slots.push(`${displayHour}:${minutes} ${period}`);
        }
    }
    return slots;
};


export const getAvailableSlots = async (date) => {
    const allSlots = getTimeSlots();
    return new Promise((resolve, reject) => {
        db.all(
            'SELECT time FROM appointments WHERE date = ?',
            [date],
            (err, rows) => {
                if (err) return reject(err);
                const bookedSlots = rows.map(row => row.time);
                const availableSlots = allSlots.filter(
                    slot => !bookedSlots.includes(slot)
                );
                resolve(availableSlots);
            }
        );
    });
}

export const bookAppointment = async ({ name, phone, date, time }) => {
    return new Promise((resolve, reject) => {
        db.run(
            'INSERT INTO appointments (name, phone, date, time) VALUES (?, ?, ?, ?)',
            [name, phone, date, time],
            function (err) {
                if (err) return reject(err);
                resolve({ id: this.lastID });
            }
        );
    });
}