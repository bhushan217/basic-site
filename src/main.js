import './app.scss'
import { mount } from 'svelte';
import App from './App.svelte'

// const app = new App({
//   target: document.getElementById('app'),
// })
const app = mount(App, { target: document.getElementById("app") });

export default app

