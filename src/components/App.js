import Inferno from 'inferno';
import Component from 'inferno-component';
import Explorer from './Explorer';

export class App extends Component {
  render() {
    this.info = this.props.store.getState().info;

    return <div>
      <header>
        <h1>API Documentation</h1>
      </header>
      <div class="content-container">
      	<Explorer {...this.props}/>
      </div>
      <footer>
        <a href="https://github.com/AirshipCMS/Swagger-UI-Light" target="_blank">Swagger UI Light 1.0.0</a>
        <a href="https://github.com/AirshipCMS/Swagger-UI-Light/blob/master/LICENSE" target="_blank">MIT License</a>
      </footer>
    </div>
  }
}
