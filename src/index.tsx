/* @refresh reload */
import { render } from 'solid-js/web';

import './index.css';
import { App } from './components/App';
import setupLocatorUI from "@locator/runtime";

if (process.env.NODE_ENV === "development") {
  setupLocatorUI();
}
render(() => <App />, document.getElementById('root') as HTMLElement);
