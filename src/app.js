import express from 'express';
import cors from 'cors';
import authRoutes from './routes/authRoutes.js';
// import fileRoutes from './routes/fileRoutes.js';
import sequelize from './config/sequelize.js';

const app = express();
app.use(express.json());
app.use(cors({ origin: '*' }));

app.use('/', authRoutes);
// app.use('/file', fileRoutes);

const PORT = process.env.PORT || 3000;
(async () => {
  try {
    await sequelize.authenticate();
    console.log('DB connected');
    app.listen(PORT, () => console.log(`Server running on ${PORT}`));
  } catch (e) {
    console.error('DB connection failed:', e);
    process.exit(1);
  }
})();
