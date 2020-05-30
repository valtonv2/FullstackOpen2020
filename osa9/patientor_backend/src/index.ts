import express from 'express';
import cors from 'cors';
import DiagnosisRouter from './routes/diagnoses';
import PatientRouter from './routes/patients';
const app = express();

app.use(express.json());
app.use(cors());

const PORT = 3001;

app.use('/api', DiagnosisRouter);
app.use('/api', PatientRouter);

app.get('/api/ping', (_req, res) => { 
  console.log('ping');
  res.status(200).send('pong');
});
  
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});


