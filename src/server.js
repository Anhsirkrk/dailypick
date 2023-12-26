const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true,
}));

// ...other middleware and routes

app.listen(7041, () => {
  console.log('Server running on port 7041');
});
