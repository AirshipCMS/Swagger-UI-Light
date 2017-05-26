import Inferno from 'inferno';
import Component from 'inferno-component';
import Explorer from './Explorer';

export class App extends Component {
  render() {
    this.info = this.props.store.getState().info;

    return <div>
      <header>
        <div class="header-logo"></div>
        <h1>{ this.info.title } { this.info.version }</h1>
        <h2>{ this.info.description }</h2>
      </header>
      <div class="content-container">
      	<Explorer {...this.props}/>
      </div>
      <footer>
        <p>MIT License</p>
        <a href="https://github.com/AirshipCMS">Made with Airship</a>
      </footer>
    </div>
  }
}
