import Inferno from 'inferno';
import ExplorePaths from './ExplorePaths';
import Component from 'inferno-component';
import { connect } from 'inferno-redux';

const EXPANDED_BUTTON_CLASS = 'toggle-button expanded';
const CLOSED_BUTTON_CLASS = 'toggle-button';
const EXPANDED_TAG_CLASS = 'paths';
const CLOSED_TAG_CLASS = 'paths hidden';

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
      <div class="tags-container">
        { this.props.tags.map( tag =>
          <section class="tag">
            <div class="tag-content">
              <div class="tag-details-container">
                <div className={ tag.expanded ? 'icon-arrow open' : 'icon-arrow closed' }></div>
                <div onClick={ this.expandTag(tag) } class="tag-details">
                  <h2 class="tag-name">{ tag.name }</h2>
                  <p>{ tag.description }</p>
                </div>
              </div>
              <div className={ tag.pathsExpanded ? 'toggle-button open' : 'toggle-button close' } onClick={ this.expandAllPaths(tag) }>
                <div class="bar1"></div>
                <div class="bar2"></div>
                <div class="bar3"></div>
              </div>
            </div>
            <ExplorePaths
              { ...this.props }
              tag={tag}
              paths={tag.paths}
              className={ tag.expanded ? EXPANDED_TAG_CLASS : CLOSED_TAG_CLASS }
            />
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
