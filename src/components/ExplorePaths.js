import Inferno from 'inferno';
import Path from './Path';

export default function ExplorePaths({ paths, definitions }){
  return (
    <ul>
      { Object.keys(paths).map( path =>
        <Path path={path} definitions={definitions} />
      ) }
    </ul>
  );
}

