fetch('http://localhost:3000/api/contact', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({name: 'Test', email: 'navaneethdev33@gmail.com', message: 'test next js api'})
}).then(async res => {
  console.log('Status:', res.status);
  console.log('Body:', await res.text());
}).catch(err => console.error(err));
