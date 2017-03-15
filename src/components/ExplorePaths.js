import Inferno from 'inferno';
import Path from './Path';

export default function ExplorePaths({ paths, definitions }){
  return (
    <ul>
      { Object.keys(paths).map( path =>
        <Path
          pathName={path}
          path={paths[path]}
          definitions={definitions} />
      ) }
    </ul>
  );
}

