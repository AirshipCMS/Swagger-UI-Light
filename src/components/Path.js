import Inferno from 'inferno';
import Component from 'inferno-component';

export default class Path extends Component{

  constructor() {
    super();

    this.state = {
      expanded : false
    };
  }

  render() {
    return (
      <li>
        { this.props.path }
      </li>
    );
  }
}



