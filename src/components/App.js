import Inferno from 'inferno';
import Component from 'inferno-component';
import Explorer from './Explorer';

export class App extends Component {
  render() {
    return <div>
      <h1>Swagger UI</h1>

      <Explorer {...this.props}/>
    </div>
  }
}
