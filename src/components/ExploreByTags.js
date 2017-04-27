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
  TOGGLE_EXPAND_TAG,
  TOGGLE_EXPAND_ALL_PATHS
} from '../store';

class ExploreByTags extends Component {

  constructor(props) {
    super(props);
  }

  expandTag( tag ){
    return e => {
      e.preventDefault();
      this.props.toggle_expand_tag(tag);
    }
  }

  expandAllPaths( tag ){
    return e => {
      e.preventDefault();
      this.props.toggle_expand_all_paths(tag);
    }
  };

  render () {

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
            <button onClick={ this.expandAllPaths(tag) }>{ tag.pathsExpanded ? 'open' : 'closed' }</button>
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
    },
    toggle_expand_all_paths: tag => {
      dispatch({ type: TOGGLE_EXPAND_ALL_PATHS, tag })
    }
  };
};
const mapStateToProps = (state) => state;
const ConnectedExploreByTags = connect(mapStateToProps, mapDispatchToProps)(ExploreByTags);
export default ConnectedExploreByTags;
