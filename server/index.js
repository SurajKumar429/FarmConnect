const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();
// Use port 5001 to avoid conflicts, can be overridden by .env
const PORT = process.env.PORT === '5000' ? 5001 : (process.env.PORT || 5001);

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/farms', require('./routes/farms'));
app.use('/api/crops', require('./routes/crops'));
app.use('/api/expenses', require('./routes/expenses'));
app.use('/api/diary', require('./routes/diary'));
app.use('/api/yield', require('./routes/yield'));
app.use('/api/resources', require('./routes/resources'));
app.use('/api/marketplace', require('./routes/marketplace'));
app.use('/api/market-prices', require('./routes/marketPrices'));
app.use('/api/learning', require('./routes/learning'));

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'FarmConnect API is running' });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`API available at http://localhost:${PORT}/api`);
});

