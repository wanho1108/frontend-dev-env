import './app.css';
import nyancat from './nyancat.jpg';
import axios from 'axios';

window.addEventListener('DOMContentLoaded', async () => {

  const res = await axios.get('/api/users');
  console.log(res);  

  // document.body.innerHTML = `<img src="${nyancat}">`;
  document.body.innerHTML = (res.data || []).map(user => {
    return `<div>${user.id}: ${user.name}</div>`;
  }).join('');
});

console.log(process.env.NODE_ENV);
console.log(TWO);
console.log(TWOString);
console.log(api.domain);