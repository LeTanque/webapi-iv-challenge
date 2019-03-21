require('dotenv').config();

const server = require('./server.js');

const port = process.env.DB_PORT || 3333;
const greeting = process.env.DB_GREETING;

server.listen(port, () => {
  console.log(`\n*** ${greeting} Server Running on http://localhost:${port} ***\n`);
});


