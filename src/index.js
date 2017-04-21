// inferno module
import Inferno from 'inferno';
import { Provider } from 'inferno-redux';

// app components
import { App } from './components/App';
import { store } from './store';

if (module.hot) {
    require('inferno-devtools');
}

Inferno.render((
  <App store={store} />
), document.getElementById('app'));

if (module.hot) {
    module.hot.accept()
}

