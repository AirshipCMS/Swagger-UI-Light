import Inferno from 'inferno';
import Path from './Path';

export default function ExplorePaths(props){
  return (
    <ul className={ props.className }>
      { Object.keys(props.paths).map( path =>
        <Path
          {...props}
          pathName={path}
          path={props.paths[path]}
        />
      ) }
    </ul>
  );
}

