/*
 * Swagger API json structure
 *
 * definitions : {
 *   [name] : {
 *     properties: {
 *       [prop]: {
 *         ? type: string | integer | boolean,
 *           -or-
 *         ? $ref: "#/definitions/DefinitionID"
 *       },...
 *     },
 *     required : [ required fields ]
 *   },...
 * }
 * info : {
 *   description
 *   title
 *   version
 * }
 * paths : {
 *   [path] : {
 *     [method] : {
 *       ? consumes : [ mime types ],
 *       ? parameters : [
 *         {
 *           ? default
 *           in
 *           name
 *           required
 *           ? type: string | integer | boolean
 *           -or-
 *           ? schema : {
 *             $ref
 *           }
 *         }, ...]
 *       produces : [ mime types ],
 *       responses : {
 *         default: {
 *           description
 *         }
 *       },
 *       tags : [ tags ]
 *     }
 *   }
 * }
 * swagger
 * tags : [{description, name},...]
 *
 * if there are tags
 *   split paths up by tags
 * else
 *   single section
 */

import Inferno from 'inferno';
import Component from 'inferno-component';
import ExploreByTags from './ExploreByTags';
import ExplorePaths from './ExplorePaths';

export default class Explorer extends Component{

  constructor() {
    super();

    this.state = {
      definitions: {},
      info: {
        description : null,
        title : null,
        version : null
      },
      paths: {},
      swagger: null,
      tags: [],
      errors: null
    };

    this.fetchApi( "/mock-data/multiple-tags.json" );
  }

  fetchApi( url ) {
    const req = new Request(url, { method: "GET" });
    fetch(req)
      .then(res => res.json())
      .then(res => {
        this.setState( res );
      })
      .catch(err => {
        let errors = err instanceof SyntaxError ?
          "Server found a broken" :
          err.toString();
        this.setState({ errors });
      });
  }

  render() {
    return (
      <div>
        <p className="error">{ this.state.errors }</p>
        { this.state.tags.length > 0 ?
          <ExploreByTags {...this.state} /> :
          <ExplorePaths {...this.state} />
        }
      </div>
    );
  }
}
