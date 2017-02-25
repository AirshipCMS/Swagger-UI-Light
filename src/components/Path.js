import Inferno from 'inferno';
import Component from 'inferno-component';
import PathDetail from './PathDetail';

export default class Path extends Component{

  constructor( props ) {
    super( props );

    if( Object.keys(this.props.path).length !== 1 ){
      throw new Error(`Unexpected length of path methods. Expected 1 key in Path.props.path, got ${ Object.keys(this.props.path).length } keys.\nKeys: ${ Object.keys(this.props.path).toString() }`)
    }

    this.state = {
      expanded : false
    };

    this.visibleClass = "path-detail-container path-detail-container-visible";
    this.invisibleClass = "path-detail-container path-detail-container-invisible";

    this.method = Object.keys(this.props.path)[0];
    this.className = `path path-method-${this.method}`;
  }

  getPathDetailContainerClass() {
    return this.state.expanded ? this.visibleClass : this.invisibleClass;
  }

  togglePathDetail() {
    this.setState({ expanded : !this.state.expanded });
  }

  render() {
    return (
      <li
        className={ this.className }
        onClick={ this.togglePathDetail.bind(this) } >
        <h4>
          <span className="path-method-label">{ this.method }</span> ➡
          <span className="path-name">{ this.props.pathName }</span>
        </h4>
        <PathDetail
          className={ this.getPathDetailContainerClass() }
          path={ this.props.path }
          method={ this.method }
          definitions={ this.props.definitions } />
      </li>
    );
  }
}



