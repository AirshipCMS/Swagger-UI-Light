import Inferno from 'inferno';
import ExplorePaths from './ExplorePaths';
import Component from 'inferno-component';

const EXPANDED_BUTTON_CLASS = 'toggle-button expanded';
const CLOSED_BUTTON_CLASS = 'toggle-button';
const EXPANDED_TAG_CLASS = 'tag';
const CLOSED_TAG_CLASS = 'tag hidden';
const EXPANDED_PATHS_CLASS = 'path-detail-container';
const CLOSED_PATHS_CLASS = 'path-detail-container hidden';

export default class ExploreByTags extends Component {

  constructor(props) {
    super(props);

    this.state = this.props;
    this.setState({
      pathsExpanded: false
    });
  }

  render () {

    const expandTag = action => e => {
      e.preventDefault();
      this.setState({
        tags: this.state.tags.map( tag => {
          if(tag.name === action.name) {
            tag.expanded = !tag.expanded;
          }
          return tag;
        })
      });
    }

    const expandPaths = e => {
      e.preventDefault();
      this.setState({ pathsExpanded: !this.state.pathsExpanded });
    }

    return (
      <div>
        { this.state.tags.map( tag =>
          <section>
            <div onClick={ expandTag(tag) }>
              <h2>{ tag.name }</h2>
              <p>{ tag.description }</p>
            </div>
            <ExplorePaths className={ tag.expanded ? EXPANDED_TAG_CLASS : CLOSED_TAG_CLASS }
              pathsExpandedClass={ this.state.pathsExpanded ? EXPANDED_PATHS_CLASS : CLOSED_PATHS_CLASS }
              pathsExpanded={ this.state.pathsExpanded }
              definitions={this.state.definitions}
              paths={Object.keys(this.state.paths).filter( path =>
                Object.keys(this.state.paths[path]).some( method =>
                  this.state.paths[path][method].tags.indexOf(tag.name) >= 0
                )
              ).reduce((pathsDict, taggedPath) => Object.assign(pathsDict,{[taggedPath]:this.state.paths[taggedPath]}), {})} />
            <button onClick={ expandPaths }>{ this.state.pathsExpanded ? 'open' : 'closed' }</button>
          </section>
        ) }
      </div>
    );
  }

}

