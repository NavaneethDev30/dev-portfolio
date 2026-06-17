fetch('https://backend-portfolio-guhe.onrender.com/api/v1/contact', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({name: 'test', email: 'test@test.com', message: 'test'})
}).then(async res => {
  console.log('Status:', res.status);
  console.log('Body:', await res.text());
}).catch(err => console.error(err));
