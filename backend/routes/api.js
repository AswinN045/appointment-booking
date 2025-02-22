import { Router } from 'express';
import { getAvailableSlots, bookAppointment } from '../appointment/appointment.js';
const router = Router();

router.get('/slots/:date', async (req, res) => {
  try {
    const slots = await getAvailableSlots(req.params.date);
    res.json(slots);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/book', async (req, res) => {
  try {
    const appointment = await bookAppointment(req.body);
    res.json({ success: true, appointment });
  } catch (err) {
    res.status(400).json({ error: 'Slot already booked or invalid data' });
  }
});

export default router;