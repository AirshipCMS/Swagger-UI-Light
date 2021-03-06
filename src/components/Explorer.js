import Inferno from 'inferno';
import Component from 'inferno-component';
import ExploreByTags from './ExploreByTags';
import ExplorePaths from './ExplorePaths';
import { connect } from 'inferno-redux';
import { swagger_api_url } from '../config';
import {
  SET_SWAGGER,
  ERROR
} from '../store';

class Explorer extends Component{

  constructor(props) {
    super(props);

    this.fetchApi( swagger_api_url )
      .then(payload => {
        this.props.set_swagger(payload);
      })
      .catch(err => {
        let errors = err instanceof SyntaxError ?
          `Swagger UI Light could not find the swagger json api at ${swagger_api_url}` :
          err.toString();
        this.props.error(errors);
      });
  }

  fetchApi( url ) {
    const req = new Request(url, { method: "GET" });
    return fetch(req).then(res => res.json());
  }

  render() {
    return (
      <div>
        <p className="error">{ this.props.errors }</p>
        { this.props.tags.length > 0 ?
          <ExploreByTags {...this.props} /> :
          <ExplorePaths {...this.props} />
        }
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    set_swagger: payload => {
      dispatch({ type: SET_SWAGGER, payload });
    },
    error: errors => {
      dispatch({ type: ERROR, errors });
    }
  };
};
const mapStateToProps = (state) => state;
const ConnectedExplorer = connect(mapStateToProps, mapDispatchToProps)(Explorer);
export default ConnectedExplorer;
