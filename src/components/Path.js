import Inferno from 'inferno';
import Component from 'inferno-component';
import { connect } from 'inferno-redux';
import PathDetail from './PathDetail';
import { TOGGLE_EXPAND_PATH } from '../store';

class Path extends Component{

  constructor( props ) {
    super( props );

    if( props.path.definition["x-auth-required"] ) {
      this.auth = props.path.definition["x-auth-scope"];
    }

    this.visibleClass = "path-detail-container";
    this.invisibleClass = "path-detail-container hidden";

    this.className = `path-method-label path-method-${this.props.path.method}`;
  }

  getPathDetailContainerClass() {
    return this.props.path.expanded ? this.visibleClass : this.invisibleClass;
  }

  togglePathDetail() {
    this.props.toggle_expand_path(this.props.path);
  }

  render() {
    return (
      <div
        className="path"
        onClick={ this.togglePathDetail.bind(this) } >
        <div class="table path-table">
          <div class="table-row">
            <div class="table-cell table-cell-method">
              <div className={ this.props.path.expanded ? 'icon-arrow path-arrow open' : 'icon-arrow path-arrow closed' }></div>
              <h4 className={ this.className }>{ this.props.path.method }</h4>
            </div>
            <div class="table-cell table-cell-route">
              <h4 className="path-name">{ this.props.path.name }</h4>
            </div>
            <div class="table-cell table-cell-description">
              <h4 className={ this.props.path.expanded ? 'hidden' : '' }>{ this.props.path.definition.description }</h4>
            </div>
            <div class="table-cell table-cell-auth">
              <h4 className={ this.auth }>{ this.auth }</h4>
            </div>
          </div>
        </div>
        <PathDetail
          { ...this.props }
          className={ this.getPathDetailContainerClass() }
        />
      </div>
    );
  }
}


const mapDispatchToProps = (dispatch) => {
  return {
    toggle_expand_path: path => {
      dispatch({ type:  TOGGLE_EXPAND_PATH, path })
    }
  };
};
const mapStateToProps = (state) => state;
const ConnectedPath = connect(mapStateToProps, mapDispatchToProps)(Path);
export default ConnectedPath;

