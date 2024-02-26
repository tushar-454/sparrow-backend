const express = require('express');
const app = express();
const port = 3000 || process.env.PORT;

app.get('/', (_req, res) => {
  res.json({ message: 'sparrow backend application running' });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
