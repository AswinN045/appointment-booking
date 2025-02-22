import express, { json } from 'express';
import apiRoutes from './routes/api.js';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(json());
app.use('/api', apiRoutes);

const PORT = process.env.PORT || 8081;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});