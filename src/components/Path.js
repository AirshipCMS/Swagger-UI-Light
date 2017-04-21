/*
  /api/route : {
    expanded : true,
    method : "get",
    definition : {
      blah blah
    }
 }
 */

import Inferno from 'inferno';
import Component from 'inferno-component';
import { connect } from 'inferno-redux';
// import PathDetail from './PathDetail';

class Path extends Component{

  constructor( props ) {
    super( props );
    console.log(props);

    // this.state = {
    //   expanded : false
    // };

    this.visibleClass = "path-detail-container";
    this.invisibleClass = "path-detail-container hidden";

    this.className = `path path-method-${this.props.path.method}`;
  }

  getPathDetailContainerClass() {
    return this.props.path.expanded ? this.visibleClass : this.invisibleClass;
    // return this.visibleClass;
  }

  togglePathDetail() {
    // this.setState({ expanded : !this.state.expanded });
  }

        // className={ this.className }
  render() {
    // console.log(this.className);
    return (
      <li
        onClick={ this.togglePathDetail.bind(this) } >
        <div>
          <h4 className="path-method-label">{ this.props.path.method }</h4>
          <h4 className="path-name">{ this.props.pathName }</h4>
          <h4>DESCRIPTION HERE</h4>
          <h4>AUTH HERE</h4>
        </div>
        <PathDetail
          { ...this.props }
          className={ this.getPathDetailContainerClass() }
        />
      </li>
    );
  }
}


const mapDispatchToProps = (dispatch) => {
  return {
    toggle_expand_tag: tag => {
      dispatch({ type: 'nothing', tag })
    }
  };
};
const mapStateToProps = (state) => state;
const ConnectedPath = connect(mapStateToProps, mapDispatchToProps)(Path);
export default ConnectedPath;

