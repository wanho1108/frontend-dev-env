import './app.css';
// import nyancat from './nyancat.jpg';
import axios from 'axios';
import * as math from './math';

window.addEventListener('DOMContentLoaded', async () => {

  const res = await axios.get('/api/users');
  console.log(res);  

  // document.body.innerHTML = `<img src="${nyancat}">`;
  document.body.innerHTML = (res.data || []).map(user => {
    return `<div>${user.id}: ${user.name}</div>`;
  }).join('');

  console.log(math.sum(1, 2));
});

console.log(process.env.NODE_ENV);
console.log(TWO);
console.log(TWOString);
console.log(api.domain);

if (module.hot) {
  console.log('핫 모듈 켜짐');

  module.hot.accept('./math', () => {
    console.log('math 모듈 변경됨');
  });
}