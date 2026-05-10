import express from 'express';
import cors from 'cors';
import expertRoutes from './routes/expertRoutes.js';
import bookingRoutes from './routes/bookingRoutes.js';
import { errorHandler, notFound } from './middleware/errorHandler.js';

const app = express();
app.use(cors());
//app.use(cors({ origin: process.env.FRONTEND_URL || '*' }));
app.use(express.json());

app.get('/health', (_req, res) => {
  res.json({ status: 'ok' });
});

app.use('/experts', expertRoutes);
app.use('/bookings', bookingRoutes);

app.get('/', (req, res) => {
  res.json({ message: 'API is running 🚀' });
});

app.use(notFound);
app.use(errorHandler);

export default app;
