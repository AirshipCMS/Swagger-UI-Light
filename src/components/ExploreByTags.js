import Inferno from 'inferno';
import ExplorePaths from './ExplorePaths';
import Component from 'inferno-component';
import { connect } from 'inferno-redux';

const EXPANDED_BUTTON_CLASS = 'toggle-button expanded';
const CLOSED_BUTTON_CLASS = 'toggle-button';
const EXPANDED_TAG_CLASS = 'tag';
const CLOSED_TAG_CLASS = 'tag hidden';
const EXPANDED_PATHS_CLASS = 'path-detail-container';
const CLOSED_PATHS_CLASS = 'path-detail-container hidden';

import {
  TOGGLE_EXPAND_TAG
} from '../store';

class ExploreByTags extends Component {

  // constructor(props) {
  //   super(props);

    // this.setState({
    //   pathsExpanded: false
    // });
    // this.expandTag = this.expandTag.bind(this);
  // }

  expandTag( tag ){
    return e => {
      e.preventDefault();
      this.props.toggle_expand_tag(tag);
      // this.store.dispatch( EXPAND_TAGS, { tag } );
      // this.setState({
      //   tags: this.state.tags.map( tag => {
      //     if(tag.name === action.name) {
      //       tag.expanded = !tag.expanded;
      //     }
      //     return tag;
      //   })
      // });
      //
    }
  }

  render () {

    const expandPaths = e => {
      e.preventDefault();
      // this.setState({ pathsExpanded: !this.state.pathsExpanded });
    };

    // pathsExpandedClass={ this.state.pathsExpanded ? EXPANDED_PATHS_CLASS : CLOSED_PATHS_CLASS }
    // pathsExpanded={ this.state.pathsExpanded }
    // definitions={this.state.definitions}
              // paths={Object.keys(this.state.paths).filter( path =>
              //   Object.keys(this.state.paths[path]).some( method =>
              //     this.state.paths[path][method].tags.indexOf(tag.name) >= 0
              //   )
              // ).reduce((pathsDict, taggedPath) => Object.assign(pathsDict,{[taggedPath]:this.state.paths[taggedPath]}), {})}
    return (
      <div>
        { this.props.tags.map( tag =>
          <section>
            <div onClick={ this.expandTag(tag) }>
              <h2>{ tag.name }</h2>
              <p>{ tag.description }</p>
            </div>
            <ExplorePaths
              { ...this.props }
              tag={tag}
              className={ tag.expanded ? EXPANDED_TAG_CLASS : CLOSED_TAG_CLASS }
            />
            <button onClick={ expandPaths }>{ false ? 'open' : 'closed' }</button>
          </section>
        ) }
      </div>
    );
  }

}

const mapDispatchToProps = (dispatch) => {
  return {
    toggle_expand_tag: tag => {
      dispatch({ type: TOGGLE_EXPAND_TAG, tag })
    }
  };
};
const mapStateToProps = (state) => state;
const ConnectedExploreByTags = connect(mapStateToProps, mapDispatchToProps)(ExploreByTags);
export default ConnectedExploreByTags;
