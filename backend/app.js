const express = require('express');
const cors = require('cors');
const patientRoutes = require('./routes/patientRoutes');
const hospitalRoutes = require('./routes/hospitalRoutes');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/patients', patientRoutes);
app.use('/api/hospitals', hospitalRoutes);

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));