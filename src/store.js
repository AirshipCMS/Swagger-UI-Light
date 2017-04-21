import { createStore } from 'redux';

export const TOGGLE_EXPAND_TAG = 'TOGGLE_EXPAND_TAG';
export const SET_SWAGGER = 'SET_SWAGGER';
export const ERROR = 'ERROR';

const initialState = {
  // PER TAG Explorer pathsExpanded: false,
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
export const store = createStore((state = initialState, action) => {
      console.log(state);
  switch (action.type) {
    case `${TOGGLE_EXPAND_TAG}`:
      const tags = state.tags.map( tag => {
        if( action.tag.name === tag.name ){
          tag.expanded = !tag.expanded;
        }
        return tag;
      });
      return Object.assign({}, state, {
        tags
      });

    case `${SET_SWAGGER}`:
      const payload = {
        ...action.payload,
        paths : Object.keys(action.payload.paths).reduce((paths, pathKey) => {
          const method = Object.keys(action.payload.paths[pathKey])[0];
          paths[pathKey] = Object.assign( action.payload.paths[pathKey], {
            expanded : false,
            method,
            definition : action.payload.paths[pathKey][method]
          });
          return paths;
        }, {}),
        tags : action.payload.tags.map( tag => {
          tag.expanded = false;
          return tag;
        })
      };
      return Object.assign({}, state, payload);

    default:
      return state;
  }
});

      // this.setState({
      //   tags: this.state.tags.map( tag => {
      //     if(tag.name === action.name) {
      //       tag.expanded = !tag.expanded;
      //     }
      //     return tag;
      //   })
      // });
