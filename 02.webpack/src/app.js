import './app.css';
import nyancat from './nyancat.jpg';

window.addEventListener('DOMContentLoaded', () => {
  document.body.innerHTML = `<img src="${nyancat}">`;
});