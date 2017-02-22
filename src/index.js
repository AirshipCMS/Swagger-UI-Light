// inferno module
import Inferno from 'inferno';

// app components
import { App } from './components/App';

if (module.hot) {
    require('inferno-devtools');
}

Inferno.render(<App />, document.getElementById('app'));

if (module.hot) {
    module.hot.accept()
}

