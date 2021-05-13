const app = require('./server.js');
const PORT = 3006;

app.listen(PORT, () => {
  console.log('Listening on port ', PORT);
})