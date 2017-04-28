import Inferno from 'inferno';
import Path from './Path';

export default function ExplorePaths(props){
  return (
    <div className={ props.className }>
      <div class="path-labels table">
        <div class="table-row">
          <div class="table-cell table-cell-method">
            <label class="path-label">Type</label>
          </div>
          <div class="table-cell table-cell-route">
            <label class="path-label">Route</label>
          </div>
          <div class="table-cell table-cell-description">
            <label class="path-label">Description</label>
          </div>
          <div class="table-cell table-cell-auth">
            <label class="path-label">Auth</label>
          </div>
        </div>
      </div>
      { Object.keys(props.paths).map( path =>
        <Path
          {...props}
          path={props.paths[path]}
        />
      ) }
    </div>
  );
}

