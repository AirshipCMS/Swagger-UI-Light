import Inferno from 'inferno';
import Component from 'inferno-component';
import Explorer from './Explorer';

export class App extends Component {
  render() {
    return <div>
      <header>
        <div class="header-logo"></div>
        <h1>Swagger UI Light</h1>
      </header>
      <div class="content-container">
      	<Explorer {...this.props}/>
      </div>
    </div>
  }
}
